const express = require("express")
const router = express.Router();
const auth = require("../../../config/auth")

const isAdmin = auth.isAdmin;

// GET task model
const Tasks = require("../../../../content/upgrade/project-management/models/tasks")
// GET contact message model
const contactMessage = require("../../../../content/upgrade/contact/models/contactMesssage")
/*
* GET pages index
*/
router.get("/", isAdmin, function (req, res) {
    Tasks.find({ completed: 0 }).sort({ _id: 1 }).limit(3).exec(function (err, task) {
        contactMessage.find({}).sort({ _id: 1 }).limit(3).exec(function (err, message) {
            res.render("../../../includes/admin/views/index", {
                content: "",
                tasks: task,
                message: message
            })
        })
    })
})


//Exports
module.exports = router;