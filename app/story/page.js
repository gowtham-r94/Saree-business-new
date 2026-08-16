import React from 'react';
import Image from 'next/image';

const StoryPage = () => {
  return (
    <div className="bg-white">
      <div className="relative h-[50vh] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1682096159299-5e8a6d5d442b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-5xl font-extrabold">Our Heritage</h1>
      </div>
      
      <div className="container mx-auto px-6 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">The Heart of Handloom</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our journey began with a simple yet profound love for the timeless elegance of the Indian saree. We believe that every saree is not just a piece of clothing, but a story woven with threads of tradition, artistry, and cultural heritage. Our mission is to bring these stories from the looms of skilled artisans directly to your wardrobe.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We travel to the remote corners of India, from the vibrant markets of Varanasi to the serene villages of Kanchipuram, to source the most authentic, handcrafted sarees. Each piece in our collection is a testament to the weaver's skill, dedication, and passion.
              </p>
            </div>
            <div className="relative h-80 rounded-lg shadow-xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/29848190/pexels-photo-29848190.jpeg?_gl=1*tuuj31*_ga*OTg5NjgwODk5LjE3ODY2NDQ5MDU.*_ga_8JE65Q40S6*czE3ODY2NDQ5MDQkbzEkZzEkdDE3ODY2NDQ5NjQkajYwJGwwJGgw"
                alt="Weaver at a loom"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mb-16 bg-gray-50 p-12 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Supporting Our Weavers</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg shadow-xl overflow-hidden order-last md:order-first">
              <Image
                src="https://images.pexels.com/photos/2171409/pexels-photo-2171409.jpeg?_gl=1*1cvbuqo*_ga*OTg5NjgwODk5LjE3ODY2NDQ5MDU.*_ga_8JE65Q40S6*czE3ODY2NDQ5MDQkbzEkZzEkdDE3ODY2NDUxNDUkajQzJGwwJGgw"
                alt="Weaver community"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The soul of our brand lies in the hands of our weavers. We are committed to empowering these artisan communities by ensuring fair wages, ethical working conditions, and a sustainable livelihood. By choosing our sarees, you are not just buying a beautiful garment; you are supporting a centuries-old craft and helping to keep it alive for future generations.
              </p>
               <p className="text-lg text-gray-700 leading-relaxed">
                We work directly with weaver cooperatives, eliminating middlemen and ensuring that the creators of these masterpieces receive the recognition and reward they deserve.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Caring for Your Saree</h2>
          <div className="max-w-3xl mx-auto text-gray-700 space-y-6">
            <div>
              <h3 className="font-semibold text-xl mb-2">General Care</h3>
              <p>Always store your saree in a cool, dry place. Wrap it in a soft muslin cloth to allow the fabric to breathe. Avoid hanging silk sarees on metal hangers for extended periods as it can cause creases and damage the fabric.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Washing Instructions</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Silk and Zari Sarees:</strong> Strictly dry clean only.</li>
                <li><strong>Cotton Sarees:</strong> Hand wash separately in cold water with a mild detergent. Do not soak.</li>
                <li><strong>Organza and Georgette:</strong> Dry clean is preferred. If washing at home, use a gentle hand wash with a mild soap.</li>
              </ul>
            </div>
             <div>
              <h3 className="font-semibold text-xl mb-2">Ironing</h3>
              <p>Iron on a low to medium heat setting. It is best to iron the saree with a cloth on top to protect the fabric and any embellishments. Never spray water directly on a silk saree before ironing.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StoryPage;
