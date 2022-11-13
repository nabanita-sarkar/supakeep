import { Descendant, Text } from "slate";
import { jsx } from "slate-hyperscript";

export function serialize(node: Descendant): string {
  if (Text.isText(node)) {
    let string = node.text ?? "";
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<i>${string}</i>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    if (node.code) {
      string = `<code>${string}</code>`;
    }
    return string;
  }
  const children: string = node?.children?.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "block-quote":
      return `<blockquote>${children}</blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "link":
      return `<a href="${node.url}">${children}</a>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "list-item":
      return `<li>${children}</li>`;
    default:
      return children;
  }
}

export function serializeToString(value: Descendant[]) {
  // return serialize({ children: value, type: "paragraph" });

  return value.map((node) => serialize(node)).join("\n");
}

export function deserialize(el: any): any {
  // console.log(el.nodeName);

  if (el?.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeName === "STRONG" || el.nodeName === "B") {
    return { text: el.textContent, bold: true };
  } else if (el.nodeName === "I") {
    return { text: el.textContent, italic: true };
  } else if (el.nodeName === "U") {
    return { text: el.textContent, underline: true };
  } else if (el.nodeName === "CODE") {
    return { text: el.textContent, code: true };
  } else if (el?.nodeType !== 1) {
    return null;
  }

  let children = Array.from(el?.childNodes).map((node) => deserialize(node));

  if (children.length === 0) {
    if (el.nodeName === "BODY") children = [{ type: "paragraph", children: [{ text: "" }] }];
    else children = [{ text: "" }];
  }

  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "BLOCKQUOTE":
      return jsx("element", { type: "block-quote" }, children);
    case "P":
      return jsx("element", { type: "paragraph" }, children);
    case "H1":
      return jsx("element", { type: "heading-one" }, children);
    case "H2":
      return jsx("element", { type: "heading-two" }, children);
    case "OL":
      return jsx("element", { type: "numbered-list" }, children);
    case "UL":
      return jsx("element", { type: "bulleted-list" }, children);
    case "LI":
      return jsx("element", { type: "list-item" }, children);
    case "A":
      return jsx("element", { type: "link", url: el.getAttribute("href") }, children);
    // default:
    //   return el.textContent;
  }
}

export function serializeToPlainText(node: Descendant): string {
  if (Text.isText(node)) {
    return node.text ?? "";
  } else {
    const children = node?.children?.map((n: Descendant) => serializeToPlainText(n)).join("");
    if (
      node.type &&
      ["heading-one", "heading-two", "paragraph", "block-quote", "numbered-list", "bulleted-list"].includes(node.type)
    ) {
      return children + "\n";
    }
    return children;
  }
}

export const deserializeToHTML = (content: string) => {
  const document = new DOMParser().parseFromString(content, "text/html");
  return deserialize(document.body);
};
