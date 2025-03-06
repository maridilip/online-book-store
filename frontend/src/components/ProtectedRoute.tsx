"use client";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<null | User>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return user ? <>{children}</> : null;
}
