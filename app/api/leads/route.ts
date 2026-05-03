import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name, email, organisation, headcount,
      context, tag, state, sector, concern, source,
    } = body;

    // Basic server-side validation
    if (!name || !email || !organisation || !headcount || !context || !state || !sector) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Log the lead (replace with your CRM / email / DB integration)
    console.log('[LEAD]', {
      name,
      email,
      organisation,
      headcount,
      context,
      tag,
      state,
      sector,
      concern,
      source,
      timestamp: new Date().toISOString(),
    });

    // ── Integrate your preferred destination here ──────────
    // Examples:
    //
    // Notion:
    // await fetch('https://api.notion.com/v1/pages', { ... })
    //
    // Airtable:
    // await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE}`, { ... })
    //
    // Email via Resend:
    // await resend.emails.send({ from, to, subject, html })
    //
    // Google Sheets via Apps Script webhook:
    // await fetch(process.env.SHEETS_WEBHOOK_URL, { method:'POST', body: JSON.stringify(body) })
    // ──────────────────────────────────────────────────────

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error('[LEAD ERROR]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
