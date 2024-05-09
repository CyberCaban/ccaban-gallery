import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 ">
      {[...images, ...images].map((image, idx) => (
        <div key={`${idx + 1}`} className="w-full p-4">
          <Image
            width={1000}
            height={1000}
            src={image.url}
            alt={image.name}
            className="rounded-lg"
          />
          <span>{image.name}</span>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-4 ">
        <SignedOut>
          <div className="h-full w-full text-center text-2xl">
            Please sign in
          </div>
        </SignedOut>
        <SignedIn>
          <Images />
        </SignedIn>
      </div>
    </main>
  );
}
