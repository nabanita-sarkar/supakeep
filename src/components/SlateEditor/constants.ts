import { MarkTypes } from "./types";

export const HOTKEYS: { [key: string]: MarkTypes } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export const LIST_TYPES = ["numbered-list", "bulleted-list", "ch"];
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
