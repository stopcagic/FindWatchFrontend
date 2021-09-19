import { useState } from "react";
import "./register.scss";
import { auth } from "../../../services/index"
import { useHistory } from "react-router-dom";

export default function Register() {

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);


  const register = async event => {

    event.preventDefault();
    if (password === repeatPassword && username !== "" && email !== "") {
      const response = await auth.signup(username, email, password, repeatPassword)
      if (response.status !== 200) {
        setError(response.message);
      }
      else {
        await auth.login(email, password)
        history.push("/")
      }
    }
    else {
      const message = "Passwords do not match or invalid username or email."
      setError(message);
    }
  }

  const handleUsername = event => {
    setUsername(event.target.value)
  }
  const handleEmail = event => {
    setEmail(event.target.value)
  }
  const handlePassword = event => {
    setPassword(event.target.value)
  }
  const handleRepeatedPassword = event => {
    setRepeatPassword(event.target.value)
  }
  return (
    <div className="register">
      <div className="container">
        <form onSubmit={register}>
          <h1>Register</h1>
          {error != null ? <div><p>{error}</p></div> : null}
          <hr />
          <input type="surname" placeholder="Username" onChange={handleUsername} />
          <input type="email" placeholder="Email" onChange={handleEmail} />
          <input type="password" placeholder="Password" onChange={handlePassword} />
          <input type="password" placeholder="Repeat Password" onChange={handleRepeatedPassword} />
          <button className="loginButton">Register</button>
        </form>
      </div>
    </div >
  );
}
