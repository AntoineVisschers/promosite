import Link from 'next/link'
import MarkdownViewer from '../components/MarkdownViewer'


const sample = `# Titre\n\n:::note\nCeci est une note importante en rmarkdown.\n:::\n\nUne liste:\n- un\n- deux`


export default function Page() {
return (
<main className="p-6">
<h1 className="text-3xl font-bold mb-4">Promosite Demo</h1>
<div className="mb-6">
<Link href="/api/pages">Voir endpoint API pages (backend Sanity)</Link>
</div>
<MarkdownViewer text={sample} />
</main>
)
}