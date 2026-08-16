import ProductForm from './ProductForm';
import { getProducts } from './products';
import ProductListItem from '../../components/ProductListItem';

export default async function AdminPage() {
  const products = await getProducts();

  return (
    <div className="bg-cream/20 min-h-screen">
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form for adding a new product */}
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Add New Product
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md max-h-[80vh] flex flex-col">
              <ProductForm />
            </div>
          </div>

          {/* List of existing products */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Existing Products
            </h2>
            <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-4 -mr-4">
              {products.length > 0 ? (
                products.slice().reverse().map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))
              ) : (
                <p className="text-gray-500">No products found. Add one to get started!</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}