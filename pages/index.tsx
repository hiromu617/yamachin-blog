import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { client } from "../libs/client";

type Props = {
  blog: any
}

const Home: NextPage<Props> = ({blog}) => {
  return (
    <div>
      <ul>
        {blog.map((blog: any) => (
          <li key={blog.id} className="bg-blue-500">
            <Link href={`/blog/${blog.id}`}>
              <a className="text-xl">{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const data: any = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};
