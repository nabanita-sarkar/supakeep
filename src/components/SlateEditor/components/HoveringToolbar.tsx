import { ActionIcon } from "@mantine/core";
import { forwardRef, MouseEvent, PropsWithChildren, ReactNode, Ref, useEffect, useRef } from "react";
import { TbBold, TbCode, TbItalic, TbUnderline } from "react-icons/tb";
import { useFocused, useSlate } from "slate-react";

import { createPortal } from "react-dom";
import { Editor, Range } from "slate";
import { isMarkActive, toggleMark } from "../SlateEditor.functions";
import styles from "../SlateEditor.module.scss";
import { MarkTypes } from "../SlateEditor.types";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

const ToolsMenu = forwardRef(function ToolsMenu(
  { ...props }: PropsWithChildren<BaseProps>,
  ref: Ref<HTMLDivElement> | undefined
) {
  return <div {...props} ref={ref} className={props.className ? `${props.className} ${styles.menu}` : styles.menu} />;
});

function Portal({ children }: { children: ReactNode }) {
  return typeof document === "object" ? createPortal(children, document.body) : null;
}

function MarkButton({ format, icon }: { format: MarkTypes; icon: ReactNode }) {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);
  return (
    <ActionIcon
      radius="sm"
      className={isActive ? styles.active : ""}
      onClick={(event: MouseEvent) => {
        event?.preventDefault();
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
        onMouseDown={(e: MouseEvent) => {
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
