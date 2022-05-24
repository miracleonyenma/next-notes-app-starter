// ./prisma/Note.js
import prisma from "./prisma";

// CREATE
export const createNote = async (title, body, session) => {
  const note = await prisma.note.create({
    data: {
      title,
      body,
      user: { connect: { email: session?.user?.email } },
    },
  });

  return note;
};

// READ
export const getAllNotes = async () => {
  const notes = await prisma.note.findMany({});

  return notes;
};

export const getAllNotesByUserID = async (id) => {
  const notes = await prisma.note.findMany({
    where: {
      userId: id,
    },
  });

  return notes;
};

// UPDATE
export const updateNote = async (id, updatedData, session) => {
  let userId = session?.user.id;
  const note = await prisma.note.update({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    data: {
      ...updatedData,
    },
  });

  return note;
};
