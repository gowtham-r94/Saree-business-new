import { notFound } from 'next/navigation';
import ProductForm from '../../ProductForm';
import { getProductById } from '../../products';

export default async function EditProductPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  console.log('Editing product with id:', id);
  const product = await getProductById(id);
  console.log('Found product:', product);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-cream/20 min-h-screen">
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Edit Product
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ProductForm productToEdit={product} />
            </div>
        </div>
      </main>
    </div>
  );
}