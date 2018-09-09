const mongoose = require("mongoose");

/* User Schema */
const UserRoleSchema = new mongoose.Schema({
  name: {
    type: String
  },
  canRead: {
    type: String
  },
  canWrite: {
    type: String
  },
  canRemove: {
    type: String
  },
  canEdit: {
    type: String
  },
  allThethings:{
    type: String
  }
});

module.exports = mongoose.model("UserRole", UserRoleSchema);
