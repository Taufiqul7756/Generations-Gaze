import React, { useEffect, useState } from "react";

const Dashboard = ({ setAuth }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  console.log("currentUser:", currentUser);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log("Error Fetching User: ", error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchDashboard(token);
    }
  }, []);

  const fetchDashboard = async (token) => {
    console.log("token:", token);
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user_name); // Assuming the response has a user_name field
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };
  return (
    <div className="p-10 bg-[#1877F2] h-screen">
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

      {currentUser && (
        <div className="mt-4 border text-red">
          <p>Logged in as: {currentUser}</p>
        </div>
      )}

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
