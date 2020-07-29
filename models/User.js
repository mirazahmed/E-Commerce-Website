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
    },

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

