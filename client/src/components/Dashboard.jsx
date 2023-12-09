import React from "react";

const Dashboard = ({ setAuth }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Dashboard</h1>
      <button
        onClick={() => setAuth(false)}
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
