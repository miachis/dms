import { body } from "express-validator";

export const validtion = [
  body("email")
    .notEmpty()
    .escape()
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address"),
  body("password")
    .notEmpty()
    .escape()
    .trim()
    .withMessage("Password cannot be empty"),
];
