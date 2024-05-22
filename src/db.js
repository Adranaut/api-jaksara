// import pg from "pg";

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

// async function connectToDatabase() {
//   try {
//     const client = await pool.connect();
//     console.log("Connected to PostgreSQL database");
//     return client;
//   } catch (error) {
//     console.error("Error connecting to PostgreSQL database:", error);
//     throw error;
//   }
// }

// export { connectToDatabase };

// const { Pool } = require("pg");

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

// pool.connect((err) => {
//   if (err) throw err;
//   console.log("Connect to PostgreSQL successfully!");
// });

// module.exports = pool;
