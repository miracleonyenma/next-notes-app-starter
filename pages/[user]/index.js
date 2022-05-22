import Head from "next/head";

import NotesList from "../../components/NotesList";

import HomeStyles from "../../styles/Home.module.css";

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      params,
    },
  };
};

const User = ({ params }) => {
  return (
    <>
      <Head>
        <title>Notes app</title>
        <meta name="description" content="Notes app built with Next.js, Prisma & MongoDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={HomeStyles.container}>
        <main className={HomeStyles.main}>
          <div className="wrapper m-auto max-w-8xl">
            {/* Note list component */}
            <NotesList />
          </div>
        </main>
      </div>
    </>
  );
};

export default User;
