const { json } = require("express");
const Registration = require("../models/Registration");
const jwt = require('jsonwebtoken');
const Events = require("../models/Events");
const Razorpay = require('razorpay');
const crypto=require('crypto')
const nodemailer = require('nodemailer');
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})
module.exports = {
  async create(req, res) {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const user_id = authData.user._id;
        const { eventId } = req.params;
        var date = new Date();
        date = date.toDateString();

        const registration = await Registration.create({
          date: date,
          user: user_id,
          event: eventId,  
        });

        // await registration
        //   .populate("event")
        //   .populate("user", "-password")
        //   .execPopulate();

await registration.populate("event")
const populatedRegistration = await registration.populate("user", "-password")


console.log(populatedRegistration);

        registration.owner = registration.event.user;
        registration.eventTitle = registration.event.title;
        registration.eventPrice = registration.event.price;
        registration.eventDate = registration.event.date;
        registration.userEmail = registration.user.email;
        registration.approved=true;
        registration.save();


        const options = {
          amount: Number(registration.eventPrice)*100,  // amount in the smallest currency unit
          currency: "INR",
        };
        // const order=await instance.orders.create(options); 
        // // console.log('Hi from me!!!')

        const templateParams = {
          // to_name: 'Client Name',
          to_email:registration.user.email,
          event_title: registration.event.title,
          event_date: registration.event.date,
          event_id: registration.event.eventId,
          event_price: registration.event.price,
          // email_id: 
        };
      
        // emailjs.send('service_b5vtsat', 'template_cew2b18', templateParams)
        //   .then((response) => {
        //     console.log('Email sent:', response);
        //     res.send({ success: true });
        //   })
        //   .catch((error) => {
        //     console.error('Error sending email:', error);
        //     res.status(500).send({ success: false, error: 'Failed to send email' });
        //   });
        //  console.log(order);
          

        //  return res.status(200).json({ registration, order });
        try {
          const order = await instance.orders.create(options); 
          console.log('Order created:', order);
        
// Emailjs logic 

          // Return response
          return res.status(200).json({ registration, order });
        } catch (error) {
          console.error('Error creating order:', error);
          // Handle error appropriately
          return res.status(500).json({ success: false, error: 'Failed to create order' });
        }
        
      }
    })
  },

  async sendMail(req, res) {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
      res.sendStatus(401);
      } else {
      try {
        const {registrationId} = req.params;
        const registration= req.headers.registration;
        console.log(registration);
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
    port: 465,
    secure: true,
        auth: {
          user: 'srupednekar15@gmail.com',
          pass: 'blkpchdculgdukrg'
        }
        });

        // Define the email options
        const mailOptions = {
        from: 'srupednekar15@gmail.com',
        to: registration.user.email,
        subject: 'Successful Registration',
        text: `Dear User, 
Thanks for registering for the event ${registration.event.title}.
Event Tile: ${registration.event.title}
Event Date: ${registration.event.date}
Event Price: ${registration.event.price}
Event Link: https://evox-app.render.com/room/${registration.event.eventId}
Regards,
Team EvoX`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send({ success: false, error: 'Failed to send email' });
        } else {
          console.log('Email sent:', info.response);
          res.send({ success: true });
        }
        });
      } catch (error) {
        console.error('Error creating transporter:', error);
        res.status(500).send({ success: false, error: 'Failed to create transporter' });
      }
      }
    });
  },
 async paymentVerification(req, res) {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.sendStatus(401);
    } else {
      try {
        const { eventId } = req.params;
    const{razorpay_order_id,
    razorpay_payment_id,
  razorpay_signature}=req.body;
  const sign= razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSign= crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
  .update(sign.toString())
  .digest("hex");
  if(razorpay_signature == expectedSign){
   
    const registrationArr = await Registration.find({ "user": authData.user });
    let populatedRegistration = null;
    
    for (const registration of registrationArr) {
        if (registration.event._id === eventId) {
            populatedRegistration = await registration.populate("event").populate("user", "-password");
            break; // Once found, exit the loop
        }
    }
console.log('hi')
    console.log(populatedRegistration);

    return res.status(200).json({message:"Payment verified successfully"});
  }else{
    return res.status(400).json({message:"Invalid signature sent!"});
  }
  } catch (error) {
    console.log(error)
    res.status(500).json(({message:"Internal Server Error!"}))
  }
}
  })
 },
  async getRegistration(req, res) {
    const { registrationId } = req.params;
    console.log(req.params);
    try {
      const registration = await Registration.findById(registrationId);
      await registration
        .populate("event")
        .populate("user", "-password")
        
      return res.json(registration);
    } catch (error) {
      return res.send(400).send(json({ message: "Registration not found" }));
    }
  },

  getMyRegistrations(req, res) {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        try {
          const registrationArr = await Registration.find({ "owner": authData.user._id });
          if (registrationArr) {
            return res.json(registrationArr);
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
  },
  // getMyRegistrations(req, res) {
  //   jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
  //     if (err) {
  //       res.sendStatus(401);
  //     } else {
  //       try {
  //         const registrationArr = await Registration.find({ "owner": authData.user._id });
  //         const populatedRegistrations = await Promise.all(registrationArr.map(async (registration) => {
  //           return await registration.populate("event").populate("user", "-password").execPopulate();
  //         }));
  
  //         return res.json(populatedRegistrations);
  //       } catch (error) {
  //         console.log(error);
  //         res.status(500).json({ error: "Internal Server Error" });
  //       }
  //     }
  //   });
  // },
  
  getEventParticipants(req, res) {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        try {
          const { eventId } = req.params;
          const participantsArr = await Registration
            .find({ "owner": authData.user._id, "event": eventId, "approved": true })
            .populate("user");
          if (participantsArr) {
            return res.json(participantsArr);
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
  }
};
