import { connectionstr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordermodel";
import { restaurantschema } from "@/app/lib/restaurantmodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const payload = await request.json();

        await mongoose.connect(connectionstr, { useNewUrlParser: true });

        const orderObject = new orderSchema(payload);
        const result = await orderObject.save();

        mongoose.disconnect(); // Disconnect from MongoDB after operation

        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error saving order:", error);
        return NextResponse.json({ error: "Failed to save order", success: false });
    }
}


export async function GET(request)
{
    const userid=request.nextUrl.searchParams.get('id');
    await mongoose.connect(connectionstr, { useNewUrlParser: true });
    
    let result=await orderSchema.find({user_id:userid});
    if(result)
    {
        let restodata=await Promise.all(result.map(async(item)=>{
            let restoinfo={};
            restoinfo.data=await restaurantschema.findOne({_id:item.resto_id})
            return restoinfo
        }))
        result=restodata
        success=true
    }
    let success=false;
    return NextResponse.json({result})

}