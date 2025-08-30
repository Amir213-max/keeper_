'use client';

import { useTranslation } from "@/app/contexts/TranslationContext";
import { useState } from "react";
import { addToCartTempUser } from "@/app/lib/mutations";

export default function ProductDescription({ product }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('description');
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="p-4 mt-4 bg-white rounded-2xl shadow-lg text-neutral-800 w-full">
      {/* الأزرار tabs */}
      <div className="flex space-x-4 mb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('description')}
          className={`py-2 px-4 font-semibold cursor-pointer ${
            activeTab === 'description'
              ? 'text-amber-500 border-b-2 border-amber-500'
              : 'text-gray-500'
          }`}
        >
          {t('Description')}
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`py-2 px-4 font-semibold cursor-pointer ${
            activeTab === 'details'
              ? 'text-amber-500 border-b-2 border-amber-500'
              : 'text-gray-500'
          }`}
        >
          {t('Details')}
        </button>
      </div>

      {/* المحتوى */}
      <div
        className="prose max-w-3xl p-4"
        dangerouslySetInnerHTML={{ __html: product.description || '' }}
      />

      {/* زرار Add to Cart */}

    </div>
  );
}
