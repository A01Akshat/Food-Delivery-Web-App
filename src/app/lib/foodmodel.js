const { default: mongoose } = require("mongoose");

const foodmodel=new mongoose.Schema({
    name:String,
    price:Number,
    img_path:String,
    description:String,
    resto_id:mongoose.Schema.Types.ObjectId

});

export const foodschema=mongoose.models.foods
|| mongoose.model("foods",foodmodel)