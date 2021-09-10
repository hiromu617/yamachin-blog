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
  const { t } = useLocales();
  if (!blogs) return <h1>error</h1>;

  return (
    <div className="w-full">
      <div className="text-left mb-2 md:my-5 md:ml-24">
        <h2 className="text-xl md:text-3xl text-yellow-500 dark:text-yellow-500 font-semibold">
          {totalCount} {t("indexHeading")}
        </h2>
      </div>
      <ul className="flex flex-wrap gap-y-5 md:gap-x-5 w-full justify-center">
        {blogs.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
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
