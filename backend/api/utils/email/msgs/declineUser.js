// email message sent when a user has been declined
const declineUserEmail = email => ({
  from: '"Walk and Talk" cmput401walkandtalk@gmail.ca',
  to: email,
  subject: "Walk and Talk",
  text: "Sorry. Your application to Walk and Talk has been denied."
});

module.exports = declineUserEmail;
