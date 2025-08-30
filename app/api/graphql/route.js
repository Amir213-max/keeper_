export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch("https://keeper.in-brackets.online/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // لو API محتاج Auth Token أو أي Headers حطها هنا 👇
        // "Authorization": `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
