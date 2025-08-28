import { Request, Response, NextFunction } from 'express';
import passport from '../config/passport';
import { generateToken } from '../utils/jwt';
import { asyncHandler } from '../middleware/errorHandler';

// @desc    Google OAuth initiate
// @route   GET /api/auth/google
// @access  Public
export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
export const googleCallback = [
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed`,
    session: false 
  }),
  asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as any;
    
    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
    }

    // Generate JWT token
    const token = generateToken(user);

    // Redirect to frontend with token
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${token}`;
    res.redirect(redirectUrl);
  })
];

// @desc    Link Google account to existing user
// @route   POST /api/auth/link-google
// @access  Private
export const linkGoogleAccount = asyncHandler(async (req: Request, res: Response) => {
  // This would be implemented if you want to allow users to link Google after signup
  res.json({
    success: true,
    message: 'Google account linking not implemented yet',
  });
});

// @desc    Unlink Google account
// @route   DELETE /api/auth/unlink-google
// @access  Private
export const unlinkGoogleAccount = asyncHandler(async (req: Request, res: Response) => {
  // This would be implemented if you want to allow users to unlink Google
  res.json({
    success: true,
    message: 'Google account unlinking not implemented yet',
  });
});