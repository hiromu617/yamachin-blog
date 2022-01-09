import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../libs/client";
import { format } from "date-fns";
import { Blog } from "../../src/types/Blog";
import { BlogRes } from "../../src/types/BlogRes";
import { useLocale } from "../../src/hooks/useLocale";
import { GoBackBtn } from "../../src/components/GoBackBtn/GoBackBtn";
import { axiosClient } from "../../libs/axios";
import { NextSeo } from "next-seo";

type Props = {
  blog: Blog;
};

const BlogId: NextPage<Props> = ({ blog }) => {
  const { locale } = useLocale();

  return (
    <>
      <NextSeo
        title={blog.title}
        description="Yamachi's Blog"
        openGraph={{
          url: `https://yamachin-blog.vercel.app/blog/${blog.id}`,
          title: blog.title,
          description: "Yamachi's Blog",
          images: [
            {
              url: blog.thumbnail ? blog.thumbnail.url : "../../public/ogp.jpg",
            },
          ],
          site_name: "Yamachi's Blog",
        }}
        twitter={{
          handle: "@EatenTigers_fun",
          site: "@EatenTigers_fun",
          cardType: "summary_large_image",
        }}
      />
      <main className="container md:px-10 pb-16 dark:bg-gray-900">
        <div className="text-center mb-5 md:mb-16">
          {blog.thumbnail && (
            <Image
              width={+blog.thumbnail.width}
              height={+blog.thumbnail.height}
              src={blog.thumbnail.url}
              alt={"thumbnail"}
            />
          )}
          <h1 className="text-lg md:text-2xl text-gray-800 dark:text-gray-200 my-2 md:my-5 font-semibold">
            {locale === "ja" ? blog.title : blog.enTitle}
          </h1>
          <div className="flex justify-center  gap-1 flex-wrap py-2">
            {blog.tags.map((tag) => (
              <Link href={`/tag/${tag.id}`} key={tag.id} passHref>
                <span className="bg-yellow-500 dark:bg-yellow-600 text-white text-md px-3 py-1 rounded-full">
                  {locale === "ja" ? tag.name : tag.enName}
                </span>
              </Link>
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
          className="prose-yellow prose text-gray-700 dark:prose-dark  mx-auto"
        />
        <GoBackBtn />
      </main>
    </>
  );
};
export default BlogId;

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data: BlogRes = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => ({
    params: { id: content.id },
    locale: "ja",
  }));
  paths.push(...paths.map((p) => ({ ...p, locale: "en" })));

  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data: Blog = await client.get({ endpoint: "blog", contentId: id });

  // const params = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   body: JSON.stringify({
  //     auth_key: "f0e552b6-a3c0-c570-6122-643c6effeebd:fx",
  //     target_lang: "JA",
  //     text: 'Hello',
  //     // tag_handling: "xml",
  //   }),
  // };
  // const res = await axiosClient.post("", {
  //   key: process.env.NEXT_PUBLIC_GOOGLE_TRNSLATION_API_KEY,
  //   q: "The Great Pyramid of Giza (also known as the Pyramid of Khufu or the Pyramid of Cheops) is the oldest and largest of the three pyramids in the Giza pyramid complex.",
  //   source: "en",
  //   target: "es",
  //   format: "text",
  // });

  // const translatedData = res.data;
  // console.log(translatedData.error);

  return {
    props: {
      blog: data,
    },
  };
};
