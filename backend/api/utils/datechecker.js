// Bad way to check the time
const time = (now, event_time) => {
  if (
    now.slice(-2).toLowerCase() == "am" &&
    event_time.slice(-2).toLowerCase() == "am"
  ) {
    if (now.slice(-7) >= event_time.slice(-7)) {
      return true;
    } else {
      return false;
    }
  } else if (
    now.slice(-2).toLowerCase() == "am" &&
    event_time.slice(-2).toLowerCase() == "pm"
  ) {
    return false;
  } else if (
    now.slice(-2).toLowerCase() == "pm" &&
    event_time.slice(-2).toLowerCase() == "am"
  ) {
    return true;
  } else if (
    now.slice(-2).toLowerCase() == "pm" &&
    event_time.slice(-2).toLowerCase() == "pm"
  ) {
    if (
      now.slice(-2).toLowerCase() == "pm" &&
      event_time.slice(-7, -5) == "12" &&
      event_time.slice(-2).toLowerCase() == "pm" &&
      now.slice(-7, -5) == "12"
    ) {
      return true;
    } else if (now.slice(-7, -5) == "12" && event_time != "12") {
      return false;
    }
    if (now.slice(-7) >= event_time.slice(-7)) {
      return true;
    } else {
      return false;
    }
  }
};

module.exports = time;
