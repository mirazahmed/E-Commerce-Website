const express = require("express");
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');


//load the environment variable file
require('dotenv').config({path:"./config/keys.env"});

const app = express();

//set Handlebars as the Express engine for the app
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false })); 

app.use(express.static("public"));


const generalController = require("./controllers/general");
const productController = require("./controllers/products");


//map each controller to the app object

app.use("/",generalController);
app.use("/products",productController);


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("server has started!!");
});


