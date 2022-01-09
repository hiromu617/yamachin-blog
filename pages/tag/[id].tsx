import { useRouter } from "next/router";
import { VFC, useEffect, useState } from "react";
import { BlogCard } from "../../src/components/BlogCard/BlogCard";
import { Blog } from "../../src/types/Blog";
import { Tag } from "../../src/types/Tag";
import { BlogRes } from "../../src/types/BlogRes";
import { useLocale } from "../../src/hooks/useLocale";
import { GoBackBtn } from "../../src/components/GoBackBtn/GoBackBtn";

type Props = {
  blogs: Blog[];
  totalCount: number;
};

const TagId: VFC<Props> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t, locale } = useLocale();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tag, setTag] = useState<Tag>();
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!id) return;
    const fetchDataFromTag = async () => {
      fetch(
        `https://yamachin.microcms.io/api/v1/blog?filters=tags[contains]${id}`,
        {
          headers: {
            "X-API-KEY": process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY as string,
          },
        }
      )
        .then((res) => res.json())
        .then((data: BlogRes) => {
          setBlogs(data.contents);
          setTotalCount(data.totalCount);
        })
        .catch((e) => console.log(e));
    };
    const fetchTag = async () => {
      fetch(`https://yamachin.microcms.io/api/v1/tag?ids=${id}`, {
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY as string,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTag(data.contents[0]);
        })
        .catch((e) => console.log(e));
    };
    fetchDataFromTag();
    fetchTag();
  }, [id]);

  if (!blogs || !tag)
    return (
      <div className="w-full animate-pulse">
        <div className="text-left mb-2 md:my-5 md:ml-24">
          <div className="w-48 h-10 md:w-64 md:h-14 bg-yellow-400 rounded-lg"></div>
        </div>
        <ul className="flex flex-wrap gap-y-5 md:gap-x-5 w-full justify-center">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-full h-32 md:w-2/5 bg-yellow-400 p-3 md:p-5 rounded-lg flex flex-col justify-between"
            ></div>
          ))}
        </ul>
      </div>
    );

  return (
    <div className="w-full">
      <div className="text-left mb-2 md:my-5 md:ml-24">
        <h2 className="text-xl md:text-3xl text-yellow-500 dark:text-yellow-500 font-semibold">
          <span className="bg-yellow-500 dark:bg-yellow-600 text-white text-md px-3 py-1 rounded-full mr-3">
            {locale === "ja" ? tag.name : tag.enName}
          </span>
          {totalCount} {t?.blogHeading}
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
      <GoBackBtn />
    </div>
  );
};

export default TagId;
