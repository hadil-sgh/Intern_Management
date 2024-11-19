import express from 'express';
import {
    createRepaymentPlan,
    getAllRepaymentPlans,
    getRepaymentPlanById,
    updateRepaymentPlan,
    deleteRepaymentPlan
} from '../controllers/repaymentPlanController.js';

const router = express.Router();

router.post('/', createRepaymentPlan);
router.get('/', getAllRepaymentPlans);
router.get('/:id', getRepaymentPlanById);
router.put('/:id', updateRepaymentPlan);
router.delete('/:id', deleteRepaymentPlan);

export default router;
