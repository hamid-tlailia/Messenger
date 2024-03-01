const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();


let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
  // Adjust timeout settings
  connectionTimeout: 5000, // 5 seconds
  socketTimeout: 10000, // 10 seconds
});
// Generate random OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};


const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "OTP verification code",
    text: `Your OTP verification code is: ${otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(`${otp}`);
    }
  });
});

module.exports = { sendEmail };
