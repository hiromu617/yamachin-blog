import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../libs/client";
import { format } from "date-fns";
import { Blog } from "../../src/types/Blog";
import { BlogRes } from "../../src/types/BlogRes";
import { useLocale } from "../../src/hooks/useLocale";
import { GoBackBtn } from "../../src/components/GoBackBtn/GoBackBtn";
import { NextSeo } from "next-seo";

type Props = {
  blog: Blog;
};

const BlogId: NextPage<Props> = ({ blog }) => {
  const { t, locale } = useLocale();

  const blogContent = locale === "en" ? blog.enContent : blog.jaContent;
  const altContent = blog.jaContent ? blog.jaContent : blog.enContent;

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
        {(!blogContent || blogContent.length === 0) && (
          <div className="flex items-center px-6 py-4 bg-yellow-600 border-2 border-yellow-400 text-white rounded mb-5 flex-col">
            <div className="flex-auto">
              <span className="text-xl">{t?.altLangDescription}</span>
            </div>
          </div>
        )}
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

        <article>
          {blogContent &&
            blogContent.length > 0 &&
            blogContent?.map((content, i) => {
              if (content.fieldId === "richEditor") {
                return (
                  <div
                    // 並び替えしないのでindexを使用
                    key={i}
                    dangerouslySetInnerHTML={{
                      __html: `${content.richEditor}`,
                    }}
                    className="prose-yellow prose text-gray-700 dark:prose-dark  mx-auto"
                  />
                );
              }
              if (content.fieldId === "html") {
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${content.html}`,
                    }}
                    className="prose-yellow prose text-gray-700 dark:prose-dark  mx-auto"
                  />
                );
              }
            })}
          {(!blogContent || blogContent.length === 0) &&
            altContent?.map((content) => {
              if (content.fieldId === "richEditor") {
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${content.richEditor}`,
                    }}
                    className="prose-yellow prose text-gray-700 dark:prose-dark  mx-auto"
                  />
                );
              }
              if (content.fieldId === "html") {
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${content.html}`,
                    }}
                    className="prose-yellow prose text-gray-700 dark:prose-dark  mx-auto"
                  />
                );
              }
            })}
        </article>
        <GoBackBtn />
      </main>
    </>
  );
};
export default BlogId;

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data: BlogRes = await client.get({ endpoint: "blog?limit=100" });

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
  console.log(data);
  return {
    props: {
      blog: data,
    },
  };
};
