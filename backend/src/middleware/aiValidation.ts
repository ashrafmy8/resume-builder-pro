import { body } from 'express-validator';

export const validateBulletPoints = [
  body('position')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Position is required and must be less than 100 characters'),
  body('company')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Company is required and must be less than 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
];

export const validateImproveText = [
  body('text')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Text is required and must be less than 1000 characters'),
  body('context')
    .isIn(['summary', 'experience', 'education', 'skill'])
    .withMessage('Context must be one of: summary, experience, education, skill'),
];

export const validateGenerateSummary = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required and must be less than 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required and must be less than 50 characters'),
  body('position')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Position is required and must be less than 100 characters'),
  body('experience')
    .isArray()
    .withMessage('Experience must be an array'),
  body('skills')
    .isArray()
    .withMessage('Skills must be an array'),
];

export const validateSuggestSkills = [
  body('position')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Position is required and must be less than 100 characters'),
  body('currentSkills')
    .optional()
    .isArray()
    .withMessage('Current skills must be an array'),
];

export const validateOptimizeATS = [
  body('text')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Text is required and must be less than 2000 characters'),
  body('targetPosition')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Target position is required and must be less than 100 characters'),
];