"use client";
import React, { useState } from "react";

// Define types for the session data structure
interface SessionData {
  date: string;
  data: {
    presentingProblem: string;
    mentalStatus: string;
    appearance: string;
    interventionsUsed: string;
    clientResponse: string;
    screenerResults?: string;
  };
  assessment: {
    diagnosis: string;
    selfHarmRisk: "Low" | "Moderate" | "High";
    suicidalThoughts: "None" | "Passive" | "Active";
    homicidalThoughts: "None" | "Passive" | "Active";
    progress: string;
    goalChanges?: string;
  };
  plan: {
    homework: string;
    referrals?: string;
    takeaways: string;
    nextSession?: string;
  };
}

function SessionForm({params}: {params: {clientId: string}}) {
  console.log("clientId", params.clientId);
  const clientId = params.clientId
  
  const [sessionData, setSessionData] = useState<SessionData>({
    date: new Date().toISOString().split("T")[0], // Defaults to today's date
    data: {
      presentingProblem: "",
      mentalStatus: "",
      appearance: "",
      interventionsUsed: "",
      clientResponse: "",
      screenerResults: "",
    },
    assessment: {
      diagnosis: "",
      selfHarmRisk: "Low",
      suicidalThoughts: "None",
      homicidalThoughts: "None",
      progress: "",
      goalChanges: "",
    },
    plan: {
      homework: "",
      referrals: "",
      takeaways: "",
      nextSession: new Date().toISOString().split("T")[0],
    },
  });

  console.log("client sessionData",sessionData)

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    section: "data" | "assessment" | "plan" | null,
    field: string
  ) => {
    setSessionData((prevData: SessionData) => {
      if (section) {
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [field]: e.target.value,
          },
        };
      } else {
        return {
          ...prevData,
          [field]: e.target.value,
        };
      }
    });
  };

  console.log(sessionData);
  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/sessions/${clientId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit session data");
      }

      const result = await response.json();
      console.log("Session data submitted successfully:", result);

      // Optionally reset form or navigate, etc.
      setSessionData({
        date: new Date().toISOString().split("T")[0], // Reset to today's date
        data: {
          presentingProblem: "",
          mentalStatus: "",
          appearance: "",
          interventionsUsed: "",
          clientResponse: "",
          screenerResults: "",
        },
        assessment: {
          diagnosis: "",
          selfHarmRisk: "Low",
          suicidalThoughts: "None",
          homicidalThoughts: "None",
          progress: "",
          goalChanges: "",
        },
        plan: {
          homework: "",
          referrals: "",
          takeaways: "",
          nextSession: new Date().toISOString().split("T")[0],
        },
      });
    } catch (error) {
      console.error("Error submitting session data:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Session Details</h2>

        {/* Session Date */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Date:
        </label>
        <input
          type="date"
          value={sessionData.date}
          onChange={(e) => handleChange(e, null, "date")}
          required
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Presenting Problem */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Presenting Problem:
        </label>
        <textarea
          value={sessionData.data.presentingProblem}
          onChange={(e) => handleChange(e, "data", "presentingProblem")}
          required
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Mental Status */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mental Status:
        </label>
        <textarea
          value={sessionData.data.mentalStatus}
          onChange={(e) => handleChange(e, "data", "mentalStatus")}
          required
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Appearance */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Appearance:
        </label>
        <textarea
          value={sessionData.data.appearance}
          onChange={(e) => handleChange(e, "data", "appearance")}
          required
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Interventions Used */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interventions Used:
        </label>
        <textarea
          value={sessionData.data.interventionsUsed}
          onChange={(e) => handleChange(e, "data", "interventionsUsed")}
          required
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Client Response */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Client Response:
        </label>
        <textarea
          value={sessionData.data.clientResponse}
          onChange={(e) => handleChange(e, "data", "clientResponse")}
          required
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Screener Results */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Screener Results:
        </label>
        <textarea
          value={sessionData.data.screenerResults || ""}
          onChange={(e) => handleChange(e, "data", "screenerResults")}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Diagnosis */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Diagnosis:
        </label>
        <textarea
          value={sessionData.assessment.diagnosis}
          onChange={(e) => handleChange(e, "assessment", "diagnosis")}
          required
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Self Harm Risk */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Self Harm Risk:
        </label>
        <select
          value={sessionData.assessment.selfHarmRisk}
          onChange={(e) => handleChange(e, "assessment", "selfHarmRisk")}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>

        {/* Suicidal Thoughts */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Suicidal Thoughts:
        </label>
        <select
          value={sessionData.assessment.suicidalThoughts}
          onChange={(e) => handleChange(e, "assessment", "suicidalThoughts")}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="None">None</option>
          <option value="Passive">Passive</option>
          <option value="Active">Active</option>
        </select>

        {/* Homicidal Thoughts */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Homicidal Thoughts:
        </label>
        <select
          value={sessionData.assessment.homicidalThoughts}
          onChange={(e) => handleChange(e, "assessment", "homicidalThoughts")}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="None">None</option>
          <option value="Passive">Passive</option>
          <option value="Active">Active</option>
        </select>

        {/* Progress */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Progress:
        </label>
        <textarea
          value={sessionData.assessment.progress}
          onChange={(e) => handleChange(e, "assessment", "progress")}
          required
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Goal Changes */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Goal Changes:
        </label>
        <textarea
          value={sessionData.assessment.goalChanges || ""}
          onChange={(e) => handleChange(e, "assessment", "goalChanges")}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Plan: Homework */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Homework:
        </label>
        <textarea
          value={sessionData.plan.homework}
          onChange={(e) => handleChange(e, "plan", "homework")}
          required
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Referrals */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Referrals:
        </label>
        <textarea
          value={sessionData.plan.referrals || ""}
          onChange={(e) => handleChange(e, "plan", "referrals")}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Takeaways */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Takeaways:
        </label>
        <textarea
          value={sessionData.plan.takeaways}
          onChange={(e) => handleChange(e, "plan", "takeaways")}
          required
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Next Session */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Next Session:
        </label>
        <input
          type="date"
          value={sessionData.plan.nextSession || ""}
          onChange={(e) => handleChange(e, "plan", "nextSession")}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit Session
        </button>
      </form>
    </div>
  );
}

export default SessionForm;
