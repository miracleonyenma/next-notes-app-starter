import { useEffect } from "react";
import Image from "next/image";

import { PencilAltIcon, TrashIcon, ExternalLinkIcon } from "@heroicons/react/solid";

import { useNote, useDispatchNote, useNotes, useDispatchNotes } from "../modules/AppContext";
import Link from "next/link";

const NotesList = ({ retrieved_notes, showEditor }) => {
  // this is where we assign the context to constants
  // which we will use to read and modify our global state
  const notes = useNotes();
  const setNotes = useDispatchNotes();

  const currentNote = useNote();
  const setCurrentNote = useDispatchNote();

  // function to edit note by setting it to the currentNote state
  // and adding the "edit" action which will then be read by the <Editor /> component
  const editNote = (note) => {
    console.log({ note });
    note.action = "edit";
    setCurrentNote(note);
  };

  // function to delete note by using the setNotes Dispatch notes function
  const deleteNote = async (note) => {
    let confirmDelete = confirm("Do you really want to delete this note?");
    try {
      let res = await fetch(`/api/note`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      const deletedNote = await res.json();
      confirmDelete ? setNotes({ note: deletedNote, type: "remove" }) : null;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // replace notes in notes context state
    setNotes({ note: retrieved_notes, type: "replace" });
  }, [retrieved_notes]);

  return (
    <div className="notes">
      {notes.length > 0 ? (
        <ul className="note-list">
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <article className="note">
                <header className="note-header">
                  <h2 className="text-2xl">{note.title}</h2>
                </header>
                <main className=" px-4">
                  <p className="">{note.body}</p>
                </main>
                <footer className="note-footer">
                  <ul className="options">
                    <li className="option">
                      {/* add user image to note footer */}
                      <Image src={note.user.image} alt={note.user.name} width={32} height={32} className="rounded-full" />
                    </li>
                    <li onClick={() => editNote(note)} className="option">
                      <button className="cta cta-w-icon">
                        <PencilAltIcon className="icon" />
                        <span className="">Edit</span>
                      </button>
                    </li>
                    <li className="option">
                      <Link href={`/note/${note.id}`} target={`_blank`} rel={`noopener`}>
                        <button className="cta cta-w-icon">
                          <ExternalLinkIcon className="icon" />
                          <span className="">Open</span>
                        </button>
                      </Link>
                    </li>
                    <li className="option">
                      <button onClick={() => deleteNote(note)} className="cta cta-w-icon">
                        <TrashIcon className="icon" />
                        <span className="">Delete</span>
                      </button>
                    </li>
                  </ul>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="fallback-message">
          <p>Oops.. no notes yet</p>
        </div>
      )}
    </div>
  );
};

export default NotesList;
