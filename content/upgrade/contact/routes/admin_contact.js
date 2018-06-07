const express = require("express")
const router = express.Router();
const mkdirp = require("mkdirp");
const fs = require("fs-extra");
const auth = require("../../../../includes/config/auth")
const isAdmin = auth.isAdmin;

// GET contactMEssage model
const contactMessage = require("../models/contactMesssage")

// GET User model
const User = require("../../../../includes/models/user")
/*
* post contact form
*/
router.get("/", isAdmin, function (req, res) {
    console.log(req.body)

    // Category.count(function (err, c) {
    //     count = c;
    // })
    res.render("../../upgrade/contact/views/contact");


})



/*
* post contact form
*/
router.post("/", function (req, res) {
    req.checkBody("name", "Namme must have a value.").notEmpty();
    req.checkBody("content", "content must have a value.").notEmpty();
    req.checkBody("subject", "Subject must have a value.").notEmpty();
    req.checkBody("email", "email must have a value.").isEmail();
console.log(req.body)
    let content = req.body.content;
    let email = req.body.email;
    let subject = req.body.subject;
    let name = req.body.name;

    let errors = req.validationErrors();

    if (errors) {
        req.session.error = errors;
        console.log(errors)
        res.redirect("/contact");
    } else {

        let message = new contactMessage({
            name: name,
            subject: subject,
            content: content,
            email: email
        });

        message.save(function (err) {
            if (err) { return console.log(err) };
            console.log(message)
        })


        req.flash("success", "Message sent!");
        res.redirect("/contact");
    }
})



//Exports
module.exports = router;