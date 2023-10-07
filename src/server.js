import express from "express";
import pool from "../config/database.js";

const app = express();

app.get("/", async (_, res) => {
  try {
    const result = await pool.query("SELECT FROM user_choices");
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ massage: error });
  }
});

app.listen(process.env.PORT || 3000);
