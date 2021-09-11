import type { NextPage } from "next";
import Image from "next/image";
import { client } from "../libs/client";
import { GoBackBtn } from "../src/components/GoBackBtn/GoBackBtn";
import { useLocales } from "../src/hooks/useLocales";

type Props = {
  profile: Profile;
};

type Profile = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  profile_image: {
    url: string;
    height: number;
    width: number;
  };
  body: string;
  enBody: string;
};

const About: NextPage<Props> = ({ profile }) => {
  const { locale } = useLocales();
  return (
    <main className="container px-5 md:px-10 mb-16">
      <div className="text-left mb-2 md:my-5 m-auto max-w-2xl">
        <h2 className="text-2xl md:text-3xl text-yellow-500 font-semibold">
          About
        </h2>
      </div>
      <div className="text-center mb-10 md:mb-16">
        <div className="relative m-auto w-44 h-44 md:w-60 md:h-60">
          <Image
            layout="fill"
            src={profile.profile_image.url}
            alt={"profile_imgae"}
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>
      <article
        dangerouslySetInnerHTML={{
          __html: `${locale === "ja" ? profile.body: profile.enBody}`,
        }}
        className="prose-yellow prose-sm md:prose text-gray-700 dark:text-gray-300 dark:prose-dark  mx-auto"
      />
      <GoBackBtn />
    </main>
  );
};
export default About;

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data: Profile = await client.get({ endpoint: "profile" });
  return {
    props: {
      profile: data,
    },
  };
};
