// Require library
var excel = require("excel4node");

// Create a new instance of a Workbook class
var workbook = new excel.Workbook();

// Add Worksheets to the workbook
var worksheet = workbook.addWorksheet("Sheet 1");
var worksheet2 = workbook.addWorksheet("Sheet 2");

// Create a reusable style
var style = workbook.createStyle({
  font: {
    color: "#FF0800",
    size: 12
  },
  numberFormat: "$#,##0.00; ($#,##0.00); -"
});

var bold = workbook.createStyle({
  font: {
    color: "#000000",
    size: 14,
    bold: true
  },
  alignment: {
    shrinkToFit: false,
    wrapText: true
  }
});

/*    password: Sequelize.STRING,
    fullname: Sequelize.STRING,
    menopausal_stage: Sequelize.STRING,
    image: Sequelize.STRING,
    registered: Sequelize.INTEGER,
    intensity: Sequelize.STRING,
    venue: Sequelize.STRING,
    location: Sequelize.STRING,
    dob: Sequelize.STRING,
    distance: Sequelize.INTEGER,
    duration: Sequelize.INTEGER,
    redcapID: Sequelize.INTEGER
    */

// header fields in excel
const fields = [
  "Name",
  "Email",
  "Date of Birth",
  "Menopausal Stage",
  "Intensity",
  "Location",
  "Venue",
  "Distance",
  "Duration",
  "RedCapID",
  ""
];

// set the initial headers for a user
for (let i = 1; i < fields.length; i++) {
  worksheet
    .cell(1, i)
    .string(fields[i - 1])
    .style(bold);
}

workbook.write("Excel.xlsx");
