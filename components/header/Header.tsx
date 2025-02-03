import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import { SearchBox } from "./SearchBox";
import { Lilita_One } from "next/font/google";
import { MenuIcon } from "lucide-react";
import Image from "next/image";

const logoFont = Lilita_One({
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  return (
    <header className="w-full md:px-[5%]">
      <nav>
        <div className="navbar justify-between items-center ">
          <div>
            <label htmlFor="my-drawer" className=" ">
              <MenuIcon />
            </label>
          </div>
          <Link
            href="/"
            className={` ${logoFont.className} flex ml-5 text-2xl `}
          >
            <Image
              src="/logo.png"
              className="w-32 h-auto"
              width={400}
              height={400}
              alt=""
            />
          </Link>

          <Menu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
