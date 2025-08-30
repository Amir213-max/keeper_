// 'use client';
// import { useEffect, useState } from 'react';
// import { getRecentlySeenProducts } from '@/app/lib/getRecentlySeenProducts';

// export default function RecentlySeen() {
//   const [products, setProducts] = useState([]);


//   useEffect(() => {
//     const seenSkus = JSON.parse(localStorage.getItem('recentlySeen')) || [];
//     if (!seenSkus.length) return;

//     getRecentlySeenProducts(seenSkus).then(setProducts).catch(console.error);
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Recently Seen Products</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {products.map((p) => (
//           <div key={p.sku} className="border p-2 rounded">
//             <img src={p.images[0]?.url} alt={p.name} className="w-full h-32 object-cover" />
//             <h3 className="text-sm font-bold mt-2">{p.name}</h3>
//             <p className="text-xs text-gray-500">{p.brand?.name}</p>
//             <p className="text-sm font-semibold mt-1">
//               {p.listPrice.amount} {p.listPrice.currency}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
