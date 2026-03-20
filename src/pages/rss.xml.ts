import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);

  const publications = await getCollection("publications");

  const postItems = sortedPosts.map(({ data, id, filePath }) => ({
    link: getPath(id, filePath),
    title: data.title,
    description: data.description,
    pubDate: new Date(data.modDatetime ?? data.pubDatetime),
  }));

  const pubItems = publications.map(({ data, id }) => ({
    link: `/publications/${id}`,
    title: data.title,
    description: data.tldr ?? data.abstract ?? "",
    pubDate: data.pubDate,
  }));

  const allItems = [...postItems, ...pubItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
  );

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: allItems,
  });
}
