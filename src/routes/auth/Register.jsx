import { faUser, faKey, faPlus } from "@fortawesome/free-solid-svg-icons";

import Input from "../../components/general/Input";
import Button from "../../components/general/Button";

function Register({ username, password, setUsername, setPassword }) {
  return (
    <div className="auth-section">
      <h2>Create a new account</h2>

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
          label="Sign Up"
          icon={faPlus}
          type="submit"
        />
      </div>
    </div>
  );
}

export default Register;
