import { useState, useEffect } from "react";
import axios from "axios";
import Authentication from "./routes/auth/Authentication";
import Dashboard from "./routes/dashboard/Dashboard";
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState("");

  useEffect(() => {
    async function checkAuth() {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/",
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        // Si le token est valide
        if (response.status === 200 && response.data?.username) {
          setIsLoggedIn(true);
          setUserUsername(response.data.username);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error.message);
        setIsLoggedIn(false);
      }
    }

    checkAuth();
  }, []);

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Authentication
          setIsLoggedIn={setIsLoggedIn}
          setUserUsername={setUserUsername}
        />
      )}
    </div>
  );
}
