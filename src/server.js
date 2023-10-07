import express from "express";
import pool from "./config/database.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/user_choice", async (_, res) => {
  try {
    const result = await pool.query("SELECT * FROM user_choices"); // Corrected the SQL query.
    const rows = result.rows;
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error while executing GET request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// app.post("/api/user_choice", async (req, res) => {
//   const {
//     name,
//     email,
//     mobile_number,
//     plan_choice,
//     payment_frequency,
//     addons_choice,
//     addons_payment_frequency,
//   } = req.body;
//   try {
//     const result = await pool.query(
//       "INSERT INTO user_choices(name,email,mobile_number,plan_choice,payment_frequency,addons_choice,addons_payment_frequency) VALUES($1,$2,$3,$4,$5,$6,$7)",
//       [
//         name,
//         email,
//         mobile_number,
//         plan_choice,
//         payment_frequency,
//         addons_choice,
//         addons_payment_frequency,
//       ]
//     );
//     const row = result.rows[0];
//     return res.status(201).json(row);
//   } catch (error) {
//     console.error("Error while executing POST request:", error);
//     return res.status(400).json({ message: "Bad Request" });
//   }
// });

app.post("/api/user_choice", async (req, res) => {
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
      "INSERT INTO user_choices(name, email, mobile_number, plan_choice, payment_frequency, addons_choice, addons_payment_frequency) VALUES ($1, $2, $3, $4, $5, $6, $7)",
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
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

// async function init() {
//   try {
//     await serverStart();
//   } catch (error) {
//     console.log(error);
//   }
// }

// function serverStart() {
//   app.use(cors());
//   app.use(bodyParser.json());
//   app.listen(process.env.PORT || 3000);
// }

// init();
