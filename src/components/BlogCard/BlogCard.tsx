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
        className="w-full md:w-2/5 p-5 border-2 rounded-lg flex flex-col justify-between"
      >
        <div className="w-full">
          <a className="text-xl">{blog.title}</a>
        </div>
        <div className="flex gap-1 flex-wrap py-2">
          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            English
          </span>
          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            Economy
          </span>
        </div>
        <p className="text-right text-sm text-gray-600">
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
