import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const updateProfileSchema = Yup.object().shape({
  name: Yup.string().optional(),
  username: Yup.string().optional(),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  profilPict: Yup.mixed().nullable().optional(), // <- opsional, kalo ga diisi di frontend dihandle default 'user'
  password: Yup.string()
    .min(6, "Minimal 6 karakter")
    .optional()
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
});
