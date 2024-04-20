import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { useState, FormEvent } from "react";

import { auth } from "../../services/FireBase";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email === "" || pass === "") {
      alert("Preencha todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        navigate("/admin", { replace: true });
      })
      .catch((error) => {
        setEmail("");
        setPass("");
        alert("Crendenciais Inválidas.");
        console.log(error, "erro ao fazer login!");
      });
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          sKz
          <span className="bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
            Link!
          </span>
        </h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-2"
      >
        <Input
          placeholder="Type your e-mail..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Type your password..."
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          type="submit"
          className="h-9 bg-pink-400 rounded border-0 text-lg font-medium text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
