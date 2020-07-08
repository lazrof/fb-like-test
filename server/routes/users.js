const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController');

router.route('/')
	.get(
		userController.show
	)
  	.post(
		userController.create,
		authController.generateToken,
		authController.sendToken
  	);

module.exports = router;
