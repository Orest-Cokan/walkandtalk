// Bad way to check the time
const time = (dt1, dt2) => {
  var jdt1 = Date.parse("20 Aug 2000 " + dt1);
  var jdt2 = Date.parse("20 Aug 2000 " + dt2);
  console.log(dt1, "is this shwon");
  console.log(dt2, "is this shown");
  if (isNaN(jdt1)) {
    console.log(jdt1 + "we are NAN");
    return false;
  }
  if (isNaN(jdt2)) {
    console.log(jdt2 + "WE ARE NAN");
    return false;
  }
  if (jdt1 > jdt2) {
    console.log(jdt1 + "\n" + jdt2);
    return true;
  } else {
    console.log(jdt1 + "\n" + jdt2);
    return false;
  }
};

module.exports = time;
