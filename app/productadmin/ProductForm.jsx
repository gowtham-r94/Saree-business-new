'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { addProduct, updateProduct } from './products';

function SubmitButton({ isEditing }) {
  const { pending } = useFormStatus();

  const baseClasses = "w-full text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-400";
  
  // Use a distinct, positive color for "Add" and a standard primary color for "Update".
  const addClasses = "bg-green-600 hover:bg-green-700";
  const updateClasses = "bg-blue-600 hover:bg-blue-700";

  const specificClasses = isEditing ? updateClasses : addClasses;

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${baseClasses} ${specificClasses}`}
    >
      {pending 
        ? (isEditing ? 'Updating Product...' : 'Adding Product...') 
        : (isEditing ? 'Update Product' : 'Add Product')}
    </button>
  );
}

const FormInput = ({ id, label, type = 'text', required = true, placeholder, step, defaultValue }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      id={id}
      name={id}
      required={required}
      placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      step={step}
      defaultValue={defaultValue}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-maroon focus:border-maroon"
    />
  </div>
);

const FormTextarea = ({ id, label, required = true, placeholder, defaultValue }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        id={id}
        name={id}
        required={required}
        rows="4"
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        defaultValue={defaultValue}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-maroon focus:border-maroon"
      ></textarea>
    </div>
);


export default function ProductForm({ productToEdit }) {
  const router = useRouter();
  const formRef = useRef(null);
  const isEditing = !!productToEdit?.id;
  const action = isEditing ? updateProduct : addProduct;
  const [state, formAction] = useActionState(action, null);

  useEffect(() => {
    if (state?.success) {
      if (isEditing) {
        // After a successful update, redirect to the main admin page
        router.push('/productadmin');
      } else {
        formRef.current?.reset(); // Reset form after add
      }
    }
  }, [state, isEditing, router]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col flex-grow min-h-0">
      {/* Scrollable form fields */}
      <div className="flex-grow overflow-y-auto pr-4 -mr-4 space-y-4">
        {isEditing && <input type="hidden" name="id" value={productToEdit.id} />}
        <FormInput id="title" label="Product Title" defaultValue={productToEdit?.title} />
        <FormInput id="fabric" label="Fabric" defaultValue={productToEdit?.fabric} />
        <FormInput id="weave" label="Weave Type" defaultValue={productToEdit?.weave} />
        <FormInput id="occasion" label="Occasions (comma-separated)" placeholder="e.g. Wedding, Festive" defaultValue={productToEdit?.occasion?.join(', ')} />
        
        <div className="grid grid-cols-2 gap-4">
          <FormInput id="price" label="Price" type="number" defaultValue={productToEdit?.price} />
          <FormInput id="originalPrice" label="Original Price" type="number" defaultValue={productToEdit?.originalPrice} />
        </div>

        <FormInput id="rating" label="Rating" type="number" step="0.1" placeholder="e.g. 4.8" defaultValue={productToEdit?.rating} />
        
        <FormTextarea id="images" label="Image URLs (comma-separated)" defaultValue={productToEdit?.images?.join(', ')} />
        
        <FormInput id="length" label="Saree Length" placeholder="e.g. 6.3m including blouse" defaultValue={productToEdit?.length} />

        <FormTextarea id="description" label="Description" defaultValue={productToEdit?.description} />

        <div className="flex items-center">
          <input
            id="blouseStitchingAvailable"
            name="blouseStitchingAvailable"
            type="checkbox"
            defaultChecked={productToEdit?.blouseStitchingAvailable ?? false}
            className="h-4 w-4 text-maroon focus:ring-maroon border-gray-300 rounded"
          />
          <label htmlFor="blouseStitchingAvailable" className="ml-2 block text-sm text-gray-900">
            Blouse Stitching Available
          </label>
        </div>
      </div>

      {/* Sticky footer for actions */}
      <div className="pt-4 mt-4 border-t border-gray-200 shrink-0">
        {state?.message && (
          <p className={`text-sm text-center p-2 rounded-md mb-4 ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {state.message}
          </p>
        )}
        {isEditing ? (
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => router.push('/productadmin')} className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
            <SubmitButton isEditing={isEditing} />
          </div>
        ) : (
          <SubmitButton isEditing={isEditing} />
        )}
      </div>
    </form>
  );
}