// in this file you can append custom step methods to 'I' object

module.exports = function () {
  return actor({
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

    grabStateOfElementInDOM(selector) {
      if (!this.seeElementInDOM(selector)) {
        throw `This ${selector} is not located in DOM`;
      } else {
        return true;
      }
    },
  });
};
