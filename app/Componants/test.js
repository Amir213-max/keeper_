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
    <div className="space-y-12">
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
            <h2 className="text-2xl sm:text-3xl md:tex t-4xl text-center font-bold mb-6 pt-6">
              {block.title}
            </h2>
          )}

          <div className="px-2 p-1.5 md:px-1 pb-2 space-y-1">
       {/* Banners */}
{block.type === "banners" && block.content?.banners?.length > 0 && (
  <div
    className={`grid gap-4 lg:px-0  md:px-0${
      block.content.banners.length === 1
        ? "grid-cols-1"
        : block.content.banners.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-2 lg:grid-cols-3"
    }`}
  >
    {block.content.banners.map((banner, idx) => (
      <div
        key={idx}
        className={`relative overflow-hidden shadow-md rounded-lg w-full ${
          block.content.banners.length === 1
            ? "h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
            : block.content.banners.length === 2
            ? "h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
            : "h-[220px] sm:h-[280px] md:h-[350px]"
        }`}
      >
        <Image
          src={getImageUrl(banner.image)}
          alt={""}
          fill
          className="object-fill w-full h-full"
          unoptimized
        />
        
      </div>
    ))}
  </div>
)}

<div className="space-y-12 px-4 md:px-8 lg:px-16">
 {/* Products */}
 {block.type === "products" && productsMap[block.id]?.length > 0 && (
  <Splide
    key={lang}
    options={{
      type: "loop",
      perPage: block.content?.per_row || 4,
      gap: "1rem",
      autoplay: false,
      pauseOnHover: true,
      arrows: true,
      pagination: false,
      direction: lang === "ar" ? "rtl" : "ltr",
      breakpoints: {
        1280: { perPage: 4 },
        1024: { perPage: 3 },
        640: { perPage: 2 },
      },
    }}
  >
    {productsMap[block.id].map((product) => (
      <SplideSlide key={product.id}>
        <Link
          href={`/product/${product.sku}`}
          className="block bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-md overflow-hidden flex flex-col transition h-full"
        >
          <div className="relative w-full aspect-[1/2] bg-neutral-900 flex items-center justify-center">
            {product.images?.[0] ? (
              <Image
                src={
                  typeof product.images[0] === "string"
                    ? product.images[0]
                    : product.images[0]?.url
                }
                alt={product.name}
                fill
                className="object-contain p-4"
                onError={(e) => {
                  e.currentTarget.src = "/fallback.png";
                }}
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col justify-between flex-1">
            <h3 className="text-sm sm:text-base lg:text-lg text-center text-white font-semibold mb-2 line-clamp-2">
              {product.name}
            </h3>

            <div className="mt-auto text-center">
              {product.price_range_from ? (
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 line-through text-xs sm:text-sm">
                    SAR {(product.list_price_amount * 4.6).toFixed(2)}
                  </span>
                  <span className="text-yellow-400 font-bold text-lg sm:text-xl">
                    SAR {(product.list_price_amount * 4.6).toFixed(2)}
                    {product.price_range_to &&
                    product.price_range_to !== product.price_range_from
                      ? ` - SAR ${(product.price_range_to * 4.6).toFixed(2)}`
                      : ""}
                  </span>
                </div>
              ) : (
                <span className="text-yellow-400 font-bold text-lg sm:text-xl">
                  SAR {(product.list_price_amount * 4.6).toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </Link>
      </SplideSlide>
    ))}
  </Splide>
)}
</div>
           
          </div>

         
        </div>
      ))}
    </div>
  );
}
