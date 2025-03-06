"use client";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import ProtectedRoute from "../../components/ProtectedRoute"; // Import the ProtectedRoute

// Define the Book type
interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    cover: string;
  }
  
export default function BooksPage() {
  const { addToCart } = useCart();
  const [books, setBooks] = useState<Book[]>([]); // ✅ Specify type here

  // Fetch books from API
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/books");
        const data: Book[] = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    }
    fetchBooks();
  }, []);

  return (
    <ProtectedRoute>
    <div>
      <h2>Available Books 📚</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {books.map((book) => (
          <div key={book.id} style={{ border: "1px solid #ddd", padding: "10px", width: "200px" }}>
            <img src={book.cover} alt={book.title} width="100%" />
            <h3>{book.title}</h3>
            <p>By {book.author}</p>
            <p>₹{book.price}</p>
            <button
              onClick={() => addToCart(book)}
              style={{ background: "#0070f3", color: "#fff", border: "none", padding: "8px 12px", cursor: "pointer" }}
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
    </ProtectedRoute>
  );
}