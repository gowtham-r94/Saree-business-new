'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

// Helper function to get the file path to products.json
const getProductsFilePath = () => {
  // This assumes your products.json is in a `data` directory at the root of your project.
  // Adjust the path if your file is located elsewhere.
  return path.join(process.cwd(), 'data', 'products.json');
};

// Helper function to read all products from the JSON file
const readProducts = async () => {
  const filePath = getProductsFilePath();
  try {
    // Ensure the directory exists before trying to read from it
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist (e.g., first run), return an empty array.
    if (error.code === 'ENOENT') {
      return [];
    }
    // For other errors, re-throw them.
    throw error;
  }
};

// Helper function to write all products to the JSON file
const writeProducts = async (products) => {
  const filePath = getProductsFilePath();
  await fs.writeFile(filePath, JSON.stringify(products, null, 2));
};

// Helper function to generate a URL-friendly slug from a string
const generateSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/ & /g, '-and-')
    .replace(/[^\w\s-]/g, '') // remove non-word characters
    .trim()
    .replace(/[\s_-]+/g, '-') // collapse whitespace and replace by -
    .replace(/^-+|-+$/g, ''); // trim -
};

// New helper function to ensure slug is unique
const createUniqueSlug = (title, existingProducts) => {
  const baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;
  // Check if a product with the generated slug already exists
  while (existingProducts.some(p => p.slug === slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
};

// Helper to parse form data from the client into a structured product object
const parseProductData = (formData) => {
  const occasion = formData.get('occasion');
  const images = formData.get('images');

  return {
    title: formData.get('title'),
    fabric: formData.get('fabric'),
    weave: formData.get('weave'),
    occasion: occasion ? occasion.split(',').map(s => s.trim()).filter(Boolean) : [],
    price: parseFloat(formData.get('price')),
    originalPrice: parseFloat(formData.get('originalPrice')),
    rating: parseFloat(formData.get('rating')),
    images: images ? images.split(',').map(s => s.trim()).filter(Boolean) : [],
    length: formData.get('length'),
    description: formData.get('description'),
    // A checked checkbox sends 'on', an unchecked one sends nothing.
    blouseStitchingAvailable: formData.get('blouseStitchingAvailable') === 'on',
  };
};

export async function getProducts() {
  return readProducts();
}

export async function getProductById(id) {
    const products = await readProducts();
    return products.find(p => p.id === id);
}

export async function addProduct(prevState, formData) {
  try {
    const newProductData = parseProductData(formData);
    
    if (!newProductData.title || !newProductData.price) {
      return { success: false, message: 'Title and Price are required.' };
    }

    const products = await readProducts();
    const newSlug = createUniqueSlug(newProductData.title, products);
    
    const newProduct = {
      id: crypto.randomUUID(), // More robust and standard for unique IDs
      slug: newSlug,
      ...newProductData,
    };

    products.push(newProduct);
    await writeProducts(products);

    revalidatePath('/productadmin'); // Tell Next.js to refresh the data on the admin page
    revalidatePath('/shop'); // Refresh the public shop page
    
    return { success: true, message: 'Product added successfully!' };
  } catch (error) {
    console.error('Failed to add product:', error);
    return { success: false, message: 'Server Error: Could not add product.' };
  }
}

export async function updateProduct(prevState, formData) {
  try {
    const updatedProductData = parseProductData(formData);
    const id = formData.get('id');

    if (!id) return { success: false, message: 'Product ID is missing.' };

    const products = await readProducts();
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) return { success: false, message: 'Product not found.' };

    const productToUpdate = products[productIndex];
    let newSlug = productToUpdate.slug;

    // Only generate a new slug if the title has changed to avoid changing URLs unnecessarily
    if (updatedProductData.title && updatedProductData.title !== productToUpdate.title) {
      // Exclude the current product from the uniqueness check
      const otherProducts = products.filter(p => p.id !== id);
      newSlug = createUniqueSlug(updatedProductData.title, otherProducts);
    }

    products[productIndex] = { ...productToUpdate, ...updatedProductData, id, slug: newSlug };
    await writeProducts(products);

    revalidatePath('/productadmin');
    revalidatePath(`/productadmin/edit/${id}`);
    revalidatePath('/shop'); // Refresh the public shop page
    revalidatePath(`/products/${newSlug}`); // Refresh the specific product page
    
    return { success: true, message: 'Product updated successfully!' };
  } catch (error) {
    console.error('Failed to update product:', error);
    return { success: false, message: 'Server Error: Could not update product.' };
  }
}

export async function deleteProduct(formData) {
  try {
    const id = formData.get('id');

    if (!id) {
      throw new Error('Product ID is missing for deletion.');
    }

    const products = await readProducts();
    const updatedProducts = products.filter(p => p.id !== id);

    await writeProducts(updatedProducts);

    revalidatePath('/productadmin');
    revalidatePath('/shop'); // Refresh the public shop page
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw new Error('Server Error: Could not delete product.');
  }
}