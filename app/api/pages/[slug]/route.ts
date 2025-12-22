import { NextResponse } from "next/server";
import { sanityClient } from "../../../../lib/sanityClient";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const page = await sanityClient.fetch(
      `
      *[_type == "markdownPage" && slug.current == $slug][0]{
        title,
        "content": content.code
      }
      `,
      { slug: params.slug }
    );

    return NextResponse.json({ page });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
