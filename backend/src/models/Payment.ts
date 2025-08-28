import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  _id: string;
  userId: string;
  type: 'one-time' | 'monthly';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'stripe' | 'flutterwave';
  transactionId: string;
  paymentIntentId?: string; // For Stripe
  flutterwaveRef?: string; // For Flutterwave
  metadata?: {
    customerEmail: string;
    customerName: string;
    phone?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
  type: {
    type: String,
    enum: ['one-time', 'monthly'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
    uppercase: true,
    default: 'USD',
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'flutterwave'],
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  paymentIntentId: {
    type: String,
    sparse: true,
  },
  flutterwaveRef: {
    type: String,
    sparse: true,
  },
  metadata: {
    customerEmail: { type: String, required: true },
    customerName: { type: String, required: true },
    phone: String,
  },
}, {
  timestamps: true,
});

// Indexes for performance
PaymentSchema.index({ userId: 1, createdAt: -1 });
PaymentSchema.index({ transactionId: 1 });
PaymentSchema.index({ paymentIntentId: 1 });
PaymentSchema.index({ flutterwaveRef: 1 });
PaymentSchema.index({ status: 1 });

export default mongoose.model<IPayment>('Payment', PaymentSchema);