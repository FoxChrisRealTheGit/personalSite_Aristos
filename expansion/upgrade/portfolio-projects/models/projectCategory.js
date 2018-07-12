const mongoose = require("mongoose");
/* project Category Schema */
const PortfolioCategorySchema = new mongoose.Schema({
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
    type: String
  },
  sorting: {
    type: Number
  }
}); /* end of project category schema */
/* start of project category functions */

/* end of project category funcitons */
module.exports = mongoose.model("PortfolioCategory", PortfolioCategorySchema);
