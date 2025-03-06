import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=10"
    );
    const data = await response.json();

    // Transform Google Books API response into our format
    const books = data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title || "Unknown Title",
      author: item.volumeInfo.authors?.join(", ") || "Unknown Author",
      price: Math.floor(Math.random() * 500) + 100, // Generate random price
      cover: item.volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg",
    }));

    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}