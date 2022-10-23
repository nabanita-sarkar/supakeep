import { ActionIcon } from "@mantine/core";
import { ReactNode, useEffect, useRef } from "react";
import { useFocused, useSlate } from "slate-react";
import { Portal, ToolsMenu } from ".";
import {
  TbAlignCenter,
  TbAlignJustified,
  TbAlignLeft,
  TbAlignRight,
  TbBold,
  TbCode,
  TbGripVertical,
  TbH1,
  TbH2,
  TbItalic,
  TbList,
  TbListNumbers,
  TbPlus,
  TbQuote,
  TbUnderline,
} from "react-icons/tb";

import styles from "../SlateEditor.module.scss";
import { isMarkActive, toggleMark } from "../functions";
import { Editor, Range } from "slate";

function MarkButton({ format, icon }: { format: string; icon: ReactNode }) {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);
  return (
    <ActionIcon
      radius="sm"
      className={isActive ? styles.active : ""}
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </ActionIcon>
  );
}

function HoveringToolbar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (!selection || !inFocus || Range.isCollapsed(selection) || Editor.string(editor, selection) === "") {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();
    el.style.opacity = "1";
    if (rect) {
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
      el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
    }
  });

  return (
    <Portal>
      <ToolsMenu
        ref={ref}
        className={styles["hovering-menu"]}
        onMouseDown={(e: any) => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault();
        }}
      >
        <MarkButton format="bold" icon={<TbBold />} />
        <MarkButton format="italic" icon={<TbItalic />} />
        <MarkButton format="underline" icon={<TbUnderline />} />
        <MarkButton format="code" icon={<TbCode />} />
      </ToolsMenu>
    </Portal>
  );
}

export default HoveringToolbar;
