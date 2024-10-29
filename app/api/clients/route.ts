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

// GET request to retrieve all clients
export const GET = async () => {
    await connectDB();
    try {
        const clients = await ClientModel.find();
        return new NextResponse(JSON.stringify(clients), { status: 200 });
    } catch (error) {
        console.error("Error fetching clients:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to fetch clients" }), { status: 500 });
    }
};