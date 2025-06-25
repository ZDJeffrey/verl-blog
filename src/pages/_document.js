import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  const prefix = process.env.NEXT_PUBLIC_PREFIX_URL || '';
  return (
    <Html lang="en">
      <Head>
        <script src={`${prefix}/mathjax.js`} defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.min.js" defer></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
