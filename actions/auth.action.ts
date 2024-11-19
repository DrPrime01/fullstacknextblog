"use server";
import { User } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import bcrypt from "bcryptjs";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const register = async (prevState: any, formData: FormData) => {
  const { username, email, password, passwordRepeat } =
    Object.fromEntries(formData);
  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }
  try {
    await connectToDB();
    const user = await User.findOne({ username });
    const userName = await User.findOne({ username });
    if (user) {
      throw new Error("User already exists!");
    } else if (userName) {
      throw new Error("Username already exists! Choose another");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password as string, salt);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return { success: true };
  } catch (error: any) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
