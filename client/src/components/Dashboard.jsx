import React, { useEffect, useState } from "react";

const Dashboard = ({ setAuth }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log("Error Fetching User: ", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };
  return (
    <div className="p-10 bg-[#1877F2]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold underline">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-blue-500 text-white 
          font-semibold hover:text-white py-2 px-4 
          border border-black hover:border-transparent rounded"
        >
          Logout
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Users:</h2>
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              <p>Name: {user.user_name}</p>
              <p>Email: {user.user_email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
