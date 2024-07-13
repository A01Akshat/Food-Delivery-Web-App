import { connectionstr } from "@/app/lib/db";
import { restaurantschema } from "@/app/lib/restaurantmodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(connectionstr, { useUnifiedTopology: true });
    let result = await restaurantschema.find();
    result = result.map((item) => item.city.charAt(0).toUpperCase() + item.city.slice(1));

    // to remove duplicate entries
    result = [...new Set(result.map((item) => item))];
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error handling the request:", error);
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await mongoose.disconnect();
  }
}
