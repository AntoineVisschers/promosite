"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MarkdownViewer from "../components/MarkdownViewer";
import MarkdownEditor from "../components/MarkdownEditor";
import MarkdownPagesList from "../components/Menu";

export default function Page() {
  const [sanityMarkdown, setSanityMarkdown] = useState("");
  const [localMarkdown, setLocalMarkdown] = useState("");
  const router = useRouter();

  const loadSanityContent = async () => {
    const res = await fetch("/api/pages/page-auto-save", {
      cache: "no-store",
    });
    const data = await res.json();
    console.log(data);
    const sanityContent = data?.page?.content || "";

    const localDraft = JSON.parse(
      localStorage.getItem("draft-page-auto-save") || "null",
    );

    if (localDraft?.content && localDraft.content !== sanityContent) {
      console.log("Using local draft instead of stale Sanity", localDraft);
      setLocalMarkdown(localDraft.content);
      setSanityMarkdown(localDraft.content);
    } else {
      console.log(
        "Using not local draft instead of stale Sanity",
        sanityContent,
      );
      setLocalMarkdown(sanityContent);
      setSanityMarkdown(sanityContent);
    }
  };

  const saveDraft = () => {
    if (!localMarkdown) return;

    localStorage.setItem(
      "draft-page-auto-save",
      JSON.stringify({
        content: localMarkdown,
        ts: Date.now(),
      }),
    );

    navigator.sendBeacon(
      "/api/pages",
      JSON.stringify({
        title: "Page auto-save",
        slug: "page-auto-save",
        content: localMarkdown,
      }),
    );
  };

  useEffect(() => {
    loadSanityContent();
  }, []);

  return (
    <main className="p-6">
      <MarkdownPagesList onNavigate={saveDraft} />
      <h1 className="text-3xl font-bold mb-4">Prévisualisateur Markdown</h1>

      <MarkdownEditor
        onChange={(val) => {
          setLocalMarkdown(val);
        }}
        initialValue={sanityMarkdown}
      />

      <h2 className="text-xl font-semibold mt-6 mb-2">Prévisualisation HTML</h2>
      <MarkdownViewer text={localMarkdown} />

      <div className="mt-6">
        <Link href="/api/pages">Voir endpoint API pages (backend Sanity)</Link>
      </div>
    </main>
  );
}
