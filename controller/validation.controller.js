import z from "zod";

export const loginSchema = z.object({
  username: z.string().email().trim().min(3).max(100),
  password: z.string().trim().min(3).max(16),
});

export const registerSchema = z.object({
  username: z.string().trim().min(3).max(100),
  age: z.coerce.number().int().min(1).max(120),
  email: z.string().email().trim().min(5).max(100),
  password: z.string().trim().min(3).max(16),
});

export const addSchema = z.object({
  title: z.string().min(1),
  selected_code: z.string().min(1),
  usertext: z.string().min(1),
});