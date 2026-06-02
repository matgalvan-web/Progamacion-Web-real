import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, items, total, shippingAddress, metodoPago } = body || {};

    if (!userId || !items) {
      return NextResponse.json({ success: false, error: 'Faltan campos obligatorios (userId/items)' }, { status: 400 });
    }

    const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

    if (!rawUrl || !serviceRole) {
      return NextResponse.json({ success: false, error: 'Configuración del servidor incompleta.' }, { status: 500 });
    }

    let supabaseUrl;
    try {
      supabaseUrl = new URL(rawUrl).origin;
    } catch (e) {
      supabaseUrl = rawUrl.replace(/\/+$/g, '');
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRole, { auth: { persistSession: false } });

    // Llama al stored procedure que valida stock, crea la orden y descuenta stock
    // Si el stock es insuficiente, Postgres lanza una excepción y hace rollback automático
    const { data, error } = await supabaseAdmin.rpc('crear_orden_completa', {
      p_user_id: userId,
      p_items: items,
      p_total: total || 0,
      p_shipping_address: shippingAddress || null,
      p_metodo_pago: metodoPago || null,
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Vaciar el carrito del usuario en la base de datos
    await supabaseAdmin.from('cart_items').delete().eq('user_id', userId);

    return NextResponse.json({ success: true, order: data });
  } catch (err) {
    return NextResponse.json({ success: false, error: err?.message || String(err) }, { status: 500 });
  }
}
