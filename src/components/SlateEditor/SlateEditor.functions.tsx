import { Editor, Element as SlateElement, Transforms } from "slate";

import { LIST_TYPES, TEXT_ALIGN_TYPES } from "./SlateEditor.constants";
import { BlockTypes, CustomEditor, CustomElement, MarkTypes } from "./SlateEditor.types";

export const toggleBlock = (editor: CustomEditor, format: BlockTypes) => {
  const isActive = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? "align" : "type");
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: { [key: string]: boolean | string | undefined };

  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block: CustomElement = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor: CustomEditor, format: MarkTypes) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const toggleUrl = (editor: CustomEditor, url: string) => {
  const isActive = isMarkActive(editor, "url");

  if (isActive) {
    Editor.removeMark(editor, "url");
  } else {
    Editor.addMark(editor, "url", url);
  }
};

export const isBlockActive = (editor: CustomEditor, format: BlockTypes, blockType: "type" | "align" = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
    })
  );

  return !!match;
};

export const isMarkActive = (editor: CustomEditor, format: MarkTypes) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

// export const insertLink = (editor: CustomEditor, url: string) => {
//   if (editor.selection) {
//     wrapLink(editor, url);
//   }
// };

// const isLinkActive = (editor: CustomEditor) => {
//   const [link] = Editor.nodes(editor, {
//     match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
//   });
//   return !!link;
// };

// const unwrapLink = (editor: CustomEditor) => {
//   Transforms.unwrapNodes(editor, {
//     match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
//   });
// };

// const wrapLink = (editor: CustomEditor, url: string) => {
//   if (isLinkActive(editor)) {
//     unwrapLink(editor);
//   }

//   const { selection } = editor;
//   const isCollapsed = selection && Range.isCollapsed(selection);
//   const link: CustomElement = {
//     type: "link",
//     url,
//     children: isCollapsed ? [{ text: url }] : [],
//   };

//   if (isCollapsed) {
//     console.log("here");

//     Transforms.insertNodes(editor, link);
//   } else {
//     console.log("or here");

//     Transforms.wrapNodes(editor, link, { split: true });
//     Transforms.collapse(editor, { edge: "end" });
//   }
// };
