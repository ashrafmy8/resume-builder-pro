export { ModernTemplate } from './ModernTemplate';
export { ClassicTemplate } from './ClassicTemplate';
export { CreativeTemplate } from './CreativeTemplate';
export { ExecutiveTemplate } from './ExecutiveTemplate';
export { MinimalistTemplate } from './MinimalistTemplate';
export { TechnicalTemplate } from './TechnicalTemplate';

import { Resume } from '@/types';

export interface TemplateProps {
  resume: Resume;
  className?: string;
}

export const templateComponents = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  executive: ExecutiveTemplate,
  minimalist: MinimalistTemplate,
  technical: TechnicalTemplate,
} as const;

export type TemplateKey = keyof typeof templateComponents;

// Template metadata for selection UI
export const templateMetadata = {
  modern: {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and modern design perfect for tech professionals',
    category: 'modern',
    isPremium: false,
    preview: '/templates/modern-preview.png',
    features: ['Clean design', 'Color accents', 'Professional layout'],
  },
  classic: {
    id: 'classic',
    name: 'Classic Business',
    description: 'Traditional format ideal for business professionals',
    category: 'classic',
    isPremium: false,
    preview: '/templates/classic-preview.png',
    features: ['Traditional layout', 'Professional typography', 'ATS-friendly'],
  },
  creative: {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Eye-catching design for creative professionals',
    category: 'creative',
    isPremium: true,
    preview: '/templates/creative-preview.png',
    features: ['Gradient design', 'Sidebar layout', 'Visual skills bars'],
  },
  executive: {
    id: 'executive',
    name: 'Executive Leader',
    description: 'Professional format for senior executives',
    category: 'executive',
    isPremium: true,
    preview: '/templates/executive-preview.png',
    features: ['Executive styling', 'Achievement focus', 'Premium layout'],
  },
  minimalist: {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple and clean design focusing on content',
    category: 'modern',
    isPremium: false,
    preview: '/templates/minimalist-preview.png',
    features: ['Minimal design', 'Content focus', 'Clean typography'],
  },
  technical: {
    id: 'technical',
    name: 'Technical Expert',
    description: 'Optimized for software engineers and developers',
    category: 'modern',
    isPremium: true,
    preview: '/templates/technical-preview.png',
    features: ['Dark sidebar', 'Skill categorization', 'Project showcase'],
  },
} as const;