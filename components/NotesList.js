import { useEffect, useState } from "react";

import {  PencilAltIcon, TrashIcon, ExternalLinkIcon } from "@heroicons/react/solid";

import { useNote, useDispatchNote, useNotes, useDispatchNotes } from "../modules/AppContext";


const NotesList = ({ showEditor }) => {
  const notes = useNotes();
  const setNotes = useDispatchNotes();

  const currentNote = useNote();
  const setCurrentNote = useDispatchNote();

  const editNote = (note) => {
    note.action = "edit";
    setCurrentNote(note);
  };

  const deleteNote = (note) => {
    let confirmDelete = confirm("Do you really want to delete this note?");
    confirmDelete ? setNotes({ note, type: "remove" }) : null;
  };

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
                    <li onClick={() => editNote(note)} className="option">
                      <button className="cta cta-w-icon">
                        <PencilAltIcon className="icon" />
                        <span className="">Edit</span>
                      </button>
                    </li>
                    <li className="option">
                      <button className="cta cta-w-icon">
                        <ExternalLinkIcon className="icon" />
                        <span className="">Open</span>
                      </button>
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
