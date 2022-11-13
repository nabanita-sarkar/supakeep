import { MantineColor } from "@mantine/core";
import { DBSchema } from "idb";
import { Descendant } from "slate";

export interface Tag {
  _id: string;
  name: string;
  color: MantineColor | string;
}

export interface Note {
  _id: string;
  title: string;
  content: Descendant[];
  tags: Tag[];
}

export type NoteWithoutID = Omit<Note, "_id">;
export type TagWithoutID = Omit<Tag, "_id">;

export interface SupakeepSchema extends DBSchema {
  notes: {
    key: string;
    value: Note;
  };
  tags: {
    key: string;
    value: Tag;
  };
}
