import { BLOG_PATH, PUBLICATIONS_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";

/**
 * Get full path of a content entry
 * @param id - id of the content entry (aka slug)
 * @param filePath - the content entry full file location
 * @param includeBase - whether to include base path in return value
 * @param basePath - the base path to use (defaults to "/posts")
 * @param contentPath - the content directory path (defaults to BLOG_PATH)
 * @returns content entry path
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  includeBase = true,
  basePath = "/posts",
  contentPath = BLOG_PATH
) {
  const pathSegments = filePath
    ?.replace(contentPath, "")
    .split("/")
    .filter(path => path !== "") // remove empty string in the segments ["", "other-path"] <- empty string will be removed
    .filter(path => !path.startsWith("_")) // exclude directories start with underscore "_"
    .slice(0, -1) // remove the last segment_ file name_ since it's unnecessary
    .map(segment => slugifyStr(segment)); // slugify each segment path

  const base = includeBase ? basePath : "";

  // Making sure `id` does not contain the directory
  const entryId = id.split("/");
  const slug = entryId.length > 0 ? entryId.slice(-1) : entryId;

  // If not inside the sub-dir, simply return the file path
  if (!pathSegments || pathSegments.length < 1) {
    return [base, slug].join("/");
  }

  return [base, ...pathSegments, slug].join("/");
}

/**
 * Get full path of a publication
 */
export function getPublicationPath(
  id: string,
  filePath: string | undefined,
  includeBase = true
) {
  return getPath(id, filePath, includeBase, "/publications", PUBLICATIONS_PATH);
}
