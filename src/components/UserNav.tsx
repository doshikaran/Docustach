import { Button } from "./ui/button";
import Image from "next/image";
import { Icons } from "../components/ui/Icons";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface UserNavProps {
  email: string | undefined;
  name: string;
  imageUrl: string;
}
const UserNav = async ({ email, name, imageUrl }: UserNavProps) => {
  return (
    <DropdownMenu>
      {/* image */}
      <DropdownMenuTrigger asChild className=" overflow-visible">
        <Button className={cn(' bg-transparent hover:bg-zinc-200')}>
          {imageUrl ? (
            <div className="relative aspect-square h-full w-full">
              <Image
                fill
                src={imageUrl}
                alt="profile picture"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <>
              <span className="sr-only">{name}</span>
              <Icons.user className="h-5 w-5 text-zinc-900" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      {/* name and email */}
      <DropdownMenuContent>
        <div className="flex items-center justify-start gap-3 p-3">
          <div className="flex flex-col space-y-1 leading-none">
            {name && (
              <p className="font-medium text-sm tracking-wider text-black">
                {name}
              </p>
            )}
            {email && (
              <p className="w-[200px] truncate text-xs tracking-wider text-zinc-700">
                {email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {/* log out */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* logout */}
        <DropdownMenuItem className="cursor-pointer">
          <LogoutLink>Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserNav;
