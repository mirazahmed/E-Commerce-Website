const express = require('express')
const router = express.Router();
const userModel = require("../models/User");
const path = require("path");
const bcrypt = require("bcryptjs");
const isAuthenticated = require("../middleware/auth");
const dashboardLoader = require("../middleware/authorization");



router.get('/registration',(req, res)=>{
    res.render("User/registration",{
    title: "Registration Page"
        });
    });



router.post("/registration",(req, res)=>{

    const newUser ={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password
    }


    const user = new userModel(newUser);
    user.save()
    .then((user)=>{

        req.files.profilePic.name = `pro_pic_${user._id}${path.parse(req.files.profilePic.name).ext}`;

        req.files.profilePic.mv(`public/uploads/${req.files.profilePic.name}`)
        .then(()=>{

            userModel.updateOne({_id:user._id},{
                profilePic: req.files.profilePic.name
            })
            .then(()=>{
                res.redirect("/user/logIn")
            })
            
        })

    })
    .catch(err=>console.log(`Error while inserting into the data ${err}`));
    
});


router.get("/logout",(req,res)=>{

   req.session.destroy();
   res.redirect("/User/logIn");     
    
})

router.get('/logIn',(req, res)=>{
    res.render("User/logIn",{
    title: "log In Page"
    });
});



router.post('/logIn',(req, res)=>{

        const errors = [];
        userModel.findOne({email:req.body.email})
        .then((user)=>{

            //email not found
            if(user==null){

                errors.push("Sorry,your email and/or password incorrect");
                res.render("User/logIn",{
                  errors  

                })
            }

            //email is found
            else{

                bcrypt.compare(req.body.password, user.password) 
                .then(isMatched=>{
                    if(isMatched){

                        //create our session
                        req.session.userInfo = user;
                        // dashboardLoader(req,res)
                        res.redirect("/user/profile");
                    }

                    else{
                        errors.push("Sorry,your email and/or password incorrect");
                        res.render("User/logIn",{
                            errors  

                        })
                    }
                })
                .catch(err=>console.log(`Error ${err}`));
                            
            }
        })
        .catch(err=>console.log(`Error${err}`));        
        
    

});


router.get("/profile",isAuthenticated,dashboardLoader);



module.exports = router;
