"use client";
import { useState } from "react";
import { auth, googleProvider } from "../../lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Email/Password Login
  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirect after login
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
      } else {
        console.error("Login failed:", error);
      }
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Google Sign-In failed:", error.message);
      } else {
        console.error("Google Sign-In failed:", error);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login to Mari Book Store</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleEmailLogin}>Login with Email</button>

      <button onClick={handleGoogleLogin} style={{ marginTop: "10px" }}>
        Sign in with Google
      </button>
    </div>
  );
}
