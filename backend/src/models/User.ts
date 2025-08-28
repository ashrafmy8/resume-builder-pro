import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  provider: 'email' | 'google';
  googleId?: string;
  avatar?: string;
  subscription?: {
    type: 'none' | 'one-time' | 'monthly';
    status: 'active' | 'expired' | 'cancelled';
    expiresAt?: Date;
    paymentMethod?: 'stripe' | 'flutterwave';
    transactionId?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  hasActiveSubscription(): boolean;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function(this: IUser) {
      return this.provider === 'email';
    },
    minlength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  provider: {
    type: String,
    enum: ['email', 'google'],
    default: 'email',
  },
  googleId: {
    type: String,
    sparse: true,
  },
  avatar: {
    type: String,
  },
  subscription: {
    type: {
      type: String,
      enum: ['none', 'one-time', 'monthly'],
      default: 'none',
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled'],
      default: 'expired',
    },
    expiresAt: Date,
    paymentMethod: {
      type: String,
      enum: ['stripe', 'flutterwave'],
    },
    transactionId: String,
  },
}, {
  timestamps: true,
});

// Index for performance
UserSchema.index({ email: 1 });
UserSchema.index({ googleId: 1 });
UserSchema.index({ 'subscription.status': 1, 'subscription.expiresAt': 1 });

// Pre-save middleware to hash password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  if (this.password) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to check if user has active subscription
UserSchema.methods.hasActiveSubscription = function(): boolean {
  if (!this.subscription) return false;
  
  const { type, status, expiresAt } = this.subscription;
  
  if (status !== 'active') return false;
  
  if (type === 'one-time' || type === 'monthly') {
    if (expiresAt && new Date() > expiresAt) {
      return false;
    }
  }
  
  return true;
};

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model<IUser>('User', UserSchema);