import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { getAllUsersHandler, getCurrentUser } from '../controllers/userController.js';

const router = express.Router();
router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/me', authenticate, getCurrentUser);

export default router;