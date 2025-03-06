"use client";
import { useState, useEffect } from "react";
import { auth, googleProvider } from "../../lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Email/Password Login
  const handleEmailLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      setCookie("authToken", token, { maxAge: 3600 }); // Store token
      router.push("/books");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      setCookie("authToken", token, { maxAge: 3600 });
      router.push("/books");
    } catch (error) {
      setError("Google login failed. Try again.");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const handleLogout = async () => {
    await signOut(auth);
    deleteCookie("authToken"); // Remove token from cookies
    setUser(null);
    router.push("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{user ? `Welcome, ${user.email}` : "Login to Your Account"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!user ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleEmailLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <br />
          <button onClick={handleGoogleLogin} disabled={loading}>
            {loading ? "Logging in with Google..." : "Login with Google"}
          </button>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}