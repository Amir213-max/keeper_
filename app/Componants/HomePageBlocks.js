'use client';

import { useEffect, useState } from "react";
import { graphqlClient } from "../lib/graphqlClient";
import { GET_ACTIVE_HOME_PAGE_BLOCKS, PRODUCTS_BY_IDS_QUERY } from "../lib/queries";
import Link from "next/link";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useTranslation } from '../contexts/TranslationContext';

export default function HomePageBlocks() {
  const { lang } = useTranslation();
  const BASE_URL = "https://keeper.in-brackets.online/storage/";
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsMap, setProductsMap] = useState({});

  useEffect(() => {
    async function fetchBlocks() {
      try {
        const data = await graphqlClient.request(GET_ACTIVE_HOME_PAGE_BLOCKS);
        const activeBlocks = data.activeHomepageBlocks || [];
        setBlocks(activeBlocks);

        for (let block of activeBlocks) {
          if (block.type === "products" && block.content?.product_ids?.length) {
            const productIds = block.content.product_ids.map(p => p.product_id);

            const productPromises = productIds.map(id =>
              graphqlClient.request(PRODUCTS_BY_IDS_QUERY, { id })
                .then(res => res.product)
                .catch(err => {
                  console.error("❌ Error fetching product ID", id, err);
                  return null;
                })
            );

            const products = (await Promise.all(productPromises)).filter(Boolean);
            setProductsMap(prev => ({ ...prev, [block.id]: products }));
          }
        }
      } catch (error) {
        console.error("❌ Error fetching home page blocks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlocks();
  }, []);

  if (loading) return <p className="text-center py-8">Loading blocks...</p>;
  if (!blocks.length) return <p className="text-center py-8 text-gray-500">No blocks available.</p>;

  const getImageUrl = (img) => {
    if (!img) return "";
    let path = typeof img === "string" ? img : img.url || img.src || "";
    return path.startsWith("http") ? path : `${BASE_URL}${path}`;
  };

  return (
    <div className="space-y-12 px-4 md:px-8 lg:px-16">
      {blocks.map(block => (
        <div
          key={block.id}
          className={`rounded-lg shadow-lg overflow-hidden w-full ${block.css_class || ""}`}
          style={{
            backgroundColor: block.background_color || (block.type === 'banners' ? '#000' : '#f9f9f9'),
            color: block.text_color || "#fff",
          }}
        >
          {block.title && (
            <h2 className="text-3xl md:text-4xl text-center font-bold mb-6 pt-6">
              {block.title}
            </h2>
          )}

          <div className="px-2 p-1.5 md:px-1 pb-2 space-y-6">
            {/* Banners full width */}
    {/* Banners full width / multiple */}
{block.type === "banners" && block.content?.banners?.length > 0 && (
  <div className="w-screen flex gap-4">
    {block.content.banners.map((banner, idx) => {
      const isSingle = block.content.banners.length === 1; // بانر واحد
      return (
        <div
          key={idx}
          className="relative overflow-hidden shadow-md rounded-lg"
          style={{
            height: '400px',
            width: isSingle ? '100vw' : `${100 / block.content.banners.length}vw`
          }}
        >
          <Image
            src={getImageUrl(banner.image)}
            alt={banner.title || ""}
            fill
            className="object-contian w-full h-full"
            unoptimized
          />
          {banner.title && (
            <h3 className="absolute bottom-16 left-4 text-white font-bold text-lg md:text-xl lg:text-2xl">
              {banner.title}
            </h3>
          )}
          {banner.description && (
            <p className="absolute bottom-4 left-4 text-white text-sm md:text-base">
              {banner.description}
            </p>
          )}
        </div>
      );
    })}
  </div>
)}


            {/* Products */}
            {block.type === "products" && productsMap[block.id]?.length > 0 && (
              <Splide
                key={lang} // إعادة render عند تغيير اللغة
                options={{
                  type: "loop",
                  perPage: block.content?.per_row || 4,
                  gap: "1rem",
                  autoplay: true,
                  pauseOnHover: true,
                  arrows: true,
                  pagination: false,
                  direction: lang === 'ar' ? 'rtl' : 'ltr',
                  breakpoints: {
                    1280: { perPage: 3 },
                    1024: { perPage: 2 },
                    640: { perPage: 1 },
                  },
                }}
              >
                {productsMap[block.id].map(product => (
                  <SplideSlide key={product.id}>
                    <Link
                      href={`/product/${product.sku}`}
                      className="block bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-md overflow-hidden flex flex-col h-96 transition"
                    >
                      <div className="relative w-full h-48 flex items-center justify-center">
                        {product.images?.[0] ? (
                          <Image
                            src={typeof product.images[0] === "string" ? product.images[0] : product.images[0]?.url}
                            alt={product.name}
                            fill
                            className="object-contain pt-6"
                            onError={(e) => { e.currentTarget.src = "/fallback.png"; }}
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-1">
                        <h3 className="text-lg text-center text-white font-semibold mb-2 line-clamp-2">{product.name}</h3>

                        <div className="mt-auto text-center">
                          {product.price_range_from ? (
                            <div className="flex flex-col items-center">
                              <span className="text-gray-400 line-through text-sm">{product.list_price_currency}{product.list_price_amount}</span>
                              <span className="text-yellow-500 font-bold text-xl">
                                {product.list_price_currency}{product.price_range_from}{product.price_range_to && product.price_range_to !== product.price_range_from ? ` - ${product.list_price_currency}${product.price_range_to}` : ""}
                              </span>
                            </div>
                          ) : (
                            <span className="text-yellow-500 font-bold text-xl">{product.list_price_currency}{product.list_price_amount}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </SplideSlide>
                ))}
              </Splide>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-2 text-center pb-4">
            Section: <span className="font-medium">{block.section}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
