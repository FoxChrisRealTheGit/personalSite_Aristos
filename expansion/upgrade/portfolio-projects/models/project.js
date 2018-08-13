const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* Page Schema */
const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: String,
    default: "public"
  },
  keywords: {
    type: String
  },
  author: {
    type: String
  },
  sorting: {
    type: Number
  },
  created:{
    type: Date,
    default: Date.now
  }
}); /* end of project schema */
/* start of project schema functions */

/* end of project schema functions */
module.exports = mongoose.model("Project", ProjectSchema);

