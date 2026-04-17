import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type ContactPayload = {
  naam: string;
  email: string;
  bericht: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as ContactPayload;

  const { naam, email, bericht } = body;
  if (!naam?.trim() || !email?.trim() || !bericht?.trim()) {
    return NextResponse.json({ error: 'Alle velden zijn verplicht.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL ?? 'toonvandersluis@gmail.com';

  if (!apiKey) {
    console.log('[contact form]', { naam, email, bericht });
    return NextResponse.json({ ok: true });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Abra Entertainment <noreply@abraentertainment.nl>',
      to: toEmail,
      reply_to: email,
      subject: `Contact van ${naam}`,
      text: `Naam: ${naam}\nEmail: ${email}\n\n${bericht}`,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Verzenden mislukt.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
