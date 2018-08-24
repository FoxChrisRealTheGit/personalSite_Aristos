const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* project Category Schema */
const PortfolioCategorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  description: {
    type: String
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
  }
}); /* end of project category schema */
/* start of project category functions */

/* end of project category funcitons */
module.exports = mongoose.model("PortfolioCategory", PortfolioCategorySchema);
