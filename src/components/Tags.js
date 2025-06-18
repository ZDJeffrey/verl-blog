import Head from "next/head";
import { useRouter } from "next/router";

export default function Tags(props) {
  const router = useRouter();

  const title = props.title ? props.title + " | VERL" : "VERL";
  const desc = props.desc
    ? props.desc
    : "VERL is a flexible, efficient and production-ready RL training library for large language models (LLMs).";
  const image = props.image ? props.image : "/social.png";
  const alt = props.alt
    ? props.alt
    : "The text: VERL, Volcano Engine Reinforcement Learning for LLMs.";
  const slug = props.slug ? props.slug : router.route;

  return (
    <Head>
      <title>{title}</title>

      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta name="description" content={desc} />
      <meta property="og:description" content={desc} />
      <meta name="twitter:description" content={desc} />

      <meta property="og:image" content={"https://blog.verl.com" + image} />
      <meta name="twitter:image" content={"https://blog.verl.com" + image} />

      <meta name="twitter:image:alt" content={alt} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={"https://blog.verl.com" + slug} />
      <meta name="twitter:url" content={"https://blog.verl.com" + slug} />
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#1d1d1f" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
    </Head>
  );
}
