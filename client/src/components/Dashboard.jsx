import React, { useEffect, useState } from "react";

const Dashboard = ({ setAuth }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log("Error Fetching User: ", error));
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Dashboard</h1>
      <button
        onClick={() => setAuth(false)}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Logout
      </button>

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
