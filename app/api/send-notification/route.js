import webpush from "web-push";
import { subscriptions } from "../save-subscription/route";

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function POST(req) {
  const { title, body, url } = await req.json();

  const payload = JSON.stringify({ title, body, url });

  subscriptions.forEach((sub) => {
    webpush.sendNotification(sub, payload).catch(console.error);
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
