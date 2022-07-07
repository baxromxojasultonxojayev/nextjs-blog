import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>{" "}
    </Layout>
  );
}

// export default function FirstPost() {
//   return (
//     <Layout>
//       {postData.title}
//       <br />
//       {postData.id}
//       <br />
//       {postData.date}
//       {/* <Head>
//         <title>My first Post</title>
//         <Script
//           src="https://connect.facebook.net/en_US/sdk.js"
//           strategy="lazyOnload"
//           onLoad={() =>
//             console.log(`script loaded correctly, window.FB has been populated`)
//           }
//         />{" "}
//       </Head> */}
//       <h1>first-post</h1>
//       <h2>
//         <Link href="/">
//           <a>Back to home</a>
//         </Link>
//       </h2>
//     </Layout>
//   );
// }
