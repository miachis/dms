import { body } from "express-validator";

export const validation = [
  body("email")
    .notEmpty()
    .withMessage(`Ensure email isn't empty`)
    .escape()
    .trim()
    .isEmail()
    .withMessage("Invalid email"),
  body("username")
    .notEmpty()
    .withMessage(`Ensure username isn't empty`)
    .escape()
    .trim()
    .isAlpha()
    .withMessage("Choose a valid username"),
  body("password")
    .notEmpty()
    .withMessage(`Ensure password isn't empty`)
    .escape()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters long"),
  body("confirmPassword")
    .notEmpty()
    .withMessage(`Ensure confirm password isn't empty`)
    .escape()
    .trim()
    .isLength({ min: 8 })
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Make sure it matches the password"),
];
