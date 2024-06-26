import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { env } from "~/env";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.images.findMany({
    where: (model, { eq, and }) =>
      and(eq(model.userId, user.userId), eq(model.deleted, false)),
    orderBy: (model, { desc }) => desc(model.id),
  });
}

export async function getImageById(id: number) {
  const user = auth();
  if (!user) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user) throw new Error("Unauthorized");

  await db
    .update(images)
    .set({ deleted: true })
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  redirect("/gallery");
}

export async function getDashboard() {
  const user = auth();
  if (!user) throw new Error("Unauthorized");
  if (env.ADMIN_ID !== user.userId) {
    return null;
  }
  console.log("user", user);

  return await db.query.images.findMany();
}
