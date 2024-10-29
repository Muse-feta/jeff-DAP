"use client"
import { useState } from "react";
import Link from "next/link";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const clients = [
  {
    id: "1",
    name: "Alex Smith",
    nextSession: "2023-11-02T10:00:00Z",
  },
  {
    id: "2",
    name: "Jamie Doe",
    nextSession: "2023-11-05T14:30:00Z",
  },
  {
    id: "3",
    name: "Jordan Brown",
    nextSession: "2023-11-10T09:00:00Z",
  },
];

  // Function to filter clients based on the search term
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Client Dashboard</h1>
          <Link href="/add-client">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Add New Client
            </button>
          </Link>
        </header>

        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <li key={client.id}>
                <Link href={`/clients/${client.id}`} passHref>
                  <div className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
                      <div className="text-lg font-medium text-blue-600">
                        {client.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Next Session:{" "}
                        <span className="font-semibold">
                          {new Date(client.nextSession).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
