const nodemailer = require("nodemailer");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("config.json"));

//email api
let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 25,
  auth: {
    user: config.username,
    pass: config.password
  },
  tls: {
    rejectUnauthorized: false
  }
});

let HelperOptions = {
  from: '"orest" <cokan@ualberta.ca',
  to: "cokan@ualberta.ca",
  subject: "dd",
  text: "dd"
};

transporter.sendMail(HelperOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("The message was sent!");
  console.log(info);
});

module.exports = transporter;
