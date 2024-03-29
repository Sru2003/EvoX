const Registration = require("../models/Registration");
const jwt = require('jsonwebtoken');

module.exports = {
  rejection(req, res) {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const { registrationId } = req.params;
        try {
          const registration = await Registration.findById(registrationId);
          registration.approved = false;
          await registration.save();
          return res.json(registration);
        } catch (error) {
          return res.status(400).json(error);
        }
      }
    })
  },
};
