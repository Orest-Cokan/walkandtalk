// auth policy for registered users
module.exports = registered => {
  if (registered === true) {
    return true;
  }
  return false;
};
