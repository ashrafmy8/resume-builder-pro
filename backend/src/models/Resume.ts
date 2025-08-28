import mongoose, { Document, Schema } from 'mongoose';

interface IPersonalInfo {
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

interface IExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
}

interface IEducation {
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

interface IProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
}

interface ICertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  description?: string;
}

interface ILanguage {
  id: string;
  language: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'native';
}

interface ICustomSection {
  id: string;
  title: string;
  content: string;
}

export interface IResume extends Document {
  _id: string;
  userId: string;
  title: string;
  template: string;
  personalInfo: IPersonalInfo;
  summary?: string;
  experience: IExperience[];
  education: IEducation[];
  skills: string[];
  projects?: IProject[];
  certifications?: ICertification[];
  languages?: ILanguage[];
  customSections?: ICustomSection[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PersonalInfoSchema = new Schema<IPersonalInfo>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  linkedIn: String,
  portfolio: String,
  github: String,
}, { _id: false });

const ExperienceSchema = new Schema<IExperience>({
  id: { type: String, required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  location: String,
  startDate: { type: String, required: true },
  endDate: String,
  current: { type: Boolean, default: false },
  description: [{ type: String }],
}, { _id: false });

const EducationSchema = new Schema<IEducation>({
  id: { type: String, required: true },
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: String,
  location: String,
  startDate: { type: String, required: true },
  endDate: String,
  current: { type: Boolean, default: false },
  gpa: String,
  description: String,
}, { _id: false });

const ProjectSchema = new Schema<IProject>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  url: String,
  github: String,
  startDate: String,
  endDate: String,
}, { _id: false });

const CertificationSchema = new Schema<ICertification>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  url: String,
  description: String,
}, { _id: false });

const LanguageSchema = new Schema<ILanguage>({
  id: { type: String, required: true },
  language: { type: String, required: true },
  proficiency: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'native'],
    required: true,
  },
}, { _id: false });

const CustomSectionSchema = new Schema<ICustomSection>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { _id: false });

const ResumeSchema = new Schema<IResume>({
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  template: {
    type: String,
    required: true,
    default: 'modern',
  },
  personalInfo: {
    type: PersonalInfoSchema,
    required: true,
  },
  summary: {
    type: String,
    trim: true,
  },
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [{ type: String }],
  projects: [ProjectSchema],
  certifications: [CertificationSchema],
  languages: [LanguageSchema],
  customSections: [CustomSectionSchema],
  isPublic: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Indexes for performance
ResumeSchema.index({ userId: 1, createdAt: -1 });
ResumeSchema.index({ title: 'text', 'personalInfo.firstName': 'text', 'personalInfo.lastName': 'text' });

export default mongoose.model<IResume>('Resume', ResumeSchema);