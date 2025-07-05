'use client';


import { useTranslation } from "@/app/contexts/TranslationContext";
import { useState } from "react";


export default function ProductDescription({ product }) {
 
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('description');

  // خد أول وصف فقط
  const firstDesc = product.descriptions?.[0]?.text || '';

  // استخلاص الوصف فقط بدون details
  const mainDescription = firstDesc.split('<h2>')[0];

  // استخراج الـ <ul> اللي فيها details
  const detailsMatch = firstDesc.match(/<ul>[\s\S]*?<\/ul>/);
  
  const detailsHTML = detailsMatch ? detailsMatch[0] : '';
  const detailsWithStyle = detailsHTML.replace('<ul>', '<ul style="list-style: disc; padding-left: 1.5rem;">');

  return (
    <div className="p-4 mt-4 bg-white rounded-2xl shadow-lg text-neutral-800 transition-all duration-300 w-full">
      {/* الأزرار */}
      <div className="flex space-x-4 mb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('description')}
          className={`py-2 cursor-pointer px-4 font-semibold ${
            activeTab === 'description'
              ? 'text-amber-500 border-b-2 border-amber-500'
              : 'text-gray-500'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`py-2 px-4 cursor-pointer font-semibold ${
            activeTab === 'details'
              ? 'text-amber-500 border-b-2 border-amber-500'
              : 'text-gray-500'
          }`}
        >
          Details
        </button>
      </div>

      {/* المحتوى */}
      {activeTab === 'description' && (
        <div
          className="prose max-w-3xl p-4 animate-fade-in"
          dangerouslySetInnerHTML={{ __html: mainDescription }}
        />
      )}

      {activeTab === 'details' && (
        <div
          className="prose list-disc ps-5 max-w-3xl animate-fade-in"
          dangerouslySetInnerHTML={{ __html: detailsWithStyle }}
        />
      )}
    </div>
  );

}
