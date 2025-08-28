import { Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { PaymentService } from '../utils/paymentService';

const paymentService = PaymentService.getInstance();

// @desc    Create Stripe payment intent
// @route   POST /api/payments/stripe/create-intent
// @access  Private
export const createStripePaymentIntent = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }

  const { amount, currency, type } = req.body;
  const userId = req.userId!;
  const userEmail = req.user!.email;

  try {
    const result = await paymentService.createStripePaymentIntent(
      amount,
      currency,
      userId,
      type,
      userEmail
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent',
    });
  }
});

// @desc    Confirm Stripe payment
// @route   POST /api/payments/stripe/confirm
// @access  Private
export const confirmStripePayment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    return res.status(400).json({
      success: false,
      message: 'Payment intent ID is required',
    });
  }

  try {
    const success = await paymentService.confirmStripePayment(paymentIntentId);

    if (success) {
      res.json({
        success: true,
        message: 'Payment confirmed successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment confirmation failed',
      });
    }
  } catch (error) {
    console.error('Error confirming Stripe payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to confirm payment',
    });
  }
});

// @desc    Create Flutterwave payment
// @route   POST /api/payments/flutterwave/create
// @access  Private
export const createFlutterwavePayment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }

  const { amount, currency, type, customerName, phoneNumber } = req.body;
  const userId = req.userId!;
  const userEmail = req.user!.email;

  try {
    const result = await paymentService.createFlutterwavePayment(
      amount,
      currency,
      userId,
      type,
      userEmail,
      customerName,
      phoneNumber
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error creating Flutterwave payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment',
    });
  }
});

// @desc    Verify Flutterwave payment
// @route   POST /api/payments/flutterwave/verify
// @access  Private
export const verifyFlutterwavePayment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { transactionId } = req.body;

  if (!transactionId) {
    return res.status(400).json({
      success: false,
      message: 'Transaction ID is required',
    });
  }

  try {
    const success = await paymentService.verifyFlutterwavePayment(transactionId);

    if (success) {
      res.json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying Flutterwave payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
    });
  }
});

// @desc    Initiate Airtel Money STK Push
// @route   POST /api/payments/airtel-money/stk
// @access  Private
export const initiateAirtelMoneySTK = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(),
    });
  }

  const { amount, phoneNumber, customerName } = req.body;
  const userId = req.userId!;
  const userEmail = req.user!.email;

  try {
    const result = await paymentService.initiateAirtelMoneySTK(
      amount,
      phoneNumber,
      userId,
      userEmail,
      customerName
    );

    res.json({
      success: true,
      message: 'STK push initiated. Please check your phone and enter your PIN.',
      data: result,
    });
  } catch (error) {
    console.error('Error initiating Airtel Money STK:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate payment',
    });
  }
});

// @desc    Get payment history
// @route   GET /api/payments/history
// @access  Private
export const getPaymentHistory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const result = await paymentService.getUserPaymentHistory(userId, page, limit);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment history',
    });
  }
});

// @desc    Get pricing plans
// @route   GET /api/payments/pricing
// @access  Public
export const getPricingPlans = asyncHandler(async (req: AuthRequest, res: Response) => {
  const plans = [
    {
      id: 'one-time',
      name: '24-Hour Access Pass',
      description: 'Perfect for immediate needs',
      price: 2,
      currency: 'USD',
      duration: '24 hours',
      features: [
        'Unlimited resume building',
        'PDF download',
        'Email sharing',
        'Basic templates',
        'AI content suggestions',
      ],
      popular: false,
    },
    {
      id: 'monthly',
      name: 'Monthly Plan',
      description: 'Best value for job seekers',
      price: 5,
      currency: 'USD',
      duration: '1 month',
      features: [
        'Everything in 24-hour pass',
        'Unlimited downloads',
        'Priority AI suggestions',
        'Advanced templates',
        'Email support',
        'ATS optimization',
      ],
      popular: true,
    },
  ];

  res.json({
    success: true,
    data: {
      plans,
    },
  });
});

// @desc    Check subscription status
// @route   GET /api/payments/subscription-status
// @access  Private
export const getSubscriptionStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = req.user!;

  const subscriptionStatus = {
    hasActiveSubscription: user.hasActiveSubscription(),
    subscription: user.subscription || null,
    daysRemaining: 0,
  };

  if (user.subscription?.expiresAt) {
    const now = new Date();
    const expiresAt = new Date(user.subscription.expiresAt);
    const timeDiff = expiresAt.getTime() - now.getTime();
    subscriptionStatus.daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
  }

  res.json({
    success: true,
    data: subscriptionStatus,
  });
});