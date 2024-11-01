import SessionModel from "@/models/Session.js";
import connectDB from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async (req: NextRequest, {params}: {params: {clientId: string}}) => {
  var clientId = params.clientId
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body
    const formData = await req.json();
    console.log("formData", formData);

    // Validate form data (add validation as needed)
    if (!formData) {
      return new NextResponse(JSON.stringify({ error: "Invalid form data" }), {
        status: 400,
      });
    }

    // Convert clientId to a mongoose ObjectId
   const objectClientId = new mongoose.Types.ObjectId(clientId);

    // Create a new session model instance
    const session = new SessionModel({
      clientId: objectClientId, // Ensure clientId is included
      date: formData.date,
      data: {
        presentingProblem: formData.data.presentingProblem,
        mentalStatus: formData.data.mentalStatus,
        appearance: formData.data.appearance,
        interventionsUsed: formData.data.interventionsUsed,
        clientResponse: formData.data.clientResponse,
        screenerResults: formData.data.screenerResults,
      },
      assessment: {
        diagnosis: formData.assessment.diagnosis,
        selfHarmRisk: formData.assessment.selfHarmRisk,
        suicidalThoughts: formData.assessment.suicidalThoughts,
        homicidalThoughts: formData.assessment.homicidalThoughts,
        progress: formData.assessment.progress,
        goalChanges: formData.assessment.goalChanges,
      },
      plan: {
        homework: formData.plan.homework,
        referrals: formData.plan.referrals,
        takeaways: formData.plan.takeaways,
        nextSession: new Date(formData.plan.nextSession), // Ensure date is properly formatted
      },
    });

    // Save the session to the database
    await session.save();

    // Return the saved session data with a success response
    return new NextResponse(JSON.stringify(session), { status: 201 });
  } catch (error) {
    // Handle any errors
    console.error("Error saving session:", error);
    return new NextResponse(
      JSON.stringify({ error: "An error occurred while saving the session" }),
      { status: 500 }
    );
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params?: { clientId: string } }
) => {
  // Check if params and clientId are defined
  if (!params || !params.clientId) {
    return new NextResponse(JSON.stringify({ error: "clientId is required" }), {
      status: 400,
    });
  }

  var clientId = params.clientId;

  try {
    await connectDB();
    // Convert clientId to ObjectId type
    const objectId = new mongoose.Types.ObjectId(clientId);
    console.log("objectId", objectId);

    // Find the session by clientId
    const session = await SessionModel.find({ clientId: objectId });

    // Return the session data if found
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Session not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(session), { status: 200 });
  } catch (error) {
    console.error("Error fetching session:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch session" }),
      { status: 500 }
    );
  }
};

