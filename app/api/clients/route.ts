import ClientModel from "@/models/Client.js";
import connectDB from "@/config/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    await connectDB();
    const { name, dateOfBirth, gender, referralSource } = await req.json();
    const client = new ClientModel({
        name,
        dateOfBirth,
        gender,
        referralSource,
    });
    await client.save();
    return new NextResponse(JSON.stringify(client), { status: 200 });    
}