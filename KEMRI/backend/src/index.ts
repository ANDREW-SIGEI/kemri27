import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes';
import documentRoutes from './routes/documentRoutes';
import userRoutes from './routes/userRoutes';
import { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  updatePassword 
} from './controllers/userController';
import { authenticateToken, isAdmin } from './middleware/auth';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Export Prisma client for use in controllers
export const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('KEMRI Document Management System API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle application shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Disconnected from database');
  process.exit(0);
});

const router = express.Router();

// Apply authentication middleware to all user routes
router.use(authenticateToken);

// User routes
router.get('/', isAdmin, getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.patch('/:id/password', updatePassword);

export default router; 