CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT,
    price INTEGER,
    pages INTEGER
);

INSERT INTO book (id, title, author, price, pages) VALUES
(1, 'The Alchemist', 'Paulo Coelho', 250, 208),
(2, 'Wings of Fire', 'A.P.J. Abdul Kalam', 300, 180),
(3, 'Atomic Habits', 'James Clear', 450, 320),
(4, 'Rich Dad Poor Dad', 'Robert Kiyosaki', 350, 336),
(5, 'Harry Potter', 'J.K. Rowling', 500, 400),
(6, 'The Hobbit', 'J.R.R. Tolkien', 400, 310),
(7, 'Ikigai', 'Hector Garcia', 280, 190),
(8, 'Think and Grow Rich', 'Napoleon Hill', 320, 250),
(9, 'Deep Work', 'Cal Newport', 380, 296),
(10, 'The Power of Now', 'Eckhart Tolle', 290, 236);