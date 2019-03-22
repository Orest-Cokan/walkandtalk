const time = (now, event_time) => {
  console.log(now, event_time, "THESE ARE OUR TIMES");
  console.log(typeof now);
  console.log(typeof event_time);
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
      event_time.slice(-2).toLowerCase() == "pm"
    ) {
      return true;
    }
    if (now.slice(-7) >= event_time.slice(-7)) {
      console.log(now.slice(-7), event_time.slice(-7));
      return true;
    } else {
      console.log(now.slice(-7), event_time.slice(-7));
      console.log(now.slice(-7, -5));

      return false;
    }
  }
};

module.exports = time;
