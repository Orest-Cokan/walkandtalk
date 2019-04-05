const transporter = require("../../api/Utils/email/email");
const { beforeAction, afterAction } = require("../setup/_setup");

const testEmail = {
  from: '"Walk and Talk" cmput401walkandtalk@gmail.ca',
  to: "cokan@ualberta.ca",
  subject: "Test",
  text: "This is a test"
};

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

// test sending an email
test("Sending an email of user confirmation | email", async () => {
  transporter.sendMail(testEmail).then(info => {
    expect(info).anything();
  });
});
