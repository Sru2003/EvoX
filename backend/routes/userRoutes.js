const multer = require("multer");
const UserController = require("../controllers/UserController");
const EventController = require("../controllers/EventController");
const DashboardController = require("../controllers/DashboardController");
const verifyToken = require("../config/verifyToken");
//const LoginController = require("../controllers/LoginController");
const RegistrationController = require("../controllers/RegistrationController");
const ApprovalController = require("../controllers/ApprovalController");
const RejectionController = require("../controllers/RejectionController");

const express = require ('express')
const router = express.Router()
const { registerUser,loginUser,getMe } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)


module.exports = router