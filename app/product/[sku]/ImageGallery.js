'use client';

import { useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function ImageGallery({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(images[0]?.url);
  const [fadeKey, setFadeKey] = useState(0); // لتفعيل الأنيميشن

  const stopClickPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleImageClick = (url) => {
    if (url !== selectedImage) {
      setFadeKey(prev => prev + 1); // لتحديث المفتاح وتشغيل الأنيميشن
      setSelectedImage(url);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
      {/* الصور المصغرة */}
      <div
        className="flex md:flex-col items-center justify-center md:justify-start"
        onClick={stopClickPropagation}
        onPointerDown={stopClickPropagation}
      >
        <Splide
          options={{
            direction: 'ttb',
            height: 400,
            perPage: 5,
            pagination: false,
            arrows: true,
            gap: 8,
            wheel: true,
            breakpoints: {
              768: {
                direction: 'ltr',
                height: 'auto',
                width: '100%',
              },
            },
          }}
          aria-label="صور المنتج"
          className="w-full md:w-24 h-auto md:h-[400px]"
        >
          {images.map((img, index) => (
            <SplideSlide key={index}>
              <img
                onPointerDown={stopClickPropagation}
                src={img.url}
                alt={`صورة ${index + 1}`}
                onClick={() => handleImageClick(img.url)}
                className={`w-20 h-20 object-contain rounded-md border-2 mb-2 transition-all duration-300 cursor-pointer 
                ${
                  selectedImage === img.url
                    ? 'border-amber-500 scale-105 shadow-lg'
                    : 'border-gray-300 hover:border-amber-300 hover:scale-105'
                }`}
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* الصورة الكبيرة */}
      <div className="flex-1 flex items-center justify-center p-2">
        <img
          key={fadeKey}
          src={selectedImage}
          alt={productName}
          className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg transition-opacity duration-700 opacity-0 animate-fadeIn"
        />
      </div>

      {/* أنيميشن بسيطة fade-in */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.98);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
