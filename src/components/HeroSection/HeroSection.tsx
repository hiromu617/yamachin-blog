import { VFC } from "react";
import Link from "next/link";
import { Link as Scroll } from "react-scroll";

export const HeroSection: VFC = () => {
  return (
    <div className="mx-auto py-20 md:px-20 text-left md:text-center">
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-700 dark:text-white sm:text-5xl md:text-6xl">
        Mikuinox
        <br />
        <span className="text-yellow-500">Football and Data Analytica</span>
      </h1>
      <div className="w-full justify-start md:justify-center my-10 flex gap-2">
        <Scroll to="blogSection" smooth>
          <button className="px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 md:py-4 md:text-lg md:px-10">
            Visit Blog
          </button>
        </Scroll>

        <Link href="/about" passHref>
          <button className="px-8 py-2 border border-transparent text-base font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 md:py-4 md:text-lg md:px-10">
            Visit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};
