const express = require("express");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();

app.use(express.json());

const databasePath = "./books.db";

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await sqlite.open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Database Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// GET all books with search, sorting, pagination, and price filters
app.get("/books/", async (request, response) => {
  try {
    const {
      search_q = "",
      order_by = "id",
      order = "ASC",
      limit = "10",
      offset = "0",
      min_price,
      max_price,
    } = request.query;

    const allowedColumns = ["id", "title", "author", "price", "pages"];

    const sortColumn = allowedColumns.includes(order_by)
      ? order_by
      : "id";

    const sortOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const limitValue = Math.max(1, parseInt(limit) || 10);
    const offsetValue = Math.max(0, parseInt(offset) || 0);

    let query = "SELECT * FROM book WHERE 1 = 1";
    const params = [];

    if (search_q) {
      query += " AND title LIKE ?";
      params.push(`%${search_q}%`);
    }

    if (min_price !== undefined && min_price !== "") {
      query += " AND price >= ?";
      params.push(Number(min_price));
    }

    if (max_price !== undefined && max_price !== "") {
      query += " AND price <= ?";
      params.push(Number(max_price));
    }

    query += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT ? OFFSET ?`;
    params.push(limitValue, offsetValue);

    const books = await db.all(query, params);

    response.status(200).json(books);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// GET one book
app.get("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const book = await db.get(
      "SELECT * FROM book WHERE id = ?;",
      [bookId]
    );

    if (!book) {
      response.status(404).json({ message: "Book Not Found" });
    } else {
      response.status(200).json(book);
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// POST a new book
app.post("/books/", async (request, response) => {
  try {
    const { title, author, price, pages } = request.body;

    // Validate required fields
    if (!title || !author || price === undefined || price === null || price === "") {
      return response.status(400).json({
        message: "Title, author, and price are required",
      });
    }

    // Validate price
    if (typeof price !== "number" || !Number.isFinite(price)) {
      return response.status(400).json({
        message: "Price must be a valid number",
      });
    }

    await db.run(
      `INSERT INTO book (title, author, price, pages)
       VALUES (?, ?, ?, ?);`,
      [title, author, price, pages]
    );

    response.status(201).json({
      message: "Book Added Successfully",
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// PUT update a book
app.put("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    const result = await db.run(
      `UPDATE book
       SET title = ?, author = ?, price = ?, pages = ?
       WHERE id = ?;`,
      [title, author, price, pages, bookId]
    );

    if (result.changes === 0) {
      return response.status(404).json({
        message: "Book Not Found",
      });
    }

    response.status(200).json({
      message: "Book Updated Successfully",
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// DELETE a book
app.delete("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const result = await db.run(
      "DELETE FROM book WHERE id = ?;",
      [bookId]
    );

    if (result.changes === 0) {
      return response.status(404).json({
        message: "Book Not Found",
      });
    }

    response.status(200).json({
      message: "Book Deleted Successfully",
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});