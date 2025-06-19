'use client';
import { FaEnvelope, FaPhone, FaWhatsapp, FaInstagram, FaYoutube, FaFacebook, FaTiktok } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white text-sm">
      
      <div className="bg-yellow-400 text-black px-4 py-6 flex flex-col sm:flex-row items-center justify-center gap-4">
  <input
    type="email"
    placeholder="Your email address . . ."
    className="w-full sm:w-1/2 md:w-1/3 px-4 py-2 rounded bg-neutral-800 text-amber-50 placeholder-amber-200"
  />
  <button className="bg-white px-6 py-2 rounded font-bold cursor-pointer hover:bg-gray-200 w-full sm:w-auto">
    SIGN UP!
  </button>
</div>


      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 px-6 py-10 max-w-7xl mx-auto">
        
        <div>
          <h3 className="font-bold text-base mb-4">Contact</h3>
          <p className="flex items-center gap-2"><FaEnvelope /> office@keepersport.net</p>
          <p className="flex items-center gap-2"><FaPhone /> +43 676 7664611</p>
          <p className="flex items-center gap-2"><FaWhatsapp /> Live Chat</p>
        </div>

        <div>
          <h3 className="font-bold text-base mb-4">Customer Service Hours</h3>
          <ul className="space-y-1">
            <li>Monday: 9 am - 4 pm (CET)</li>
            <li>Tuesday: 9 am - 4 pm (CET)</li>
            <li>Wednesday: 9 am - 4 pm (CET)</li>
            <li>Thursday: 9 am - 4 pm (CET)</li>
            <li>Friday: 9 am - 1 pm (CET)</li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-bold text-base mb-4">Service & Support</h3>
          <ul className="space-y-1 ">
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Support</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Payment options</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Shipping</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Returns</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Size guide</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Glove Guide</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Goalkeeper glove models</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Goalkeeper Glove Cuts</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Glove Care</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Pro tips</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Newsletter</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-4">KEEPERsport</h3>
          <ul className="space-y-1">
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">About Us</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Store in Austria</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Team</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">Goalkeeper Day</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-4">KEEPERzone</h3>
          <ul className="space-y-1">
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">#KeepItAll Blog</Link></li>
            <li><Link className='hover:text-amber-300 transition duration-150 cursor-pointer' href="#">KEEPERtraining</Link></li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-700" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 px-6 py-10 max-w-7xl mx-auto">
  
        <div>
          <h3 className="font-bold text-base mb-4">Follow us</h3>
          <div className="flex gap-4 text-xl">
          <FaFacebook className='hover:text-amber-400 cursor-pointer' />
          <FaYoutube  className='hover:text-amber-400 cursor-pointer'  />
            <FaTiktok className='hover:text-amber-400 cursor-pointer' />
          <FaInstagram className='hover:text-amber-400 cursor-pointer' />
          </div>
        </div>

        
        <div>
          <h3 className="font-bold text-base mb-4">Your Benefits</h3>
          <ul className="space-y-1">
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Quality Statement</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Goalkeeper underwear</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Professional Advice</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Personalisation</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Exclusive SMU Gloves</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Multibuy Offers</li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-bold text-base mb-4">Categories</h3>
          <ul className="space-y-1">
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Goalkeeper Gloves</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Football Boots</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Goalkeeper pants</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Goalkeeper jerseys</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Goalkeeper undershorts</li>
          </ul>
        </div>

      
        <div>
          <h3 className="font-bold text-base mb-4">Brands</h3>
          <ul className="space-y-1">
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>adidas</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>KEEPERsport</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>NIKE</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Puma</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>REUSCH</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Sells Goalkeeper</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>uhlsport</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>Elite Sport</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer'>rehab</li>
          </ul>
        </div>

     
        <div>
          <h3 className="font-bold text-base mb-4">Highlights</h3>
          <ul className="space-y-1">
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer' >adidas goalkeeper gloves</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer' >KEEPERsport gloves</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer' >reusch goalkeeper gloves</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer' >uhlsport goalkeeper gloves</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer' >rehab goalkeeper gloves</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer' >NIKE goalkeeper gloves</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer' >PUMA goalkeeper gloves</li>
            <li className='hover:text-amber-300 transition duration-150 cursor-pointer' >SELLS goalkeeper gloves</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
