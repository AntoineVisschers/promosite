"use client";

import { useState } from "react";
import Link from "next/link";
import MarkdownViewer from "../components/MarkdownViewer";
import MarkdownInput from "../components/MarkdownInput";

export default function Page() {
  const [value, setValue] = useState("");

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Prévisualisateur Markdown</h1>

      <MarkdownInput onChange={(val) => setValue(val)} />

      <h2 className="text-xl font-semibold mt-6 mb-2">Prévisualisation HTML</h2>
      <MarkdownViewer text={value} />

      <div className="mt-6">
        <Link href="/api/pages">Voir endpoint API pages (backend Sanity)</Link>
      </div>
    </main>
  );
}
