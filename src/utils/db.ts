import { openDB } from "idb";
import { idGen } from "./functions";
import { Note, NoteWithoutID, SupakeepSchema } from "./types";

const DB_NAME = "supakeep";
const NOTE_STORE = "notes";
const TAG_STORE = "tags";

export function createDB() {
  if (!("indexedDB" in window)) {
    console.log("This browser doesn't support IndexedDB.");
  }
}

const dbConn = openDB<SupakeepSchema>(DB_NAME, 1, {
  upgrade(database) {
    createDB();
    if (!database.objectStoreNames.contains(NOTE_STORE)) {
      database.createObjectStore(NOTE_STORE, { keyPath: "_id" });
      database.createObjectStore(TAG_STORE, { keyPath: "_id" });
    }
  },
});

export async function addNote(note: NoteWithoutID) {
  return (await dbConn).add(NOTE_STORE, { ...note, _id: idGen() }).then((val) => val);
}

export async function getAllNotes() {
  return (await dbConn).getAll(NOTE_STORE);
}

export async function getNote(id: string) {
  return (await dbConn).get(NOTE_STORE, id);
}

export async function updateNote(note: Note) {
  return (await dbConn).put(NOTE_STORE, note).then((val) => val);
}
