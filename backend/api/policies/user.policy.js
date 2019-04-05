// policy to verify if user registered
module.exports = registered => {
  if (registered === true) {
    return true;
  }
  return false;
};
