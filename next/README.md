
# Next.js Project with JSON Server

This project is built using **Next.js**, with a **JSON Server** serving as the local API for data handling. Below are the instructions to set up and run the project locally.

## Prerequisites

Make sure you have the following installed:

- Node.js (v14.x or higher)
- npm (v6.x or higher)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/sirishkoirala/Letzfix.git
   cd next
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Application

The application consists of two parts:

- **Next.js development server** (running on port 3001)
- **JSON Server** for mock API (running on port 3000)

### Step 1: Run JSON Server

The JSON Server serves data from `./public/data/db.json`. Run the following command to start the server:

```bash
cd next
npx json-server ./public/data/db.json --port 3000
```

This will spin up the JSON Server on [http://localhost:3000](http://localhost:3000).

### Step 2: Run Next.js Development Server

In a new terminal window, navigate to the project directory and run:

```bash
cd next
npm run dev -- --port 3001
```

This will start the Next.js development server on [http://localhost:3001](http://localhost:3001).

## Project Structure

```
├── public
│   └── data
│       └── db.json       # JSON Server mock data
├── src
│   └── components        # React components
│   └── pages             # Next.js pages
│   └── styles            # TailwindCSS styles
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
└── README.md             # Project instructions
```

## Usage

- To fetch data, you can send requests to `http://localhost:3000` from your Next.js components or pages.
- You can now develop your Next.js application using the mock API provided by JSON Server.

## Scripts

- `npm run dev`: Starts the Next.js development server on port 3001.
- `npx json-server ./public/data/db.json --port 3000`: Starts the JSON Server for the local API.
