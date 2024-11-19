/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Post, User } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import bycrypt from "bcryptjs";

export const deleteUser = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await connectToDB();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);

    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error: any) {
    throw new Error(`An unknown error occured: ${error?.message}`);
  }
};

export const addUser = async (prevState: any, formData: FormData) => {
  const { username, email, password, img } = Object.fromEntries(formData);
  try {
    await connectToDB();
    const user = await User.findOne({ email });
    if (user) {
      return { error: "User already exists" };
    }
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password as string, salt);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      img,
    });
    await newUser.save();
    return { sucess: "User successfully created." };
  } catch (error: any) {
    return { error: `An unknown error occured: ${error?.message}` };
  }
};
