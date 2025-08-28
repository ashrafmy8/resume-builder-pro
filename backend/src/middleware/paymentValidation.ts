import { body } from 'express-validator';

export const validateStripePayment = [
  body('amount')
    .isNumeric()
    .isFloat({ min: 0.5 })
    .withMessage('Amount must be a number and at least $0.50'),
  body('currency')
    .isLength({ min: 3, max: 3 })
    .isAlpha()
    .withMessage('Currency must be a valid 3-letter currency code'),
  body('type')
    .isIn(['one-time', 'monthly'])
    .withMessage('Type must be either one-time or monthly'),
];

export const validateFlutterwavePayment = [
  body('amount')
    .isNumeric()
    .isFloat({ min: 0.5 })
    .withMessage('Amount must be a number and at least $0.50'),
  body('currency')
    .isLength({ min: 3, max: 3 })
    .isAlpha()
    .withMessage('Currency must be a valid 3-letter currency code'),
  body('type')
    .isIn(['one-time', 'monthly'])
    .withMessage('Type must be either one-time or monthly'),
  body('customerName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Customer name must be between 2 and 100 characters'),
  body('phoneNumber')
    .optional()
    .matches(/^\+?[\d\s\-\(\)]+$/)
    .withMessage('Phone number must be a valid format'),
];

export const validateAirtelMoneyPayment = [
  body('amount')
    .isNumeric()
    .isFloat({ min: 1 })
    .withMessage('Amount must be a number and at least $1'),
  body('phoneNumber')
    .matches(/^\+?[\d\s\-\(\)]+$/)
    .withMessage('Phone number is required and must be valid'),
  body('customerName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Customer name must be between 2 and 100 characters'),
];

export const validatePaymentVerification = [
  body('transactionId')
    .trim()
    .notEmpty()
    .withMessage('Transaction ID is required'),
];