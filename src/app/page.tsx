import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-6.5rem)] flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-4 ">
        <Link href={"/gallery"}>to gallery</Link>
      </div>
    </main>
  );
}
