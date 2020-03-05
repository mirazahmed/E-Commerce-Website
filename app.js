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

 
app.post('/logIn',(req, res)=>{

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


const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("server has started!!");
})


