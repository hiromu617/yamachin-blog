import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { client } from "../libs/client";

type Props = {
  blog: any;
};

const Home: NextPage<Props> = ({ blog }) => {
  console.log(blog)
  return (
    <div className="w-full">
      <ul className="flex flex-wrap gap-y-5 md:gap-x-5 w-full justify-center">
        {blog.map((blog: any) => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <li key={blog.id} className="w-full md:w-2/5 p-5 border-2 rounded-lg">
              <a className="text-xl">{blog.title}</a>
              <div className="flex gap-1 flex-wrap py-2">
                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">English</span>
                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Economy</span>
              </div>
              <p className="text-right text-md text-gray-600">{blog.createdAt}</p>
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
  const data: any = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};
