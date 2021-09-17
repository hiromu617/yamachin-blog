import { VFC } from "react";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { Blog } from "../../types/Blog";
import { Locales } from "../../types/Locales";
import { ja } from "date-fns/locale";

type Props = {
  blog: Blog;
  locale: Locales;
};

export const BlogCard: VFC<Props> = ({ blog, locale }) => {
  return (
    <Link href={`/blog/${blog.id}`} key={blog.id} passHref>
      <a
        key={blog.id}
        className="w-full md:w-2/5 p-3 md:p-5 border-2 dark:border-gray-700 rounded-lg flex flex-col justify-between"
      >
        <div className="w-full">
          <h3 className="text-md  font-semibold md:text-xl text-gray-600 dark:text-gray-300">
            {locale === "ja" ? blog.title : blog.enTitle}
          </h3>
        </div>
        <div className="flex gap-1 flex-wrap py-2">
          {blog.tags.map((tag) => (
            <Link href={`/tag/${tag.id}`} key={tag.id} passHref>
              <span className="bg-yellow-500 dark:bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                {locale === "ja" ? tag.name : tag.enName}
              </span>
            </Link>
          ))}
        </div>
        <p className="text-right text-sm text-gray-600 dark:text-gray-400">
          {locale === "ja"
            ? formatDistance(new Date(blog.createdAt), new Date(), {
                addSuffix: true,
                locale: ja,
              })
            : formatDistance(new Date(blog.createdAt), new Date(), {
                addSuffix: true,
              })}
        </p>
      </a>
    </Link>
  );
};
