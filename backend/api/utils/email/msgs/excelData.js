// Email Beate the data.
// TODO in the future change this to beates email

const excelData = {
  from: '"Walk and Talk" cmput401walkandtalk@gmail.ca',
  to: "cokan@ualberta.ca",
  subject: "Walk and Talk - Excel Data",
  text: "Attached is the Excel Data",
  attachments: [
    {
      path: "./Walk-and-Talk-DATA.xlsx"
    }
  ]
};

module.exports = excelData;
