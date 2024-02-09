
const express = require ('express')
const router = express.Router()
//const { registerUser,loginUser,getMe } = require('../controllers/userControllers')
const verifyToken = require('../config/verifyToken')

// router.post('/',registerUser)
// router.post('/login',loginUser)
// router.get('/me',verifyToken,getMe)

const multer = require("multer");
const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);

const EventController = require("../controllers/EventController");
const DashboardController = require("../controllers/DashboardController");
const LoginController = require("../controllers/LoginController");
const UserController = require("../controllers/UserController");

const RegistrationController = require("../controllers/RegistrationController");
const ApprovalController = require("../controllers/ApprovalController");
const RejectionController = require("../controllers/RejectionController");


router.get("/status", (req, res) => {
  res.send({ status: 200 });
});
//Endpoints:

//Registration(for events)
router.post("/registration/:eventId", verifyToken, RegistrationController.create);
router.get(
  "/registration",
  verifyToken,
  RegistrationController.getMyRegistrations
);
router.get(
  "/event/participants/:eventId",
  verifyToken,
  RegistrationController.getEventParticipants
);
router.get(
  "/registration/:registrationId",
  verifyToken,
  RegistrationController.getRegistration
);
//Approve
router.post(
  "/registration/:registrationId/approval",
  verifyToken,
  ApprovalController.approval
);
//Reject
router.post(
  "/registration/:registrationId/rejection",
  verifyToken,
  RejectionController.rejection
);

//Login Controller
router.post("/login", LoginController.store);

//Dashboard
router.get("/dashboard", verifyToken, DashboardController.getAllEvents);
router.get(
  "/dashboard/:eventType",
  verifyToken,
  DashboardController.getAllEvents
);
router.get("/user/events", verifyToken, DashboardController.getEventsByUserId);
router.get("/event/:eventId", verifyToken, DashboardController.getEventById);

//Event
router.post(
  "/event",
  verifyToken,
  // uploadToS3.single("thumbnail"),
  EventController.createEvent
);
router.delete("/event/:eventId", verifyToken, EventController.delete);

//User
router.post("/user/register", UserController.createUser);
router.get("/user/:userId", UserController.getUserById);

//Get Event Details
router.get(
  "/events/details/:eventId",
  verifyToken,
  EventController.getEventDetails
);

module.exports = router