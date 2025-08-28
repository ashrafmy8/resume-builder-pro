import express from 'express';
import {
  createStripePaymentIntent,
  confirmStripePayment,
  createFlutterwavePayment,
  verifyFlutterwavePayment,
  initiateAirtelMoneySTK,
  getPaymentHistory,
  getPricingPlans,
  getSubscriptionStatus,
} from '../controllers/paymentController';
import { authenticate, optionalAuth } from '../middleware/auth';
import {
  validateStripePayment,
  validateFlutterwavePayment,
  validateAirtelMoneyPayment,
  validatePaymentVerification,
} from '../middleware/paymentValidation';

const router = express.Router();

// Public routes
router.get('/pricing', optionalAuth, getPricingPlans);

// Protected routes
router.use(authenticate);

// Stripe payment routes
router.post('/stripe/create-intent', validateStripePayment, createStripePaymentIntent);
router.post('/stripe/confirm', confirmStripePayment);

// Flutterwave payment routes
router.post('/flutterwave/create', validateFlutterwavePayment, createFlutterwavePayment);
router.post('/flutterwave/verify', validatePaymentVerification, verifyFlutterwavePayment);

// Airtel Money routes
router.post('/airtel-money/stk', validateAirtelMoneyPayment, initiateAirtelMoneySTK);

// Payment management
router.get('/history', getPaymentHistory);
router.get('/subscription-status', getSubscriptionStatus);

export default router;