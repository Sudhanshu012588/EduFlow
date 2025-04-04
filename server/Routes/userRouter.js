import express from 'express';
import { signup, login, getUser } from '../Controllers/UserController.js';
import { uploadAssignment } from '../Controllers/AssignmentController.js';
import multer from 'multer';
// Set up Multer storage to store files in memory
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage }).single('assignment'); // 'assignment' is the name of the input field in your form

const router = express.Router();

// Authentication routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/getUser', getUser);

// Upload assignment route
router.post('/uploadAssignment', upload, uploadAssignment); // Use 'upload' middleware here

export default router;
