"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter()
  const  status  = useSession();

console.log(status?.data?.user?.email, "statusefefefefefefefe")

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (response.ok) {
        router.push("/")
      }

      if (response.error) {
        setError("Invalid email or password. Please try again!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="login">
 
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Log In</button>
        </form>
        <button className="google" onClick={loginWithGoogle}>
          <p>Log In with Google</p>
          <FcGoogle />
        </button>
        <div onClick={() => signIn("github")}>Sign in with Github</div>
        <div onClick={() => signOut()}>Sign Out</div>

        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
    </div>
  );
};

export default Login;
