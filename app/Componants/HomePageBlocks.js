"use client";

import { useEffect, useState, useRef } from "react";
import { graphqlClient } from "../lib/graphqlClient";
import { GET_ACTIVE_HOME_PAGE_BLOCKS, PRODUCTS_BY_IDS_QUERY } from "../lib/queries";
import Link from "next/link";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useTranslation } from "../contexts/TranslationContext";
import { motion } from "framer-motion";

export default function HomePageBlocks() {
  const { lang } = useTranslation();
  const BASE_URL = "https://keeper.in-brackets.online/storage/";

  const firstBannerRenderedRef = useRef(false);

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
            const productIds = block.content.product_ids.map((p) => p.product_id);
            const productPromises = productIds.map((id) =>
              graphqlClient
                .request(PRODUCTS_BY_IDS_QUERY, { id })
                .then((res) => res.product)
                .catch((err) => {
                  console.error("❌ Error fetching product ID", id, err);
                  return null;
                })
            );
            const products = (await Promise.all(productPromises)).filter(Boolean);
            setProductsMap((prev) => ({ ...prev, [block.id]: products }));
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
      {blocks.map((block, index) => (
        <motion.div
          key={block.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
          className={`rounded-xl overflow-hidden shadow-lg w-full ${block.css_class || ""}`}
          style={{
            backgroundColor:
              block.background_color || (block.type === "banners" ? "#000" : "#f9f9f9"),
            color: block.text_color || "#fff",
          }}
        >
          {/* 🏷️ Title */}
          {block.title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-6 pt-6 text-white">
              {block.title}
            </h2>
          )}

          <div className="px-4 pb-2 mt-4 space-y-6">
            {/* 🟣 SLIDER */}
            {block.type === "slider" && block.content?.slides?.length > 0 && (
              <Splide
                options={{
                  type: "loop",
                  perPage: 1,
                  autoplay: true,
                  pauseOnHover: true,
                  arrows: true,
                  pagination: true,
                  direction: lang === "ar" ? "rtl" : "ltr",
                }}
              >
                {block.content.slides.map((slide, i) => (
                  <SplideSlide key={i}>
                    <div className="relative w-full overflow-hidden">
                      <Image
                        src={getImageUrl(slide.image)}
                        alt={slide.title || ""}
                        width={1920}
                        height={800}
                        className="w-full h-auto object-contain"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
                        <h3 className="text-2xl md:text-4xl font-bold mb-3">{slide.title}</h3>
                        <p className="max-w-2xl text-sm md:text-base mb-4">{slide.description}</p>
                        {slide.button_text && (
                          <Link
                            href={slide.button_link || "#"}
                            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold"
                          >
                            {slide.button_text}
                          </Link>
                        )}
                      </div>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            )}

            {/* 🟢 IMAGES */}
            {block.type === "images" && block.content?.images?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {block.content.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                  >
                    <Image
                      src={getImageUrl(img.image)}
                      alt={img.title || ""}
                      width={1200}
                      height={600}
                      className="w-full h-auto object-contain"
                      unoptimized
                    />
                    {img.title && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <p className="text-white text-lg font-semibold">{img.title}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* 🟠 BANNERS */}
{block.type === "banners" && block.content?.banners?.length > 0 && (
  <div className={`flex justify-center flex-col sm:flex-row gap-4 flex-wrap px-1 md:px-2 lg:px-1`}>
    {block.content.banners.map((banner, idx) => {
      const isFirstBanner = !firstBannerRenderedRef.current;

      if (isFirstBanner) firstBannerRenderedRef.current = true;

      return (
        <motion.div
          key={banner.id || idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className={`relative ${isFirstBanner ? "w-full object-fit-fill  h-[70vh]" : " h-[45vh]  flex justify-center flex-1"}`}
        >
          {isFirstBanner ? (
            <Image
              src={getImageUrl(banner.image)}
              alt={banner.title || ""}
              fill
              className="object-fit-fill "
              unoptimized
              priority
            />
          ) : (
            <Image
              src={getImageUrl(banner.image)}
              alt={banner.title || ""}
              width={600}
              height={400}
              className="w-[100vw] object-fit-contain  h-full"
              unoptimized
            />
          )}
        </motion.div>
      );
    })}
  </div>
)}


            {/* 🟡 PRODUCTS */}
            {block.type === "products" && productsMap[block.id]?.length > 0 && (
              <div className="px-4 md:px-8 lg:px-12">
                <Splide
                  key={lang}
                  options={{
                    type: "loop",
                    perPage: block.content?.per_row || 6,
                    gap: "1rem",
                    autoplay: false,
                    pauseOnHover: true,
                    arrows: true,
                    pagination: false,
                    direction: lang === "ar" ? "rtl" : "ltr",
                    breakpoints: {
                      1280: { perPage: 5 },
                      1024: { perPage: 4 },
                      768: { perPage: 3 },
                      640: { perPage: 2 },
                    },
                  }}
                >
                  {productsMap[block.id].map((product, idx) => (
                    <SplideSlide key={`${product.id}-${idx}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="h-full"
                      >
                        <Link
                          href={`/product/${product.sku}`}
                          className="block bg-[#111] hover:bg-[#2b2a2a] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full"
                        >
                          {/* صورة المنتج */}
                          <div className="relative flex items-center justify-center aspect-[1/1]">
                            {product.images?.[0] ? (
                              <Image
                                src={
                                  typeof product.images[0] === "string"
                                    ? product.images[0]
                                    : product.images[0]?.url
                                }
                                alt={product.name}
                                fill
                                className="object-contain p-3"
                                unoptimized
                              />
                            ) : (
                              <div className="text-gray-500 text-sm">No Image</div>
                            )}

                            {/* بادج NEW */}
                            {(() => {
                              const now = new Date();
                              const productDate = new Date(product.created_at);
                              const diffTime = now - productDate;
                              const diffDays = diffTime / (1000 * 60 * 60 * 24);
                              return diffDays <= 5 ? (
                                <span className="absolute top-3 left-3 bg-gray-200 text-black text-xs font-bold px-2 py-1 rounded">
                                  NEW
                                </span>
                              ) : null;
                            })()}
                          </div>

                          {/* بيانات المنتج */}
                          <div className="p-4 text-center flex flex-col justify-between">
                            {product.brand?.name && (
                              <p className="text-gray-300 text-sm mb-1">{product.brand.name}</p>
                            )}
                            <h3 className="text-white text-sm sm:text-base font-medium line-clamp-2 mb-2">
                              {product.name}
                            </h3>
                            <p className="text-white font-bold text-lg">
                              SAR {product.list_price_amount?.toFixed(2)}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    </SplideSlide>
                  ))}
                </Splide>

               {/* زرار الـ block */}
{block.button_text && (
  <div className={`flex justify-center mt-4 ${block.button_location === "bottom_center" ? "mt-4" : ""}`}>
    {block.button_url ? (
      <Link
        href={block.button_url}
        className={`rounded-md font-semibold 
          px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 
          text-sm sm:text-base md:text-lg
          ${block.button_style === "red"
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-yellow-500 text-black hover:bg-yellow-400"}`
        }
      >
        {block.button_text}
      </Link>
    ) : (
      <button
        className={`rounded-md font-semibold 
          px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 
          text-sm sm:text-base md:text-lg
          cursor-pointer
          ${block.button_style === "red"
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-yellow-500 text-black hover:bg-yellow-400"}`
        }
      >
        {block.button_text}
      </button>
    )}
  </div>
)}


              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
