import SlateEditor from "components/SlateEditor";
import { CustomElement } from "components/SlateEditor/SlateEditor.types";
import styles from "./Note.module.scss";

function Note() {
  return (
    <div className={styles.container}>
      <SlateEditor
        value={initialValue}
        onChange={() => {
          // ;
        }}
      />
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
      {
        // type: "url",
        url: "hey.com",
        // children: [{ text: "link" }],
        text: "link",
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

export default Note;
