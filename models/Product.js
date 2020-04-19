const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//This schema indicates the shape of documents that will be entering in the DB
const productSchema = new Schema({
 
    prodTitle:{
        type:String,
        required:true
    },
    
    price:{
        type:Number,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    quantity:{
        type:Number,
        required:true
    },

    bestseller:{
        type:String,
        required:true
    },

    status:{
        type:String,
        default:"Open"
    },

    productPic:
    {
        type:String
    },

    dateCreated:{
        type:Date,
        default:Date.now()
    }
  
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;