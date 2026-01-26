"use client";
import { useState, useEffect, useRef } from "react";

interface Props {
  onChange: (value: string) => void;
  initialValue: string;
}

export default function MarkdownEditor({ onChange, initialValue }: Props) {
  const [content, setContent] = useState(initialValue);
  const divRef = useRef<HTMLDivElement>(null);

  // Initialiser le contenu de la div éditable UNIQUEMENT au montage
  useEffect(() => {
    // Si la valeur externe change (Sanity / localStorage), on force la sync
    if (divRef.current && divRef.current.textContent !== initialValue) {
      divRef.current.textContent = initialValue;
    }
    setContent(initialValue);
  }, [initialValue]);

  // Gérer les modifications de l'utilisateur
  const handleInput = () => {
    if (divRef.current) {
      let newContent = divRef.current.innerHTML;
      newContent = newContent.replace(/<div>/g, "\n").replace(/<\/div>/g, "");
      newContent = newContent.replace(/<br\s*\/?>/g, "\n");
      newContent = newContent.replace(/<p>/g, "\n").replace(/<\/p>/g, "");
      newContent = newContent.replace(/<[^>]*>/g, "");
      setContent(newContent);
      onChange(newContent);
      console.log(newContent);
    }
  };

  useEffect(() => {
    const save = () => {
      if (!content) return;

      localStorage.setItem(
        "draft-page-auto-save",
        JSON.stringify({
          content,
          ts: Date.now(),
        }),
      );

      navigator.sendBeacon(
        "/api/pages",
        JSON.stringify({
          title: "Page auto-save",
          slug: "page-auto-save",
          content,
        }),
      );
    };

    window.addEventListener("beforeunload", save);
    window.addEventListener("pagehide", save);

    return () => {
      window.removeEventListener("beforeunload", save);
      window.removeEventListener("pagehide", save);
    };
  }, [content]);

  return (
    <div className="relative">
      <div
        ref={divRef}
        className="border px-3 py-2 rounded min-h-[200px] whitespace-pre-wrap"
        contentEditable={true}
        onBlur={handleInput}
        style={{ outline: "none" }}
        suppressContentEditableWarning={true}
      />
      {!content && (
        <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
          Écris du Markdown ici...
        </div>
      )}
    </div>
  );
}
