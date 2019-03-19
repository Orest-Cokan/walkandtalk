const Attendee = require("../models/Attendee");
const WalkingEvent = require("../models/WalkingEvent");
// User controller
const AttendeeController = () => {
  // add an attendee to a walking event
  const addAttendees = async (req, res) => {
    const { body } = req;
    console.log(body.id, body.name);
    try {
      await WalkingEvent.increment("total_attendees", {
        where: { id: body.id }
      });
      const walkingevent = await WalkingEvent.findByPk(body.id, {
        include: [Attendee]
      });
      await Attendee.create({
        name: body.name,
        email: body.email
      }).then(resp => {
        walkingevent.addAttendees(resp);
      });
      return res
        .status(200)
        .json({ msg: "Succesfully added user to the walking event!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  // remove an attendee from a walking event
  const removeAttendees = async (req, res) => {
    const { body } = req;
    console.log(body.id, body.name);
    try {
      await WalkingEvent.decrement(
        {
          total_attendees: 1
        },
        { where: { id: body.id } }
      );
      const walkingevent = await WalkingEvent.findByPk(body.id, {
        include: [Attendee]
      });

      await walkingevent
        .getAttendees({
          where: { email: body.email }
        })
        .then(resp => {
          if (resp.length > 0) {
            walkingevent.removeAttendees(resp);
            Attendee.destroy({
              where: { WalkingEventId: body.id, name: body.name }
            }).then(con => console.log(con));
          } else {
            return res
              .status(404)
              .json({ msg: "Unable to find user to remove!" });
          }
        })
        .then(() => {
          return res
            .status(200)
            .json({ msg: "Succesfully removed user to the walking event!" });
        });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Unable to find user to remove!" });
    }
  };

  return {
    addAttendees,
    removeAttendees
  };
};

module.exports = AttendeeController;
