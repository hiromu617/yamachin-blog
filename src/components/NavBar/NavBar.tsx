import { VFC } from "react";
import Link from "next/link";

const NavBar: VFC = () => {
  return (
    <div className="sticky top-0 bg-white">
      <div className="flex justify-between py-5 px-10 items-center border-b-2 border-gray-100">
        <Link href="/">
          <h1 className="tracking-tighter text-xl font-medium text-gray-700 hover:text-gray-900">YAMACHIN BROG</h1>
        </Link>
        <Link href="/about/">
          <a className="text-base font-medium text-gray-500 hover:text-gray-900">About</a>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
