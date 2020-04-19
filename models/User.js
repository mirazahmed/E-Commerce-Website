const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//This indicates the shape of the documents that will be entering the database
  const userSchema = new Schema({
   
  
    firstName:
    {
        type:String,
        required:true
    },

    lastName:
    {
        type:String,
        required:true
    },

    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    profilePic:
    {
        type:String
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    },
    type:
    {
        type:String,
        default:"User"
    }


  });

  /*
    For every Schema you create(Create a schema per collection), you must also create a model object. 
    The model will allow you to perform CRUD operations on a given collection!!! 
  */


userSchema.pre("save",function(next)
{

    //salt random generated characters or strings
    bcrypt.genSalt(10)
    .then((salt)=>{
        
        bcrypt.hash(this.password,salt)
        .then((encryptPassword)=>{
            this.password = encryptPassword;
            next();

        })
        .catch(err=>console.log(`Error occured when hasing ${err}`));
    })
    .catch(err=>console.log(`Error occured when salting ${err}`));



})
 const userModel = mongoose.model('User', userSchema);

 module.exports = userModel;



/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const router = express.Router();
// const userModel = require("../models/User");
//const path = require("path");
//const bcrypt = require("bcryptjs");


//Route to direct use to Registration form
// router.get("/regristration",(req,res)=>
// {
//     res.render("User/regristration");
// });

//Route to process user's request and data when user submits registration form
router.post("/regristration",(req,res)=>
{ 

    const newUser = 
    {
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
                res.redirect(`/user/profile/${user._id}`)
            })

        })
      
      
       
    })
    .catch(err=>console.log(`Error while inserting into the data ${err}`));
 
});

//Route to direct user to the login form
router.get("/login",(req,res)=>
{
    res.render("User/login");
});

//Route to process user's request and data when user submits login form
router.post("/login",(req,res)=>
{
    
    /*
        Here is whre we have to determine if the email and the password exists.
        If it does, create session, assign the user object(document) to session
        then redirect user
    */

   /* const formData = {
        email : req.body.email,
        password: req.body.password
    }*/

    //Check to see if the user's email exist in the database


    /*
    const errors=[];

    userModel.findOne({email:req.body.email})
    .then((user)=>{

        //there was no matching email
        if(user==null)
        {
            errors.push("Sorr your email was not found in our database")

            res.render("User/login",{
                errors
            })
        }

        //There is a matching email
        else
        {
            bcrypt.compare(req.body.password,user.password)
            .then((isMatched)=>{

                //password match
                if(isMatched==true)
                {
                   req.session.user= user;

                   res.redirect("/user/profile")
                }

                //no match
                else
                {
                    errors.push("Sorry your password was wrong!")

                    res.render("User/login",{
                      errors
                    })
                }

            })
            .catch(err=>console.log(`Error ${err}`));

        }


    })
    .catch(err=>console.log(`Error ${err}`));


    //res.redirect("/user/profile/")
});



router.get("/profile/",(req,res)=>{


    res.render("User/userDashboard");
    
})

router.get("/logout",(req,res)=>{

    req.session.destroy();
    res.redirect("/user/login")
});



module.exports=router*/
