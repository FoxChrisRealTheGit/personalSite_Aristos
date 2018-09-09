const UserRole = require("../../../adminRoles");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Counts the users in the Users collection.
 * @return {promise} A promise that resolves with the count
 */
module.exports = () => {
  return UserRole.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      addErrorEvent(err, "admin role query error");
    });
};
