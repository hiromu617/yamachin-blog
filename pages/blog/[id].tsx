import type { NextPage } from "next";
import Image from 'next/image'
import { client } from "../../libs/client";
import { format } from "date-fns";
import { Blog } from "../../src/types/Blog";
import { BlogRes } from "../../src/types/BlogRes";

type Props = {
  blog: Blog;
};

const BlogId: NextPage<Props> = ({ blog }) => {
  return (
    <main className="container md:px-10 pb-16 dark:bg-gray-900">
      <div className="text-center mb-5 md:mb-16">
        {blog.thumbnail && <Image width={+blog.thumbnail.width} height={+blog.thumbnail.height} src={blog.thumbnail.url} alt={"thumbnail"} />}
        <h1 className="text-lg md:text-2xl text-gray-800 dark:text-gray-200 my-2 md:my-5 font-semibold">
          {blog.title}
        </h1>
        <div className="flex justify-center  gap-1 flex-wrap py-2">
          {blog.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-yellow-500 dark:bg-yellow-600 text-white text-md px-3 py-1 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
        <p className="text-gray-700 dark:text-gray-400">
          {format(new Date(blog.publishedAt), "yyyy-MM-dd")}
        </p>
      </div>
      <article
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className="prose-yellow prose-sm md:prose text-gray-700 dark:text-gray-300 mx-auto"
      />
    </main>
  );
};
export default BlogId;

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data: BlogRes = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data: BlogRes = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
