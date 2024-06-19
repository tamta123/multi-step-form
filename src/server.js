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
  const corsOptions = {
    origin: "https://multi-step-form-front-sepia.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  };

  function serverStart() {
    app.use(cors(corsOptions));
    app.options("*", cors(corsOptions));
    app.use(bodyParser.json());
    app.use("/api", choicesRouter);
    app.listen(process.env.PORT || 3000);
  }
}

init();
