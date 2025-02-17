import { Button } from "./button";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Avatar, AvatarFallback } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useState } from "react";
import { AboutDialog } from "./about-dialog";

export function Navigation() {
  const { user, logoutMutation } = useAuth();
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">NepPerks</span>
          </Link>

          <Button
            variant="ghost"
            className="mr-6"
            onClick={() => setAboutOpen(true)}
          >
            About
          </Button>

          <div className="flex-1" />

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href={user.userType === "business" ? "/business" : "/customer"}>
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarFallback>
                        {user.fullName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/auth">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </>
  );
}