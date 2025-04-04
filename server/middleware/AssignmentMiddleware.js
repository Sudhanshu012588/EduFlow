import multer from 'multer';

// Set up Multer storage to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('assignment'); // 'assignment' is the field name in the form

export default upload;
