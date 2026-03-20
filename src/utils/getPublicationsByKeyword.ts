import type { CollectionEntry } from "astro:content";
import { slugifyAll } from "./slugify";

const getPublicationsByKeyword = (
  publications: CollectionEntry<"publications">[],
  keyword: string
) =>
  publications
    .filter(pub => slugifyAll(pub.data.keywords ?? []).includes(keyword))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

export default getPublicationsByKeyword;
