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

// GET all books
app.get("/books/", async (request, response) => {
  const books = await db.all("SELECT * FROM book;");
  response.status(200).send(books);
});

// GET one book
app.get("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;

  const book = await db.get(
    "SELECT * FROM book WHERE id = ?;",
    [bookId]
  );

  if (!book) {
    response.status(404).send("Book Not Found");
  } else {
    response.status(200).send(book);
  }
});

// POST a new book
app.post("/books/", async (request, response) => {
  const { id, title, author, price, pages } = request.body;

  await db.run(
    `INSERT INTO book (id, title, author, price, pages)
     VALUES (?, ?, ?, ?, ?);`,
    [id, title, author, price, pages]
  );

  response.status(201).send("Book Added Successfully");
});

// PUT update a book
app.put("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const { title, author, price, pages } = request.body;

  const result = await db.run(
    `UPDATE book
     SET title = ?, author = ?, price = ?, pages = ?
     WHERE id = ?;`,
    [title, author, price, pages, bookId]
  );

  if (result.changes === 0) {
    response.status(404).send("Book Not Found");
  } else {
    response.status(200).send("Book Updated Successfully");
  }
});

// DELETE a book
app.delete("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;

  const result = await db.run(
    "DELETE FROM book WHERE id = ?;",
    [bookId]
  );

  if (result.changes === 0) {
    response.status(404).send("Book Not Found");
  } else {
    response.status(200).send("Book Deleted Successfully");
  }
});