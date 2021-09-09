import type { NextPage } from "next";
import { client } from "../../libs/client";

type Props = {
  blog: any;
};

const BlogId: NextPage<Props> = ({ blog }) => {
  return (
    <main className="container p-5">
      <h1 className="text-xl text-gray-700">{blog.title}</h1>
      <p className="text-gray-700">{blog.publishedAt}</p>
      <article
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className="prose text-gray-700"
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
