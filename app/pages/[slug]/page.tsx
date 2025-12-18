import MarkdownViewer from "../../../components/MarkdownViewer";

async function getPage(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/pages/${slug}`,
    {
      cache: "no-store", // important pour CMS
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch page");
  }

  const data = await res.json();
  return data.page;
}

export default async function MarkdownPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getPage(params.slug);

  if (!page) {
    return <div>Page introuvable</div>;
  }

  return (
    <main className="prose p-6">
      <h1>{page.title}</h1>
      <MarkdownViewer text={page.content.code} />
    </main>
  );
}
