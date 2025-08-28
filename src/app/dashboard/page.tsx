'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, 
  FileText, 
  Edit3, 
  Copy, 
  Trash2, 
  Download, 
  Mail, 
  Crown,
  Clock,
  User
} from 'lucide-react';
import { api, authUtils, formatDate } from '@/utils';
import { Resume, User as UserType } from '@/types';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'download' | 'email' | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
    fetchResumes();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get('/auth/profile');
      if (response.data.success) {
        setUser(response.data.data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      authUtils.removeToken();
      router.push('/login');
    }
  };

  const fetchResumes = async () => {
    try {
      const response = await api.get('/resumes');
      if (response.data.success) {
        setResumes(response.data.data.resumes);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast.error('Failed to load resumes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    router.push('/builder/new');
  };

  const handleEdit = (resumeId: string) => {
    router.push(`/builder/${resumeId}`);
  };

  const handleDuplicate = async (resumeId: string) => {
    try {
      const response = await api.post(`/resumes/${resumeId}/duplicate`);
      if (response.data.success) {
        toast.success('Resume duplicated successfully');
        fetchResumes();
      }
    } catch (error) {
      toast.error('Failed to duplicate resume');
    }
  };

  const handleDelete = async (resumeId: string) => {
    if (confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.delete(`/resumes/${resumeId}`);
        toast.success('Resume deleted successfully');
        fetchResumes();
      } catch (error) {
        toast.error('Failed to delete resume');
      }
    }
  };

  const handlePremiumAction = (action: 'download' | 'email') => {
    if (user?.hasActiveSubscription) {
      // Proceed with the action
      if (action === 'download') {
        // Implement download
        toast.success('Download started');
      } else if (action === 'email') {
        // Implement email
        toast.success('Email sent');
      }
    } else {
      setSelectedAction(action);
      setShowPaywall(true);
    }
  };

  const hasActiveSubscription = user?.hasActiveSubscription || false;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Resume Builder Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              {!hasActiveSubscription && (
                <Link
                  href="/pricing"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Link>
              )}
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{user?.firstName} {user?.lastName}</span>
              </div>
              <button
                onClick={() => {
                  authUtils.removeToken();
                  router.push('/');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Subscription Status */}
        {user?.subscription && (
          <div className={`mb-6 p-4 rounded-lg border ${
            hasActiveSubscription 
              ? 'bg-green-50 border-green-200' 
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-center">
              <Crown className={`h-5 w-5 mr-2 ${
                hasActiveSubscription ? 'text-green-600' : 'text-yellow-600'
              }`} />
              <span className={`font-medium ${
                hasActiveSubscription ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {hasActiveSubscription 
                  ? `Pro subscription active until ${formatDate(user.subscription.expiresAt!)}`
                  : 'Subscription expired'
                }
              </span>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-2 text-gray-600">
            Create and manage your professional resumes
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Resume
          </button>
        </div>

        {/* Resumes Grid */}
        {resumes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No resumes</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first resume.
            </p>
            <div className="mt-6">
              <button
                onClick={handleCreateNew}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Resume
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume._id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {resume.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {resume.personalInfo.firstName} {resume.personalInfo.lastName}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      Updated {formatDate(resume.updatedAt)}
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      resume.template === 'modern' ? 'bg-blue-100 text-blue-800' :
                      resume.template === 'classic' ? 'bg-gray-100 text-gray-800' :
                      resume.template === 'creative' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {resume.template}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(resume._id)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Edit3 className="h-3 w-3 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDuplicate(resume._id)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Duplicate
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="inline-flex items-center px-2 py-1.5 text-xs font-medium text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>

                {/* Premium Actions */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePremiumAction('download')}
                      className={`flex-1 inline-flex items-center justify-center px-3 py-2 border text-xs font-medium rounded ${
                        hasActiveSubscription
                          ? 'border-primary-300 text-primary-700 bg-primary-50 hover:bg-primary-100'
                          : 'border-gray-300 text-gray-500 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {hasActiveSubscription ? 'Download' : 'Download (Pro)'}
                    </button>
                    <button
                      onClick={() => handlePremiumAction('email')}
                      className={`flex-1 inline-flex items-center justify-center px-3 py-2 border text-xs font-medium rounded ${
                        hasActiveSubscription
                          ? 'border-primary-300 text-primary-700 bg-primary-50 hover:bg-primary-100'
                          : 'border-gray-300 text-gray-500 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      {hasActiveSubscription ? 'Email' : 'Email (Pro)'}
                    </button>
                  </div>
                  {!hasActiveSubscription && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Upgrade to download and email resumes
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                <Crown className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                Upgrade to Pro
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  To {selectedAction} your resume, you need an active Pro subscription.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <Link
                  href="/pricing"
                  className="px-4 py-2 bg-primary-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 mr-2"
                >
                  View Pricing Plans
                </Link>
                <button
                  onClick={() => setShowPaywall(false)}
                  className="mt-3 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}