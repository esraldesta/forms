"use server";
import { formSchema } from "@/lib/schemas";
import { z } from "zod";
import db from "./db";
import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "@/auth";
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

    throw error;
  }
}

export async function signout() {
  await signOut();
}

class UserNotFoundError extends Error {}

export async function GetFormStats() {
  const session = await auth();
  if (!session?.user) {
    throw new UserNotFoundError();
  }
  const stats = db.form.aggregate({
    where: {
      userID: session.user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });
  const visits = (await stats)._sum.visits || 0;
  const submissions = (await stats)._sum.submissions || 0;
  let submissionsRate = 0;
  if (visits > 0) {
    submissionsRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionsRate;

  return {
    visits,
    submissions,
    submissionsRate,
    bounceRate,
  };
}

type formSchemaType = z.infer<typeof formSchema>;
export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }
  const session = await auth();
  console.log("session", session);

  if (!session?.user) {
    throw new UserNotFoundError();
  }
  const form = await db.form.create({
    data: {
      userID: session.user.id as string,
      name: data.name,
      description: data.description,
    },
  });

  if (!form) {
    throw new Error("Some thing went wrong");
  }

  return form.id;
}

export async function GetForms() {
  const session = await auth();
  if (!session?.user) {
    throw new UserNotFoundError();
  }

  return await db.form.findMany({
    where: {
      userID: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetFormById(id: number) {
  const session = await auth();
  if (!session?.user) throw new UserNotFoundError();
  return await db.form.findUnique({
    where: {
      userID: session.user.id,
      id,
    },
  });
}

export async function UpdateFormContent(id: number, jsonContent: string) {
  const session = await auth();
  if (!session?.user) throw new UserNotFoundError();

  return db.form.update({
    where: {
      userID: session.user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function Publishform(id: number) {
  const session = await auth();
  if (!session?.user) throw new UserNotFoundError();

  return db.form.update({
    data: {
      published: true,
    },
    where: {
      userID: session.user.id,
      id,
    },
  });
}

export async function GetFormContentByUrl(formUrl: string) {
  return await db.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareURL: formUrl,
    },
  });
}

export async function SubmitForm(formUrl: string, content: string) {
  return await db.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareURL: formUrl,
      published: true,
    },
  });
}

export async function GetFormWithSubmission(id: number) {
  const session = await auth();
  if (!session?.user) throw new UserNotFoundError();

  return await db.form.findUnique({
    where: {
      id,
      userID: session.user.id,
    },
    include: {
      FormSubmissions: true,
    }
  });
}
