import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'


const client = createClient({
projectId: process.env.SANITY_PROJECT_ID || '',
dataset: process.env.SANITY_DATASET || 'production',
apiVersion: '2024-01-01',
useCdn: true
})


export async function GET() {
try {
const pages = await client.fetch(`*[_type == "markdownPage"]{title, content}`)
return NextResponse.json({ pages })
} catch (err: any) {
return NextResponse.json({ error: err.message }, { status: 500 })
}
}