import { MarkTypes, BlockTypes } from "./SlateEditor.types";
import { TbCheckbox, TbH1, TbH2, TbList, TbListNumbers, TbQuote } from "react-icons/tb";
import { ReactNode } from "react";

export const HOTKEYS: { [key: string]: MarkTypes } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export const LIST_TYPES = ["numbered-list", "bulleted-list", "ch"];
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

export const elementMenuList: { format: BlockTypes; icon: ReactNode; label: string }[] = [
  {
    format: "heading-one",
    icon: <TbH1 />,
    label: "Heading 1",
  },
  {
    format: "heading-two",
    icon: <TbH2 />,
    label: "Heading 2",
  },
  {
    format: "block-quote",
    icon: <TbQuote />,
    label: "Quote",
  },
  {
    format: "numbered-list",
    icon: <TbListNumbers />,
    label: "Numbered list",
  },
  {
    format: "bulleted-list",
    icon: <TbList />,
    label: "Bulletted list",
  },
  {
    format: "check-list",
    icon: <TbCheckbox />,
    label: "Check list",
  },
];
