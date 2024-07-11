import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the uploads directory exists
const ensureUploadsDir = () => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        ensureUploadsDir();
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Images only (jpeg, jpg, png, gif)!'));
    }
};


const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

export default upload;
