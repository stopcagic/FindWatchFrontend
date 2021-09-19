import "./login.scss";
import { auth } from "../../../services/index"
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Login() {

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = async event => {
    event.preventDefault();
    if (email !== "" && password !== "") {
      const response = await auth.login(email, password)

      if (response.status !== 200) {
        setError(response.message);
      }
      else {
        console.log("HI");
        history.push("/")
        window.location.reload();
      }
    }
    else {
      const message = "Invalid email or password."
      setError(message);
    }
  }

  const handleEmail = event => {
    setEmail(event.target.value)
  }
  const handlePassword = event => {
    setPassword(event.target.value)
  }

  return (
    <div className="login">
      <div className="container">
        <form onSubmit={login}>
          <h1>Login</h1>
          {error != null ? <div><p>{error}</p></div> : null}
          <hr />
          <input type="email" placeholder="Email" onChange={handleEmail} />
          <input type="password" placeholder="Password" onChange={handlePassword} />
          <button className="loginButton">Login</button>
          <span>
            Not registered yet?
            <Link to="/register"> <b>register</b></Link>

          </span>
        </form>
      </div>
    </div>
  );
}
