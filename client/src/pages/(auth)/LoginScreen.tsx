import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export const LoginScreen = () => {
  return (
    <>
      <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/sign-up"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Sign Up
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <img
            src="https://source.unsplash.com/PpkID3ejSig"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <SignIn
              appearance={{
                elements: {
                  footerAction: { display: "none" },
                  formButtonPrimary:
                    "bg-neutral-800 hover:bg-neutral-700 text-sm normal-case",
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
