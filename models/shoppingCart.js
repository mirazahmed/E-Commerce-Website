const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//This schema indicates the shape of documents that will be entering in the DB
const shoppingCartSchema = new Schema({
 
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

    qtyPurchased:{
        type:Number,
        required:true
    },

    productPic:
    {
        type:String
    },

    dateCreated:{
        type:Date,
        default:Date.now()
    },

    total:{
        type:Number,
        required: true
    },

    user:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
        
    }
    
});

const shoppingCartModel = mongoose.model('shoppingCartItem', shoppingCartSchema);

module.exports = shoppingCartModel;