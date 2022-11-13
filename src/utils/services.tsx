import { useMutation, useQuery } from "@tanstack/react-query";
import { addNote, getAllNotes, getNote, updateNote } from "./db";
import { Note } from "./types";

export const useAllNotes = () => {
  return useQuery<Note[]>(["all-notes"], getAllNotes);
};

export const useNote = (id: string) => {
  return useQuery<Note | undefined>(["note", id], async () => await getNote(id));
};

export const useAddNote = () => {
  return useMutation((newNote: Omit<Note, "_id">) => addNote(newNote));
};

export const useUpdateNote = () => {
  return useMutation((note: Note) => updateNote(note));
};
