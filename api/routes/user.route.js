import express from 'express';
import userController from '../controller/user.controller.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getUsers); // <-- Adicione esta linha

export default router;