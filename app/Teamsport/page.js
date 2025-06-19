
'use client'; 

import React from 'react'


import '@splidejs/splide/dist/css/splide.min.css';
import Card_1 from '../Componants/card';
import Card_2 from '../Componants/card_2';
import BrandSplide_1 from '../Componants/brandsSplide_1';

import FilterDropdown from '../Componants/CheckboxDropdown ';
import { useTranslation } from '../contexts/TranslationContext';


export default function page() {
const {t , lang} = useTranslation()

  return (
    <div className='bg-[#373e3e]'>

<div className="grid pt-4 grid-cols-4  ">
  <div className="col-span-1 grid-cols-4 gap-3 bg-[#1f2323]">
    {/* <Card_1 /> */}
<ul className='flex w-full   flex-col  '>
<li className='cursor-pointer '>

  <a>
  <h2 className='text-2xl p-4 w-full hover:bg-[#303434] '>{t("Goalkeeper Gloves")}</h2>
  </a>
</li>
<li className='cursor-pointer '>
  <a>
  <h2 className='text-2xl p-4 w-full hover:bg-[#303434] '>{t("Football Boots")}</h2>
  </a>
</li>
<li className='cursor-pointer '>
  <a>
  <h2 className='text-2xl p-4 w-full hover:bg-[#303434] '>{t("Goalkeeper Apparel")}</h2>
  </a>
</li>
<li className='cursor-pointer '>
  <a>
  <h2 className='text-2xl p-4 w-full hover:bg-[#303434] '>{t("Goalkeeper Equipment")}</h2>
  </a>
</li>
<li className='cursor-pointer '>
  <a>
  <h2 className='text-2xl p-4 w-full hover:bg-[#303434] '>{t("Teamsport")}</h2>
  </a>
</li>
<li className='cursor-pointer '>
  <a>
  <h2 className='text-2xl p-4 w-full hover:bg-[#303434] '>{t("Sale")}</h2>
  </a>
</li>

</ul>
   
  </div>
  <div className="col-span-3 p-4 bg-white">

    <h1 className='text-4xl text-[#1f2323] p-2'> {t("Teamsport")}</h1>
    <BrandSplide_1 />
    <div className='flex mb-4 gap-3'>

    <FilterDropdown />
    <FilterDropdown />
    <FilterDropdown />
    <FilterDropdown />
    <FilterDropdown />
    
    </div>
    <div className='grid grid-cols-4 justify-center gap-3'>
  <Card_1 /> 
 
  
    </div>
    
  </div>
</div>
    </div>

  )
}
