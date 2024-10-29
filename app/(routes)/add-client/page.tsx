"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddClientForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    referralSource: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Client added successfully!");
        setFormData({
          name: "",
          dateOfBirth: "",
          gender: "",
          referralSource: "",
        });
        router.push('/');
      } else {
        alert("Error adding client.");
      }
    } catch (error) {
      console.error("Failed to add client:", error);
      alert("Failed to add client.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Client</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dateOfBirth"
            className="block text-gray-700 font-medium mb-2"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-gray-700 font-medium mb-2"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="referralSource"
            className="block text-gray-700 font-medium mb-2"
          >
            Referral Source
          </label>
          <input
            type="text"
            id="referralSource"
            name="referralSource"
            value={formData.referralSource}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md focus:outline-none focus:ring"
        >
          Add Client
        </button>
      </form>
    </div>
  );
}
