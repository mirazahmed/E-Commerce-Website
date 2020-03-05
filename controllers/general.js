const express = require('express')
const router = express.Router();

const productModel = require("../model/product");
const bestSoldModel = require("../model/bestSeller");



router.get('/',(req, res)=>{
    res.render("home",{
        title: "Home Page",
        headingInfo: "Home page",
        products :productModel.getAllProducts(),
        bestSoldItems :bestSoldModel.getbestSoldProducts()
    }); 
});



router.get('/logIn',(req, res)=>{
    res.render("logIn",{
    title: "log In Page"
    });
});


router.get('/registration',(req, res)=>{
res.render("registration",{
title: "Registration Page"
    });
});

router.get('/dashboard',(req, res)=>{
    res.render("dashboard",{
    title: "Dashboard Page"
        });
    });



router.post('/logIn',(req, res)=>{

    const errors = [];
    if(req.body.email== ""){
        errors.push("! Enter your e-mail");
    } 

    if (req.body.password == ""){
    errors.push("! Enter your password");
    }

    if (errors.length > 0){
        res.render("logIn",{
        title: "log In Page",
        errorMessages: errors
        });
    }

    else{
        res.redirect("/");
    }

});


router.post('/registration',(req, res)=>{

    const {name,email,password} = req.body;

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
    to: `${email}` ,
    from: `test@got.com`,
    subject: 'Registration Form Submit',
    // text: 'and easy to do anywhere, even with Node.js',
    html: `<strong>Welcome to SHOPPER'S PARADISE `,
    };


    sgMail.send(msg)
    .then(()=>{
        res.redirect("/dashboard");
    })
    .catch(err=>{
        console.log(`Error ${err}`);
    });
});


module.exports = router;


// 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