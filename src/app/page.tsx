import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 ">
      {images.map((image) => (
        <div key={image.id} className="w-full p-4">
          <Link href={`/img/${image.id}`}>
            <Image
              width={480}
              height={360}
              src={image.url}
              alt={image.name}
              className="rounded-lg"
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
