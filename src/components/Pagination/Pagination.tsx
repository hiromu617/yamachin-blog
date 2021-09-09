import { VFC } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  totalCount: number;
};

const Pagination: VFC<Props> = ({ totalCount }) => {
  const PER_PAGE = 5;
  const router = useRouter();
  const { id } = router.query;
  const currentPage: number = id ? +id : 1;

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul className="flex justify-center gap-2 items-center">
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link href={`/blog/page/${number}`}>
            {currentPage === +number ? (
              <a className="text-white bg-yellow-500 p-2 h-8 w-8 rounded-full inline-flex justify-center items-center">
                {number}
              </a>
            ) : (
              <a className="text-gray-800 hover:text-white hover:bg-yellow-400 p-2 h-8 w-8 rounded-full inline-flex justify-center items-center">
                {number}
              </a>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
