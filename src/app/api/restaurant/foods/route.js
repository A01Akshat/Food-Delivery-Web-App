import { connectionstr } from "@/app/lib/db";
import { foodschema } from "@/app/lib/foodmodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(request){
    const payload=await request.json();
    let success=false;
    await mongoose.connect(connectionstr,{useNewUrlParser:true});
    const food=new foodschema(payload)
    const result=await food.save();
    if(result)
        {
            success=true
        }
    return NextResponse.json({result,success:true})
}