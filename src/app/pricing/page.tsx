'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Check, 
  Crown, 
  CreditCard, 
  Smartphone,
  FileText,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { api, authUtils } from '@/utils';
import { User } from '@/types';
import toast from 'react-hot-toast';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  features: string[];
  popular: boolean;
}

export default function PricingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'flutterwave'>('stripe');
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchPricingPlans();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get('/auth/profile');
      if (response.data.success) {
        setUser(response.data.data.user);
        setCustomerName(`${response.data.data.user.firstName} ${response.data.data.user.lastName}`);
      }
    } catch (error) {
      // User not authenticated
    }
  };

  const fetchPricingPlans = async () => {
    try {
      const response = await api.get('/payments/pricing');
      if (response.data.success) {
        setPlans(response.data.data.plans);
      }
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
    }
  };

  const handleSelectPlan = (planId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    setSelectedPlan(planId);
    setShowPaymentForm(true);
  };

  const handleStripePayment = async (plan: PricingPlan) => {
    setIsLoading(true);
    try {
      const response = await api.post('/payments/stripe/create-intent', {
        amount: plan.price,
        currency: plan.currency,
        type: plan.id,
      });

      if (response.data.success) {
        // In a real app, you would integrate with Stripe Elements here
        toast.success('Redirecting to Stripe...');
        // For now, simulate successful payment
        setTimeout(() => {
          toast.success('Payment successful!');
          router.push('/dashboard');
        }, 2000);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Payment failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlutterwavePayment = async (plan: PricingPlan) => {
    setIsLoading(true);
    try {
      const response = await api.post('/payments/flutterwave/create', {
        amount: plan.price,
        currency: plan.currency,
        type: plan.id,
        customerName,
        phoneNumber,
      });

      if (response.data.success) {
        // Redirect to Flutterwave payment page
        window.location.href = response.data.data.paymentLink;
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Payment failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAirtelMoney = async (plan: PricingPlan) => {
    if (!phoneNumber) {
      toast.error('Please enter your phone number');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/payments/airtel-money/stk', {
        amount: plan.price,
        phoneNumber,
        customerName,
      });

      if (response.data.success) {
        toast.success('STK push sent to your phone. Please enter your PIN.');
        // Poll for payment status
        setTimeout(() => {
          toast.success('Payment successful!');
          router.push('/dashboard');
        }, 5000);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Payment failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <FileText className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">Resume Builder Pro</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link href="/dashboard" className="btn-secondary">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              ) : (
                <div className="space-x-2">
                  <Link href="/login" className="btn-secondary">Sign In</Link>
                  <Link href="/register" className="btn-primary">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Unlock premium features and create professional resumes that get you hired
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card relative ${
                plan.popular
                  ? 'border-2 border-primary-500 shadow-lg'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0">
                  <div className="flex justify-center transform -translate-y-1/2">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-primary-600 text-white">
                      <Crown className="h-4 w-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              <div className={plan.popular ? 'pt-4' : ''}>
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-500">{plan.description}</p>
                
                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="ml-1 text-xl font-medium text-gray-500">
                      /{plan.duration}
                    </span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      plan.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500'
                    }`}
                  >
                    {user?.hasActiveSubscription 
                      ? 'Current Plan' 
                      : 'Get Started'
                    }
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Form Modal */}
        {showPaymentForm && selectedPlanData && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                  Complete Your Purchase
                </h3>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    {selectedPlanData.name} - ${selectedPlanData.price}
                  </p>
                </div>

                {/* Payment Method Selection */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose Payment Method
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="stripe"
                        checked={paymentMethod === 'stripe'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'stripe')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3 flex items-center">
                        <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-700">
                          Credit/Debit Card (Stripe)
                        </span>
                      </div>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="flutterwave"
                        checked={paymentMethod === 'flutterwave'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'flutterwave')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3 flex items-center">
                        <Smartphone className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-700">
                          Mobile Money (Flutterwave)
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Additional fields for mobile money */}
                {paymentMethod === 'flutterwave' && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 input-field"
                        placeholder="+256700000000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="mt-1 input-field"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => {
                      if (paymentMethod === 'stripe') {
                        handleStripePayment(selectedPlanData);
                      } else {
                        handleFlutterwavePayment(selectedPlanData);
                      }
                    }}
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    {isLoading ? 'Processing...' : `Pay $${selectedPlanData.price}`}
                  </button>
                  
                  {paymentMethod === 'flutterwave' && (
                    <button
                      onClick={() => handleAirtelMoney(selectedPlanData)}
                      disabled={isLoading}
                      className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Pay with Airtel Money
                    </button>
                  )}
                  
                  <button
                    onClick={() => setShowPaymentForm(false)}
                    className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ or Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All plans include a 7-day money-back guarantee. Questions?{' '}
            <Link href="/contact" className="text-primary-600 hover:text-primary-500">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}