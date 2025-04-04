import express from 'express';
import {signup,login,getUser} from '../Controller/User.Controller.js';      

const router = express.Router();

// Authentication routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/getUser',getUser)

export default router;