import Head from "next/head";
import Image from "next/image";

import { getSession } from "next-auth/react";

const getNoteByID = require("../../prisma/Note").getNoteByID;

import HomeStyles from "../../styles/Home.module.css";

export const getServerSideProps = async ({ req, res, params }) => {
  const session = await getSession({ req });
  console.log({ params });
  const { id } = params;

  if (!session) {
    res.statusCode = 403;
    return { props: { note: null } };
  }

  const note = await getNoteByID(id);
  console.log({ note });

  return {
    props: { note },
  };
};

const Note = ({ note }) => {
  if (note == null) {
    return (
      <>
        <Head>
          <title>Login to view note</title>
          <meta name="description" content="Login to view this note" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={HomeStyles.container}>
          <main className={HomeStyles.main}>
            <header className="max-w-4xl mt-24 mx-auto">
              <h1 className="text-4xl">Oops... You have to login to view this note</h1>
            </header>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{note.title}</title>
        <meta name="description" content={`By ${note.user.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={HomeStyles.container}>
        <main className={HomeStyles.main}>
          <article className="note max-w-4xl m-auto mt-20">
            <header className="note-header">
              <h2 className="text-4xl">{note.title}</h2>
            </header>
            <main className=" px-4">
              <p className="text-xl">{note.body}</p>
            </main>
            <footer className="note-footer">
              <ul className="options px-4">
                <li className="option">
                  {/* add user image to note footer */}
                  <Image src={note.user.image} alt={note.user.name} width={48} height={48} className="rounded-full" />
                </li>
              </ul>
            </footer>
          </article>
        </main>
      </div>
    </>
  );
};

export default Note;
