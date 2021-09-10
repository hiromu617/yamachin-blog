import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { client } from "../libs/client";
import { Blog } from "../src/types/Blog";
import { BlogRes } from "../src/types/BlogRes";
import Pagination from "../src/components/Pagination/Pagination";
import BlogCard from "../src/components/BlogCard/BlogCard";
import { useLocales } from "../src/hooks/useLocales";

type Props = {
  blogs: Blog[];
  totalCount: number;
};

const Home: NextPage<Props> = ({ blogs, totalCount }) => {
  const { t, locale } = useLocales();
  if (!blogs) return <h1>error</h1>;

  return (
    <div className="w-full">
      <div className="mx-auto py-20 md:px-20 text-left md:text-center">
        <h1 className="text-3xl tracking-tight font-extrabold text-gray-700 dark:text-gray-400 sm:text-4xl md:text-5xl">
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
      <div className="text-left mb-2 md:my-5 md:ml-24">
        <h2 className="text-xl md:text-3xl text-yellow-500 dark:text-yellow-500 font-semibold">
          {totalCount} {t("indexHeading")}
        </h2>
      </div>
      <ul className="flex flex-wrap gap-y-5 md:gap-x-5 w-full justify-center">
        {blogs.map((blog) => (
          <BlogCard blog={blog} locale={locale} key={blog.id} />
        ))}
        {/* レイアウト調整用 */}
        {blogs.length % 2 === 1 && (
          <div className="hidden md:block  w-full md:w-2/5 p-5"></div>
        )}
      </ul>
      <div className="w-full text-center my-10">
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const data: BlogRes = await client.get({
    endpoint: "blog?offset=0&limit=12",
  });
  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
    },
  };
};
