/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import bcrypt from "bcryptjs";

export const signInUser = async (
  email: string,
  img: string,
  username: string
) => {
  try {
    connectToDB();
    const user = await User.findOne({ email });
    if (!user) {
      const newUser = new User({
        username,
        email,
        img,
      });
      await newUser.save();
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const loginUser = async (credentials: any) => {
  try {
    await connectToDB();
    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};
