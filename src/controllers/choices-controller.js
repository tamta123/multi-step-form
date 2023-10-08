import pool from "../config/database.js";

export const getChoiceInfo = async (_, res) => {
  try {
    const result = await pool.query("SELECT * FROM choices");
    const rows = result.rows;
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error while executing GET request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addUserChoice = async (req, res) => {
  const {
    name,
    email,
    mobile_number,
    plan_choice,
    payment_frequency,
    addons_choice,
    addons_payment_frequency,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO choices(name, email, mobile, plan_choice, payment_frequency, addons_choice, addons_payment_frequency) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        name,
        email,
        mobile_number,
        plan_choice,
        payment_frequency,
        addons_choice,
        addons_payment_frequency,
      ]
    );
    const row = result.rows[0];
    console.log(req.body);
    return res.status(201).json(row);
  } catch (error) {
    console.error("Error while executing POST request:", error);
    return res.status(400).json({ message: "Bad Request" });
  }
};
