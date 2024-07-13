import { connectionstr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/usermodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Ensure the model is defined only once
const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function POST(request) {
  try {
    const payload = await request.json();
    let success = false;
    let result = null;

    // Connect to the database
    await mongoose.connect(connectionstr, { useNewUrlParser: true, useUnifiedTopology: true });

    // Find the user by email and password
    const user = await User.findOne({ email: payload.email, password: payload.password });

    if (user) {
      success = true;
      // Exclude the password from the result
      result = { ...user._doc, password: undefined };
    }

    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    await mongoose.disconnect();
  }
}
