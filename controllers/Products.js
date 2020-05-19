const express = require('express')
const router = express.Router();
const path = require("path");
const productModel = require("../models/Product");
const shoppingCartModel = require("../models/shoppingCart");
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


//update route
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

//delete route
router.delete("/delete/:id",(req,res)=>{

    productModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/product/list");
    })
    .catch(err=>console.log(`Error happened when deleting from the DB :${err}`)); 
});


//search rout..will be implemented later
// router.post("/display",(req,res)=>{

//     const searchValue = req.body.productsearch;

//     productModel.find({category: searchValue})
    
//     .then((products)=>{

//         const filteredProduct = products.map((product)=>{
    
//                 return{
//                     prodTitle: product.prodTitle,
//                     category: product.category,
//                     quantity: product.quantity,
//                     bestSeller: product.bestseller,
//                     productPic: product.productPic
//                 }
    
//             });
    
//             res.render("Product/productSearch",{
//                  data : filteredProduct
//             });
            
//         })
//         .catch(err=>console.log(`Error happened when pulling from the DB :${err}`)); 

   
// })

//product Details rout
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


//Product Details POST rout
router.post("/productDetails/:id",isAuthenticated,(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{

    const{prodTitle,productPic,price,description} = product

    const shoppingCartItem = {
        prodTitle : prodTitle,
        productPic : productPic,
        price : price,
        description : description,
        qtyPurchased : req.body.addQty,
        total : price * req.body.addQty,
    }

    const shoppingItem = new shoppingCartModel(shoppingCartItem);
    shoppingItem.save()
    .then(()=>{
        res.redirect("/product/shoppingCart");
    })
    .catch(err=>console.log(`error happened while inserting shoppingCart item ${err}`));  
  
});

//Shopping Cart rout
 router.get("/shoppingCart",isAuthenticated,(req,res)=>{

    shoppingCartModel.find()
    .then(shoppingCartItems=>{

        const filteredProduct = shoppingCartItems.map((shoppingCartItem)=>{

            return{
                productPic: shoppingCartItem.productPic,
                prodTitle: shoppingCartItem.prodTitle,
                price: shoppingCartItem.price,
                description: shoppingCartItem.description,
                qtyPurchased: shoppingCartItem.qtyPurchased,
                total: shoppingCartItem.total
            }

        });

        res.render("Product/shoppingCart",{
            data : filteredProduct
         });

        })
        .catch(err=>console.log(`error happened while pulling shoppingCart item  from DB ${err}`));
    });
    
})


//Order placement
router.get("/placeOrder",isAuthenticated,(req,res)=>{

    shoppingCartModel.find()
    .then(shoppingCartItems=>{

        const filteredProducts = shoppingCartItems.map((shoppingCartItem)=>{

            return{
                prodTitle: shoppingCartItem.prodTitle,
                price: shoppingCartItem.price,
                qtyPurchased: shoppingCartItem.qtyPurchased,
                total: shoppingCartItem.total
            }

        });

        let sumTotal = 0;         
        let userEmail = req.session.userInfo.email;
        let str = "";
                    

        for(let i = 0;i<filteredProducts.length;i++){
            sumTotal = sumTotal+filteredProducts[i].total;
            str += `<tr><td>${filteredProducts[i].prodTitle}</td><td>${filteredProducts[i].price}</td>
              <td>${filteredProducts[i].qtyPurchased}</td><td>${filteredProducts[i].total}</td></tr>`;
            };
       
            
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.EMAIL_API_KEY);
            
            
                const msg = {
                    to: `${userEmail}`,
                    from: `mahmed175@myseneca.ca`,
                    subject: "Product Invoice",
                    html: 
                    
                        `
                        <html>
                        <body>
                        <p>Thank you ${req.session.userInfo.firstName}  ${req.session.userInfo.lastName} for your purchase.<br> 
                        Here is your invoice</p>
                        <table>
                        <tr>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Product Total</th>
                        </tr>
                            ${str}   
                        </table> 
                            Order Total: ${sumTotal}
                        </body>
                        </html>
                       `                   
                };    
                                                  
            sgMail.send(msg)
            .then(()=>{
                               
                    shoppingCartModel.deleteMany()
                    .then(()=>{
                        req.session.destroy();
                        res.redirect("/User/logout"); 
                    })
                    
                    .catch(err=>console.log(`Error happened when deleting from the DB :${err}`)); 
                    })

            .catch(err=>{
                console.log(`Error sending email ${err}`);
            });    
     
    })
           
    .catch(err=>console.log(`error happened while pulling shoppingCart item  from DB ${err}`));
   
   
 })


module.exports = router;