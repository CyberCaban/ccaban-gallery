"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "../utils/uploadthing";
import { useRouter } from "next/navigation";

function TopNav() {
  const router = useRouter();
  return (
    <nav className="flex w-full flex-row justify-between border-b-2 border-white bg-black p-4 text-xl font-semibold">
      <div>CCaban gallery</div>

      <div className="flex flex-row gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => router.refresh()}
          />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default TopNav;
