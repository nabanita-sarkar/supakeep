import { RenderLeafProps } from "slate-react";

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

  if (leaf.url) {
    children = <a href={leaf.url}>{children}</a>;
  }

  return <span {...attributes}>{children}</span>;
}

export default Leaf;
