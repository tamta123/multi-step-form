import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

// const createChoicesTable = async () => {
//   const client = await pool.connect();
//   try {
//     const queryText = `
//       CREATE TABLE IF NOT EXISTS choices (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         mobile VARCHAR(20),
//         plan_choice VARCHAR(50),
//         payment_frequency VARCHAR(50),
//         online_service BOOLEAN,
//         larger_storage BOOLEAN,
//         customizable_profile BOOLEAN
//       )
//     `;
//     await client.query(queryText);
//     console.log("Choices table created or already exists.");
//   } catch (error) {
//     console.error("Error creating choices table:", error);
//   } finally {
//     client.release();
//   }
// };

// createChoicesTable();

export default pool;
