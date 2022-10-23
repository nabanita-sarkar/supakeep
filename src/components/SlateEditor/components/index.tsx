/* eslint-disable react/display-name */
import React, { Ref, PropsWithChildren, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "../SlateEditor.module.scss";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<HTMLSpanElement> | undefined
  ) => <span {...props} ref={ref} />
);

export const ToolsMenu = React.forwardRef(
  ({ ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLDivElement> | undefined) => (
    <div {...props} ref={ref} className={props.className ? `${props.className} ${styles.menu}` : styles.menu} />
  )
);

export function Portal({ children }: { children: ReactNode }) {
  return typeof document === "object" ? ReactDOM.createPortal(children, document.body) : null;
}

export const Toolbar = React.forwardRef(
  ({ ...props }: PropsWithChildren<BaseProps>, ref: Ref<HTMLDivElement> | undefined) => (
    <div {...props} ref={ref} className={styles.toolbar} />
  )
);
