import { object, ref, string } from "yup";

export const accountSchema = object({
  username: string()
    .trim("Username cannot contain spaces")
    .required("Username cannot be empty")
    .min(8, "Username must be at least 8 characters long")
    .max(24, "Username can be at most 24 characters long"),
  password: string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password cannot be empty")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter and one digit"
    ),
  newPassword: string()
    .min(8, "New password must be at least 8 characters long")
    .required("New password cannot be empty")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "New password must contain at least one uppercase letter and one digit"
    ),
  confirmNewPassword: string()
    .required("Confirm password cannot be empty")
    .oneOf([ref("newPassword")], "Passwords do not match"),
  email: string()
    .email("Invalid email address")
    .required("Email cannot be empty"),
});

export const nameSchema = object({
  firstname: string()
    .required("First name cannot be empty")
    .trim("First name cannot contain spaces")
    .matches(
      /^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/,
      "First name cannot contain special characters"
    ),
  lastname: string()
    .required("Last name cannot be empty")
    .trim("Last name cannot contain spaces")
    .matches(
      /^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/,
      "Last name cannot contain special characters"
    ),
});
export const credentialSchema = object({
  password: string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password cannot be empty")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter and one digit"
    ),
  email: string()
    .email("Invalid email address")
    .required("Email cannot be empty"),
});
export const personalInfo = object({
  firstname: string()
    .required("First name cannot be empty")
    .trim("First name cannot contain spaces")
    .matches(
      /^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/,
      "First name cannot contain special characters"
    ),
  lastname: string()
    .required("Last name cannot be empty")
    .trim("Last name cannot contain spaces")
    .matches(
      /^[^\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/,
      "Last name cannot contain special characters"
    ),
  dateOfBirth: string().required("Date of birth cannot be empty"),
});

export const ageLimit = 13;
