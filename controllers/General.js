const express = require('express')
const router = express.Router();
const productModel = require("../models/Product");

router.get('/',(req, res)=>{

    productModel.find({bestseller: 'Yes'})
    .then((products)=>{

    const filteredProduct = products.map((product)=>{

            return{
                prodTitle: product.prodTitle,
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

module.exports=router;


