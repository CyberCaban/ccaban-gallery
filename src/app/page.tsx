import Image from "next/image";
import { db } from "~/server/db";

const urls = [
  "https://utfs.io/f/dd165ae0-38e5-44f5-91ef-a513ab4c5b64-rb0ijz.jpg",
  "https://utfs.io/f/533a6900-4438-4953-aaa7-22619be581e0-9mzwx1.jpg",
  "https://utfs.io/f/f5db4b3b-aa49-424b-aaef-b9b46f4c9805-o9xd2t.jpg",
  "https://utfs.io/f/f69944ea-0a29-48d3-bb66-5be762e136e9-shtgsn.jpg",
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-4 ">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 ">
          {posts.map((image) => (
            <div key={image.id} className="w-full p-4">
              <span>{image.name}</span>
            </div>
          ))}
          {[...urls, ...urls, ...urls].map((url, idx) => (
            <div key={`${idx + 1}`} className="w-full p-4">
              <Image
                width={1000}
                height={1000}
                src={url}
                alt="CCaban_gallery"
              />
            </div>
          ))}
        </div>
        {/* <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Gallery in progress
        </h1> */}
      </div>
    </main>
  );
}
