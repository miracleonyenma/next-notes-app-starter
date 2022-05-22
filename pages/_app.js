import { NoteProvider } from "../modules/AppContext";

import DefaultLayout from "../layouts/default";

import "../styles/globals.css";
import "../styles/Editor.css";
import '../styles/SiteHeader.css'
import "../styles/NoteList.css"

function MyApp({ Component, pageProps }) {
  return (
    <NoteProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </NoteProvider>
  );
}

export default MyApp;
