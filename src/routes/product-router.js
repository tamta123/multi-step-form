import express from "express";
import { getChoiceInfo } from "../controllers/products-controller.js ";
import { addUserChoice } from "../controllers/choices-controller.js";

const choicesRouter = express.Router();

choicesRouter.get("/user_choice", getChoiceInfo);
choicesRouter.post("/user_choice", addUserChoice);

export default choicesRouter;
