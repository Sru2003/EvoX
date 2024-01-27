const multer = require("multer");
const UserController = require("../controllers/UserController");
const EventController = require("../controllers/EventController");
const DashboardController = require("../controllers/DashboardController");
const verifyToken = require("../config/verifyToken");

const RegistrationController = require("../controllers/RegistrationController");
const ApprovalController = require("../controllers/ApprovalController");
const RejectionController = require("../controllers/RejectionController");

const express = require ('express')
const router = express.Router()
//const { registerUser,loginUser,getMe } = require('../controllers/userControllers')
//const { protect } = require('../middleware/authMiddleware')

// router.post('/',registerUser)
// router.post('/login',loginUser)
// router.get('/me',protect,getMe)



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
  
  
  //Dashboard
  router.get("/", verifyToken, DashboardController.getAllEvents);
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
    EventController.createEvent
  );
  router.delete("/event/:eventId", verifyToken, EventController.delete);
  
  //User
  // router.post("/user/register", UserController.createUser);
  // router.get("/user/:userId", UserController.getUserById);
  
  //Get Event Details
  router.get(
    "/events/details/:eventId",
    verifyToken,
    EventController.getEventDetails
  );
module.exports = router