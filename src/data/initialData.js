import { products as sampleProducts } from './products';
import { categories as sampleCategories } from './categories';

export const initialOffers = [
  {
    id: 'off-1',
    title: 'Festive Grocery Dhamaka - 15% OFF',
    discount_percentage: 15,
    is_active: true,
    banner_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80',
    description: 'Save 15% on all premium Basmati Rice, Ghee, and selected dry fruits.',
    start_date: '2026-09-01',
    end_date: '2026-10-31'
  },
  {
    id: 'off-2',
    title: 'Monthly Ration Super Saver - 10% OFF',
    discount_percentage: 10,
    is_active: true,
    banner_url: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=1200&auto=format&fit=crop&q=80',
    description: 'Get 10% instant discount on orders above ₹2000 on essential commodities.',
    start_date: '2026-09-01',
    end_date: '2026-12-31'
  },
  {
    id: 'off-3',
    title: 'Wholesale Kirana Partner Margin Deal - 20% OFF',
    discount_percentage: 20,
    is_active: true,
    banner_url: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&auto=format&fit=crop&q=80',
    description: 'Exclusive bulk discounts for verified Sangareddy Kirana stores.',
    start_date: '2026-08-15',
    end_date: '2026-12-31'
  }
];

export const initialBanners = [
  {
    id: 'ban-1',
    title: 'UP Traders — Complete Grocery Store',
    subtitle: 'Malkapur X Road, Sangareddy • Quality Staples & FMCG at Mandi Prices',
    image_url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1400&auto=format&fit=crop&q=80',
    link: '/category/rice',
    button_text: 'Shop Staples',
    is_active: true
  },
  {
    id: 'ban-2',
    title: 'Pure Desi Ghee & Farm Fresh Oils',
    subtitle: 'Direct from certified mills • 100% pure & unadulterated',
    image_url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=1400&auto=format&fit=crop&q=80',
    link: '/category/ghee',
    button_text: 'Explore Oils & Ghee',
    is_active: true
  },
  {
    id: 'ban-3',
    title: 'B2B Wholesale & Bulk Function Orders',
    subtitle: 'Weddings, Caterers & Retail Kiranas • Same Day Sangareddy Delivery',
    image_url: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1400&auto=format&fit=crop&q=80',
    link: '/shopkeeper/dashboard',
    button_text: 'Wholesale Portal',
    is_active: true
  }
];

export const initialCoupons = [
  {
    id: 'cp-1',
    code: 'UPTRADERS100',
    discount_type: 'flat',
    discount_value: 100,
    min_order_amount: 999,
    description: 'Flat ₹100 OFF on grocery orders above ₹999',
    is_active: true,
    expires_at: '2026-12-31'
  },
  {
    id: 'cp-2',
    code: 'FESTIVE50',
    discount_type: 'flat',
    discount_value: 50,
    min_order_amount: 499,
    description: 'Save ₹50 on essential groceries',
    is_active: true,
    expires_at: '2026-12-31'
  },
  {
    id: 'cp-3',
    code: 'BULK500',
    discount_type: 'flat',
    discount_value: 500,
    min_order_amount: 5000,
    description: 'Special ₹500 OFF on bulk sacks and wholesale purchases',
    is_active: true,
    expires_at: '2026-12-31'
  }
];

export const initialOrders = [
  {
    id: "1082",
    order_number: "UPT-1082",
    date: "2026-09-08",
    status: "delivered",
    order_type: "b2b_wholesale",
    user_name: "Sri Sai Kirana Mart (Praveen)",
    user_email: "shopkeeper@uptraders.com",
    address: {
      name: "Sri Sai Kirana Mart (Praveen)",
      mobile: "8886000847",
      line1: "Shop #4, Market Yard",
      city: "Sangareddy",
      state: "Telangana",
      pincode: "502001"
    },
    items: [
      { name: "Sona Masoori Rice (25 KG Bag)", qty: 10, price: 1250 },
      { name: "Refined Sunflower Cooking Oil (15 L Tin)", qty: 4, price: 1720 },
      { name: "Pure Desi Cow Ghee (5 L Jar)", qty: 2, price: 2850 },
      { name: "Unpolished Toor Dal (5 KG Pack)", qty: 6, price: 690 }
    ],
    total: 29220,
    balance_due: 0,
    payment_method: "Cash on Delivery",
    payment_status: "Paid"
  },
  {
    id: "1079",
    order_number: "UPT-1079",
    date: "2026-09-07",
    status: "paid",
    order_type: "delivery",
    user_name: "Rajesh Kumar",
    user_email: "rajesh.k@gmail.com",
    address: {
      name: "Rajesh Kumar",
      mobile: "9848011223",
      line1: "H.No 3-45, Near Hanuman Temple",
      city: "Sangareddy",
      state: "Telangana",
      pincode: "502001"
    },
    items: [
      { name: "Premium Basmati Rice (5 KG)", qty: 1, price: 649 },
      { name: "Pure Desi Cow Ghee (1 L Jar)", qty: 1, price: 620 },
      { name: "Premium Toor Dal (1 KG)", qty: 2, price: 175 }
    ],
    total: 1619,
    balance_due: 0,
    payment_method: "UPI (PhonePe)",
    payment_status: "Paid"
  },
  {
    id: "1075",
    order_number: "UPT-1075",
    date: "2026-09-06",
    status: "processing",
    order_type: "function_bulk",
    user_name: "Lakshmi Kalyana Mandapam (Ramesh)",
    user_email: "lakshmi.events@gmail.com",
    address: {
      name: "Lakshmi Kalyana Mandapam (Ramesh)",
      mobile: "9440123456",
      line1: "Bypass Road",
      city: "Sangareddy",
      state: "Telangana",
      pincode: "502001"
    },
    items: [
      { name: "M-30 Crystal Sugar (50 KG Bag)", qty: 3, price: 1980 },
      { name: "Premium Toor Dal (30 KG Sack)", qty: 1, price: 4150 },
      { name: "Freedom Sunflower Oil (15 L Tin)", qty: 2, price: 1840 }
    ],
    total: 13770,
    balance_due: 0,
    payment_method: "Bank Transfer",
    payment_status: "Paid"
  },
  {
    id: "1071",
    order_number: "UPT-1071",
    date: "2026-09-05",
    status: "shipped",
    order_type: "delivery",
    user_name: "Venkatesh Rao",
    user_email: "venkatesh.rao@yahoo.com",
    address: {
      name: "Venkatesh Rao",
      mobile: "9988776655",
      line1: "Flat 202, Sri Balaji Towers",
      city: "Sangareddy",
      state: "Telangana",
      pincode: "502001"
    },
    items: [
      { name: "Freedom Refined Sunflower Oil (1 L Pouch)", qty: 4, price: 135 },
      { name: "Chakki Fresh Wheat Atta (5 KG)", qty: 1, price: 235 },
      { name: "Tata Iodized Salt (1 KG)", qty: 2, price: 28 }
    ],
    total: 831,
    balance_due: 0,
    payment_method: "Cash on Delivery",
    payment_status: "Pending on Delivery"
  }
];

export { sampleProducts, sampleCategories };
