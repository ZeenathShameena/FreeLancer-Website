const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

const PostController = require('../controllers/postcontroller');
const { identifier } = require('../middlewares/identification');



const path = require('path');

const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb){
		cb(null, path.join(__dirname, '../files'));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now();
		cb(null, uniqueSuffix + file.originalname);
	},
});
const upload = multer({ storage: storage });



router.post('/RegisterForm', authController.register);
router.post('/Login', authController.signin);

router.patch('/forgot-password',authController.sendForgotPasswordCode);
router.patch('/verify-forgot-password-code',authController.verifyForgotPasswordCode);


router.post('/submit',upload.single("jobFile"), authController.submit);
router.post('/post', PostController.post);
router.get('/AddData', PostController.AddData);


router.get('/Show_Works', authController.Show_Works);


module.exports = router;