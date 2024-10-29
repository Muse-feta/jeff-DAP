import SessionModel from "@/models/Session.js";
import connectDB from "@/config/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    await connectDB();
    const { clientId, ...formData } = await req.json();
    const session = new SessionModel({
        clientId,
        ...formData,
    });
    await session.save();
    return new NextResponse(JSON.stringify(session), { status: 200 });
};