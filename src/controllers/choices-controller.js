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
  const { error, value } = validator(req.body);
  //validate(value we want to validate), in this case it is req.body, this validate method returns an object with error and value properties, so we destructure this.
  //in the validate method we can pass abortEarly, when true, stops validation on the first error, otherwise returns all the errors found.
  if (error) {
    return res.status(400).json({ message: error.details });
  }

  try {
    const result = await pool.query(
      "INSERT INTO choices(name, email, mobile, plan_choice, payment_frequency, online_service, larger_storage, customizable_profile) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        value.name,
        value.email,
        value.mobile_number,
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
