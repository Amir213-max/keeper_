'use client';

import { useTranslation } from '../contexts/TranslationContext';
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from 'react-icons/fa';



import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import CartSidebar from './CartSidebar';
import SearchComponent from './SearchComponant';
import NavbarNotifications from './NotificationsBell';

export default function NavbarWithLinks() {
  const { t, lang, setLang } = useTranslation();
  const [cartOpen, setCartOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* شعار الخصومات */}
      {/* <div className="flex mt-3 justify-center text-base sm:text-lg md:text-xl lg:text-2xl w-full font-extrabold text-red-600">
        {'>>'}{t("END OF SALES")}{'<<'}
      </div> */}

      {/* Header Navbar */}
      <header className="w-full bg-black shadow py-4">
        <div className="navbar-container container mx-auto px-4 flex items-center justify-between">
          
          {/* يسار: Sidebar + Cart */}
          <div className="navbar-left flex items-center gap-4 order-3 sm:order-1">
            <button
              className="menu-icon hidden text-white hover:text-red-600 transition-colors duration-200"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars className='sm:block  ' size={22} />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="text-white hover:text-amber-400 transition-colors duration-200 cursor-pointer"
            >
              <FaShoppingCart size={20} />
            </button>

            {/* <Link href={'/whislist'}
              className="text-white hover:text-amber-400 transition-colors duration-200 cursor-pointer"
            >
              @
            </Link> */}
          </div>

          {/* وسط: Logo */}
          <div className="navbar-center order-1 sm:order-2 flex items-center gap-4">
      <div className="flex items-center justify-center">
  <Link href="/" className="relative w-24 sm:w-32 md:w-40 h-10 sm:h-12 md:h-14 block">
    <Image
      src="https://static-assets.keepersport.net/dist/82d4dde2fe42e8e4fbfc.svg"
      alt="LOGO"
      fill
      sizes="(max-width: 640px) 6rem, (max-width: 768px) 8rem, 10rem"
      className="object-contain"
      priority
    />
  </Link>

</div>

          </div>

          {/* يمين: User + Notifications + Search + Language */}
          <div className="navbar-right order-2 flex items-center gap-4">
            {/* أيقونة المستخدم */}
            <Link href={'/login'} className="text-white hover:text-red-600 transition-colors duration-200">
              <FaUser size={20} />
            </Link>

            {/* أيقونة الإشعارات */}
            {/* <div className="hover:scale-110 transition-transform duration-200">
              <NavbarNotifications userId={"1"} />
            </div> */}

            {/* أيقونة البحث */}
            <button
              className="text-white hover:text-amber-400 transition-colors duration-200 cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FaSearch size={20} />
            </button>

            {searchOpen && (
              <SearchComponent onClose={() => setSearchOpen(false)} />
            )}

            {/* اختيار اللغة */}
            <select
              onChange={(e) => setLang(e.target.value)}
              value={lang}
              className="bg-black text-white border border-gray-500 px-2 py-1 rounded text-sm"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
      </header>

      {/* Navbar Links */}
      <nav id="main-links" className="flex justify-around bg-black shadow py-3 text-sm sm:text-[14px] lg:text-lg">
        <ul className="flex gap-6 md:gap-12 text-white font-bold">
          <li><Link href="/GoalkeeperGloves" className="hover:border-b-2 pb-1 border-white">{t('Goalkeeper Gloves')}</Link></li>
          <li><Link href="/FootballBoots" className="hover:border-b-2 pb-1 border-white">{t('Football Boots')}</Link></li>
          <li><Link href="/Apparel" className="hover:border-b-2 pb-1 border-white">{t('Goalkeeper Apparel')}</Link></li>
          <li><Link href="/Equipmen" className="hover:border-b-2 pb-1 border-white">{t('Goalkeeper Equipment')}</Link></li>
          <li><Link href="/Teamsport" className="hover:border-b-2 pb-1 border-white">{t('Teamsport')}</Link></li>
          <li><Link href="/Sale" className="hover:border-b-2 pb-1 border-white">{t('Sale')}</Link></li>
        </ul>
      </nav>

      {/* Sidebar overlay */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-64 bg-neutral-900 shadow-lg z-[100] transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="text-xl font-bold text-white">{t("Menu")}</span>
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes size={24} className="text-white" />
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-4 font-semibold text-white text-base">
          <li><Link href="/GoalkeeperGloves" onClick={() => setSidebarOpen(false)}>{t('Goalkeeper Gloves')}</Link></li>
          <li><Link href="/FootballBoots" onClick={() => setSidebarOpen(false)}>{t('Football Boots')}</Link></li>
          <li><Link href="/Apparel" onClick={() => setSidebarOpen(false)}>{t('Goalkeeper Apparel')}</Link></li>
          <li><Link href="/Equipmen" onClick={() => setSidebarOpen(false)}>{t('Goalkeeper Equipment')}</Link></li>
          <li><Link href="/Teamsport" onClick={() => setSidebarOpen(false)}>{t('Teamsport')}</Link></li>
          <li><Link href="/Sale" onClick={() => setSidebarOpen(false)}>{t('Sale')}</Link></li>
        </ul>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
