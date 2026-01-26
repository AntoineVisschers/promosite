"use client";
import { useState, useEffect } from "react";

interface Props {
  onChange: (value: string) => void;
  localValue: string;
}

export default function MarkdownInput({ onChange, localValue }: Props) {
  const [value, setValue] = useState(localValue);

  useEffect(() => {
    setValue(localValue);
  }, [localValue]);

  useEffect(() => {
    if (!value) return;

    const timeout = setTimeout(() => {
      fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Page auto-save",
          slug: "page-auto-save",
          content: value,
        }),
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="border px-3 py-2 rounded min-h-[200px]"
        placeholder="Écris du rmarkdown ici..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value); // ← renvoie le texte au parent
        }}
      />
    </div>
  );
}
