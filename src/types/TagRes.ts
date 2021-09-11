import { Tag } from "./Tag";

// BlogResと共通化、interface使う
export type TagRes = {
  readonly contents: Tag[];
  readonly totalCount: number;
  readonly offset: number;
  readonly limit: number;
};
