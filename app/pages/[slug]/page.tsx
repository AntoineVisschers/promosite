"use client";

import { useEffect, useState } from "react";
import MarkdownViewer from "../../../components/MarkdownViewer";

async function getPage(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/pages/${slug}`,
    {
      cache: "no-store", // important pour CMS
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch page");
  }

  const data = await res.json();
  return data.page;
}

export default function MarkdownPage({ params }: { params: { slug: string } }) {
  const [page, setPage] = useState<{ title: string; content: string } | null>(
    null,
  );
  const [localMarkdown, setLocalMarkdown] = useState("");

  useEffect(() => {
    const loadPage = async () => {
      const pageData = await getPage(params.slug);
      setPage(pageData);

      // Récupérer le brouillon local
      const localDraft = JSON.parse(
        localStorage.getItem("draft-page-auto-save") || "null",
      );
      console.log(localDraft);

      // Si un brouillon local existe, l'utiliser
      if (localDraft?.content) {
        setLocalMarkdown(localDraft.content);
      } else {
        setLocalMarkdown(pageData.content);
      }
    };

    loadPage();
  }, [params.slug]);

  if (!page) {
    return <div>Chargement...</div>;
  }

  return (
    <main className="prose p-6">
      <h1>{page.title}</h1>
      <MarkdownViewer text={localMarkdown} />
    </main>
  );
}
