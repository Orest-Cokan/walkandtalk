// libraries
const excel = require("excel4node");
const User = require("../models/User");
const Preference = require("../models/Preference");
const WalkingRecord = require("../models/WalkingRecord");
const Transporter = require("../utils/email/email");
const excelData = require("../utils/email/msgs/excelData");
const fs = require("fs");

const ExcelController = () => {
  // hmm
  const getData = async (req, res) => {
    const { email } = req.params;
    console.log("excel data email" + email);
    // Create a new instance of a Workbook class
    const workbook = await new excel.Workbook();

    // Create the styles used for the workbook
    const normal = workbook.createStyle({
      font: {
        color: "#000000",
        size: 12
      },
      alignment: {
        shrinkToFit: false,
        wrapText: true
      }
    });

    const number = workbook.createStyle({
      font: {
        color: "000000",
        size: 12
      },
      numberFormat: "###0;"
    });

    const bold = workbook.createStyle({
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

    // Add Worksheets to the workbook
    const userSheet = await workbook.addWorksheet("Users");
    const recordSheet = await workbook.addWorksheet("Records");

    // header userfields in excel
    const userFields = [
      "Name",
      "Email",
      "Date of Birth",
      "Menopausal Stage",
      "Intensity",
      "Location",
      "Venue",
      "Distance",
      "Duration",
      ""
    ];

    // header fields in excel
    const recordFields = [
      "Email",
      "Location",
      "Duration MINS",
      "Distance KM",
      "Intensity",
      "Venue",
      "Walk Rating",
      "Walking Rating Comment",
      "Location Rating",
      "Location Rating Comment",
      "Total Attendees",
      ""
    ];

    for (let i = 1; i < recordFields.length; i++) {
      recordSheet
        .cell(1, i)
        .string(recordFields[i - 1])
        .style(bold);
    }

    // set the initial headers for a user
    for (let i = 1; i < userFields.length; i++) {
      userSheet
        .cell(1, i)
        .string(userFields[i - 1])
        .style(bold);
    }

    // get the users and add it to excel, this is the only way i promise.
    await User.findAll({
      include: [Preference]
    }).then(users => {
      users.forEach((userBad, idx) => {
        const user = userBad.dataValues;
        userSheet
          .cell(idx + 2, 1)
          .string(user.fullname)
          .style(normal);

        userSheet
          .cell(idx + 2, 2)
          .string(user.email)
          .style(normal);

        userSheet
          .cell(idx + 2, 3)
          .string(user.dob)
          .style(normal);

        userSheet
          .cell(idx + 2, 4)
          .string(user.menopausal_stage)
          .style(normal);

        userSheet
          .cell(idx + 2, 5)
          .string(user.preference.intensity)
          .style(normal);

        userSheet
          .cell(idx + 2, 6)
          .string(user.preference.location)
          .style(normal);

        userSheet
          .cell(idx + 2, 7)
          .string(user.preference.venue)
          .style(normal);

        userSheet
          .cell(idx + 2, 8)
          .string(user.preference.distance.toString())
          .style(normal);

        userSheet
          .cell(idx + 2, 9)
          .string(user.preference.duration.toString())
          .style(normal);
      });
    });

    await WalkingRecord.findAll({ where: { completed: 1 } })
      .then(records => {
        records.forEach((recordBad, idx) => {
          const record = recordBad.dataValues;
          recordSheet
            .cell(idx + 2, 1)
            .string(record.email)
            .style(normal);

          recordSheet
            .cell(idx + 2, 2)
            .string(record.location)
            .style(normal);

          recordSheet
            .cell(idx + 2, 3)
            .number(record.duration)
            .style(normal);

          recordSheet
            .cell(idx + 2, 4)
            .number(record.distance)
            .style(normal);

          recordSheet
            .cell(idx + 2, 5)
            .string(record.intensity)
            .style(normal);

          recordSheet
            .cell(idx + 2, 6)
            .string(record.venue)
            .style(normal);

          recordSheet
            .cell(idx + 2, 7)
            .string(record.walk_rating)
            .style(normal);

          recordSheet
            .cell(idx + 2, 8)
            .string(record.walk_rating_comment)
            .style(normal);

          recordSheet
            .cell(idx + 2, 9)
            .string(record.location_rating)
            .style(normal);

          recordSheet
            .cell(idx + 2, 10)
            .string(record.location_rating_comment)
            .style(normal);

          recordSheet
            .cell(idx + 2, 11)
            .number(record.total_attendees)
            .style(number);
        });
      })
      .then(() => {
        workbook.write("Walk-and-Talk-DATA.xlsx");
      })
      .then(() => {
        Transporter.sendMail(
          {
            from: '"Walk and Talk" cmput401walkandtalk@gmail.ca',
            to: email,
            subject: "Walk and Talk - Excel Data",
            text: "Attached is the Excel Data",
            attachments: [
              {
                path: "./Walk-and-Talk-DATA.xlsx"
              }
            ]
          },
          (err, info) => {
            console.log(
              JSON.stringify(info) + "this is the info for excel doc"
            );
            if (err) {
              console.log(err);
              fs.unlink("./Walk-and-Talk-DATA.xlsx");
              return res
                .status(500)
                .json({ msg: "Failed to send Excel Data!" });
            }
            fs.unlink("./Walk-and-Talk-DATA.xlsx");
            console.log("do we get here???");
            return res
              .status(200)
              .json({ msg: "Succesfully sent the Excel Data!" });
          }
        );
        return res
          .status(200)
          .json({ msg: "Succesfully sent the Excel Data!" });
      });
  };
  return {
    getData
  };
};

// export the excelcontroller
module.exports = ExcelController;
