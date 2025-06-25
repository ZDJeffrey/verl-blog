import matter from "gray-matter";
import fs from "fs";
import Link from "next/link";
import md from "markdown-it";
import Tags from "../../components/Tags";
import dateFormat from "dateformat";
import ExportedImage from "next-image-export-optimizer";

export default function Blog({ posts }) {
  const prefix = process.env.NEXT_PUBLIC_PREFIX_URL || '';

  return (
    <div className="w-full flex justify-center pt-16 md:pt-5">
      <Tags title="Blog" />
      <div className="container px-5">
        <h1 className="text-8xl md:text-8xl font-bold pb-2">BLOG</h1>
        <div className="text-2xl pb-4">Latest updates and releases by veRL are announced through our blogpost series.</div>
        <hr className="mb-5  md:hidden" />

        {posts.map(({ slug, frontmatter, content, date }) => {
          let cont = md()
            .render(content)
            .replace(/<[^>]+>/g, "");

          if (cont.length > 300) {
            cont = cont.slice(0, 300) + "...";
          }

          return (
            <Link href={"/blog/" + slug} key={slug}>
              <div className="border mb-5 hover:bg-paper hover:text-sky transition-colors cursor-pointer bg-sky text-paper border-paper flex flex-col lg:flex-row items-stretch shadow-lg shadow-neutral-800/20">
                <div className="basis-2/5 team-wrap">
                  <ExportedImage
                    src={`${prefix}${frontmatter.previewImg}`}
                    alt={frontmatter.title}
                    layout="responsive"
                    width={1600}
                    height={900}
                  />
                </div>
                <div className="p-5 basis-3/5">
                  <p className="text-3xl">{frontmatter.title}</p>
                  <p className="text-base pt-2 pb-2">
                    by: {frontmatter.author}, {frontmatter.date}
                  </p>
                  <hr />
                  <p className="text-base pt-2 pb-1">{cont}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const prefix = process.env.NEXT_PUBLIC_PREFIX_URL || '';

  const files = fs.readdirSync("blog");

  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`blog/${fileName}`, "utf-8");
    const { data: frontmatter, content } = matter(readFile);
    const date = Date.parse(frontmatter.date);

    {/* Replace Image Path */}
    const replacedContent = content
      .replace(/!\[(.*?)\]\(\s*(\/[^)]+)\s*\)/g, `![$1](${prefix}$2)`)
      .replace(/<img\s+([^>]*?)src=["']\/([^"']+)["']/g, `<img $1src="${prefix}/$2"`);


    return {
      slug,
      frontmatter,
      content: replacedContent,
      date,
    };
  });

  posts.sort((a, b) => b.date - a.date);

  return {
    props: {
      posts,
    },
  };
}
