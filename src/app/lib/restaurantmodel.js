const { default: mongoose } = require("mongoose");

const restaurantmodel=new mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    city:String,
    addr:String,
    contact:String,

});
export const restaurantschema=mongoose.models.restaurants
|| mongoose.model("restaurants",restaurantmodel)