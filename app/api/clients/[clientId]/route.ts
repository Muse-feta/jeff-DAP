import connectDB from "@/config/database.js";
import ClientModel from "@/models/Client.js"; // Ensure this is the correct import for your Client model
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params?: { clientId: string } }
) => {
  try {
    // Connect to the database
    await connectDB();

    // Check if params and clientId are defined
    if (!params || !params.clientId) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    const { clientId } = params;

    // Check if clientId is a valid ObjectId
    if (!mongoose.isValidObjectId(clientId)) {
      return NextResponse.json(
        { error: "Invalid Client ID format" },
        { status: 400 }
      );
    }

    // Fetch client data from the database
    const clientData = await ClientModel.findById(clientId);

    if (!clientData) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Return the fetched client data
    return NextResponse.json(clientData, { status: 200 });
  } catch (error) {
    console.error("Error fetching client data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params?: { clientId: string } }
) => {
  try {
    // Connect to the database
    await connectDB();

    // Check if params and clientId are defined
    if (!params || !params.clientId) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    const { clientId } = params;

    // Check if clientId is a valid ObjectId
    if (!mongoose.isValidObjectId(clientId)) {
      return NextResponse.json(
        { error: "Invalid Client ID format" },
        { status: 400 }
      );
    }

    // Delete the client from the database
    const deletedClient = await ClientModel.findByIdAndDelete(clientId);

    if (!deletedClient) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Return success response
    return NextResponse.json(
      { message: "Client deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
