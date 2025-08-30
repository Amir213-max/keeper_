"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import BrandsSlider from "../Componants/brandsSplide_1";
import FilterDropdown from "../Componants/CheckboxDropdown ";

import ProductSlider from "../Componants/ProductSlider";
import Sidebar from "../Componants/sidebar";
import { useTranslation } from "../contexts/TranslationContext";
import { graphqlClient } from "../lib/graphqlClient";
import { GET_CATEGORIES_QUERY } from "../lib/queries";

export default function FootballClientPage({ products, brands, attributeValues }) {
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { t } = useTranslation();

  // Fetch categories dynamically
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await graphqlClient.request(GET_CATEGORIES_QUERY);
        setCategories(data.rootCategories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Filter products
  // Filter products
useEffect(() => {
  const result = products.filter((product) => {
    const brandMatch =
      !selectedBrand || product.brand?.name === selectedBrand;

    const attrs = product.productAttributeValues || [];

    // ✅ فلترة الـ attributes صح:
    const attributesMatch = Object.entries(selectedAttributes).every(
      ([attrLabel, selectedVals]) => {
        if (!selectedVals || selectedVals.length === 0) return true;

        const selectedLower = selectedVals.map((v) => String(v).toLowerCase());

      
        return attrs.some((pav) =>
          String(pav.attribute?.label || pav.attribute?.key || '')
            .toLowerCase() === String(attrLabel).toLowerCase() &&
          selectedLower.includes(String(pav.key ?? '').toLowerCase())
        );
      }
    );

    return brandMatch && attributesMatch;
  });

  setFilteredProducts(result);
}, [products, selectedBrand, selectedAttributes]);


  return (
    <div className="bg-[#373e3e]">
      <div className="grid pt-4 grid-cols-1 md:grid-cols-5">
        {/* Sidebar */}
        <div className="md:col-span-1 bg-[#1f2323]">
          <Sidebar
            categories={categories}
            onSelectCategory={(catName) => setSelectedCategory(catName)}
          />
        </div>

        {/* Products Area */}
        <div className="md:col-span-4 p-4 bg-white">
          <h1 className="text-4xl text-[#1f2323] p-2">
            {selectedCategory ? t(selectedCategory) : t("Football Shoes")}
          </h1>

          <BrandsSlider
            brands={brands}
            selectedBrand={selectedBrand}
            onBrandClick={(brand) => setSelectedBrand(brand === selectedBrand ? null : brand)}
          />

<div className="flex mb-4 gap-3 flex-wrap">
            <FilterDropdown attributeValues={attributeValues} onFilterChange={setSelectedAttributes} />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-2 sm:p-4">
            {filteredProducts.map((product) => (
              <div
                key={product.sku}
                className="bg-gradient-to-br from-white to-neutral-200 rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <ProductSlider images={product.images} productName={product.name} />

                <Link
                  href={`/product/${encodeURIComponent(product.sku)}`}
                  className="p-4 flex flex-col flex-grow justify-between"
                >
                  <div className="bg-neutral-400 text-amber-100 text-xs font-semibold w-fit px-3 py-1 rounded-full mb-3">
                    {(product.rootCategories || []).map((cat) => cat.name).join(", ")}
                  </div>

                  <h3 className="text-base text-gray-700 text-center font-bold mb-1">{product.brand?.name}</h3>

                  <p className="text-center text-sm text-gray-500 line-clamp-2 mb-3">{product.name}</p>

                  <h2 className="text-center font-bold text-lg text-gray-800">
                    ${product.list_price_amount}
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
