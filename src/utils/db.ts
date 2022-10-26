import { openDB } from "idb";
import { idGen } from "./functions";
import { Note } from "./types";

const DB_NAME = "supakeep";
const NOTE_STORE = "notes";

export function createDB() {
  if (!("indexedDB" in window)) {
    console.log("This browser doesn't support IndexedDB.");
    return;
  }
  //   console.log(database.objectStoreNames);
  openDB(DB_NAME, 1, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(NOTE_STORE)) {
        database.createObjectStore(NOTE_STORE, { keyPath: "_id" });
      }
    },
  })
    .then(() => {
      console.log("db created");
    })
    .catch(() => {
      console.log("db was not created");
    });
}

const dbConn = openDB(DB_NAME, 1);

export async function addNote(note: Omit<Note, "_id">) {
  return (await dbConn).add(NOTE_STORE, { ...note, _id: idGen() }).then((val) => val);
}

export async function getAllNotes() {
  createDB();
  return (await dbConn).getAll(NOTE_STORE);
}

export async function getNote(id: string) {
  return (await dbConn).get(NOTE_STORE, id);
}

export async function updateNote(note: Note) {
  return (await dbConn).put(NOTE_STORE, note).then((val) => val);
}