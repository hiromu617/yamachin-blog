import { VFC } from "react";

export const Footer: VFC = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center py-5 px-10 items-center border-t-2 border-gray-100 dark:border-gray-700">
        <p className="text-gray-500 text-xs md:text-md">2021 <a className="underline" href="https://github.com/hiromu617/yamachin-blog">Hiromu Kawai</a>. All Rights Reserved.</p>
      </div>
    </div>
  );
};
