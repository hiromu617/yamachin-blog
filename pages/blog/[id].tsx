import type { NextPage } from "next";
import { client } from "../../libs/client";
import { format } from "date-fns";

type Props = {
  blog: any;
};

const BlogId: NextPage<Props> = ({ blog }) => {
  return (
    <main className="container md:px-10">
      <div className="text-center mb-16">
        <h1 className="text-2xl text-gray-800 my-5 font-semibold">
          {blog.title}
        </h1>
        <div className="flex justify-center  gap-1 flex-wrap py-2">
          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            English
          </span>
          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            Economy
          </span>
        </div>
        <p className="text-gray-700">
          {format(new Date(blog.publishedAt), "yyyy-MM-dd")}
        </p>
      </div>
      <article
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className="prose text-gray-700 mx-auto"
      />
    </main>
  );
};
export default BlogId;

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data: any = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
