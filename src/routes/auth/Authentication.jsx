import { useState } from "react";
import axios from "axios";

import Login from "./Login";
import Register from "./Register";
import Button from "../../components/general/Button";

import "./auth.css";

function Authentication({ setIsLoggedIn, setUserUsername }) {
  const [_switch, setSwitch] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSignInClick() {
    setSwitch(true);
    setErrorMessage("");
  }

  function handleSignUpClick() {
    setSwitch(false);
    setErrorMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const endpoint = _switch
        ? "http://localhost:8000/api/auth/login"
        : "http://localhost:8000/api/auth/register";

      const response = await axios.post(endpoint, { username, password });

      if (response.status === 200 && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        setUserUsername(username);
        setIsLoggedIn(true);
      } else {
        setErrorMessage("Unexpected response from server.");
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="auth-container">
      <div className="auth-header">
        <Button
          label="Sign In"
          onClick={handleSignInClick}
          className={_switch ? "auth-tab-active" : "auth-tab"}
        />

        <Button
          label="Sign Up"
          onClick={handleSignUpClick}
          className={!_switch ? "auth-tab-active" : "auth-tab"}
        />
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {_switch ? (
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        ) : (
          <Register
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        )}

        {errorMessage && (
          <p className="auth-error">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default Authentication;
