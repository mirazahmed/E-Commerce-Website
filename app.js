const express = require("express");
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const productModel = require("./model/product");
const bestSoldModel = require("./model/bestSeller");
const allProductsModel = require("./model/allProduct");

const app = express();

//set Handlebars as the Express engine for the app
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));
//body parser middleware
app.use(bodyParser.urlencoded({extended: false})) 

app.get('/',(req, res)=>{
    res.render("home",{
        title: "Home Page",
        headingInfo: "Home page",
        products :productModel.getAllProducts(),
        bestSoldItems :bestSoldModel.getbestSoldProducts()
    }) 
});


app.get('/products',(req, res)=>{
        res.render("products",{
        title: "Products List Page",
        headingInfo: "Products List",
        allProducts: allProductsModel.getallProductsList()
    })
});




app.get('/logIn',(req, res)=>{
        res.render("logIn",{
        title: "log In Page"
    })
});


app.get('/registration',(req, res)=>{
    res.render("registration",{
    title: "Registration Page"
    })
});


 


const port = 3000;

app.listen(port,()=>
{
    console.log("server has started!!");
});


app.get("/products",(req,res)=>{
   
    
    res.render("products",{
        title: "Products",
        headingInfo: "Product page",
        products :productModel.getAllProducts()
    });
});
