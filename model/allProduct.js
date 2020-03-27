
const allProducts =
{
    allProductsList:[],

    init()
    {

        this.allProductsList.push({title:"Men's Watch",picturePath:"/images/wristWatch.jpg",price: "$100",category: "Men's Accessories",bestSeller: "True" });
    
        this.allProductsList.push({title:"Wireless Mouse",picturePath:"/images/electronics.jpg", price: "$30",category: "Computer Accessories",bestSeller: "True" });
        
        this.allProductsList.push({title:'Headphone',picturePath:"/images/headphones.jpg",price: "$250",category: "Headphones",bestSeller: "True" });

        this.allProductsList.push({title:'Jeans',picturePath:"/images/jeans.jpg",price: "$50",category: "Pants & Trousers",bestSeller: "True"});

        this.allProductsList.push({title:'Shoes',picturePath:"/images/shoes.jpg",price: "$50",category: "Footwears",bestSeller: ""});

        this.allProductsList.push({title:'HandBags',picturePath:"/images/handbags.jpg",price: "$100",category: "Bags",bestSeller: ""});

        this.allProductsList.push({title:"Sofa Set",picturePath:"/images/furnitures.jpg",price: "$1500",category: "Furnitures",bestSeller: ""});

        this.allProductsList.push({title:'SmartWatch',picturePath:"/images/smartWatch.jpg",price: "$200",category: "Smart Watches",bestSeller: "" });
    },

    getallProductsList()
    {
        return this.allProductsList;
   }
}
allProducts.init();
module.exports=allProducts;