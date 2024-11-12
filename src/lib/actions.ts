"use server";
import { z } from "zod";
import db from "./db";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  confirmPassword: z.string().min(8).max(32),
});

export type State = {
  error: boolean;
  errors: {
    password?: string[];
    email?: string[];
    confirmPassword?: string[];
  };
  message: string | null;
};

export async function singup(
  prestate: State,
  formdata: FormData
): Promise<State> {
  const validatedFields = signupSchema.safeParse({
    email: formdata.get("email"),
    password: formdata.get("password"),
    confirmPassword: formdata.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      error: true,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation Error.",
    };
  }
  await new Promise((res) => setTimeout(res, 2000));
  await db.user.create({
    data: {
      email: validatedFields.data.email,
      password: bcrypt.hashSync(validatedFields.data.password, 8),
    },
  });
  return {
    error: false,
    errors: {},
    message: "Created",
  };
}

export async function singin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong",
          };
      }
    }
  
    throw error
  }
}
