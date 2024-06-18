import { z } from "zod";

export const loginInFormSchema = z.object({
  email: z.string().email({ message: "Please enter valid email address." }),
  password: z.string(),
});
