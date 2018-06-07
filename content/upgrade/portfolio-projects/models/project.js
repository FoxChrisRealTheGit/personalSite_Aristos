var mongoose = require("mongoose")

// Page Schema
const ProjectSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    slug:{
        type: String
    },
    content:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    image:{
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
    },
    sorting:{
        type: Number
    }
})

const Project = module.exports = mongoose.model("Project", ProjectSchema);