"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import SimpleUploadButton from "./SimpleUploadButton";
import Link from "next/link";

function FileUploadButton() {
  const pathname = usePathname();
  const router = useRouter();
  return <>{pathname.includes("/gallery") ? <SimpleUploadButton /> : null}</>;
}

function TopNav() {
  const pathname = usePathname();
  return (
    <nav className="flex w-full flex-row justify-between border-b-2 border-white bg-black p-4 text-xl font-semibold">
      <Link href={"/"}>CCaban Gallery</Link>
      {/* <pre>{pathname}</pre> */}
      <h1></h1>
      <div className="flex flex-row gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <FileUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default TopNav;
