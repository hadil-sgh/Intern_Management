import express from 'express';
import {
  createPerformance,
  getAllPerformances,
  getPerformanceById,
  updatePerformance,
  deletePerformance,
  getPerformancesByUserId
} from '../controllers/PerformanceController.js';

const router = express.Router();

router.post('/', createPerformance);
router.get('/', getAllPerformances);
router.get('/:id', getPerformanceById);
router.get('/user/:userId', getPerformancesByUserId); 
router.put('/:id', updatePerformance);
router.delete('/:id', deletePerformance);

export default router;
