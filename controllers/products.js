const express = require('express')
const router = express.Router();
const path = require("path");
const productModel = require("../models/Product");
const userModel = require("../models/User");
const isAuthenticated = require("../middleware/auth");


router.get("/add",(req,res)=>{
    res.render("Product/productAdd");
    
});


router.post("/add",(req,res)=>{

    const newProduct = {
        prodTitle : req.body.prodTitle,
        price : req.body.price,
        description : req.body.description,
        category : req.body.category,
        quantity : req.body.quantity,
        bestseller : req.body.bestSeller
    }
    
    const product = new productModel(newProduct);
    product.save()
    .then((product)=>{

        req.files.productPic.name = `prod_pic_${product._id}${path.parse(req.files.productPic.name).ext}`;

        req.files.productPic.mv(`public/uploads/${req.files.productPic.name}`)
        .then(()=>{

            productModel.updateOne({_id:product._id},{
                productPic: req.files.productPic.name
            })
            .then(()=>{
                res.redirect(`/product/list`)
            })
            
        })


        // res.redirect("/product/list");
    })
    .catch(err=>console.log(`Error happened when inserting in the DB :${err}`));

});

//fetch all products
router.get("/display",(req,res)=>{

    productModel.find()
    .then((products)=>{

    const filteredProduct = products.map((product)=>{

            return{
                id: product._id,
                prodTitle: product.prodTitle,
                price: product.price,
                description: product.description,
                category: product.category,
                quantity: product.quantity,
                bestSeller: product.bestseller,
                productPic: product.productPic
            }

        });
        res.render("Product/productDashboard",{
            data : filteredProduct
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the DB :${err}`)); 
});




//clerkDashboard Route
router.get("/list",(req, res)=>{



    productModel.find()
    .then((products)=>{


    const filteredProduct = products.map((product)=>{

            return{
                id: product._id,
                prodTitle: product.prodTitle,
                price: product.price,
                description: product.description,
                category: product.category,
                quantity: product.quantity,
                bestSeller: product.bestseller
            }

        });


        res.render("User/clerkDashboard",{
            data : filteredProduct

        });

    })    
   
    .catch(err=>console.log(`Error happened when pulling from the DB :${err}`)); 
});

//Edit route

router.get("/edit/:id",(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{

        const{_id,prodTitle,price,description,category,quantity,bestseller} = product;
        res.render("Product/productEditForm",{
            _id,
            prodTitle,
            price,
            description,
            category,
            quantity,
            bestseller

        });
    })
    .catch(err=>console.log(`Error happened when editing from the DB :${err}`)); 

    
})



router.put("/update/:id",(req,res)=>{

    const product = 
    {
        prodTitle:req.body.prodTitle,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        quantity:req.body.quantity,
        bestseller:req.body.bestSeller
    }

    productModel.updateOne({_id:req.params.id},product)
    .then(()=>{
        res.redirect("/product/list");
    })
    .catch(err=>console.log(`Error happened when updating from the DB :${err}`)); 

});

router.delete("/delete/:id",(req,res)=>{

    productModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/product/list");
    })
    .catch(err=>console.log(`Error happened when deleting from the DB :${err}`)); 
});



router.post("/display",(req,res)=>{

    const searchValue = req.body.productsearch;

    productModel.find({category: searchValue})
    
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
    
            res.render("Product/productSearch",{
                 data : filteredProduct
            });
            
        })
        .catch(err=>console.log(`Error happened when pulling from the DB :${err}`)); 

   
})

router.get("/productDetails/:id",isAuthenticated,(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{
        
       
        const{_id,prodTitle,productPic,price,description,category,quantity,bestseller} = product;
        res.render("Product/productDetails",{
            _id,
            prodTitle,
            productPic,
            price,
            description,
            category,
            quantity,
            bestseller
            })

        })

        .catch(err=>console.log(`Error happened when displaying product details form :${err}`)); 
  
});

router.post("/productDetails/:id",isAuthenticated,(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{
        
       
        const{_id,prodTitle,productPic,price,description,category,quantity,bestseller} = product;
        res.render("Product/shoppingCart",{
            _id,
            prodTitle,
            productPic,
            price,
            description,
            category,
            quantity,
            bestseller
            })

        })

        .catch(err=>console.log(`Error happened when displaying product details form :${err}`)); 
  
});

// router.post("/cleanShoppingCart",(req,res)=>{

//     userModel.findOne({email:req.body.email})
//     const sgMail = require('@sendgrid/mail');
//     sgMail.setApiKey(process.env.SEND_GRID_API_KEY);    
//     const msg = {
//     to: `${email}` ,
//     from: `test@got.com`,
//     subject: "Registration to Shopper's Paradise complete",
//     html: `<strong>Welcome to SHOPPER'S PARADISE `
//     };

//     sgMail.send(msg)
//     .then(()=>{
//         req.session.destroy();
//         res.redirect("/User/logIn"); 
//     })
//     .catch(err=>{
//         console.log(`Error ${err}`);
//     });
     
     
//  })


module.exports = router;