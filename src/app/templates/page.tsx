'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Crown, 
  Eye, 
  Plus,
  Filter,
  FileText,
  User
} from 'lucide-react';
import { templateMetadata, TemplateKey } from '@/components/templates';
import { api, authUtils } from '@/utils';
import { User as UserType } from '@/types';
import toast from 'react-hot-toast';

export default function TemplatesPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const router = useRouter();

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'modern', label: 'Modern' },
    { id: 'classic', label: 'Classic' },
    { id: 'creative', label: 'Creative' },
    { id: 'executive', label: 'Executive' },
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get('/auth/profile');
      if (response.data.success) {
        setUser(response.data.data.user);
      }
    } catch (error) {
      // User not authenticated
    }
  };

  const filteredTemplates = Object.entries(templateMetadata).filter(([key, template]) => {
    if (selectedCategory !== 'all' && template.category !== selectedCategory) {
      return false;
    }
    if (showPremiumOnly && !template.isPremium) {
      return false;
    }
    return true;
  });

  const handleSelectTemplate = async (templateId: TemplateKey) => {
    const template = templateMetadata[templateId];
    
    // Check if template is premium and user doesn't have subscription
    if (template.isPremium && user && !user.hasActiveSubscription) {
      toast.error('This template requires a Pro subscription');
      router.push('/pricing');
      return;
    }

    if (!user) {
      // Store template selection and redirect to login
      localStorage.setItem('selectedTemplate', templateId);
      router.push('/login');
      return;
    }

    // Create new resume with selected template
    try {
      const newResume = {
        title: `${template.name} Resume`,
        template: templateId,
        personalInfo: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: '',
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
      };

      const response = await api.post('/resumes', newResume);
      if (response.data.success) {
        toast.success('Resume created with selected template!');
        router.push(`/builder/${response.data.data.resume._id}`);
      }
    } catch (error) {
      toast.error('Failed to create resume');
    }
  };

  const handlePreviewTemplate = (templateId: TemplateKey) => {
    // For now, just show a toast. In a real app, you'd show a modal or preview page
    toast.success('Template preview coming soon!');
  };

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100\">
      {/* Header */}
      <header className=\"bg-white shadow-sm\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"flex justify-between items-center py-6\">
            <div className=\"flex items-center\">
              <Link href=\"/\" className=\"flex items-center\">
                <FileText className=\"h-8 w-8 text-primary-600\" />
                <span className=\"ml-2 text-2xl font-bold text-gray-900\">Resume Builder Pro</span>
              </Link>
            </div>
            <div className=\"flex items-center space-x-4\">
              {user ? (
                <div className=\"flex items-center space-x-4\">
                  <Link href=\"/dashboard\" className=\"btn-secondary\">
                    <ArrowLeft className=\"h-4 w-4 mr-2\" />
                    Back to Dashboard
                  </Link>
                  <div className=\"flex items-center space-x-2\">
                    <User className=\"h-5 w-5 text-gray-400\" />
                    <span className=\"text-gray-700\">{user.firstName}</span>
                  </div>
                </div>
              ) : (
                <div className=\"space-x-2\">
                  <Link href=\"/login\" className=\"btn-secondary\">Sign In</Link>
                  <Link href=\"/register\" className=\"btn-primary\">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className=\"max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8\">
        {/* Hero Section */}
        <div className=\"text-center mb-12\">
          <h1 className=\"text-4xl font-bold text-gray-900 mb-4\">
            Choose Your Perfect Resume Template
          </h1>
          <p className=\"text-xl text-gray-600 max-w-3xl mx-auto\">
            Select from our collection of professionally designed templates. 
            Each template is optimized for different industries and career levels.
          </p>
        </div>

        {/* Filters */}
        <div className=\"flex flex-wrap items-center justify-between mb-8\">
          <div className=\"flex items-center space-x-4 mb-4 sm:mb-0\">
            <Filter className=\"h-5 w-5 text-gray-500\" />
            <div className=\"flex space-x-2\">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          <div className=\"flex items-center space-x-4\">
            <label className=\"flex items-center\">
              <input
                type=\"checkbox\"
                checked={showPremiumOnly}
                onChange={(e) => setShowPremiumOnly(e.target.checked)}
                className=\"h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded\"
              />
              <span className=\"ml-2 text-sm text-gray-700 flex items-center\">
                <Crown className=\"h-4 w-4 mr-1 text-yellow-500\" />
                Premium Only
              </span>
            </label>
          </div>
        </div>

        {/* Template Grid */}
        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8\">
          {filteredTemplates.map(([templateId, template]) => (
            <div key={templateId} className=\"bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow\">
              {/* Template Preview */}
              <div className=\"aspect-[3/4] bg-gray-100 relative group\">
                {/* Placeholder for template preview */}
                <div className=\"w-full h-full flex items-center justify-center text-gray-400\">
                  <FileText className=\"h-16 w-16\" />
                </div>
                
                {/* Premium Badge */}
                {template.isPremium && (
                  <div className=\"absolute top-3 right-3\">
                    <span className=\"inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800\">
                      <Crown className=\"h-3 w-3 mr-1\" />
                      Pro
                    </span>
                  </div>
                )}

                {/* Hover Actions */}
                <div className=\"absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center\">
                  <div className=\"opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-x-3\">
                    <button
                      onClick={() => handlePreviewTemplate(templateId as TemplateKey)}
                      className=\"bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors\"
                    >
                      <Eye className=\"h-4 w-4 mr-2 inline\" />
                      Preview
                    </button>
                    <button
                      onClick={() => handleSelectTemplate(templateId as TemplateKey)}
                      className=\"bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors\"
                    >
                      <Plus className=\"h-4 w-4 mr-2 inline\" />
                      Use This
                    </button>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className=\"p-6\">
                <div className=\"flex items-start justify-between mb-2\">
                  <h3 className=\"text-lg font-semibold text-gray-900\">{template.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    template.category === 'modern' ? 'bg-blue-100 text-blue-800' :
                    template.category === 'classic' ? 'bg-gray-100 text-gray-800' :
                    template.category === 'creative' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {template.category}
                  </span>
                </div>
                <p className=\"text-gray-600 text-sm mb-4\">{template.description}</p>
                
                {/* Features */}
                <div className=\"space-y-2\">
                  <h4 className=\"text-sm font-medium text-gray-900\">Features:</h4>
                  <ul className=\"text-xs text-gray-600 space-y-1\">
                    {template.features.map((feature, index) => (
                      <li key={index} className=\"flex items-center\">
                        <span className=\"w-1 h-1 bg-gray-400 rounded-full mr-2\"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className=\"mt-6 flex space-x-3\">
                  <button
                    onClick={() => handlePreviewTemplate(templateId as TemplateKey)}
                    className=\"flex-1 btn-secondary text-sm\"
                  >
                    <Eye className=\"h-4 w-4 mr-1\" />
                    Preview
                  </button>
                  <button
                    onClick={() => handleSelectTemplate(templateId as TemplateKey)}
                    className={`flex-1 text-sm font-medium py-2 px-4 rounded-lg transition-colors ${
                      template.isPremium && user && !user.hasActiveSubscription
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    <Plus className=\"h-4 w-4 mr-1 inline\" />
                    {template.isPremium && user && !user.hasActiveSubscription ? 'Upgrade' : 'Use Template'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className=\"text-center py-12\">
            <FileText className=\"mx-auto h-12 w-12 text-gray-400\" />
            <h3 className=\"mt-2 text-sm font-medium text-gray-900\">No templates found</h3>
            <p className=\"mt-1 text-sm text-gray-500\">
              Try adjusting your filters to see more templates.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className=\"mt-16 text-center\">
          <div className=\"bg-white rounded-lg shadow-lg p-8\">
            <h2 className=\"text-2xl font-bold text-gray-900 mb-4\">
              Need Help Choosing?
            </h2>
            <p className=\"text-gray-600 mb-6\">
              Not sure which template is right for you? Our AI can help suggest the best template 
              based on your industry and experience level.
            </p>
            <button className=\"btn-primary\">
              Get Template Recommendation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}