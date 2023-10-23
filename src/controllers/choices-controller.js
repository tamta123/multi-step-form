import pool from "../config/database.js";
import { validateChoices } from "../validator.js";

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
  const { error, value } = validateChoices(req.body);
  if (error) {
    return res.status(400).json({ message: error.details });
  }

  try {
    const existingUser = await pool.query(
      "SELECT email FROM choices WHERE email = $1",
      [value.email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    }

    const result = await pool.query(
      "INSERT INTO choices(name, email, mobile, plan_choice, payment_frequency, online_service, larger_storage, customizable_profile) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        value.name,
        value.email,
        value.mobile,
        value.plan_choice,
        value.payment_frequency,
        value.online_service,
        value.larger_storage,
        value.customizable_profile,
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
