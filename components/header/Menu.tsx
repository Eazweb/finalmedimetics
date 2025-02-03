"use client";
import useCartService from "@/lib/hooks/useCartStore";
import useLayoutService from "@/lib/hooks/useLayout";
import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchBox } from "./SearchBox";
import {
  ChevronDown,
  Heart,
  ShoppingCartIcon,
  Square,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Menu = () => {
  const { items, init } = useCartService();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    setMounted(true);
  }, []);

  const signoutHandler = () => {
    signOut({ callbackUrl: "/signin" });
    init();
  };

  const { data: session } = useSession();

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <>
      {/* {pathname && !pathname.startsWith("/admin") && (
        <div className="hidden md:block">
          <SearchBox />
        </div>
      )} */}
      <div>
        <ul className="flex gap-5 justify-center items-center">
          <li>
            <Link className="relative cursor-pointer" href="/cart">
              <button>
                <ShoppingCartIcon />
                {mounted && items.length != 0 && (
                  <div className="w-6 h-6 rounded-full bg-red-600 text-black absolute right-0 bottom-0 flex justify-center items-center">
                    {items.reduce((a, c) => a + c.qty, 0)}
                  </div>
                )}
              </button>
            </Link>
          </li>
          <li>
            <Link className="relative cursor-pointer" href="/wishlist">
              <button>
                <Heart />
              </button>
            </Link>
          </li>
          {session && session.user ? (
            <>
              <li>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <label tabIndex={0} className="cursor-pointer">
                    <User />
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52 "
                  >
                    {session.user.isAdmin && (
                      <li onClick={handleClick}>
                        <Link href="/admin/dashboard">Admin Dashboard</Link>
                      </li>
                    )}

                    <li onClick={handleClick}>
                      <Link href="/order-history">Order history </Link>
                    </li>
                    <li onClick={handleClick}>
                      <Link href="/profile">Profile</Link>
                    </li>
                    <li onClick={handleClick}>
                      <button type="button" onClick={signoutHandler}>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <li>
              <button
                className=""
                type="button"
                onClick={() => signIn()}
              >
                Sign in
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Menu;
