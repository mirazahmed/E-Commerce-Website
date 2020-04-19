const bestSoldItems=
{
    bestSoldProducts:[],

    init()
    {
        this.bestSoldProducts.push({title:"Men's Watch",picturePath:"/images/wristWatch.jpg"});
    
        this.bestSoldProducts.push({title:"Wireless Mouse",picturePath:"/images/electronics.jpg"});
        
        this.bestSoldProducts.push({title:'Headphones',picturePath:"/images/headphones.jpg"});

        this.bestSoldProducts.push({title:'Jeans',picturePath:"/images/jeans.jpg"});
    },

    getbestSoldProducts()
    {
        return this.bestSoldProducts;
    }
}
bestSoldItems.init();
module.exports=bestSoldItems;

