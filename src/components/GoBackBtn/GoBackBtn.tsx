import { VFC } from "react";
import { useLocales } from "../../hooks/useLocales";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export const GoBackBtn: VFC = () => {
  const { t } = useLocales();
  const router = useRouter();
  return (
    <div className="text-center py-14">
      <button
        onClick={() => router.back()}
        className="text-gray-600 dark:text-gray-200 hover:text-yellow-500 w-auto mx-auto flex gap-1 justify-center items-center"
      >
        <ChevronLeftIcon className=" w-6 h-6" />
        <p className="">{t("goBack")}</p>
      </button>
    </div>
  );
};
