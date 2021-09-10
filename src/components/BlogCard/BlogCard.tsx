import { VFC } from "react";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { Blog } from "../../types/Blog";

type Props = {
  blog: Blog;
};

const BlogCard: VFC<Props> = ({ blog }) => {
  return (
    <Link href={`/blog/${blog.id}`} key={blog.id}>
      <li
        key={blog.id}
        className="w-full md:w-2/5 p-3 md:p-5 border-2 dark:border-gray-800 rounded-lg flex flex-col justify-between"
      >
        <div className="w-full">
          <a className="text-md md:text-xl dark:text-gray-300">{blog.title}</a>
        </div>
        <div className="flex gap-1 flex-wrap py-2">
          {blog.tags.map((tag) => (
            <span key={tag.id} className="bg-yellow-500 dark:bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
              {tag.name}
            </span>
          ))}
        </div>
        <p className="text-right text-sm text-gray-600 dark:text-gray-400">
          {formatDistance(new Date(blog.createdAt), new Date(), {
            addSuffix: true,
            // locale: ja,
          })}
        </p>
      </li>
    </Link>
  );
};

export default BlogCard;
