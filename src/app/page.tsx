import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  return (
    <div className="flex flex-wrap justify-center gap-4 p-8">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 flex-col self-center">
          <Link href={`/img/${image.id}`}>
            <Image
              width={480}
              height={360}
              src={image.url}
              alt={image.name}
              className="rounded-lg filter-none transition hover:scale-105 hover:shadow-[0_0_10px_5px_rgba(0,0,0,0.3)] hover:shadow-zinc-500"
            />
          </Link>
          <span>{image.name}</span>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-6.5rem)] flex-col items-center justify-center">
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
