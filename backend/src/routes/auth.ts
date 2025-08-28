import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  verifyToken,
} from '../controllers/authController';
import {
  googleAuth,
  googleCallback,
  linkGoogleAccount,
  unlinkGoogleAccount,
} from '../controllers/googleAuthController';
import { authenticate } from '../middleware/auth';
import {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
} from '../middleware/validation';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Google OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

// Protected routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validateUpdateProfile, updateProfile);
router.put('/change-password', authenticate, validateChangePassword, changePassword);
router.get('/verify', authenticate, verifyToken);

// Google OAuth protected routes
router.post('/link-google', authenticate, linkGoogleAccount);
router.delete('/unlink-google', authenticate, unlinkGoogleAccount);

export default router;