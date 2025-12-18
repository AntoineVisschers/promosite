import { NextResponse } from "next/server";
import { sanityClient, writeClient } from "../../../lib/sanityClient";

const docId = "markdownPage-live";

export async function GET() {
  try {
    const pages = await sanityClient.fetch(`
    *[_type == "markdownPage"]{
      title,
      slug
    }
  `);

    // Si doc existe renvoyer objet complet, sinon empty
    return NextResponse.json({ success: true, pages: pages || null });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { title, content } = await req.json();

  try {
    const pages = await writeClient.createOrReplace({
      _id: docId,
      _type: "markdownPage",
      title,
      content: {
        _type: "code",
        code: content,
        language: "markdown",
      },
    });

    return NextResponse.json({ ok: true, pages });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
