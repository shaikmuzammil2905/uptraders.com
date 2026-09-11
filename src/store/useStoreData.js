import { create } from 'zustand';
import { products as initialProducts } from '../data/products';
import { categories as initialCategories } from '../data/categories';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export const useStoreData = create((set) => ({
  products: initialProducts,
  categories: initialCategories,
  offers: [],
  loading: false,
  fetchData: async () => {
    try {
      set({ loading: true });
      const [prodRes, catRes, offerRes] = await Promise.all([
        fetch(`${BACKEND_URL}/general/products`),
        fetch(`${BACKEND_URL}/general/categories`),
        fetch(`${BACKEND_URL}/general/offers`)
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();
      const offerData = await offerRes.json();
      
      set({ 
        products: (prodData.products && prodData.products.length > 0) ? prodData.products : initialProducts, 
        categories: (catData.categories && catData.categories.length > 0) ? catData.categories : initialCategories,
        offers: offerData.offers || [],
        loading: false 
      });
    } catch (err) {
      // Offline / fallback to demo catalogue for UI testing
      set({ 
        products: initialProducts,
        categories: initialCategories,
        loading: false 
      });
    }
  }
}));
