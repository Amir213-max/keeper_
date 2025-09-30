"use client";

import { useEffect, useState } from "react";
import { graphqlClient } from "../lib/graphqlClient";
import { GET_ACTIVE_HOME_PAGE_BLOCKS } from "../lib/queries";

// Splide
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function HomePageBlocks() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlocks() {
      try {
        const data = await graphqlClient.request(GET_ACTIVE_HOME_PAGE_BLOCKS);
        setBlocks(data.activeHomePageBlocks || []);
      } catch (error) {
        console.error("Error fetching home page blocks:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlocks();
  }, []);

  if (loading) return <p className="text-center py-8">Loading blocks...</p>;

  if (!blocks.length)
    return <p className="text-center py-8 text-gray-500">No blocks available.</p>;

  return (
    <div className="space-y-12 px-4 md:px-8 lg:px-16">
      {blocks.map((block) => (
        <div
          key={block.id}
          className={`rounded-lg shadow-lg overflow-hidden w-full ${block.css_class || ""}`}
          style={{
            backgroundColor: block.background_color || "#f9f9f9",
            color: block.text_color || "#000",
          }}
        >
          {/* Title */}
          {block.title && (
            <h2 className="text-3xl md:text-4xl text-center font-bold mb-6 pt-6">
              {block.title}
            </h2>
          )}

          {/* Content */}
          {block.content && (
            <div className="px-4 md:px-8 pb-6 space-y-6">
              {/* Text */}
              {block.content.text && (
                <p className="text-base md:text-lg leading-relaxed text-center">
                  {block.content.text}
                </p>
              )}

              {/* Image */}
              {block.content.image && (
                <div className="flex justify-center">
                  <img
                    src={block.content.image}
                    alt={block.content.header || block.title}
                    className="w-full max-w-4xl rounded-lg shadow-md"
                  />
                </div>
              )}

              {/* Slides Carousel */}
              {block.content.slides && block.content.slides.length > 0 && (
                <Splide
                  options={{
                    type: "loop",
                    perPage: 1,
                    autoplay: block.content.autoplay ?? true,
                    interval: 4000,
                    pauseOnHover: true,
                    arrows: block.settings?.show_arrows ?? true,
                    pagination: block.settings?.show_dots ?? true,
                  }}
                  className="rounded-lg shadow-md"
                >
                  {block.content.slides.map((slide, idx) => (
                    <SplideSlide key={idx}>
                      <div className="relative w-full h-64 md:h-96">
                        {slide.image && (
                          <img
                            src={slide.image}
                            alt={slide.text1 || ""}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center px-4">
                          {slide.text1 && (
                            <h3 className="text-white text-xl md:text-3xl font-bold">
                              {slide.text1}
                            </h3>
                          )}
                          {slide.text2 && (
                            <p className="text-white text-sm md:text-lg mt-2">
                              {slide.text2}
                            </p>
                          )}
                          {slide.btn_text && slide.btn_link && (
                            <a
                              href={slide.btn_link}
                              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                              {slide.btn_text}
                            </a>
                          )}
                        </div>
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              )}

              {/* Products */}
              {block.content.products && block.content.products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {block.content.products.map((p, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
                    >
                      {p.product.images && p.product.images[0] && (
                        <img
                          src={p.product.images[0]}
                          alt={p.product.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4 space-y-1">
                        <p className="font-bold">{p.product.name}</p>
                        <p className="text-sm text-gray-600">
                          {p.product.list_price_amount} {p.product.list_price_currency}
                        </p>
                        {p.product.brand_name && (
                          <p className="text-xs text-gray-500">{p.product.brand_name}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Video */}
              {block.content.video_url && (
                <div className="flex justify-center">
                  <video
                    src={block.content.video_url}
                    width={block.content.width || "100%"}
                    height={block.content.height || "auto"}
                    controls={block.content.show_controls ?? true}
                    autoPlay={block.content.autoplay ?? false}
                    muted={block.content.muted ?? false}
                    className="rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          )}

          {/* Section info */}
          <p className="text-sm text-gray-500 mt-2 text-center pb-4">
            Section: <span className="font-medium">{block.section}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
