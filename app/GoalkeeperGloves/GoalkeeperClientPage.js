"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import BrandsSlider from '../Componants/brandsSplide_1';
import FilterDropdown from '../Componants/CheckboxDropdown ';
import ProductSlider from '../Componants/ProductSlider';
import { useTranslation } from '../contexts/TranslationContext';

export default function GoalkeeperClientPage({ products, brands, attributeValues }) {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { t } = useTranslation();

  // 🧠 فلترة المنتجات بناءً على الماركة + الفلاتر
  useEffect(() => {
    const result = products.filter((product) => {
      const attrs = product.node.attributeValues;

      // ✅ تحقق من الماركة
      const brandMatch = !selectedBrand || product.node.brand?.name === selectedBrand;

      // ✅ تحقق من الفلاتر الأخرى
      const attributesMatch = Object.entries(selectedAttributes).every(([attr, values]) => {
        if (values.length === 0) return true;
        return attrs.some(
          (a) => a.attribute?.label === attr && values.includes(a.label)
        );
      });

      return brandMatch && attributesMatch;
    });

    setFilteredProducts(result);
  }, [products, selectedBrand, selectedAttributes]);

  return (
    <div className='bg-[#373e3e]'>
      <div className="grid pt-4 grid-cols-1 md:grid-cols-5">
        {/* ✅ Sidebar */}
        <div className="md:col-span-1 bg-[#1f2323]">
          <ul className='flex flex-col'>
            {[
              'Goalkeeper Gloves',
              'Football Boots',
              'Goalkeeper Apparel',
              'Goalkeeper Equipment',
              'Teamsport',
              'Sale'
            ].map((item, i) => (
              <li key={i} className='cursor-pointer'>
                <a>
                  <h2 className='text-2xl p-4 hover:bg-[#303434]'>{t(item)}</h2>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Main Content */}
        <div className="md:col-span-4 p-4 bg-white">
          <h1 className='text-4xl text-[#1f2323] p-2'>{t("Goalkeeper Gloves")}</h1>

          {/* ✅ الماركات */}
          <BrandsSlider
            brands={brands}
            selectedBrand={selectedBrand}
            onBrandClick={(brand) => setSelectedBrand(brand === selectedBrand ? null : brand)}
          />

          {/* ✅ الفلاتر */}
          <div className='flex mb-4 gap-3 flex-wrap'>
            <FilterDropdown
              attributeValues={attributeValues}
              onFilterChange={setSelectedAttributes}
            />
          </div>

          {/* ✅ المنتجات */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-2 sm:p-4'>
            {filteredProducts.map((edge) => (
              <div
                key={edge.node.sku}
                className="bg-gradient-to-br from-white to-neutral-200 rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* الصور */}
                <ProductSlider
                  images={edge.node.images}
                  productName={edge.node.name}
                />

                {/* المحتوى */}
                <Link href={`/product/${edge.node.sku}`} className="p-4 flex flex-col flex-grow justify-between">
                  <div className="bg-neutral-400 text-amber-100 text-xs font-semibold w-fit px-3 py-1 rounded-full mb-3">
                    {edge.node.categories.map((cat) => cat.name).join(", ")}
                  </div>

                  <h3 className="text-base text-gray-700 text-center font-bold mb-1">
                    {edge.node.brand?.name}
                  </h3>

                  <p className="text-center text-sm text-gray-500 line-clamp-2 mb-3">
                    {edge.node.name}
                  </p>

                  <h2 className="text-center font-bold text-lg text-gray-800">
                    $98 <span className="text-sm text-gray-500 ml-1">99</span>
                  </h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
