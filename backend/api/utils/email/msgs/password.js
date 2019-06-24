// Send the user an email of their password
const password = (email, password) => ({
  from: '"Walk and Talk" cmput401walkandtalk@gmail.ca',
  to: email,
  subject: "Walk and Talk",
  text: "Your password is: " + password
});

module.exports = password;
