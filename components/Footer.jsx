import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-maroon text-cream py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Saree Emporium</h3>
            <p className="text-sm">
              Discover the timeless elegance of handcrafted Indian sarees. We bring you authentic weaves directly from skilled artisans, celebrating heritage and supporting communities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-zariGold transition-colors">Home</Link></li>
              <li><Link href="/shop" className="hover:text-zariGold transition-colors">Shop</Link></li>
              <li><Link href="/story" className="hover:text-zariGold transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-zariGold transition-colors">Contact Us</Link></li>
              <li><Link href="/cart" className="hover:text-zariGold transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <p className="text-sm mb-4">
              Founder: Lavanya K<br/>
              Email:   lavanyakrishnan192@gmail.com<br/>
              Phone:   +91 9486211884
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-zariGold transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C17.34 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="hover:text-zariGold transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.028 1.564c-.69.0-1.745-.005-2.79-.005C5.034 1.559 2.502 4.09 2.502 7.08v3.66c0 1.045.005 2.1.005 2.79.0 2.99 2.532 5.522 5.522 5.522h3.66c1.045 0 2.1-.005 2.79-.005 2.99 0 5.522-2.532 5.522-5.522V7.08c0-1.045-.005-2.1-.005-2.79.0-2.99-2.532-5.522-5.522-5.522h-3.66zm.005 3.398c2.42 0 4.382 1.962 4.382 4.382s-1.962 4.382-4.382 4.382-4.382-1.962-4.382-4.382 1.962-4.382 4.382-4.382zm0 1.961c1.332 0 2.421 1.089 2.421 2.421s-1.089 2.421-2.421 2.421-2.421-1.089-2.421-2.421 1.089-2.421 2.421-2.421zm6.275-2.614a1.314 1.314 0 100 2.628 1.314 1.314 0 000-2.628z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="hover:text-zariGold transition-colors" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.23 8.3c.01.2-.01.4-.04.6-.62 3.3-3.23 6.03-6.52 6.27-.8.06-1.55-.16-2.22-.61-.67-.45-1.16-1.12-1.42-1.9-.06-.18.01-.38.16-.49.15-.1.35-.11.49-.02.4.28.87.45 1.35.48.5-.03.9-.17 1.25-.43.34-.26.54-.6.59-.97.03-.22-.05-.44-.22-.59-.18-.15-.4-.19-.62-.12-.34.1-.7.15-1.05.15-.35 0-.7-.05-1.04-.15-.54-.15-1.04-.4-1.48-.75-.44-.35-.76-.78-.97-1.28-.21-.5-.28-1.04-.2-1.57.08-.53.34-1.02.75-1.42.41-.4.9-.66 1.42-.75.53-.08 1.07-.02 1.57.2.5.21.93.54 1.28.98.35.44.6.94.75 1.48.15.54.21 1.1.15 1.63-.05.53-.26 1.02-.6 1.4.1.04.2.06.3.06.3 0 .58-.09.8-.25.23-.16.35-.37.38-.6-.04-.1-.08-.2-.11-.3-.2-.35-.3-.72-.3-1.1-.03-.27.06-.54.25-.73.19-.19.45-.29.72-.25.27.03.5.15.68.35.18.2.28.45.28.72 0 .28-.09.54-.25.75-.16.2-.37.31-.6.31.06.01.12.01.18.01 1.1 0 2.05-.28 2.84-.85.79-.57 1.3-1.33 1.53-2.27.23-.94.13-1.92-.3-2.77-.42-.85-1.12-1.5-2.02-1.88-.9-.38-1.88-.47-2.8-.27-1.1.24-2.06.84-2.8 1.8.18-.02.35-.03.53-.03.2 0 .4.01.6.04.62.1 1.2.33 1.74.68.54.35.98.78 1.28 1.28z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cream-700 mt-8 pt-8 text-center text-sm">
          &copy; {currentYear} Saree Emporium. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
