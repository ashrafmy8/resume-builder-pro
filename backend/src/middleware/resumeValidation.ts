import { body } from 'express-validator';

export const validateResume = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('template')
    .notEmpty()
    .withMessage('Template is required'),
  body('personalInfo.firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required and must be less than 50 characters'),
  body('personalInfo.lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required and must be less than 50 characters'),
  body('personalInfo.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('personalInfo.phone')
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage('Phone number must be between 10 and 20 characters'),
  body('summary')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Summary must be less than 500 characters'),
  body('experience')
    .optional()
    .isArray()
    .withMessage('Experience must be an array'),
  body('experience.*.company')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Company name must be between 1 and 100 characters'),
  body('experience.*.position')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Position must be between 1 and 100 characters'),
  body('experience.*.startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('experience.*.endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('experience.*.description')
    .optional()
    .isArray()
    .withMessage('Experience description must be an array'),
  body('education')
    .optional()
    .isArray()
    .withMessage('Education must be an array'),
  body('education.*.institution')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Institution name must be between 1 and 100 characters'),
  body('education.*.degree')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Degree must be between 1 and 100 characters'),
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  body('skills.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Each skill must be between 1 and 50 characters'),
];

export const validateResumeUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('template')
    .optional()
    .notEmpty()
    .withMessage('Template cannot be empty'),
  body('personalInfo.firstName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be less than 50 characters'),
  body('personalInfo.lastName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be less than 50 characters'),
  body('personalInfo.email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email'),
  body('personalInfo.phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number must be less than 20 characters'),
  body('summary')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Summary must be less than 500 characters'),
];