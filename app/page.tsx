"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Define the structure of the client data
interface Client {
  _id: string;
  name: string;
  // Optionally add other fields here if needed, e.g., nextSession: string
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<Client[]>([]); // Type the state as an array of Client objects

  // Fetch clients data from /clients route
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/clients");
        if (!response.ok) throw new Error("Failed to fetch clients");

        const data: Client[] = await response.json(); // Type the fetched data as an array of Client objects
        setClients(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  // Function to filter clients based on the search term
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Client Dashboard</h1>
        </header>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <li key={client._id}>
                <Link href={`/sessions/${client._id}`} passHref>
                  <div className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
                      <div className="text-lg font-medium text-blue-600">
                        {client.name}
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
        <Link href="/add-client">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-2">
            Add New Client
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
