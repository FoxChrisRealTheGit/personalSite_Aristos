const fs = require("fs-extra");
const ContactMessages = fs.readJSONSync(
  "./expansion/upgrade/contact/routes/checkers/contactModelRoutes.json"
).route;
const ContactMessage = require(ContactMessages);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single contact message from the Contact Message collection
 * @param {string} _id - The ID of the message to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return ContactMessage.findByIdAndRemove(_id).catch(err => {
    errorAddEvent(err, "contact message query error");
  });
};