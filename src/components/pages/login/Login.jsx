import "./login.scss";

export default function Login() {
  return (
    <div className="login">
      <div className="container">
        <form>
          <h1>Prijavi se</h1>
          <hr />
          <input type="email" placeholder="Email or phone number" />
          <input type="password" placeholder="Password" />
          <button className="loginButton">Prijavi se</button>
          <span>
            Nemaš račun? <b>Registriraj se</b>
          </span>
        </form>
      </div>
    </div>
  );
}
