const UserRole = require("../../../adminRoles");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the users in the User collection.
 * @return {promise} A promise that resolves with all the users
 */
module.exports = () => {
  return UserRole.find({}).catch(err => {
    addErrorEvent(err, "admin role query error");
  });
};
