"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Page } from "../content/types/Page";

export default function Menu({ onNavigate }: { onNavigate?: () => void }) {
  const [pages, setPages] = useState<Page[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/pages")
      .then((res) => res.json())
      .then((res) => setPages(res.pages));
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(); // Sauvegarder avant de naviguer
    }
    router.push(href);
  };

  return (
    <nav>
      <ul className="space-y-2">
        {pages.map((p) => (
          <li key={p.slug.current}>
            <Link
              href={`/pages/${p.slug.current}`}
              onClick={(e) => handleLinkClick(e, `/pages/${p.slug.current}`)}
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
