const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const session = require('express-session');



//load the environment variable file
require('dotenv').config({path:"./config/keys.env"});

const productRoutes = require("./controllers/products");
const generalRoutes = require("./controllers/General");
const userRoutes = require("./controllers/User");

//creation of app object
const app = express();

// const math = helpers.math();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false })); 


//express static middleware
app.use(express.static("public"));

//set Handlebars as the Express engine for the app
app.engine('handlebars', exphbs(

    {
        helpers: {
            sumTotal: function(docs){
                let sum = 0;
                
                    docs.forEach(function(doc){
                        sum = sum + doc.total;
                
                    });
                    return sum; 
                    
                              
            }
        }
    }

    
   

));


app.set('view engine', 'handlebars');


//custom middlewares
app.use((req,res,next)=>{
    if(req.query.method=="PUT"){

        req.method="PUT";
    }

    else if (req.query.method=="DELETE"){

        req.method="DELETE";
    }

    next();
})

//fielupload
app.use(fileUpload());




app.use(session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true        
  }))

  //Creating global variable for handlebars files to get access
  app.use((req,res,next)=>{
   
    res.locals.user= req.session.userInfo;

    next();
})

//map each controller to the app object
app.use("/",generalRoutes);
app.use("/product",productRoutes);
app.use("/user",userRoutes);



mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`Error occured connecting to DB ${err}`));


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("server has started!!");
});


