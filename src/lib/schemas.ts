import { z } from "zod";

export const signInSchema = z.object(
    {
        email: z.string().email(),
        password: z.string().min(8).max(32)
    }
)

export const formSchema = z.object({
    name: z.string().min(4),
    description: z.string().optional(),
})