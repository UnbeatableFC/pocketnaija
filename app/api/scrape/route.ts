import { NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'

export async function POST(req: Request) {
  const { url } = await req.json()
  if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })

  try {
    const target = url.startsWith('http') ? url : `https://${url}`
    const { data } = await axios.get(target, { 
      timeout: 5000,
      headers: { 'User-Agent': 'PocketNaija-Bot/1.0' }
    })
    
    const $ = cheerio.load(data)
    const title = $('meta[property="og:title"]').attr('content') || $('title').text()
    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content')
    const image = $('meta[property="og:image"]').attr('content')
    
    // Favicon logic
    let favicon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href')
    if (favicon && !favicon.startsWith('http')) {
      const origin = new URL(target).origin
      favicon = origin + (favicon.startsWith('/') ? favicon : `/${favicon}`)
    }

    return NextResponse.json({ title, description, image, favicon })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ error: 'Failed to scrape' }, { status: 500 })
  }
}