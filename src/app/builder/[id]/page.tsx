'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  Save, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText
} from 'lucide-react';
import { api } from '@/utils';
import { Resume, PersonalInfo, Experience, Education } from '@/types';
import toast from 'react-hot-toast';

export default function ResumeBuilderPage() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const router = useRouter();
  const params = useParams();
  const resumeId = params.id;

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
  ];

  useEffect(() => {
    if (resumeId === 'new') {
      createNewResume();
    } else {
      fetchResume();
    }
  }, [resumeId]);

  const createNewResume = async () => {
    try {
      const newResume = {
        title: 'Untitled Resume',
        template: 'modern',
        personalInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
      };

      const response = await api.post('/resumes', newResume);
      if (response.data.success) {
        setResume(response.data.data.resume);
        // Update URL to actual ID
        router.replace(`/builder/${response.data.data.resume._id}`);
      }
    } catch (error) {
      toast.error('Failed to create resume');
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResume = async () => {
    try {
      const response = await api.get(`/resumes/${resumeId}`);
      if (response.data.success) {
        setResume(response.data.data.resume);
      }
    } catch (error) {
      toast.error('Resume not found');
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const saveResume = async () => {
    if (!resume) return;
    
    setIsSaving(true);
    try {
      await api.put(`/resumes/${resume._id}`, resume);
      toast.success('Resume saved successfully');
    } catch (error) {
      toast.error('Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  const updateResumeField = (field: string, value: any) => {
    if (!resume) return;
    setResume(prev => ({
      ...prev!,
      [field]: value,
    }));
  };

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    if (!resume) return;
    setResume(prev => ({
      ...prev!,
      personalInfo: {
        ...prev!.personalInfo,
        [field]: value,
      },
    }));
  };

  const addExperience = () => {
    if (!resume) return;
    const newExperience: Experience = {
      id: `exp_${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
    };
    setResume(prev => ({
      ...prev!,
      experience: [...prev!.experience, newExperience],
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    if (!resume) return;
    setResume(prev => ({
      ...prev!,
      experience: prev!.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    if (!resume) return;
    setResume(prev => ({
      ...prev!,
      experience: prev!.experience.filter(exp => exp.id !== id),
    }));
  };

  const generateAISuggestions = async (experienceId: string) => {
    const experience = resume?.experience.find(exp => exp.id === experienceId);
    if (!experience || !experience.company || !experience.position) {
      toast.error('Please fill company and position first');
      return;
    }

    try {
      const response = await api.post('/ai/bullet-points', {
        position: experience.position,
        company: experience.company,
        description: experience.description.join(' '),
      });

      if (response.data.success) {
        updateExperience(experienceId, 'description', response.data.data.bulletPoints);
        toast.success('AI suggestions applied');
      }
    } catch (error) {
      toast.error('Failed to generate AI suggestions');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Resume not found</h2>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
              <div className="h-6 border-l border-gray-300" />
              <input
                type="text"
                value={resume.title}
                onChange={(e) => updateResumeField('title', e.target.value)}
                className="text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2"
                placeholder="Resume Title"
              />
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={saveResume}
                disabled={isSaving}
                className="btn-primary"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeSection === section.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card">
              {/* Personal Info Section */}
              {activeSection === 'personal' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={resume.personalInfo.firstName}
                        onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                        className="input-field"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={resume.personalInfo.lastName}
                        onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                        className="input-field"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={resume.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="input-field"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={resume.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        className="input-field"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        value={resume.personalInfo.address || ''}
                        onChange={(e) => updatePersonalInfo('address', e.target.value)}
                        className="input-field"
                        placeholder="123 Main St, City, State 12345"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Section */}
              {activeSection === 'summary' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Professional Summary</h3>
                    <button
                      onClick={() => setShowAISuggestions(true)}
                      className="btn-secondary"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Generate
                    </button>
                  </div>
                  <textarea
                    value={resume.summary || ''}
                    onChange={(e) => updateResumeField('summary', e.target.value)}
                    rows={4}
                    className="input-field"
                    placeholder="Write a compelling professional summary that highlights your key achievements and career goals..."
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    2-3 sentences that capture your professional value proposition
                  </p>
                </div>
              )}

              {/* Experience Section */}
              {activeSection === 'experience' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
                    <button
                      onClick={addExperience}
                      className="btn-primary"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </button>
                  </div>
                  <div className="space-y-6">
                    {resume.experience.map((exp, index) => (
                      <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => generateAISuggestions(exp.id)}
                              className="text-sm text-primary-600 hover:text-primary-700"
                            >
                              <Sparkles className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => removeExperience(exp.id)}
                              className="text-sm text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              className="input-field"
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Position
                            </label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                              className="input-field"
                              placeholder="Job Title"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Start Date
                            </label>
                            <input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              End Date
                            </label>
                            <input
                              type="month"
                              value={exp.endDate || ''}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              className="input-field"
                              disabled={exp.current}
                            />
                            <label className="flex items-center mt-2">
                              <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <span className="ml-2 text-sm text-gray-700">Currently work here</span>
                            </label>
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Description
                          </label>
                          <textarea
                            value={exp.description.join('\n')}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                            rows={3}
                            className="input-field"
                            placeholder="• Achieved 20% increase in sales performance&#10;• Led a team of 5 developers&#10;• Implemented new process that reduced costs by 15%"
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            Each line will be a separate bullet point
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {activeSection === 'skills' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Skills</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills (comma-separated)
                    </label>
                    <textarea
                      value={resume.skills.join(', ')}
                      onChange={(e) => updateResumeField('skills', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                      rows={3}
                      className="input-field"
                      placeholder="JavaScript, React, Node.js, Python, SQL, Project Management"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Separate each skill with a comma
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}