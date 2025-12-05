"use client";

import React from "react";
import DOMPurify from "isomorphic-dompurify";
import { markdownToHtml } from "../lib/markdown";

interface Props {
  text: string;
}

export default function MarkdownViewer({ text }: Props) {
  const [html, setHtml] = React.useState<string>("");

  React.useEffect(() => {
    let mounted = true;
    markdownToHtml(text).then((raw) => {
      if (!mounted) return;
      const clean = DOMPurify.sanitize(raw);
      setHtml(clean);
    });
    return () => {
      mounted = false;
    };
  }, [text]);

  return (
    <article
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
