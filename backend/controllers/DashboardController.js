const Event = require("../models/Events");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports = {
  getEventById(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { eventId } = req.params;
        console.log(eventId);
        try {
          const events = await Event.findById(eventId);

          if (events) {
            return res.json({ authData, events });
          }
        } catch (error) {
          return res.status(400).json({ message: "EventId does not exist!" });
        }
      }
    });
  },
  getAllEvents(req, res) {
    // console.log("token:" + req.token);
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const { eventType } = req.params;
        const query = eventType ? { eventType } : {};

        try {
          const events = await Event.find(query);

          if (events) {
            return res.json({ authData, events });
          }
        } catch (error) {
          return res
            .status(400)
            .json({ message: "We do not have any events yet" });
        }
      }
    });
  },
  getEventsByUserId(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const { user_id } = req.headers;

        try {
          const events = await Event.find({ user: authData.user._id });

          if (events) {
            return res.json({ authData, events });
          }
        } catch (error) {
          return res
            .status(400)
            .json({
              message: `We do have any events with the user_id ${user_id}`,
            });
        }
      }
    });
  },
};
