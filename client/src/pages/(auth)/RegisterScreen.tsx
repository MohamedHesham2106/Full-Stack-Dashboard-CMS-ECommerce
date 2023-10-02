import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export const RegisterScreen = () => {
  return (
    <>
      <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/sign-in"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <img
            src="https://source.unsplash.com/EMWgB-BTyh0"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <SignUp
              appearance={{
                elements: {
                  footerAction: { display: "none" },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
