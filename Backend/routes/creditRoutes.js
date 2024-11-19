import express from 'express';
import {
    createCredit,
    getAllCredits,
    getCreditById,
    updateCredit,
    deleteCredit,
    updateCreditStatuswithEmail,
    getCreditPercentagesByType,
    deleteMultipleCredits
} from '../controllers/creditController.js';

const router = express.Router();

router.post('/', createCredit);
router.get('/percentages-by-type', getCreditPercentagesByType);

router.get('/', getAllCredits);
router.get('/:id', getCreditById);
router.put('/:id', updateCredit);   
router.put('/status/:id', updateCreditStatuswithEmail);   
router.delete('/:id', deleteCredit);
router.delete('/', deleteMultipleCredits);


export default router;
