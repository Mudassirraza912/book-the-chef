const Food = require('../models/food');
const Chef = require('../models/chef');
const Order = require('../models/order');

const resturantFoods = async(foodIds)=>{
    try{
       const foods = await Food.find({_id:{$in:foodIds}}).sort({addedtAt: -1});;
       return foods.map(food=>{
           return{
               ...food._doc
           }
       });
    }catch(error){
        throw error;
    }
};

const resturantChefs = async(chefIds)=>{
    try{
       const chefs = await Chef.find({_id:{$in:chefIds}}).sort({addedtAt: -1});;
       return chefs.map(chef=>{
           return{
               ...chef._doc
           }
       });
    }catch(error){
        throw error;
    }
};


const userOrders = async(orderId)=>{
    try{
       const orders = await Order.find({_id:{$in:orderId}}).sort({addedtAt: -1});;
       return orders.map(order=>{
           return{
               ...order._doc
           }
       });
    }catch(error){
        throw error;
    }
};


exports.resturantFoods = resturantFoods; 
exports.resturantChefs = resturantChefs; 
exports.userOrders = userOrders; 