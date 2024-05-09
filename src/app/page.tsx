import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  console.log(images);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-4 ">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 ">
          {[...images, ...images].map((image, idx) => (
            <div key={`${idx + 1}`} className="w-full p-4">
              <Image
                width={1000}
                height={1000}
                src={image.url}
                alt={image.name}
              />
              <span>{image.name}</span>
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
