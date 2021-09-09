import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { client } from "../libs/client";
import { formatDistance } from "date-fns";
import ja from "date-fns/locale/ja";
import { Blog } from "../src/types/Blog";

type BlogRes = {
  readonly contents: Blog[];
  readonly totalCounts: number;
  readonly offset: number;
  readonly limit: number;
};

type Props = {
  blogs: Blog[];
};

const Home: NextPage<Props> = ({ blogs }) => {
  if (!blogs) return <h1>error</h1>;

  return (
    <div className="w-full">
      <div className="text-left my-5 ml-24">
        <h2 className="text-3xl text-yellow-500 font-semibold">Blog</h2>
      </div>
      <ul className="flex flex-wrap gap-y-5 md:gap-x-5 w-full justify-center">
        {blogs.map((blog: Blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <li
              key={blog.id}
              className="w-full md:w-2/5 p-5 border-2 rounded-lg"
            >
              <div className="w-full h-16">
                <a className="text-xl">{blog.title}</a>
              </div>
              <div className="flex gap-1 flex-wrap py-2">
                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  English
                </span>
                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  Economy
                </span>
              </div>
              <p className="text-right text-sm text-gray-600">
                {formatDistance(new Date(blog.createdAt), new Date(), {
                  addSuffix: true,
                  // locale: ja,
                })}
              </p>
            </li>
          </Link>
        ))}
        {/* レイアウト調整用 */}
        <div className="w-full md:w-2/5 p-5"></div>
      </ul>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const data: BlogRes = await client.get({ endpoint: "blog" });
  return {
    props: {
      blogs: data.contents,
    },
  };
};
