export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/+$/, '');
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRole) {
    return Response.json({ error: 'Faltan variables de entorno de Supabase' }, { status: 500 });
  }

  const res = await fetch(
    `${supabaseUrl}/rest/v1/orders?select=*,users(name,email)&order=created_at.desc`,
    {
      headers: {
        apikey: serviceRole,
        Authorization: `Bearer ${serviceRole}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return Response.json({ error: err }, { status: res.status });
  }

  const orders = await res.json();
  return Response.json({ orders });
}
