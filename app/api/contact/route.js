export async function POST(request) {
  const data = await request.json();
  // TODO: integra un provider email (Resend/SendGrid). Per ora simuliamo.
  console.log('Nuovo messaggio contatti:', data);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
