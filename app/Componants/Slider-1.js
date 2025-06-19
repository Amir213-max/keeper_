'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import { useTranslation } from '../contexts/TranslationContext';



const cards1 = [
  {
    title: 'Gloves ',
    description: 'Master NC Resist',
    image: '/assets/glovs1.webp',
        price: '€34',
    price_ : '99',
     new:"NEW"
  },
  {
    title: 'Gloves ',
    description: 'Master NC ',
    image: '/assets/glovs1.webp',
        price: '€34',
    price_ : '99',
     new:"NEW"

  },
  {
    title: 'Gloves ',
    description: 'Master NC ',
    image: '/assets/glovs1.webp',
        price: '€34',
    price_ : '99',
    new:"NEW"
  },
  {
    title: 'Gloves ',
    description: 'Master NC ',
    image: '/assets/glovs1.webp',
        price: '€34',
    price_ : '99',
    new:"NEW"
  },
  {
    title: 'Gloves ',
    description: 'Master NC ',
    image: '/assets/glovs1.webp',
        price: '€34',
    price_ : '99',
    new:"NEW"
  },
];


export default function MultiSlider() {


  const { t , lang} = useTranslation();
  const sliderOptions = {
  
    type: 'loop',
    perPage: 5,
    gap: '1rem',
    autoplay: true,
    interval: 3000,
    pauseOnHover: true,
    arrows: true,
    pagination: false,
    breakpoints: {
      1024: { perPage: 3 },
      640: { perPage: 2 },
    },
    direction : lang === 'ar' ? 'rtl' : 'ltr',
  };
  
  
  return (
    <div className="w-full max-w-9xl mx-auto px-4 space-y-5 py-10">
     

      <Splide key={lang} className='h-fit'  options={sliderOptions} aria-label="عروض مميزة">
        {cards1.map((item, index) => (
          <SplideSlide key={index}>
            <div className="bg-neutral-900 hover:bg-neutral-800  rounded-lg shadow-md overflow-hidden flex flex-col h-96">
              <div className="relative w-full h-48   flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain pt-6"
                />
              </div>
              <div className="p-5">
                
                <div className='bg-slate-500 text-white rounded-tl-xl rounded-br-xl text-center w-14 p-2'>{t(`${item.new}`)}</div>
                <h3 className="text-lg text-center font-semibold mb-2">{t(`${item.title}`)}</h3>
                <p className=" text-center text-sm">{t(`${item.description}`)}</p>
                <h2 className='font-bold text-2xl mt-8 flex justify-center line-clamp-1 '> {item.price}<span className='text-xs '>{item.price_} </span></h2>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>

      <button className='flex justify-center p-5 rounded-sm cursor-pointer  bg-[#f6ed45] text-black text-lg mx-auto mt-3'>{t("SHOP REHAB")}</button>
    </div>
  );
}
