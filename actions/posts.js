"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");
  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is Required");
  }
  if (!content || content.trim().length === 0) {
    errors.push("Content Is Required");
  }
  if (!image) {
    errors.push("Image is Required");
  }
  if (errors.length > 0) {
    return { errors };
  }
  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      "Image Upload Failed,Post was not created,Please tru again Later"
    );
  }
  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });
  redirect("/feed");
}
