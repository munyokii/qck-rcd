"use server";

import { prisma } from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const fullName = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Missing fields" };

  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return { error: "User already exists" };

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { fullName, email, password: hashedPassword },
    });

    return { success: true };
  } catch (err) {
    return { error: `Registration failed, ${err instanceof Error ? err.message : 'Unknown error'}` };
  }
}