import { visit } from "unist-util-visit";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

// Custom schema: allow div, aside, className, etc. (extend as needed)
import { defaultSchema } from "hast-util-sanitize";

const schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), "div", "aside"],
  attributes: {
    ...(defaultSchema.attributes || {}),
    div: ["className", "class"],
    aside: ["className", "class"],
  },
};

export async function markdownToHtml(md: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkGfm)
    // transform directives into HTML-like nodes via a small plugin
    .use(() => (tree) => {
      visit(tree, (node: any) => {
        if (
          node.type === "containerDirective" ||
          node.type === "leafDirective" ||
          node.type === "textDirective"
        ) {
          // convert to html-like element: e.g. :::note -> <div class="note"> ... </div>
          node.type = "html";
          const name = node.name || "div";
          const open = `<div class=\"${name}\">`;
          const close = `</div>`;
          node.value =
            open +
            (node.children
              ? node.children.map((c: any) => c.value || "").join("")
              : "") +
            close;
        }
      });
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, schema)
    .use(rehypeStringify)
    .process(md);

  return String(file);
}
