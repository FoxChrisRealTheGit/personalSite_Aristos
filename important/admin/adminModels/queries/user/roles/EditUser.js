const UserRole = require("../../../adminRoles");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../../AristosStuff/AristosLogger/AristosLogger").addError;

/**
 * Edits a single user in the USer collection
 * @param {string} _id - The ID of the user to edit.
 * @param {object} artistProps - An object with ??
 * @return {promise} A promise that resolves when the user is edited
 */
module.exports = (_id, userProps) => {
  return UserRole.findByIdAndUpdate({ _id }, userProps).catch(err => {
    addErrorEvent(err, "admin role query error")
  });
};
