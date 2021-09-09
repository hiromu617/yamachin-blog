import Link from "next/link";
import { VFC } from "react";
import BlogCard from "../../../src/components/BlogCard/BlogCard";
import Pagination from "../../../src/components/Pagination/Pagination";
import { Blog } from "../../../src/types/Blog";
import { BlogRes } from "../../../src/types/BlogRes";
import { client } from "../../../libs/client";

const PER_PAGE = 5;

type Props = {
  blogs: Blog[];
  totalCount: number;
};

const BlogPageId: VFC<Props> = ({ blogs, totalCount }) => {
  return (
    <div className="w-full">
      <div className="text-left mb-2 md:my-5 md:ml-24">
        <h2 className="text-3xl text-yellow-500 font-semibold">{totalCount} Articles</h2>
      </div>
      <ul className="flex flex-wrap gap-y-5 md:gap-x-5 w-full justify-center">
        {blogs.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
        {/* レイアウト調整用 */}
        {blogs.length % 2 === 1 && <div className="w-full md:w-2/5 p-5"></div>}
      </ul>
      <div className="w-full text-center my-10">
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  );
};

export default BlogPageId;

// 動的なページを作成
export const getStaticPaths = async () => {
  const repos: BlogRes = await client.get({
    endpoint: `blog`,
  });

  const pageNumbers = [];

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`
  );

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context: any) => {
  const id = context.params.id;

  const data: BlogRes = await client.get({
    endpoint: `blog?offset=${(id - 1) * 5}&limit=5`,
  });

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
    },
  };
};
