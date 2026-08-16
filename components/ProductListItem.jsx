'use client';

import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { deleteProduct } from '../app/productadmin/products';

function DeleteButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
            {pending ? 'Deleting...' : 'Delete'}
        </button>
    );
}

export default function ProductListItem({ product }) {
    const handleSubmit = (e) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            e.preventDefault();
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-50 hover:shadow-lg transition-shadow flex justify-between items-center">
            <div>
                <h3 className="font-bold text-lg text-maroon">{product.title}</h3>
                <p className="text-sm text-gray-600">Fabric: {product.fabric}</p>
                <p className="text-sm text-gray-700 font-semibold">Price: ₹{product.price.toLocaleString()}</p>
                <Link href={`/products/${product.slug}`} className="text-sm text-zariGold hover:underline mt-2 inline-block" target="_blank">View Product</Link>
            </div>
            <div className="flex items-center space-x-2">
                <Link href={`/productadmin/edit/${product.id}`} className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-md hover:bg-blue-600 transition-colors">
                    Edit
                </Link>
                <form action={deleteProduct} onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={product.id} />
                    <DeleteButton />
                </form>
            </div>
        </div>
    );
}