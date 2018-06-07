var mongoose = require("mongoose")

// Product Category Schema
const PortfolioCategorySchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    slug:{
        type: String
    },
    description:{
        type: String
    },
    keywords:{
        type: String
    },
    author:{
        type: String
    }
})

const PortfolioCategory = module.exports = mongoose.model("PortfolioCategory", PortfolioCategorySchema);