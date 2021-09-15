import { useRef } from "react";
import { useState } from "react";
import "./register.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = () => {
    setPassword(passwordRef.current.value);
  };
  return (
    <div className="register">
      <div className="container">
        <form>
          <h1>Registracija</h1>
          <hr />
          <input type="name" placeholder="Unesite ime" />
          <input type="surname" placeholder="Unesite prezime" />
          <input type="email" placeholder="Unesite email" />
          <input type="password" placeholder="Unesite lozinku" />
          <input type="password" placeholder="Ponovno unesite lozinku" />
          <button className="loginButton">Registriraj se</button>
        </form>
      </div>
    </div>
  );
}
