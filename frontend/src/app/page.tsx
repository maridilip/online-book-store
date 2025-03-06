"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; // Update the import path
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
}

const HomePage = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [books, setBooks] = useState<Book[]>([]);
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // Redirect if not logged in
      } else {
        setUser(currentUser);
      }
    });

    
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=subject:fiction"
        );
        const data = await response.json();
        const booksData = data.items.map((item: any) => ({
          id: parseInt(item.id, 10),
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors?.[0] || "Unknown Author",
          price: Math.floor(Math.random() * 500) + 100, // Random price for demo
          cover: item.volumeInfo.imageLinks?.thumbnail || "https://placehold.co/100x150",
        }));
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
    return () => unsubscribe();
  }, []);
  if (!user) {
    return <p>Redirecting to login...</p>;
  }
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Books 📚</h2>
      <div className="row">
        {books.map((book) => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={book.cover} alt={book.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">By {book.author}</p>
                <p className="card-text">₹{book.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(book)}
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-5">Shopping Cart 🛍️</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group">
          {cart.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              {item.title} - ₹{item.price}
              <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                Remove ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;