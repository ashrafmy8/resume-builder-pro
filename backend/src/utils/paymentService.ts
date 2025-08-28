import Stripe from 'stripe';
import axios from 'axios';
import Payment, { IPayment } from '../models/Payment';
import User from '../models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export class PaymentService {
  private static instance: PaymentService;

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  // Stripe payment methods
  async createStripePaymentIntent(
    amount: number,
    currency: string,
    userId: string,
    type: 'one-time' | 'monthly',
    customerEmail: string
  ): Promise<{ clientSecret: string; paymentIntentId: string; transactionId: string }> {
    try {
      // Create or retrieve customer
      const customers = await stripe.customers.list({
        email: customerEmail,
        limit: 1,
      });

      let customer: Stripe.Customer;
      if (customers.data.length > 0) {
        customer = customers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: customerEmail,
        });
      }

      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        customer: customer.id,
        metadata: {
          userId,
          type,
        },
      });

      // Save payment record
      const transactionId = `stripe_${paymentIntent.id}_${Date.now()}`;
      
      await Payment.create({
        userId,
        type,
        amount,
        currency: currency.toUpperCase(),
        status: 'pending',
        paymentMethod: 'stripe',
        transactionId,
        paymentIntentId: paymentIntent.id,
        metadata: {
          customerEmail,
          customerName: '', // Will be updated when payment is confirmed
        },
      });

      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
        transactionId,
      };
    } catch (error) {
      console.error('Stripe payment intent creation error:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  async confirmStripePayment(paymentIntentId: string): Promise<boolean> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded') {
        // Update payment record
        const payment = await Payment.findOne({ paymentIntentId });
        if (payment) {
          payment.status = 'completed';
          await payment.save();

          // Update user subscription
          await this.updateUserSubscription(
            payment.userId,
            payment.type,
            payment.transactionId
          );
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Stripe payment confirmation error:', error);
      return false;
    }
  }

  // Flutterwave payment methods
  async createFlutterwavePayment(
    amount: number,
    currency: string,
    userId: string,
    type: 'one-time' | 'monthly',
    customerEmail: string,
    customerName: string,
    phoneNumber?: string
  ): Promise<{ paymentLink: string; transactionId: string; flutterwaveRef: string }> {
    try {
      const transactionId = `flutterwave_${Date.now()}_${userId}`;
      const flutterwaveRef = `RBPRO_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const paymentData = {
        tx_ref: flutterwaveRef,
        amount,
        currency: currency.toUpperCase(),
        payment_options: 'mobilemoney,card,ussd',
        customer: {
          email: customerEmail,
          name: customerName,
          phonenumber: phoneNumber || '',
        },
        customizations: {
          title: 'Resume Builder Pro',
          description: type === 'one-time' ? '24-Hour Access Pass' : 'Monthly Subscription',
          logo: `${process.env.FRONTEND_URL}/logo.png`,
        },
        redirect_url: `${process.env.FRONTEND_URL}/payment/callback`,
        meta: {
          userId,
          type,
          transactionId,
        },
      };

      const response = await axios.post(
        'https://api.flutterwave.com/v3/payments',
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 'success') {
        // Save payment record
        await Payment.create({
          userId,
          type,
          amount,
          currency: currency.toUpperCase(),
          status: 'pending',
          paymentMethod: 'flutterwave',
          transactionId,
          flutterwaveRef,
          metadata: {
            customerEmail,
            customerName,
            phone: phoneNumber,
          },
        });

        return {
          paymentLink: response.data.data.link,
          transactionId,
          flutterwaveRef,
        };
      } else {
        throw new Error('Failed to create Flutterwave payment');
      }
    } catch (error) {
      console.error('Flutterwave payment creation error:', error);
      throw new Error('Failed to create Flutterwave payment');
    }
  }

  async verifyFlutterwavePayment(transactionId: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
        {
          headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          },
        }
      );

      if (response.data.status === 'success' && response.data.data.status === 'successful') {
        // Update payment record
        const payment = await Payment.findOne({ flutterwaveRef: transactionId });
        if (payment) {
          payment.status = 'completed';
          await payment.save();

          // Update user subscription
          await this.updateUserSubscription(
            payment.userId,
            payment.type,
            payment.transactionId
          );
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Flutterwave payment verification error:', error);
      return false;
    }
  }

  // Airtel Money STK Push (via Flutterwave)
  async initiateAirtelMoneySTK(
    amount: number,
    phoneNumber: string,
    userId: string,
    customerEmail: string,
    customerName: string
  ): Promise<{ transactionId: string; reference: string }> {
    try {
      const transactionId = `airtel_${Date.now()}_${userId}`;
      const reference = `RBPRO_STK_${Date.now()}`;

      // Using Flutterwave's Mobile Money for Airtel
      const paymentData = {
        tx_ref: reference,
        amount,
        currency: 'UGX', // or appropriate currency for Airtel Money
        email: customerEmail,
        phone_number: phoneNumber,
        fullname: customerName,
      };

      const response = await axios.post(
        'https://api.flutterwave.com/v3/charges?type=mobile_money_uganda',
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 'success') {
        // Save payment record
        await Payment.create({
          userId,
          type: 'one-time',
          amount,
          currency: 'UGX',
          status: 'pending',
          paymentMethod: 'flutterwave',
          transactionId,
          flutterwaveRef: reference,
          metadata: {
            customerEmail,
            customerName,
            phone: phoneNumber,
          },
        });

        return {
          transactionId,
          reference,
        };
      } else {
        throw new Error('Failed to initiate Airtel Money payment');
      }
    } catch (error) {
      console.error('Airtel Money STK initiation error:', error);
      throw new Error('Failed to initiate Airtel Money payment');
    }
  }

  private async updateUserSubscription(
    userId: string,
    type: 'one-time' | 'monthly',
    transactionId: string
  ): Promise<void> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const now = new Date();
      let expiresAt: Date;

      if (type === 'one-time') {
        expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
      } else {
        expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
      }

      user.subscription = {
        type,
        status: 'active',
        expiresAt,
        paymentMethod: transactionId.startsWith('stripe') ? 'stripe' : 'flutterwave',
        transactionId,
      };

      await user.save();
    } catch (error) {
      console.error('Error updating user subscription:', error);
      throw error;
    }
  }

  async getUserPaymentHistory(userId: string, page: number = 1, limit: number = 10): Promise<{
    payments: IPayment[];
    pagination: { current: number; pages: number; total: number };
  }> {
    try {
      const skip = (page - 1) * limit;
      
      const payments = await Payment.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-__v');

      const total = await Payment.countDocuments({ userId });

      return {
        payments,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
        },
      };
    } catch (error) {
      console.error('Error fetching payment history:', error);
      throw error;
    }
  }
}