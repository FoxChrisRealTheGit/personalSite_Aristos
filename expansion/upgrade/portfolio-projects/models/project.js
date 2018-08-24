const mongoose = require("mongoose");
const moment = require("moment");
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
    type: Schema.Types.ObjectId,
    ref: "PortfolioCategory"
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
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  sorting: {
    type: Number
  },
  created:{
    type: String,
    default: moment().format("dddd, MMM Do YYYY")
  }
}); /* end of project schema */
/* start of project schema functions */

/* end of project schema functions */
module.exports = mongoose.model("Project", ProjectSchema);
