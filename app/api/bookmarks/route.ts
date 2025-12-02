import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

// GET: READ all bookmarks for the logged-in user
export async function GET() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(bookmarks)
}

// POST: CREATE a new bookmark
export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { url, title, description, image, favicon, tags, expiresAt } = body

  // Input validation (basic)
  if (!url || !title) return NextResponse.json({ error: 'URL and title required' }, { status: 400 })

  const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace('www.', '')

  const bookmark = await prisma.bookmark.create({
    data: {
      userId: session.user.id,
      url, title, description, image, favicon, domain,
      tags: tags || [],
      expiresAt: expiresAt ? new Date(expiresAt) : null
    }
  })

  return NextResponse.json(bookmark, { status: 201 })
}