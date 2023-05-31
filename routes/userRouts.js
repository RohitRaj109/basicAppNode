import express from 'express';
const router = express.Router();
import UserController from '../controller/userController.js';
import checkUserAuth from '../middleware/auth.js';
// route level middleware 
router.use('/loggedUser',checkUserAuth)

// public routes --bina login ke use hoga
router.post('/register', UserController.userRegistration)
router.post('/login',UserController.userLogin)

// private routes
router.get('/loggedUser',UserController.loggedUser)
export default router