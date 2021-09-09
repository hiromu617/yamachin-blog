import { Blog } from "./Blog";

export type BlogRes = {
  readonly contents: Blog[];
  readonly totalCount: number;
  readonly offset: number;
  readonly limit: number;
};
