import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type BlockTypes =
  | "paragraph"
  | "block-quote"
  | "heading-one"
  | "heading-two"
  | "bulleted-list"
  | "numbered-list"
  | "link"
  | "list-item"
  | "check-list";

type AlignType = "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";

export type CustomText = { text: string | null; bold?: true; italic?: true; code?: true; underline?: true };
export type MarkTypes = keyof Omit<CustomText, "text">;

export type CustomElement = {
  type: BlockTypes;
  children: CustomText[];
  url?: string;
  align?: AlignType;
  checked?: boolean;
};
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
