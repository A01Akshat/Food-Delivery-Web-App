import { connectionstr } from '@/app/lib/db';
import { restaurantschema } from '@/app/lib/restaurantmodel';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
       
        let queryParams = request.nextUrl.searchParams;
        let location = queryParams.get('location');
        let filter={}
        console.log("Location:", location);
        if(queryParams.get("location"))
        {
            let city=queryParams.get("location")
            // MAKES IT CASE INSENSITIVE REGEX
            filter={city:{$regex:new RegExp(city,'i')}}
        }else if (queryParams.get("restaurant")){
            let name=queryParams.get("restaurant")
            // MAKES IT CASE INSENSITIVE REGEX
            filter={name:{$regex:new RegExp(name,'i')}}
            
        }       
        
        await mongoose.connect(connectionstr,{useNewUrlParser:true});
        
        let result=await restaurantschema.find(filter)




        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Error handling the request:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
