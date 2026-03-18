// src/pages/Profile.jsx
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function Profile() {
  // Dummy user data
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@gmail.com",
    role: "Administrator",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Here you can add API call if backend is ready
    setEditMode(false);
    console.log("Updated User:", user);
  };

  return (
    <div className="flex min-h-screen bg-linear-to-b from-purple-50 via-pink-50 to-teal-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 flex justify-center items-start">
          <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6 transition-all duration-500 hover:shadow-3xl">
            <h2 className="text-3xl font-extrabold text-purple-700 text-center drop-shadow-md">
              Profile
            </h2>

            {/* Name */}
            <div className="flex flex-col">
              <label className="text-purple-700 font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                disabled={!editMode}
                onChange={handleChange}
                className={`p-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 ${
                  editMode ? "opacity-100" : "opacity-80 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-purple-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                disabled={!editMode}
                onChange={handleChange}
                className={`p-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 ${
                  editMode ? "opacity-100" : "opacity-80 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Role */}
            <div className="flex flex-col">
              <label className="text-purple-700 font-semibold mb-1">Role</label>
              <input
                type="text"
                name="role"
                value={user.role}
                disabled
                className="p-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 opacity-80 cursor-not-allowed"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-linear-to-r from-purple-400 to-pink-500 text-white font-bold p-3 rounded-2xl shadow-lg hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-linear-to-r from-teal-400 to-purple-400 text-white font-bold p-3 rounded-2xl shadow-lg hover:from-teal-500 hover:to-purple-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-red-500/50 text-white font-bold p-3 rounded-2xl shadow-lg hover:bg-red-600/50 transition-all duration-300 w-full"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}