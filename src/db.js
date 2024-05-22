const { Client } = require("pg");

let client;

async function connectToDatabase() {
  if (!client) {
    client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();
      console.log("Connected to PostgreSQL database");
    } catch (error) {
      console.error("Error connecting to PostgreSQL database:", error);
      throw error;
    }
  }
  return client;
}

module.exports = { connectToDatabase };
