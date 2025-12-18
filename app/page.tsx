"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MarkdownViewer from "../components/MarkdownViewer";
import MarkdownInput from "../components/MarkdownInput";
import MarkdownPagesList from "../components/Menu";

export default function Page() {
  const [sanityMarkdown, setSanityMarkdown] = useState("");
  const [localMarkdown, setLocalMarkdown] = useState("");

  const loadSanityContent = async () => {
    const res = await fetch("/api/pages");
    const data = await res.json();
    console.log("Données chargées depuis Sanity :", data);
    setSanityMarkdown(data?.doc?.content?.code || "");
  };

  useEffect(() => {
    loadSanityContent();
  }, [localMarkdown]);

  return (
    <main className="p-6">
      <MarkdownPagesList />
      <h1 className="text-3xl font-bold mb-4">Prévisualisateur Markdown</h1>

      <MarkdownInput onChange={(val) => setLocalMarkdown(val)} />

      <h2 className="text-xl font-semibold mt-6 mb-2">Prévisualisation HTML</h2>
      <MarkdownViewer text={sanityMarkdown} />

      <div className="mt-6">
        <Link href="/api/pages">Voir endpoint API pages (backend Sanity)</Link>
      </div>
    </main>
  );
}
