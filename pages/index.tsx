import type { NextPage } from "next";
import Link from "next/link";
import { client } from "../libs/client";
import { Blog } from "../src/types/Blog";
import { Tag } from "../src/types/Tag";
import { BlogRes } from "../src/types/BlogRes";
import { TagRes } from "../src/types/TagRes";
import { Pagination } from "../src/components/Pagination/Pagination";
import { BlogCard } from "../src/components/BlogCard/BlogCard";
import { HeroSection } from "../src/components/HeroSection/HeroSection";
import { useLocale } from "../src/hooks/useLocale";
import { NextSeo } from 'next-seo';

type Props = {
  blogs: Blog[];
  blogTotalCount: number;
  tags: Tag[];
  tagTotalCount: number;
};

const Home: NextPage<Props> = ({
  blogs,
  blogTotalCount,
  tags,
  tagTotalCount,
}) => {
  const { t, locale } = useLocale();
  if (!blogs) return <h1>error</h1>;

  return (
    <>
    <NextSeo
      title="Yamachi's Blog"
      description="Yamachi's Blog"
      openGraph={{
        url: 'https://yamachin-blog.vercel.app/',
        title: "Yamachi's Blog",
        description: "Yamachi' Blog",
        images: [
          {
            url: "../public/ogp.jpg",
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
    <div className="w-full">
      <HeroSection />
      <div id="blogSection" className="text-left mb-2 md:my-5 md:ml-24">
        <h2 className="text-xl md:text-3xl text-yellow-500 dark:text-yellow-500 font-semibold">
          {blogTotalCount} {t?.blogHeading}
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
        <Pagination totalCount={blogTotalCount} />
      </div>
      <div className="pb-20">
        <div className="text-left mb-2 md:my-5 md:ml-24">
          <h2 className="text-xl md:text-3xl text-yellow-500 dark:text-yellow-500 font-semibold">
            {tagTotalCount} {t?.tagHeading}
          </h2>
        </div>
        <div className="mx-auto md:px-24 flex gap-3 flex-wrap py-2">
          {tags.map((tag) => (
            <Link href={`/tag/${tag.id}`} key={tag.id} passHref>
              <span
                className="bg-yellow-500 dark:bg-yellow-600 text-white text-md px-2 py-1 rounded-full"
              >
                {locale === "ja" ? tag.name : tag.enName}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const blogData: BlogRes = await client.get({
    endpoint: "blog?offset=0&limit=12",
  });

  const tagData: TagRes = await client.get({
    endpoint: "tag?offset=0&limit=100",
  });

  return {
    props: {
      blogs: blogData.contents,
      blogTotalCount: blogData.totalCount,
      tags: tagData.contents,
      tagTotalCount: tagData.totalCount,
    },
  };
};
