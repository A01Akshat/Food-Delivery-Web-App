import { connectionstr } from "@/app/lib/db";
import { foodschema } from "@/app/lib/foodmodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    const id=content.params.id
    let success=false;
    await mongoose.connect(connectionstr,{useNewUrlParser:true});
    const result=await foodschema.find({resto_id:id});
    if(result)
        {
            success=true
        }
    return NextResponse.json({result,success})
}

export async function DELETE(request,content){
    const id=content.params.id
    let success=false;
    await mongoose.connect(connectionstr,{useNewUrlParser:true});
    const result=await foodschema.deleteOne({_id:id});
    if(result.deletedCount>0)
        {
            success=true
        }
    return NextResponse.json({result,success})
}