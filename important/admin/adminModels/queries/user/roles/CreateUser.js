const UserRole = require("../../../adminRoles");;
/* Aristos Logger Path */
const addErrorEvent = require("../../../../../AristosStuff/AristosLogger/AristosLogger").addError;
/**
 * Creates a single user in the User collection.
 * @param {object} userProps - Object containing <insert stuff here>
 * @return {promise} A promise that resolves with the user that was created
 */
module.exports = userProps => {
  const role = new UserRole(userProps);
  return role.save().catch(err => {
    addErrorEvent(err, "admin role query error");
  });
};
