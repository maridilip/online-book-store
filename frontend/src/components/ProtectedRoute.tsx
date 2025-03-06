"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // Redirect to login if not logged in
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return user ? <>{children}</> : null;
}
