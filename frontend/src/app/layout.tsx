import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Mari Book Store</title>
      </head>
      <body>
        <nav style={{ padding: "10px", background: "#0070f3", color: "#fff" }}>
          <Link href="/" style={{ marginRight: "20px", color: "#fff" }}>Home</Link>
          <Link href="/books" style={{ marginRight: "20px", color: "#fff" }}>Books</Link>
          <Link href="/login" style={{ color: "#fff" }}>Login</Link>
        </nav>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

