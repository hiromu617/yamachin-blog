import { Tag } from "./Tag";

export type Blog = {
  readonly id: string;
  readonly title: string;
  readonly enTitle: string;
  readonly body: string;
  readonly tags: Tag[];
  readonly createdAt: string;
  readonly publishedAt: string;
  readonly reviseAt: string;
  readonly thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
};
