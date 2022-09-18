import { MantineColor } from "@mantine/core";

export interface Tag {
  _id: string;
  name: string;
  color: MantineColor | string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  tags: Tag[];
}
