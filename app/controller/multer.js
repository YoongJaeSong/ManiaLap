const multer = require('multer');
const path = require('path');

// imagae 저장시 어디에 저장할지 정하는 코드
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file != null)
            cb(null, __dirname + '/../../public/uploads/');
    },
    filename: (req, file, cb) => {
        if (file != null) {
            const extension = path.extname(file.originalname);
            const basename = path.basename(file.originalname, extension);
            cb(null, basename + '-' + Date.now() + extension);
        }
    }
});

const upload = multer({
    storage: storage,
    limits: {}
});

exports.uploads = upload.single('image');