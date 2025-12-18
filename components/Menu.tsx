"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Page } from "../types/Page";

export default function Menu() {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    fetch("/api/pages")
      .then((res) => res.json())
      .then((res) => setPages(res.pages));
  }, []);

  return (
    <nav>
      <ul className="space-y-2">
        {pages.map((p) => (
          <li key={p.slug.current}>
            <Link
              href={`/pages/${p.slug.current}`}
              className="text-blue-600 underline"
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
