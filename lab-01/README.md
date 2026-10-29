# Lab 1: Node.js and Express Server

## Student Details

- **Name:** Narahari Shashivadana
- **Registration Number:** 252U1R7066
- **Section:** CSE-FSD-2B 309
- **Course:** Backend Development Fundamentals
- **Lab Number:** 01

## Live Link

**Deployment URL: https://bdf-labs-ubf0.onrender.com

## Objective

The objective of this lab is to create a basic web server using Node.js and Express.js. The server handles different HTTP GET requests, displays a welcome message
, provides information through different routes, and returns a 404 error for unknown routes.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- npm
- Visual Studio Code
- GitHub

## Project Structure

```text
lab-01/
├── screenshots/
│   ├── home.png
│   ├── about.png
│   ├── time.png
│   └── notFound.png
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js installed on the computer
- npm installed
- Visual Studio Code or another code editor

### Steps to Run the Project

1. Download or clone the repository.
2. Open the `lab-01` project folder in Visual Studio Code.
3. Open the terminal.
4. Install the required dependencies:

   ```bash
   npm install
   ```

5. Start the server:

   ```bash
   node server.js
   ```

6. When the server starts successfully, open a browser and visit `http://localhost:3000`.

Keep the terminal running while accessing the routes.

## Endpoints

| HTTP Method | Endpoint | Description | Expected Status |
|---|---|---|---|
| GET | `/` | Displays the welcome message | 200 OK |
| GET | `/about` | Displays the About page response | 200 OK |
| GET | `/time` | Displays the current date and time | 200 OK |
| GET | `/hello` | Demonstrates an unknown route | 404 Not Found |

## Screenshots

### 1. Home Route

Displays the welcome message when the home route is accessed.

![Home route response](screenshots/home.png)

### 2. About Route

Displays the response from the About route.

![About route response](screenshots/about.png)

### 3. Time Route

Displays the current date and time.

![Time route response](screenshots/time.png)


### 4. Unknown Route

Demonstrates the 404 response when an undefined route is accessed.

Displays the 404 Page Not Found response.

![404 route response](screenshots/not-found.png)


## HTTP Status Codes

- **200 OK:** Indicates that the request was successful.
- **404 Not Found:** Indicates that the requested route does not exist.

## Problems Faced and Solutions

1. **Module Not Found Error:** The server was initially started using an incorrect filename. This was resolved by running `node server.js`.
2. **Package Configuration Error:** An invalid `package.json` configuration caused an error. The configuration was corrected.
3. **Screenshot Upload Issue:** Some screenshot files were initially empty. New screenshots were captured and uploaded to GitHub.
4. **README Image Display Issue:** The screenshot paths were checked and corrected so that the images could display properly in the README.


## Learning Outcomes

- Learned how to create and run a Node.js server.
- Understood how to use Express.js to handle HTTP requests.
- Learned how to create and test different routes.
- Understood the use of HTTP status codes such as 200 and 404.
- Learned how to capture screenshots and upload project files to GitHub.
- Practised documenting a project using Markdown in a README file.

## Git and Repository Notes

- The project files are maintained in a GitHub repository.
- The `screenshots/` directory contains the screenshots of the tested routes.
- The `.gitignore` file is used to exclude unnecessary files such as `node_modules/` and `.env`.
- The `node_modules/` directory should not be uploaded to GitHub.

