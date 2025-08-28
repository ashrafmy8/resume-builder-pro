import express from 'express';
import {
  generateBulletPoints,
  improveText,
  generateSummary,
  suggestSkills,
  optimizeForATS,
  getUsageStats,
} from '../controllers/aiController';
import { authenticate } from '../middleware/auth';
import {
  validateBulletPoints,
  validateImproveText,
  validateGenerateSummary,
  validateSuggestSkills,
  validateOptimizeATS,
} from '../middleware/aiValidation';

const router = express.Router();

// All AI routes require authentication
router.use(authenticate);

// AI content generation routes
router.post('/bullet-points', validateBulletPoints, generateBulletPoints);
router.post('/improve-text', validateImproveText, improveText);
router.post('/generate-summary', validateGenerateSummary, generateSummary);
router.post('/suggest-skills', validateSuggestSkills, suggestSkills);
router.post('/optimize-ats', validateOptimizeATS, optimizeForATS);

// Usage statistics
router.get('/usage', getUsageStats);

export default router;