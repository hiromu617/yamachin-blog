import { VFC } from "react";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";

const NavBar: VFC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="sticky top-0 bg-white dark:bg-gray-800 z-50">
      <div className="flex justify-between py-3 px-3 md:py-5 md:px-10 items-center border-b-2 border-gray-100 dark:border-gray-700">
        <Link href="/">
          <h1 className="tracking-tighter text-xl font-medium text-gray-700 dark:text-gray-300">
            YAMACHI
          </h1>
        </Link>
        <div className="flex items-center gap-5">
        <Link href="/about/">
          <a className="text-base font-medium text-gray-500 dark:text-gray-300 hover:text-yellow-500">
            About
          </a>
        </Link>
          <button
            aria-label="DarkModeToggle"
            type="button"
            className="p-3"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <MoonIcon className="text-gray-500 h-5 w-5" />
            ) : (
              <SunIcon className="text-gray-500 h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
