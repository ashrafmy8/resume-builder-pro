export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  provider: 'email' | 'google';
  subscription?: Subscription;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  _id: string;
  userId: string;
  type: 'one-time' | 'monthly';
  status: 'active' | 'expired' | 'cancelled';
  expiresAt: Date;
  paymentMethod: 'stripe' | 'flutterwave';
  paymentDetails?: {
    transactionId: string;
    amount: number;
    currency: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Resume {
  _id: string;
  userId: string;
  title: string;
  template: string;
  personalInfo: PersonalInfo;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
  customSections?: CustomSection[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  linkedIn?: string;
  portfolio?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  description?: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'native';
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'classic' | 'creative' | 'executive';
  isPremium: boolean;
}

export interface AIResponse {
  suggestions: string[];
  improved_text?: string;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  type: 'one-time' | 'monthly';
  paymentMethod: 'stripe' | 'flutterwave';
}

export interface FlutterwavePaymentData {
  tx_ref: string;
  amount: number;
  currency: string;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  payment_options: string;
  redirect_url: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}