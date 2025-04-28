import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Username must not be empty"),
  username: Yup.string().required("Username must not be empty"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .minLowercase(1, "Password must contain at least 1 lowercase letter")
    .minUppercase(1, "Password must contain at least 1 uppercase letter")
    .minNumbers(1, "Password must contain at least 1 number")
    .minSymbols(1, "Password must contain at least 1 symbol"),

  referralCode: Yup.string().nullable().optional(),

  role: Yup.string().oneOf(["CUSTOMER", "EVENT_ORGANIZER"]).optional(), // <- opsional, kalo ga diisi di frontend dihandle default 'user'
});
