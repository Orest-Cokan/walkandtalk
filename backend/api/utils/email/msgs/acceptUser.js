// email message sent when a user has been accepted
const acceptUserEmail = email => ({
  from: '"Walk and Talk" cmput401walkandtalk@gmail.ca',
  to: email,
  subject: "Walk and Talk",
  text: "Congratulations! You've been accepted to join Walk and Talk!!!"
});

module.exports = acceptUserEmail;
