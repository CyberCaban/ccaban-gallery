import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function TopNav() {
  return (
    <nav className="flex w-full flex-row justify-between border-b-2 border-white bg-black p-4 text-xl font-semibold">
      <div>CCaban gallery</div>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default TopNav;
