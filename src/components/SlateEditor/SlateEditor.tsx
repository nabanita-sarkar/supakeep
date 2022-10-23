import isHotkey from "is-hotkey";
import { useCallback, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, RenderElementProps, RenderLeafProps, Slate, useSlate, withReact } from "slate-react";

import { ActionIcon, Checkbox, Menu } from "@mantine/core";
import { TbGripVertical, TbH1, TbH2, TbList, TbListNumbers, TbQuote } from "react-icons/tb";
import HoveringToolbar from "./components/HoveringToolbar";
import { HOTKEYS } from "./constants";
import { toggleBlock, toggleMark } from "./functions";
import styles from "./SlateEditor.module.scss";
import { MarkTypes } from "./types";

function RichTextExample() {
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div className={styles.editor}>
      <Slate editor={editor} value={initialValue}>
        {/* <Toolbar>
          <ToolsMenu>
            <MarkButton format="bold" icon={<TbBold />} />
            <MarkButton format="italic" icon={<TbItalic />} />
            <MarkButton format="underline" icon={<TbUnderline />} />
            <MarkButton format="code" icon={<TbCode />} />
          </ToolsMenu>
          <ToolsMenu>
            <BlockButton format="heading-one" icon={<TbH1 />} />
            <BlockButton format="heading-two" icon={<TbH2 />} />
            <BlockButton format="block-quote" icon={<TbQuote />} />
            <BlockButton format="numbered-list" icon={<TbListNumbers />} />
            <BlockButton format="bulleted-list" icon={<TbList />} />
          </ToolsMenu>
          <ToolsMenu>
            <BlockButton format="left" icon={<TbAlignLeft />} />
            <BlockButton format="center" icon={<TbAlignCenter />} />
            <BlockButton format="right" icon={<TbAlignRight />} />
            <BlockButton format="justify" icon={<TbAlignJustified />} />
          </ToolsMenu>
        </Toolbar> */}
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

function Element({ attributes, children, element }: RenderElementProps) {
  const style = { textAlign: element.align };
  const editor = useSlate();

  const optionsMenu = (
    <Menu>
      <Menu.Target>
        <ActionIcon className={styles["menu-btn"]}>
          <TbGripVertical size={16} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<TbH1 />}
          onClick={() => {
            toggleBlock(editor, "heading-one");
          }}
        >
          Heading-1
        </Menu.Item>
        <Menu.Item
          icon={<TbH2 />}
          onClick={() => {
            toggleBlock(editor, "heading-two");
          }}
        >
          Heading-2
        </Menu.Item>
        <Menu.Item
          icon={<TbQuote />}
          onClick={() => {
            toggleBlock(editor, "block-quote");
          }}
        >
          Blockquote
        </Menu.Item>
        <Menu.Item
          icon={<TbList />}
          onClick={() => {
            toggleBlock(editor, "bulleted-list");
          }}
        >
          Bulletted List
        </Menu.Item>
        <Menu.Item
          icon={<TbListNumbers />}
          onClick={() => {
            toggleBlock(editor, "numbered-list");
          }}
        >
          Numbered List
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  switch (element.type) {
    case "block-quote":
      return (
        <div {...attributes} className={styles["block-element"]}>
          {optionsMenu}
          <blockquote style={style} {...attributes}>
            {children}
          </blockquote>
        </div>
      );
    case "bulleted-list":
      return (
        <div {...attributes} className={styles["block-element"]}>
          {optionsMenu}
          <ul style={style} {...attributes}>
            {children}
          </ul>
        </div>
      );
    case "heading-one":
      return (
        <div {...attributes} className={styles["block-element"]}>
          {optionsMenu}
          <h1 style={style}>{children}</h1>
        </div>
      );
    case "heading-two":
      return (
        <div {...attributes} className={styles["block-element"]}>
          {optionsMenu}
          <h2 style={style} {...attributes}>
            {children}
          </h2>
        </div>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <div {...attributes} className={styles["block-element"]}>
          {optionsMenu}
          <ol style={style} {...attributes}>
            {children}
          </ol>
        </div>
      );
    case "check-list":
      return (
        <div {...attributes} className={styles["block-element"]}>
          {optionsMenu}
          <Checkbox defaultChecked={element.checked} />
          <p style={style} {...attributes}>
            {children}
          </p>
        </div>
      );
    default:
      return (
        <div {...attributes} className={styles["block-element"]}>
          {optionsMenu}
          <p style={style} {...attributes}>
            {children}
          </p>
        </div>
      );
  }
}

function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
}

const initialValue: Descendant[] = [
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
