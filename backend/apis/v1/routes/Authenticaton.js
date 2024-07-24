const express = require('express');
const Router = express.Router();
const user = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var fetchUser = require("../middleware/fetchUser"); 
const { otpgeneration, OTP } = require('../middleware/sendotp');
const nodemailer = require('nodemailer');
const axios = require('axios');

const connectToMongoose = require('../database/db');
const {connectToStore} = require('../database/storesDb');

//establish database connection

connectToMongoose();
connectToStore();




//MAIL SEND
// Function to send OTP via email using Nodemailer
async function sendOTPByEmail(email, otp,userName) {
  //omfi djkw vzxn xrde
  // Configure Nodemailer with your email service provider's details
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Change to your email service provider
    auth: {
      user: 'Abhishekkange00@gmail.com', // Change to your email address
      pass:'omfi djkw vzxn xrde', // Change to your email password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Email content
  const mailOptions = {
    from: 'Abhishekkange00@gmail.com', // Change to your email address
    to: email,
    subject: 'NearbyKart Verification OTP',
    html: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
        <title>MAIL</title>
    </head>
    
    <style>
    
        .nearby{
    
            font-family: "Poppins", sans-serif;
      font-weight: 300;
      font-style: normal;
        }
    
        .kart{
    
            font-family: "Poppins", sans-serif;
      font-weight: 500;
      font-style: italic;
    
        }
    </style>
    
    <body class="bg-gray-100">
    
        <div class="container mx-auto py-8">
    
            <div class="flex justify-center items-center mb-8">
                <h1 class=" nearby">NearbyKart</h1>
            </div>
    
            <div class="bg-white p-8 rounded-lg shadow-lg">
                <p class="text-lg text-gray-700 font-poppins">Thank you <strong> ${userName}</strong> for choosing Nearbykart!</p>
    
                <p class="mt-4 text-gray-600 font-poppins">To complete your account registration and ensure the security of your account, please use the following one-time password (OTP) to verify your email address:</p>
    
                <h1 class="text-4xl font-bold text-center text-blue-500 mt-6 font-poppins">${OTP}</h1>
    
                <p class="mt-6 text-gray-600 font-poppins">If you did not request this OTP, please disregard this message.</p>
    
                <p class="mt-6 text-gray-600 font-poppins">Thank you,<br>The Nearbykart Team</p>
            </div>
    
        </div>
    
    </body>
    
    </html>
    `,
  };

  // Send email
  console.log("mail sent to " + email);
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", result);
    return result;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
}
                // AUTHENTICATION ROUTERS

//ROUTER 1 : localhost:4000/api/createUser - NO login Req.
Router.post("/register", async (req, res) => {
  try {
    // Check if user already exists
    const myUser = await user.findOne({ mobileNumber: req.body.mobileNumber });
    if (myUser) {
      return res.json({ "message": "The user already exists! Please sign in to continue" });
    }

    const mobile = req.body.mobileNumber;
    const name = req.body.name;
    const password = req.body.password;
    const timestamp = req.body.timestamp;

    // Hash the password
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const newUser = new user({
        "name": name,
        "mobileNumber": mobile,
        "password": hash
      });

      // Save the new user
    

      // Generate OTP for verification
        otpgeneration(req, res);
        //send OTP
        await sendOTPByEmail(mobile,OTP,name);
       

    

     console.log("OTP sent successfully "+ OTP);
     res.json({ message: 'verifyOtp', otp: OTP });


    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



// // Router 1.1: localhost:4000/api/verifyotp
Router.post('/verifyotp', async (req, res) => {
  try {
    const enteredOTP = req.body.otp;
    console.log(enteredOTP);

    if (OTP == enteredOTP) {
      console.log("OTP verified");
      const mobile = req.body.mobileNumber;
      const name = req.body.name;
      const password = req.body.password;
      const timestamp = req.body.timestamp;

      bcrypt.hash(password, saltRounds, async function (err, hash) {
        const newUser = new user({
          "name": name,
          "mobileNumber": mobile,
          "password": hash,
          "timestamp":timestamp
        });

        await newUser.save(); // Save the new user

        res.json({"message":"User created"});
      });
    } else {
      res.json({"message":"Enter correct otp"});
    }

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }

});

//Router 2: localhost:4000/api/login
Router.post("/login",async (req,res)=>{

        
        const isUserPresent = await user.findOne({mobileNumber:req.body.mobileNumber});
        if(isUserPresent){

            bcrypt.compare(req.body.password, isUserPresent.password).then(function(result) {
                if(result==true){

                    let data = {
                        time: Date(),
                        username:isUserPresent.name,
                        userId: isUserPresent._id
                    }

                    
                  
                    const token = jwt.sign(data, "7211821");
                  
                    res.json({"message":isUserPresent._id});
                }else{

                    res.json({"message":"enter valid credentials"});
                }
            });
        }
        else{

            res.json({"mesage":"Not registered user"});

        }

    });


// Router 3: localhost:4000/api/getuser
Router.post('/getUser', fetchUser, async (req, res) => {
        try {
           
            console.log({userId:req.user.userId});
    
            res.send("ok");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });


//Route to fetch UserId from JWT_TOKEN

Router.get("/user/:JWT_TOKEN", (req,res)=>{

    const JWT_TOKEN = req.params.JWT_TOKEN;

    jwt.verify(JWT_TOKEN, '7211821', (err, decoded) => {
        if (err) {
          // Handle verification or decoding errors
          console.error(err);
        } else {
         
          const userData2 = decoded.userData; 
          res.send(userData2);


        }
      });

        




    });


    //Route to handle forgot password
    Router.post('/forgotpassword',(req,res) => {

      const mobilenumber = req.params.mobileNumber;

      

      /*1. Check if number is available 
      2. if yes then send OTP /
      3. verify OTP
      4. set new Password for the number
      */

      //CHECK IF NUMBER IS PRESENT

      const result = user.findOne({mobileNumber: mobilenumber});
      if(result){

      res.json({"message":OTP});
    
      }
      else{

        res.json({"message":"Mobile Number not registered"});
      }

    });

    //verify OTP forgot password 
    Router.post('/forgotpassword/verifyotp',(req,res)=>{

        const userOtp = req.body.otp;

        if(userOtp==OTP)
        {

          res.json({"message":"verified"});

        }
        else{

          res.json({"message":"failed"});

        }

    });

// Update password
// Update password
Router.post('/forgotpassword/update', async (req, res) => {
  try {
    const newPassword = req.body.password;
    const mobileNumber = req.body.mobileNumber;

    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await User.findOneAndUpdate(
      { mobileNumber: mobileNumber },
      { password: hashedPassword },
      { new: true } // To get the updated document
    );

    if (result) {
      res.json({ message: "Password updated successfully", user: result });
    } else {
      res.json({ message: "User not found or password not updated" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
});
    

module.exports = Router;


