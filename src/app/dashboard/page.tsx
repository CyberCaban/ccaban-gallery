import { Protect, SignedIn, SignedOut } from "@clerk/nextjs";
import { auth, getAuth } from "@clerk/nextjs/server";
import { getDashboard } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getDashboard();
  if (!images) {
    return <div>Sorry only for admins</div>;
  }
  return (
    <div className="flex flex-wrap justify-center gap-4 p-8">
      {images.map((image) => (
        <div key={image.id} className="flex w-72 flex-col self-center">
          <div className="text-red-500">
            URL: <span className="text-red-300">{image.url}</span>
          </div>
          <div className="text-red-500">
            USER_ID: <span className="text-red-300">{image.userId}</span>
          </div>
          <div className="text-red-500">
            NAME: <span className="text-red-300">{image.name}</span>
          </div>
          <img width={200} height={200} src={image.url} alt={image.name} />
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage({}) {
  return (
    <div>
      <SignedOut>
        <h1>dashboard</h1>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </div>
  );
}
