import { connectionstr } from "@/app/lib/db";
import { restaurantschema } from "@/app/lib/restaurantmodel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// ek route file mei ek he POST and GET bna sakte hai not more than that

//restaurant signup
export async function GET() {
    await mongoose.connect(connectionstr, { useNewUrlParser: true })

    const data = await restaurantschema.find()
    console.log(data)

    return NextResponse.json({ result: data })
}

export async function POST(request) {
    let payload = await request.json()
    let result;
    let success=false;
    await mongoose.connect(connectionstr, { useNewUrlParser: true })

    if (payload.login) {
        //for login
        result = await restaurantschema.findOne({ email: payload.email, pass: payload.pass })
        if(result)
            {
                success=true
            }
    }
    else {
        // for signup
        const restaurant = new restaurantschema(payload)
        result = await restaurant.save()
        if(result)
            {
                success=true;
            }
    }


    console.log(payload)
    return NextResponse.json({ result, success })
}