const products=
{
    productCategory:[],

    init()
    {

        this.productCategory.push({title:'Electronics',picturePath:"/images/electronics.jpg"});
    
        this.productCategory.push({title:'Jeans',picturePath:"/images/jeans.jpg"});
        
        this.productCategory.push({title:'Headphones',picturePath:"/images/headphones.jpg"});

        this.productCategory.push({title:'SmartWatch',picturePath:"/images/smartWatch.jpg"});
    },

    getAllProducts()
    {
        return this.productCategory;
    }
}

products.init();
module.exports=products;