const Attendee = require("../models/Attendee");
const WalkingEvent = require("../models/WalkingEvent");
// Attendee controller
const AttendeeController = () => {
  // add an attendee to a walking event
  const addAttendees = async (req, res) => {
    const { body } = req;
    console.log(body.id, body.name);
    const walkingevent = await WalkingEvent.findByPk(body.id, {
      include: [Attendee]
    });
    await Attendee.create({
      fullname: body.fullname,
      email: body.email
    })
      .then(resp => {
        walkingevent.addAttendees(resp);
      })
      .then(() => {
        WalkingEvent.increment("total_attendees", {
          where: { id: body.id }
        });
        return res
          .status(200)
          .json({ msg: "Succesfully added user to the walking event!" });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
      });
  };

  // remove an attendee from a walking event
  const removeAttendees = async (req, res) => {
    const { body } = req;
    const walkingevent = await WalkingEvent.findByPk(body.id, {
      include: [Attendee]
    });

    await walkingevent
      .getAttendees({
        where: { email: body.email }
      })
      .then(resp => {
        if (resp.length > 0) {
          WalkingEvent.decrement(
            {
              total_attendees: 1
            },
            { where: { id: body.id } }
          )
            .then(() => {
              Attendee.destroy({
                where: { walkingeventId: body.id, email: body.email }
              }).then(self => {
                if (self == 1) {
                  return res.status(200).json({
                    msg: "Succesfully removed user to the walking event!"
                  });
                } else {
                  return res
                    .status(404)
                    .json({ msg: "Unable to delete the user!" });
                }
              });
            })
            .catch(() => {
              return res.status(500).json({ msg: "Internal Server Error!" });
            });
        }
      });
  };
  return {
    addAttendees,
    removeAttendees
  };
};

module.exports = AttendeeController;
