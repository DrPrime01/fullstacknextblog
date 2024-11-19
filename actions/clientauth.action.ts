/* eslint-disable @typescript-eslint/no-explicit-any */
import { signIn } from "next-auth/react";

export const login = async (prevState: any, formData: FormData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
    return { success: true };
  } catch (err: any) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
