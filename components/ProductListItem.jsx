'use client';

import Link from 'next/link';
import Image from 'next/image';
import { deleteProduct } from '@/app/productadmin/products';

function DeleteButton({ id }) {
  // Use a form to call the server action for deletion
  const deleteActionWithId = deleteProduct.bind(null);

  return (
    <form action={deleteActionWithId}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
        onClick={(e) => {
          // Add a confirmation dialog before deleting
          if (!confirm('Are you sure you want to delete this product?')) {
            e.preventDefault();
          }
        }}
      >
        Delete
      </button>
    </form>
  );
}

export default function ProductListItem({ product }) {
  const imageUrl = product.images?.[0] || '/placeholder.png'; // Fallback image

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
      <Image src={imageUrl} alt={product.title} width={64} height={64} className="rounded-md object-cover" />
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-500">ID: {product.id} | Price: ₹{product.price.toLocaleString('en-IN')}</p>
      </div>
      <div className="flex items-center space-x-4">
        {/* This is the corrected link format */}
        <Link href={`/productadmin/edit/${product.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">Edit</Link>
        <DeleteButton id={product.id} />
      </div>
    </div>
  );
}