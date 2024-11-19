import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByUserId
} from '../controllers/TaskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.get('/user/:userId', getTasksByUserId); 
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;