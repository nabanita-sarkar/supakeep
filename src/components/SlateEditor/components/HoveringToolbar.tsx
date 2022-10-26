import { ActionIcon, Button, Modal, TextInput, Tooltip } from "@mantine/core";
import { forwardRef, MouseEvent, PropsWithChildren, ReactNode, Ref, useEffect, useRef, useState } from "react";
import { TbBold, TbCode, TbItalic, TbLink, TbUnderline } from "react-icons/tb";
import { useFocused, useSlate } from "slate-react";

import { createPortal } from "react-dom";
import { Editor, Range } from "slate";
import { isMarkActive, toggleMark, toggleUrl } from "../SlateEditor.functions";
import styles from "../SlateEditor.module.scss";
import { MarkTypes } from "../SlateEditor.types";
import { TOOLTIP } from "../SlateEditor.constants";

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

function MarkButton({ format, icon }: { format: Exclude<MarkTypes, "url">; icon: ReactNode }) {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);
  return (
    <Tooltip
      label={
        <>
          <span>{format}</span>
          <br />
          <span className={styles.shortcut}>{TOOLTIP[format]}</span>
        </>
      }
    >
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
    </Tooltip>
  );
}

function HoveringToolbar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const editor = useSlate();
  const inFocus = useFocused();

  const [opened, setOpened] = useState(false);
  const [url, setUrl] = useState("");

  function UrlButton({ icon }: { icon: ReactNode }) {
    const format = "url";
    const editor = useSlate();
    const isActive = isMarkActive(editor, format);
    return (
      <>
        <ActionIcon
          radius="sm"
          className={isActive ? styles.active : ""}
          onClick={(event: MouseEvent) => {
            event?.preventDefault();
            setOpened(true);
          }}
        >
          {icon}
        </ActionIcon>
      </>
    );
  }
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
    <>
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
          <UrlButton icon={<TbLink />} />
        </ToolsMenu>
      </Portal>
      <Modal
        title="Link"
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
      >
        <TextInput value={url} onChange={(e) => setUrl(e.target.value)} />
        <Button
          onClick={() => {
            toggleUrl(editor, url);
          }}
        >
          Save
        </Button>
      </Modal>
    </>
  );
}

export default HoveringToolbar;
