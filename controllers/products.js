const express = require('express')
const router = express.Router();

//load productModel 
const allProductsModel = require("../model/allProduct");


router.get('/list',(req, res)=>{
    res.render("products",{
    title: "Products List Page",
    headingInfo: "Products List",
    allProducts: allProductsModel.getallProductsList()
    });
});



module.exports = router;