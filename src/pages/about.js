import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import Tags from "../components/Tags";

export default function About({ frontmatter, content }) {
  return (
    <div className="w-full flex justify-center py-5 pt-16 md:pt-5">
      <Tags title="About" />
      <div className="container px-5">
        <h1 className="text-8xl md:text-8xl font-bold">
          {frontmatter.title.toUpperCase()}
        </h1>
        <hr className="mb-5 mt-2 md:hidden" />

        <div
          className="article"
          dangerouslySetInnerHTML={{ __html: md().render(content) }}
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const prefix = process.env.NEXT_PUBLIC_PREFIX_URL || '';
  
  const fileName = fs.readFileSync(`content/about.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);

  {/* Replace Image Path */}
  const replacedContent = content
    .replace(/!\[(.*?)\]\(\s*(\/[^)]+)\s*\)/g, `![$1](${prefix}$2)`)
    .replace(/<img\s+([^>]*?)src=["']\/([^"']+)["']/g, `<img $1src="${prefix}/$2"`);

  return {
    props: {
      frontmatter,
      content: replacedContent,
    },
  };
}
