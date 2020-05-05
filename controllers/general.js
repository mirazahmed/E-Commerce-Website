const express = require('express')
const router = express.Router();
const productModel = require("../models/Product");

// const productModel = require("../models/producct");
// const bestSoldModel = require("../models/bestSeller");



router.get('/',(req, res)=>{

    productModel.find({bestseller: 'yes'})
    .then((products)=>{

    const filteredProduct = products.map((product)=>{

            return{
                prodTitle: product.prodTitle,
                category: product.category,
                quantity: product.quantity,
                bestSeller: product.bestseller,
                productPic: product.productPic
            }

        });

        res.render("General/home",{
            data : filteredProduct
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the DB :${err}`)); 
});

//     res.render("General/home",{
//         title: "Home Page",
//         headingInfo: "Home page",
//         // products :productModel.getAllProducts(),
//         // bestSoldItems :bestSoldModel.getbestSoldProducts()
//     }); 
// });

// const allProductsModel = require("../model/allProduct");


// router.get('/products',(req, res)=>{
//     res.render("products",{
//     title: "Products List Page",
//     headingInfo: "Products List",
//     allProducts: allProductsModel.getallProductsList()
//     });
// });

module.exports=router;


