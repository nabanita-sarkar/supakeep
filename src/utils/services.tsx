import { useMutation, useQuery } from "@tanstack/react-query";
import { addNote, getAllNotes, updateNote } from "./db";
import { Note } from "./types";

export const useAllNotes = () => {
  return useQuery<Note[]>(["all-notes"], getAllNotes);
};

export const useAddNote = () => {
  return useMutation((newNote: Omit<Note, "_id">) => addNote(newNote));
};

export const useUpdateNote = () => {
  return useMutation((note: Note) => updateNote(note));
};
