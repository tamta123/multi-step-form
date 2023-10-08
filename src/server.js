import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import choicesRouter from "./routes/choices-router.js";

const app = express();

async function init() {
  try {
    serverStart();
  } catch (error) {
    console.log(error);
  }

  function serverStart() {
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/api", choicesRouter);

    app.listen(process.env.PORT || 3000);
  }
}

init();
