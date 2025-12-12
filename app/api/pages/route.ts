import { NextResponse } from "next/server";
import { sanityClient, writeClient } from "../../../lib/sanityClient";

export async function GET() {
  try {
    const pages = await sanityClient.fetch(
      `*[_type == "markdownPage"]{title, content}`
    );
    return NextResponse.json({ pages });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const docId = "markdownPage-live";

  try {
    const doc = await writeClient.createOrReplace({
      _id: docId,
      _type: "markdownPage",
      title,
      content: {
        _type: "code",
        code: content,
        language: "markdown",
      },
    });

    return NextResponse.json({ ok: true, doc });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
