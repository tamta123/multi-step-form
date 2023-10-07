import express from "express";
import pool from "./config/database.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (_, res) => {
  try {
    const result = await pool.query("SELECT FROM user_choices");
    const rows = result.rows;
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ massage: error });
  }
});

app.post("/ ", async (res, req) => {
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
      "INSERT INTO TABLE user_choices(name,email,mobile_number,plan_choice,payment_frequency,addons_choice,addons_payment_frequency) VALUE($1,$2,$3,$4,$5,$6,$7)",
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
    return res.status(201).json(row); //სტატუსი 201 არის ახალი დოკუმენტის ჩამატება
  } catch (error) {
    return res.status(400).json({ massage: error });
  }
});

app.listen(process.env.PORT || 3000);

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
