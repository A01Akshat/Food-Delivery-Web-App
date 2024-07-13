import { connectionstr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/usermodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    let success = false;
    let result = null;

    try {
        const payload = await request.json();
        await mongoose.connect(connectionstr, { useNewUrlParser: true, useUnifiedTopology: true });

        const user = new userSchema(payload);
        result = await user.save();
        success = true;
    } catch (error) {
        console.error("Error saving user:", error);
        return NextResponse.json({ error: error.message, success });
    } finally {
        await mongoose.disconnect();
    }

    return NextResponse.json({ result, success });
}
