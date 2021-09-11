import { VFC, Fragment } from "react";
import Link from "next/link";
import { MoonIcon, SunIcon, CheckIcon } from "@heroicons/react/solid";
import { TranslateIcon } from "@heroicons/react/outline";
import { useTheme } from "next-themes";
import { Listbox, Transition } from "@headlessui/react";
import { useLocales } from "../../hooks/useLocales";

const locales = ["ja", "en"];

export const NavBar: VFC = () => {
  const { theme, setTheme } = useTheme();
  const { t, locale, setLocale } = useLocales();
  return (
    <div className="sticky top-0 h-14 md:h-16 bg-white dark:bg-gray-900 z-50">
      <div className="flex justify-between px-3 h-full md:px-10 items-center border-b-2 border-gray-100 dark:border-gray-700">
        <Link href="/">
          <h1 className="tracking-tighter text-xl font-medium text-gray-700 dark:text-gray-300">
            Yamachi
          </h1>
        </Link>
        <div className="flex items-center gap-5 mr-10">
          <Link href="/about/">
            <a className="text-base font-medium text-gray-500 dark:text-gray-300 hover:text-yellow-500">
              About
            </a>
          </Link>
          <Listbox value={locale} onChange={setLocale}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full text-left cursor-default">
                <button aria-label="LanguageToggle" type="button" className="">
                  <TranslateIcon className="text-gray-500 dark:text-gray-300 h-5 w-5 hover:text-yellow-500" />
                </button>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute -left-full py-1 mt-1 overflow-auto text-base bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {locales.map((locale, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        `${
                          active
                            ? "text-amber-900 bg-amber-100"
                            : "text-gray-900"
                        }
                          cursor-default select-none relative py-2 pl-10 pr-4 hover:bg-yellow-100 dark:hover:bg-gray-700`
                      }
                      value={locale}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate dark:text-gray-300`}
                          >
                            {t(locale)}
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? "text-amber-600" : "text-amber-600"
                              }
                              absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon
                                className="w-5 h-5 text-yellow-500"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <button
            aria-label="DarkModeToggle"
            type="button"
            className="hover:text-yellow-500"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <MoonIcon className="text-gray-500 dark:text-gray-300 h-5 w-5 hover:text-yellow-500" />
            ) : (
              <SunIcon className="text-gray-500 dark:text-gray-300 h-5 w-5 hover:text-yellow-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
