import { Response } from 'express';
import { validationResult } from 'express-validator';
import Resume, { IResume } from '../models/Resume';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

// @desc    Get all resumes for user
// @route   GET /api/resumes
// @access  Private
export const getResumes = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const resumes = await Resume.find({ userId })
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-__v');

  const total = await Resume.countDocuments({ userId });

  res.json({
    success: true,
    data: {
      resumes,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    },
  });
});

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
export const getResume = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  const resume = await Resume.findOne({ _id: id, userId }).select('-__v');

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    });
  }

  res.json({
    success: true,
    data: {
      resume,
    },
  });
});

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
export const createResume = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }

  const userId = req.userId;
  const resumeData = {
    ...req.body,
    userId,
  };

  const resume = await Resume.create(resumeData);

  res.status(201).json({
    success: true,
    message: 'Resume created successfully',
    data: {
      resume,
    },
  });
});

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
export const updateResume = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }

  const { id } = req.params;
  const userId = req.userId;

  const resume = await Resume.findOneAndUpdate(
    { _id: id, userId },
    req.body,
    { new: true, runValidators: true }
  ).select('-__v');

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    });
  }

  res.json({
    success: true,
    message: 'Resume updated successfully',
    data: {
      resume,
    },
  });
});

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  const resume = await Resume.findOneAndDelete({ _id: id, userId });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    });
  }

  res.json({
    success: true,
    message: 'Resume deleted successfully',
  });
});

// @desc    Duplicate resume
// @route   POST /api/resumes/:id/duplicate
// @access  Private
export const duplicateResume = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  const originalResume = await Resume.findOne({ _id: id, userId });

  if (!originalResume) {
    return res.status(404).json({
      success: false,
      message: 'Resume not found',
    });
  }

  // Create a copy of the resume
  const duplicateData = originalResume.toObject();
  delete duplicateData._id;
  delete duplicateData.createdAt;
  delete duplicateData.updatedAt;
  
  // Update the title to indicate it's a copy
  duplicateData.title = `${duplicateData.title} (Copy)`;

  const duplicatedResume = await Resume.create(duplicateData);

  res.status(201).json({
    success: true,
    message: 'Resume duplicated successfully',
    data: {
      resume: duplicatedResume,
    },
  });
});

// @desc    Get resume templates
// @route   GET /api/resumes/templates
// @access  Public
export const getTemplates = asyncHandler(async (req: AuthRequest, res: Response) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and modern design perfect for tech professionals',
      category: 'modern',
      isPremium: false,
      preview: '/templates/modern-preview.png',
    },
    {
      id: 'classic',
      name: 'Classic Business',
      description: 'Traditional format ideal for business professionals',
      category: 'classic',
      isPremium: false,
      preview: '/templates/classic-preview.png',
    },
    {
      id: 'creative',
      name: 'Creative Designer',
      description: 'Eye-catching design for creative professionals',
      category: 'creative',
      isPremium: true,
      preview: '/templates/creative-preview.png',
    },
    {
      id: 'executive',
      name: 'Executive Leader',
      description: 'Professional format for senior executives',
      category: 'executive',
      isPremium: true,
      preview: '/templates/executive-preview.png',
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Simple and clean design focusing on content',
      category: 'modern',
      isPremium: false,
      preview: '/templates/minimalist-preview.png',
    },
    {
      id: 'technical',
      name: 'Technical Expert',
      description: 'Optimized for software engineers and developers',
      category: 'modern',
      isPremium: true,
      preview: '/templates/technical-preview.png',
    },
  ];

  res.json({
    success: true,
    data: {
      templates,
    },
  });
});