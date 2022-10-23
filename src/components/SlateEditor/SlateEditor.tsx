import isHotkey from "is-hotkey";
import { useCallback, useMemo } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react";

import Element from "./components/Element";
import HoveringToolbar from "./components/HoveringToolbar";
import Leaf from "./components/Leaf";

import { HOTKEYS } from "./SlateEditor.constants";
import { toggleMark } from "./SlateEditor.functions";
import { CustomElement, MarkTypes } from "./SlateEditor.types";
import styles from "./SlateEditor.module.scss";

function RichTextExample() {
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div className={styles.editor}>
      <Slate editor={editor} value={initialValue}>
        <HoveringToolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          className={styles.content}
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
          onDOMBeforeInput={(event) => {
            event.preventDefault();
            return toggleMark(editor, event.inputType as MarkTypes);
          }}
        />
      </Slate>
    </div>
  );
}

const initialValue: CustomElement[] = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    align: "center",
    children: [{ text: "Try it out for yourself!" }],
  },
  {
    type: "check-list",
    checked: true,
    children: [{ text: "A check list" }],
  },
  {
    type: "check-list",
    checked: false,
    children: [{ text: "Todo list" }],
  },
];

export default RichTextExample;
