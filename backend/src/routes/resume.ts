import express from 'express';
import {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
  getTemplates,
} from '../controllers/resumeController';
import { authenticate, optionalAuth } from '../middleware/auth';
import { validateResume, validateResumeUpdate } from '../middleware/resumeValidation';

const router = express.Router();

// Public routes
router.get('/templates', optionalAuth, getTemplates);

// Protected routes
router.get('/', authenticate, getResumes);
router.get('/:id', authenticate, getResume);
router.post('/', authenticate, validateResume, createResume);
router.put('/:id', authenticate, validateResumeUpdate, updateResume);
router.delete('/:id', authenticate, deleteResume);
router.post('/:id/duplicate', authenticate, duplicateResume);

export default router;