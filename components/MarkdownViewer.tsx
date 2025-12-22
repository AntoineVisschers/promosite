"use client";

import React from "react";
import { renderTokens } from "./renderer";
import { parseContent } from "../content/parser";

interface Props {
  text: string;
}

export default function MarkdownViewer({ text }: Props) {
  const tokens = parseContent(text || "");
  return (
    <div className="prose max-w-none">
      <p className="text-sm text-gray-600">
        Valeur actuelle : <strong>{text}</strong>
      </p>
      {renderTokens(tokens)}
    </div>
  );
}
