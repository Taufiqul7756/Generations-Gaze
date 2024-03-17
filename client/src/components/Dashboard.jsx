import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Dashboard = ({ setAuth }) => {
  const [currentUsersToken, setCurrentUsersToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  console.log("currentUsersToken:", currentUsersToken);
  console.log("currentUser:", currentUser);

  useEffect(() => {
    // Decode token to get current user info
    const token = localStorage.getItem("token");
    console.log("token:", token);
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUsersToken(decoded);
      fetchUserData(decoded.user);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User data:", userData);
        setCurrentUser(userData);
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <div className="p-10 bg-[#1877F2]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold underline">Dashboard</h1>
        {currentUser && (
          <div className="mt-4 border ">
            <p>Logged in as: {currentUser.user_name}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-blue-500 text-white 
          font-semibold hover:text-white py-2 px-4 
          border border-black hover:border-transparent rounded"
        >
          Logout
        </button>
      </div>

      {/* <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Users:</h2>
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              <p>Name: {user.user_name}</p>
              <p>Email: {user.user_email}</p>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Dashboard;
