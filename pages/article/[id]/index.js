import { useRouter } from "next/router";
import { server } from "../../../config/index";
import Meta from "../../../components/Meta";
import Link from "next/link";

const article = ({ article }) => {
  //   const router = useRouter();
  //   const { id } = router.query;

  return (
    <>
      <Meta title={article.title} />
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href="/">
        <span className="goback">Go Back</span>
      </Link>
      <style jsx>
        {`
          .goback {
            border: 1px solid #0070f3;
            border-radius: 10px;
            padding: 5px 5px;
            background: rgba(0, 0, 0, 0);
          }

          .goback:hover {
            background: #0070f3;
            transition: ease 1s background;
            color: #fff;
            // transition: ease 1s color;
          }
        `}
      </style>
    </>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/articles/${context.params.id}`);

  const article = await res.json();

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`);

  const articles = await res.json();

  const ids = articles.map((article) => article.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

// export const getStaticProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );

//   const article = await res.json();

//   return {
//     props: {
//       article,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

//   const articles = await res.json();

//   const ids = articles.map((article) => article.id);
//   const paths = ids.map((id) => ({ params: { id: id.toString() } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

export default article;
