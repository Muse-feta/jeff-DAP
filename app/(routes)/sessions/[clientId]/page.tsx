"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

interface Client {
  _id: string;
  name: string;
  dateOfBirth: string;
  referralSource: string;
}

const Page = ({ params }: { params: { clientId: string } }) => {
  const clientId = params.clientId;
  const [session, setSession] = useState<SessionData[] | undefined>(undefined);
  const [clientInfo, setClientInfo] = useState<Client | null>(null);
  const [openSessionIndex, setOpenSessionIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenSessionIndex(openSessionIndex === index ? null : index);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`/api/clients/${clientId}`);
        if (!response.ok) throw new Error("Failed to fetch clients");

        const data: Client = await response.json();
        setClientInfo(data);

        console.log(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, [clientId]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`/api/sessions/${clientId}`);
        if (!response.ok) throw new Error("Failed to fetch sessions");

        const data: SessionData[] = await response.json();
        setSession(data);

        // Set openSessionIndex to the last session index
        setOpenSessionIndex(data.length - 1);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchSessions();
  }, [clientId]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Client Sessions</h1>

      {clientInfo && ( // Check if clientInfo is not null
        <div className="mb-4 border rounded-lg overflow-hidden shadow-md">
          <div className="p-4 bg-white border-t text-gray-700">
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {clientInfo.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Date of Birth:</span>{" "}
              {formatDate(clientInfo.dateOfBirth)}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Referral Source:</span>{" "}
              {clientInfo.referralSource}
            </p>
          </div>
        </div>
      )}
      {session?.map((sess, index) => (
        <div
          key={index}
          className="mb-4 border rounded-lg overflow-hidden shadow-md"
        >
          <button
            className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-200 font-semibold text-lg"
            onClick={() => toggleAccordion(index)}
          >
            {`Session ${index + 1}`}
          </button>
          {openSessionIndex === index && (
            <div className="p-4 bg-white border-t text-gray-700">
              <p className="mb-2">
                <span className="font-semibold">Date:</span>{" "}
                {formatDate(sess.date)}
              </p>
              <div className="mb-4">
                <h3 className="font-semibold text-xl text-center my-3 bg-gray-100">
                  Data
                </h3>
                <div className="mx-10">
                  <p className="mb-1">
                    <span className="font-semibold">Presenting Problem:</span>{" "}
                    {sess.data.presentingProblem}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Mental Status:</span>{" "}
                    {sess.data.mentalStatus}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Appearance:</span>{" "}
                    {sess.data.appearance}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Interventions Used:</span>{" "}
                    {sess.data.interventionsUsed}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Client Response:</span>{" "}
                    {sess.data.clientResponse}
                  </p>
                  {sess.data.screenerResults && (
                    <p className="mb-1">
                      <span className="font-semibold">Screener Results:</span>{" "}
                      {sess.data.screenerResults}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-xl text-center my-3 bg-gray-100">
                  Assessment
                </h3>
                <div className="mx-10">
                  <p className="mb-1">
                    <span className="font-semibold">Diagnosis:</span>{" "}
                    {sess.assessment.diagnosis}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Self-Harm Risk:</span>{" "}
                    {sess.assessment.selfHarmRisk}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Suicidal Thoughts:</span>{" "}
                    {sess.assessment.suicidalThoughts}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Homicidal Thoughts:</span>{" "}
                    {sess.assessment.homicidalThoughts}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Progress:</span>{" "}
                    {sess.assessment.progress}
                  </p>
                  {sess.assessment.goalChanges && (
                    <p className="mb-1">
                      <span className="font-semibold">Goal Changes:</span>{" "}
                      {sess.assessment.goalChanges}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-xl text-center my-3 bg-gray-100">
                  Plan
                </h3>
                <div className="mx-10">
                  <p className="mb-1">
                    <span className="font-semibold">Homework:</span>{" "}
                    {sess.plan.homework}
                  </p>
                  {sess.plan.referrals && (
                    <p className="mb-1">
                      <span className="font-semibold">Referrals:</span>{" "}
                      {sess.plan.referrals}
                    </p>
                  )}
                  <p className="mb-1">
                    <span className="font-semibold">Takeaways:</span>{" "}
                    {sess.plan.takeaways}
                  </p>
                  {sess.plan.nextSession && (
                    <p className="mb-1">
                      <span className="font-semibold">Next Session:</span>{" "}
                      {formatDateTime(sess.plan.nextSession)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <Link href={`/clients/${clientId}`}>
        <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200">
          Add Session
        </button>
      </Link>
      <Link href="/">
        <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 mt-3">
          Back To Home
        </button>
      </Link>
    </div>
  );
};

export default Page;
