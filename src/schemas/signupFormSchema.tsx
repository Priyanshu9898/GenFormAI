import { z } from "zod";

export const signUpFormSchema = z.object({
  firstName: z.string().min(2, "First Name is Required"),
  lastName: z.string().min(2, "Last Name is required."),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});
