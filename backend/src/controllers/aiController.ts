import { Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { AIService } from '../utils/aiService';

const aiService = AIService.getInstance();

// @desc    Generate bullet points for experience
// @route   POST /api/ai/bullet-points
// @access  Private
export const generateBulletPoints = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }

  const { position, company, description } = req.body;

  try {
    const bulletPoints = await aiService.generateBulletPoints(position, company, description);

    res.json({
      success: true,
      data: {
        bulletPoints,
      },
    });
  } catch (error) {
    console.error('Error generating bullet points:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate bullet points. Please try again.',
    });
  }
});

// @desc    Improve existing text
// @route   POST /api/ai/improve-text
// @access  Private
export const improveText = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }

  const { text, context } = req.body;

  try {
    const improvedText = await aiService.improveText(text, context);

    res.json({
      success: true,
      data: {
        originalText: text,
        improvedText,
      },
    });
  } catch (error) {
    console.error('Error improving text:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to improve text. Please try again.',
    });
  }
});

// @desc    Generate professional summary
// @route   POST /api/ai/generate-summary
// @access  Private
export const generateSummary = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }

  const { firstName, lastName, position, experience, skills } = req.body;

  try {
    const summary = await aiService.generateSummary(firstName, lastName, position, experience, skills);

    res.json({
      success: true,
      data: {
        summary,
      },
    });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate summary. Please try again.',
    });
  }
});

// @desc    Suggest relevant skills
// @route   POST /api/ai/suggest-skills
// @access  Private
export const suggestSkills = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }

  const { position, currentSkills } = req.body;

  try {
    const suggestedSkills = await aiService.suggestSkills(position, currentSkills || []);

    res.json({
      success: true,
      data: {
        suggestedSkills,
      },
    });
  } catch (error) {
    console.error('Error suggesting skills:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to suggest skills. Please try again.',
    });
  }
});

// @desc    Optimize content for ATS
// @route   POST /api/ai/optimize-ats
// @access  Private
export const optimizeForATS = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }

  const { text, targetPosition } = req.body;

  try {
    const optimizedText = await aiService.optimizeForATS(text, targetPosition);

    res.json({
      success: true,
      data: {
        originalText: text,
        optimizedText,
      },
    });
  } catch (error) {
    console.error('Error optimizing for ATS:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to optimize content. Please try again.',
    });
  }
});

// @desc    Get AI usage statistics
// @route   GET /api/ai/usage
// @access  Private
export const getUsageStats = asyncHandler(async (req: AuthRequest, res: Response) => {
  // This would typically track usage per user in a real application
  // For now, return static data
  res.json({
    success: true,
    data: {
      monthlyUsage: {
        bulletPoints: 15,
        textImprovements: 8,
        summaries: 3,
        skillSuggestions: 5,
        atsOptimizations: 2,
      },
      limits: {
        bulletPoints: 50,
        textImprovements: 30,
        summaries: 10,
        skillSuggestions: 20,
        atsOptimizations: 10,
      },
    },
  });
});