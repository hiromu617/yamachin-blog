import { VFC } from "react";
import Link from "next/link";

export const HeroSection: VFC = () => {
  return (
    <div className="mx-auto py-20 md:px-20 text-left md:text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-700 dark:text-white sm:text-5xl md:text-6xl">
          Brave Man into Master,
          <br />
          <span className="text-yellow-500">
            Econometrics, Sanitation, and India
          </span>
        </h1>
        <div className="w-full text-left md:text-center my-10">
          <Link href="/about">
            <button className="px-8 py-2 border border-transparent text-base font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 md:py-4 md:text-lg md:px-10">
              Visit Profile
            </button>
          </Link>
        </div>
      </div>
  )
}
