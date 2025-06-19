"use client";

import FilterDropdown from '../Componants/CheckboxDropdown ';
import ProductSlider from '../Componants/ProductSlider';
import { useTranslation } from '../contexts/TranslationContext';



export default function FootballBootsClientpage({ products }) {
  const { t } = useTranslation();

  return (
    <div className='bg-[#373e3e]'>
      <div className="grid pt-4 grid-cols-5">
        <div className="col-span-1 bg-[#1f2323]">
          <ul className='flex flex-col'>
           
              <li  className='cursor-pointer'>
                <a>
                  <h2 className='text-2xl p-4 hover:bg-[#303434]'>{t('Goalkeeper Gloves')}</h2>
                </a>
              </li>
              <li  className='cursor-pointer'>
                <a>
                  <h2 className='text-2xl p-4 hover:bg-[#303434]'>{t('Football Boots')}</h2>
                </a>
              </li>
              <li  className='cursor-pointer'>
                <a>
                  <h2 className='text-2xl p-4 hover:bg-[#303434]'>{t('Goalkeeper Apparel')}</h2>
                </a>
              </li>
              <li  className='cursor-pointer'>
                <a>
                  <h2 className='text-2xl p-4 hover:bg-[#303434]'>{t('Goalkeeper Equipment')}</h2>
                </a>
              </li>
              <li  className='cursor-pointer'>
                <a>
                  <h2 className='text-2xl p-4 hover:bg-[#303434]'>{t('Teamsport')}</h2>
                </a>
              </li>
              <li  className='cursor-pointer'>
                <a>
                  <h2 className='text-2xl p-4 hover:bg-[#303434]'>{t('Sale')}</h2>
                </a>
              </li>
            
          </ul>
        </div>

        <div className="col-span-4 p-4 bg-white">
          <h1 className='text-4xl text-[#1f2323] p-2'>{t("Goalkeeper Gloves")}</h1>

          <div className='flex mb-4 gap-3'>
            <FilterDropdown />
            <FilterDropdown />
            <FilterDropdown />
            <FilterDropdown />
            <FilterDropdown />
          </div>

          <div className='grid grid-cols-5 gap-2'>
            {products.map((edge) => (
              <div key={edge.node.sku} className="bg-gray-100 cursor-pointer  shadow-md flex flex-col hover:bg-gray-200  hover:-translate-y-1 transition duration-150 ">
                <ProductSlider images={edge.node.images} productName={edge.node.name} />

                <div className="p-5">
                  <div className="bg-slate-200  rounded-tl-xl rounded-br-xl text-amber-500 text-center w-fit px-3 py-1 text-sm mb-2">
                    {edge.node.categories.map((cat) => cat.name).join(", ")}
                  </div>
                  <h3 className="text-lg text-[#1f2323] text-center font-semibold mb-1">
                  {edge.node.brand?.name}
                  </h3>
                  <p className="text-center text-sm text-[#1f2323]">{edge.node.name}</p>
                  <h2 className="font-bold text-2xl mt-4 flex justify-center text-[#1f2323]" >
                    $98 <span className="text-xs ml-1 text-[#1f2323]">99</span>
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
