const nodemailer = require("nodemailer");

// email api
let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 25,
  auth: {
    user: "cmput401walkandtalk@gmail.com",
    pass: "CMPUT401WALKANDTALK"
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = transporter;
