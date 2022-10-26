import { MantineColor } from "@mantine/core";
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
