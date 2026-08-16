import '../app/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '../components/CartContext';

export const metadata = {
  title: 'Saree Emporium - Elegance in Every Weave',
  description: 'Discover our exclusive collection of exquisite handcrafted sarees.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}