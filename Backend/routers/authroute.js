const express = require('express');
const router = express.Router();



const authController = require('../controllers/authcontroller');

const PostController = require('../controllers/postcontroller');
const { identifier } = require('../middlewares/identification');

const upload= require('../middlewares/upload')

//const path = require('path');

const app = express();




router.post('/RegisterForm', authController.register);
router.post('/Login', authController.signin);

router.patch('/forgot-password',authController.sendForgotPasswordCode);
router.patch('/verify-forgot-password-code',authController.verifyForgotPasswordCode);


//Show  Profile
router.get('/profile',identifier, PostController.profile);
//Hiring
router.post('/submit',identifier, PostController.submit);
//Current Jobs
router.get('/Show_Works',identifier, PostController.Show_Works);
//For  Profile Update
router.patch('/UpdateProfile',upload.single("profileImage"),identifier, PostController.UpdateProfile);


//Notification
router.get('/Available_Jobs', PostController.Available_Jobs);


module.exports = router;