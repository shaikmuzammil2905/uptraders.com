import { create } from 'zustand';
import { 
  sampleProducts, 
  sampleCategories, 
  initialOffers, 
  initialBanners, 
  initialCoupons, 
  initialOrders 
} from '../data/initialData';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

function loadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load storage for', key, e);
  }
  return fallback;
}

function saveStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save storage for', key, e);
  }
}

export const useStoreData = create((set, get) => ({
  products: loadStorage('upt_products', sampleProducts),
  categories: loadStorage('upt_categories', sampleCategories),
  offers: loadStorage('upt_offers', initialOffers),
  banners: loadStorage('upt_banners', initialBanners),
  coupons: loadStorage('upt_coupons', initialCoupons),
  orders: loadStorage('upt_orders', initialOrders),
  loading: false,

  fetchData: async () => {
    try {
      set({ loading: true });
      const [prodRes, catRes, offerRes] = await Promise.all([
        fetch(`${BACKEND_URL}/general/products`).catch(() => null),
        fetch(`${BACKEND_URL}/general/categories`).catch(() => null),
        fetch(`${BACKEND_URL}/general/offers`).catch(() => null)
      ]);

      let remoteProds = prodRes && prodRes.ok ? await prodRes.json() : null;
      let remoteCats = catRes && catRes.ok ? await catRes.json() : null;
      let remoteOffers = offerRes && offerRes.ok ? await offerRes.json() : null;

      const currentProds = get().products;
      const currentCats = get().categories;
      const currentOffers = get().offers;

      const newProds = (remoteProds?.products && remoteProds.products.length > 0) 
        ? remoteProds.products 
        : currentProds;
      const newCats = (remoteCats?.categories && remoteCats.categories.length > 0) 
        ? remoteCats.categories 
        : currentCats;
      const newOffers = (remoteOffers?.offers && remoteOffers.offers.length > 0) 
        ? remoteOffers.offers 
        : currentOffers;

      set({
        products: newProds,
        categories: newCats,
        offers: newOffers,
        loading: false
      });

      saveStorage('upt_products', newProds);
      saveStorage('upt_categories', newCats);
      saveStorage('upt_offers', newOffers);
    } catch (err) {
      set({ loading: false });
    }
  },

  // ─── PRODUCTS CRUD (Immediately reflects live across entire site) ───
  saveProduct: (productData, isNew = false) => {
    const list = [...get().products];
    if (isNew) {
      const newId = productData.id || `prod_${Date.now()}`;
      const newProd = { ...productData, id: newId };
      const updated = [newProd, ...list];
      set({ products: updated });
      saveStorage('upt_products', updated);
      return newProd;
    } else {
      const idx = list.findIndex(p => String(p.id) === String(productData.id));
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...productData };
      } else {
        list.unshift(productData);
      }
      set({ products: list });
      saveStorage('upt_products', list);
      return productData;
    }
  },

  deleteProduct: (id) => {
    const updated = get().products.filter(p => String(p.id) !== String(id));
    set({ products: updated });
    saveStorage('upt_products', updated);
  },

  // ─── CATEGORIES CRUD ───
  saveCategory: (categoryData, isNew = false) => {
    const list = [...get().categories];
    if (isNew) {
      const newId = categoryData.id || categoryData.name.toLowerCase().replace(/\s+/g, '-');
      const newCat = { ...categoryData, id: newId };
      const updated = [...list, newCat];
      set({ categories: updated });
      saveStorage('upt_categories', updated);
      return newCat;
    } else {
      const idx = list.findIndex(c => String(c.id) === String(categoryData.id));
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...categoryData };
      } else {
        list.push(categoryData);
      }
      set({ categories: list });
      saveStorage('upt_categories', list);
      return categoryData;
    }
  },

  deleteCategory: (id) => {
    const updated = get().categories.filter(c => String(c.id) !== String(id));
    set({ categories: updated });
    saveStorage('upt_categories', updated);
  },

  // ─── OFFERS CRUD ───
  saveOffer: (offerData, isNew = false) => {
    const list = [...get().offers];
    if (isNew) {
      const newId = offerData.id || `off_${Date.now()}`;
      const newOffer = { ...offerData, id: newId };
      const updated = [newOffer, ...list];
      set({ offers: updated });
      saveStorage('upt_offers', updated);
      return newOffer;
    } else {
      const idx = list.findIndex(o => String(o.id) === String(offerData.id));
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...offerData };
      } else {
        list.unshift(offerData);
      }
      set({ offers: list });
      saveStorage('upt_offers', list);
      return offerData;
    }
  },

  deleteOffer: (id) => {
    const updated = get().offers.filter(o => String(o.id) !== String(id));
    set({ offers: updated });
    saveStorage('upt_offers', updated);
  },

  // ─── BANNERS CRUD ───
  saveBanner: (bannerData, isNew = false) => {
    const list = [...get().banners];
    if (isNew) {
      const newId = bannerData.id || `ban_${Date.now()}`;
      const newBanner = { ...bannerData, id: newId };
      const updated = [newBanner, ...list];
      set({ banners: updated });
      saveStorage('upt_banners', updated);
      return newBanner;
    } else {
      const idx = list.findIndex(b => String(b.id) === String(bannerData.id));
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...bannerData };
      } else {
        list.unshift(bannerData);
      }
      set({ banners: list });
      saveStorage('upt_banners', list);
      return bannerData;
    }
  },

  deleteBanner: (id) => {
    const updated = get().banners.filter(b => String(b.id) !== String(id));
    set({ banners: updated });
    saveStorage('upt_banners', updated);
  },

  // ─── COUPONS CRUD ───
  saveCoupon: (couponData, isNew = false) => {
    const list = [...get().coupons];
    if (isNew) {
      const newId = couponData.id || `cp_${Date.now()}`;
      const newCoupon = { ...couponData, id: newId };
      const updated = [newCoupon, ...list];
      set({ coupons: updated });
      saveStorage('upt_coupons', updated);
      return newCoupon;
    } else {
      const idx = list.findIndex(c => String(c.id) === String(couponData.id));
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...couponData };
      } else {
        list.unshift(couponData);
      }
      set({ coupons: list });
      saveStorage('upt_coupons', list);
      return couponData;
    }
  },

  deleteCoupon: (id) => {
    const updated = get().coupons.filter(c => String(c.id) !== String(id));
    set({ coupons: updated });
    saveStorage('upt_coupons', updated);
  },

  // ─── ORDERS CRUD ───
  updateOrderStatus: (id, newStatus) => {
    const list = [...get().orders];
    const idx = list.findIndex(o => String(o.id) === String(id) || String(o.order_number) === String(id));
    if (idx !== -1) {
      list[idx] = { ...list[idx], status: newStatus };
      set({ orders: list });
      saveStorage('upt_orders', list);
    }
  }
}));
