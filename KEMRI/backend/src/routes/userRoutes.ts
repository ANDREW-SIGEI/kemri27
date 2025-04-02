import express from 'express';
import { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  updatePassword 
} from '../controllers/userController';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();

// Apply authentication middleware to all user routes
router.use(authenticateToken);

// User routes
router.get('/', isAdmin, getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.patch('/:id/password', updatePassword);

export default router; 