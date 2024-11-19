/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Post } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const deletePost = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await connectToDB();
    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error: any) {
    throw new Error(`An unknown error occured: ${error?.message}`);
  }
};

export const addPost = async (prevState: any, formData: FormData) => {
  const { userId, title, slug, img, desc } = Object.fromEntries(formData);
  try {
    await connectToDB();
    const slugExists = await Post.findOne({ slug });
    if (slugExists) {
      return { error: "Slug already exists. Create a new one" };
    }
    const newPost = new Post({
      userId,
      title,
      slug,
      img,
      desc,
    });
    await newPost.save();
    revalidatePath("/blog");
    revalidatePath("/admin");
    return { success: "Post created successfully" };
  } catch (error: any) {
    return { error: `An unknown error occured: ${error?.message}` };
  }
};
