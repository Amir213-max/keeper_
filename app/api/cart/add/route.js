let cart = []; // ✅ تخزين مؤقت (يمكن تغييره لقاعدة بيانات أو Context)

export async function POST(req) {
  try {
    const body = await req.json();
    const existingItem = cart.find((item) => item.sku === body.sku);

    if (existingItem) {
      existingItem.quantity += body.quantity;
    } else {
      cart.push(body);
    }

    return new Response(JSON.stringify({ success: true, cart }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
