import React from "react";
import { useUser } from "../context/UserContext";

const Dashboard = ({ setAuth }) => {
  const { currentUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <div className="p-10 bg-[#38e9e9] h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold underline">Dashboard</h1>
        {currentUser && (
          <div className="mt-4 border">
            <p>Logged in as: {currentUser.user_name}</p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-blue-500 text-black 
            font-semibold hover:text-white py-2 px-4 
            border border-black hover:border-transparent rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
