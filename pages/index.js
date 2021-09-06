import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./post/[id]";
import styles from "./index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Blog pessoal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>

          <h1>Blog pessoal de um estudante dev</h1>
          <p>
            Vou postar conteúdos sobre temas que estou estudando, e espero que possa ajudar de alguma forma quem chegou até aqui.
          </p>
        </header>

        <h2 className={styles.heading}>Todas as postagens</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "pt-BR",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/post/${post.id}`}>
                    <a>
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>
                <p>
                  {post.properties.Excerpt.formula.string}
                </p>                
                <p className={styles.postDescription}>{date}</p>
                <p>{post.properties.Tags.multi_select[0].name}</p>
                <Link href={`/post/${post.id}`}>
                  <a> Leia mais →</a>
                </Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
