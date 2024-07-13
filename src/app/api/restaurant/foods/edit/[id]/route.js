import { connectionstr } from "@/app/lib/db";
import { foodschema } from "@/app/lib/foodmodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function GET(request,content){
    const id=content.params.id
    let success=false;
    await mongoose.connect(connectionstr,{useNewUrlParser:true});
    const result=await foodschema.find({_id:id});
    if(result)
        {
            success=true
        }
    return NextResponse.json({result,success})
}

export async function PUT(request,content)
{
    const id=content.params.id
    const payload=await request.json();
    let success=false;
    await mongoose.connect(connectionstr,{useNewUrlParser:true});
    const result=await foodschema.findOneAndUpdate({_id:id},payload);

    if(result)
        {
            success=true;
        }
        return NextResponse.json({result,success})

}