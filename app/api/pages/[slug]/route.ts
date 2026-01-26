import { NextResponse } from "next/server";
import { sanityClient } from "../../../../lib/sanityClient";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const docId = "markdownPage-live";
  try {
    const page = await sanityClient.fetch(
      `
      *[_type == "markdownPage" && _id == $docId && slug.current == $slug][0]{
        title,
        slug,
        "content": content.code
      }
      `,
      { docId, slug: params.slug }
    );

    return NextResponse.json({ page });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
