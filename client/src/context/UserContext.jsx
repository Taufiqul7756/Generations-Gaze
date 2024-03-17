import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUsersToken, setCurrentUsersToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  console.log("currentUsers uuid:", currentUsersToken);
  console.log("currentUser:", currentUser);

  useEffect(() => {
    // Decode token to get current user info
    const token = localStorage.getItem("token");
    // console.log("token:", token);
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
        setCurrentUser(userData);
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
