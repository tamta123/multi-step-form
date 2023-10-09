import Joi from "joi";

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const schema = Joi.object({
  name: Joi.string().min(2).max(25).required(),
  email: Joi.string().email().required(),
  mobile_number: Joi.string()
    .regex(/^\d{6,}$/)
    .required(),
  plan_choice: Joi.string()
    .valid("arcade", "advanced", "pro")
    .lowercase()
    .required(),
  payment_frequency: Joi.string()
    .valid("yearly", "monthly")
    .lowercase()
    .required(),
  online_service: Joi.boolean().required(),
  larger_storage: Joi.boolean().required(),
  customizable_profile: Joi.boolean().required(),
});

export const validateChoices = validator(schema);
//this function is equals to what function validator returns
