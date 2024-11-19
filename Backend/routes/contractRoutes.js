import express from 'express';
import {
    createContract,
    getAllContracts,
    getContractById,
    updateContract,
    deleteContract,
    generateContractPdf
} from '../controllers/contractController.js';

const router = express.Router();

router.post('/', createContract);
router.get('/', getAllContracts);
router.get('/:id/pdf', generateContractPdf); 
router.get('/:id', getContractById);
router.put('/:id', updateContract);
router.delete('/:id', deleteContract);

export default router;
