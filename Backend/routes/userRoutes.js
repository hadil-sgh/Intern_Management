import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

export default router;
