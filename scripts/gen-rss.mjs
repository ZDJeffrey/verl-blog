import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import RSS from "rss";

const rootUrl = "https://blog.verl.com";
const projectRoot = path.join(fileURLToPath(import.meta.url), "..", "..");

/**
 * Loads contents of blog posts
 */
const loadBlogPosts = async () => {
  const blogDir = path.join(projectRoot, "blog");
  const blogPostPaths = await readdir(blogDir);

  return (
    await Promise.all(
      blogPostPaths.map(async (filePath) => [
        filePath,
        (await readFile(path.join(projectRoot, "blog", filePath))).toString(),
      ])
    )
  ).reduce(
    (agg, [fileName, fileContents]) => ({ [fileName]: fileContents, ...agg }),
    {}
  );
};

/**
 * Given a blog metadata field, strips label & cleans
 */
const cleanBlogMetadataField = (input) =>
  input
    .split(":")
    .slice(1)
    .join(":")
    .trim()
    .replaceAll(`"`, "")
    .replaceAll(`\\`, "");

/**
 * Given a blog post head, parses out title, author, date & preview
 */
const parseBlogPostHeader = (content) => {
  const [title, authors, date, url] = content
    .split("\n")
    .slice(1, 5)
    .map(cleanBlogMetadataField);

  return {
    title,
    authors,
    date: new Date(date),
    url,
  };
};

const genRssFeed = async () => {
  const rss = new RSS({
    title: "VERL Blog",
    description: `verl is a flexible, efficient and production-ready RL training library for large language models (LLMs).`,
    site_url: rootUrl,
    image_url: `${rootUrl}/public/images/gallery/universe.png`,
  });

  const posts = await loadBlogPosts();
  Object.keys(posts).forEach((postFilename) => {
    const { title, authors, date } = parseBlogPostHeader(posts[postFilename]);

    rss.item({
      title,
      // rm ending '.md'
      url: `${rootUrl}/blog/${postFilename.slice(0, postFilename.length - 3)}/`,
      author: authors,
      date,
    });
  });

  return rss.xml();
};

const writeRssFeed = async () => {
  const xml = await genRssFeed();
  await writeFile(path.join(projectRoot, "public", "rss.xml"), xml);
};

await writeRssFeed();
