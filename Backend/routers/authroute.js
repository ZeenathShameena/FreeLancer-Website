const express = require('express');
const router = express.Router();



const authController = require('../controllers/authcontroller');

const Freelancer = require('../controllers/Freelancercontroller');
const client = require('../controllers/clientcontroller');

const { identifier } = require('../middlewares/identification');

const upload= require('../middlewares/upload')

//const path = require('path');

const app = express();




router.post('/RegisterForm', authController.register);
router.post('/Login', authController.signin);

router.patch('/forgot-password',authController.sendForgotPasswordCode);
router.patch('/verify-forgot-password-code',authController.verifyForgotPasswordCode);


//Show Client Profile
router.get('/profile',identifier, client.profile);
//Hiring
router.post('/submit',identifier, client.submit);
//Active Jobs
router.get('/Show_Works',identifier, client.Show_Works);
//Completed Jobs
router.get('/completed',identifier, client.completed);
//Update Status in client
router.put('/updateStatus/:id', client.updateStatus);
//To assign job to freelancer
router.patch('/assign', client.assign);



//For Profile Update
router.patch('/UpdateProfile',identifier,upload.single("profileImage"), Freelancer.UpdateProfile);




//Show Freelancer Profile
router.get('/Fprofile',identifier, Freelancer.profile);
//Completed jobs in freelancer
router.get('/Fcompleted', identifier, Freelancer.completed);
//Current jobs in freelancer
router.get('/currentJobs', identifier, Freelancer.currentJobs);
//Applied jobs in freelancer
router.get('/Applied_Jobs', identifier, Freelancer.Applied_Jobs);
//Notification
router.get('/Available_Jobs',identifier, Freelancer.Available_Jobs);
//To apply Job
router.post('/applyJob', identifier, Freelancer.applyJob);

module.exports = router;