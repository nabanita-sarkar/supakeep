import { ActionIcon, Checkbox, Menu } from "@mantine/core";
import { TbGripVertical } from "react-icons/tb";
import { RenderElementProps, useSlate } from "slate-react";

import { elementMenuList } from "../SlateEditor.constants";
import { toggleBlock } from "../SlateEditor.functions";
import styles from "../SlateEditor.module.scss";

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
        {elementMenuList.map((item) => {
          return (
            <Menu.Item
              key={item.format}
              icon={item.icon}
              onClick={() => {
                toggleBlock(editor, item.format);
              }}
            >
              {item.label}
            </Menu.Item>
          );
        })}
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

export default Element;
