import { connectionstr } from "@/app/lib/db";
import { restaurantschema } from "@/app/lib/restaurantmodel";
import { foodschema } from "@/app/lib/foodmodel"; // Make sure this is correctly imported
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const id = params.id;
        await mongoose.connect(connectionstr, { useNewUrlParser: true, useUnifiedTopology: true });

        const detail = await restaurantschema.findOne({ _id: id });
        const food = await foodschema.find({ resto_id: id });

        if (!detail || !food) {
            return NextResponse.json({ success: false, message: "Restaurant or food not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, detail, food });
    } catch (error) {
        console.error("Error fetching restaurant or food details:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    } finally {
        mongoose.connection.close(); // Ensure connection is closed
    }
}
