import { NextResponse } from "next/server";
import OpenAI from "openai";
import { graphqlClient } from "../../lib/graphqlClient";
import {
  MAIN_ROOT_CATEGORIES_QUERY,
  PRODUCTS_QUERY,
  GET_ACTIVE_HOME_PAGE_BLOCKS,
} from "@/app/lib/queries";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    // ⬇️ نجمع بيانات من GraphQL
    const [categoriesRes, productsRes, blocksRes] = await Promise.all([
      graphqlClient.request(MAIN_ROOT_CATEGORIES_QUERY),
      graphqlClient.request(PRODUCTS_QUERY, { limit: 5, offset: 0 }), // نجرب 5 منتجات بس
      graphqlClient.request(GET_ACTIVE_HOME_PAGE_BLOCKS),
    ]);

    const contextData = `
    Categories: ${JSON.stringify(categoriesRes.mainRootCategories)}
    Products sample: ${JSON.stringify(productsRes.products)}
    HomePage Blocks: ${JSON.stringify(blocksRes.activeHomePageBlocks)}
    `;

    // ⬇️ نسأل الـ AI
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
          You are a helpful assistant for the KEEPERsport website.
          The website sells goalkeeper gloves, football boots, jerseys, training wear,
          and accessories. We also offer services like order tracking, returns, and
          personalized goalkeeper gear.
          Use the context below to answer user questions:
          ${contextData}
          `,
        },
        { role: "user", content: message },
      ],
    });

    const reply =
      aiResponse.choices[0]?.message?.content ||
      "Sorry, I couldn’t understand that.";

    return NextResponse.json({ success: true, reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
