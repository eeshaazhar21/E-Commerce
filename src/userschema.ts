import { z } from "zod";

export const signupSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  confirmpassword: z.string(),

  gender: z.string(),
  role: z.string(),
}).refine((data) => data.password === data.confirmpassword, {
  message: "Passwords do not match",
  path: ["confirmpassword"],
});