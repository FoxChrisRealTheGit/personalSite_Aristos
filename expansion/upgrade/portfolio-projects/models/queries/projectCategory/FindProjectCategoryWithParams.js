const ProjectCategory = require("../../projectCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the project categories that match the stuff param in the Project Category collection.
 * @param {object} stuff - The object of the stuff to search with.
 * @return {promise} A promise that resolves with the found project categories
 */
module.exports = stuff => {
  return ProjectCategory.find(stuff).catch(err => {
    errorAddEvent(err, "project category query error");
  });
};

