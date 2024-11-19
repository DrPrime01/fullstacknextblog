import { unstable_noStore as noStore } from "next/cache";
import { Post, User } from "./models";
import { connectToDB } from "./utils";

export const getPosts = async () => {
  try {
    await connectToDB();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};

export const getPost = async (slug: string) => {
  try {
    await connectToDB();
    const post = await Post.findOne({ slug });
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post");
  }
};

export const getUser = async (id: string) => {
  noStore();
  try {
    await connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user");
  }
};

export const getUsers = async () => {
  try {
    await connectToDB();
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user");
  }
};
