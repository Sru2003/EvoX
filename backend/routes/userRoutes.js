
const express = require ('express')
const router = express.Router()
const { registerUser,loginUser,getMe } = require('../controllers/userControllers')
const { protect } = require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)

const multer = require("multer");


const EventController = require("../controllers/EventController");
const DashboardController = require("../controllers/DashboardController");


const RegistrationController = require("../controllers/RegistrationController");
const ApprovalController = require("../controllers/ApprovalController");
const RejectionController = require("../controllers/RejectionController");


router.get("/status", (req, res) => {
  res.send({ status: 200 });
});
//Endpoints:

//Registration(for events)
router.post("/registration/:eventId", protect, RegistrationController.create);
router.get(
  "/registration",
  protect,
  RegistrationController.getMyRegistrations
);
router.get(
  "/event/participants/:eventId",
  protect,
  RegistrationController.getEventParticipants
);
router.get(
  "/registration/:registrationId",
  protect,
  RegistrationController.getRegistration
);
//Approve
router.post(
  "/registration/:registrationId/approval",
  protect,
  ApprovalController.approval
);
//Reject
router.post(
  "/registration/:registrationId/rejection",
  protect,
  RejectionController.rejection
);

// //Login Controller
// router.post("/login", LoginController.store);

//Dashboard
router.get("/dashboard", protect, DashboardController.getAllEvents);
router.get(
  "/dashboard/:eventType",
  protect,
  DashboardController.getAllEvents
);
router.get("/user/events", protect, DashboardController.getEventsByUserId);
router.get("/event/:eventId", protect, DashboardController.getEventById);

//Event
router.post(
  "/event",
  protect,
  // uploadToS3.single("thumbnail"),
  EventController.createEvent
);
router.delete("/event/:eventId", protect, EventController.delete);

// //User
// router.post("/user/register", UserController.createUser);
// router.get("/user/:userId", UserController.getUserById);

//Get Event Details
router.get(
  "/events/details/:eventId",
  protect,
  EventController.getEventDetails
);

module.exports = router