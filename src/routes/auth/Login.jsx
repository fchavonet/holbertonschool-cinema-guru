import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

import Input from "../../components/general/Input";
import Button from "../../components/general/Button";

function Login({ username, password, setUsername, setPassword }) {
  return (
    <div className="auth-section">
      <h2>Sign in with your account</h2>

      <div className="inputs-container">
        <Input
          label="Username"
          icon={faUser}
          value={username}
          setValue={setUsername}
          inputAttributes={{ autoComplete: "username" }}
        />

        <Input
          label="Password"
          type="password"
          icon={faKey}
          value={password}
          setValue={setPassword}
          inputAttributes={{ autoComplete: "password" }}
        />
      </div>

      <div className="buttons-container">
        <Button
          label="Sign In"
          icon={faKey}
          type="submit"
        />
      </div>
    </div>
  );
}

export default Login;
