// UP TRADERS DEMO CREDENTIALS & USER DATA

export const DEMO_CREDENTIALS = {
  customer: {
    email: 'demo@uptraders.com',
    password: 'Demo@123',
    name: 'Customer Demo',
    role: 'customer'
  },
  shopkeeper: {
    email: 'shopkeeper@uptraders.com',
    password: 'Shopkeeper@123',
    name: 'Sri Sai Kirana Mart (Praveen)',
    role: 'shopkeeper',
    businessName: 'Sri Sai Kirana Mart',
    gstin: '36ABCDE1234F1Z5',
    phone: '8886000847',
    location: 'Malkapur X Road, Sangareddy'
  },
  admin: {
    email: 'admin@uptraders.com',
    password: 'Admin@123',
    name: 'U Praveen Kumar (Admin)',
    role: 'admin'
  },
  // Backward compatibility
  email: 'demo@uptraders.com',
  password: 'Demo@123'
};

export const demoUser = {
  id: 'usr_demo_001',
  name: 'Customer Demo',
  email: 'demo@uptraders.com',
  phone: '+91 88860 00847',
  avatar: null,
  verified: true,
  memberSince: 'March 2024',
  kycStatus: 'Verified',
  accountType: 'Individual Trader / Retail',
  role: 'customer',
  balance: {
    inr: 250000.00,
    locked: 18500.00,
    available: 231500.00,
  },
  address: {
    street: '10-34 Malkapur X Road',
    city: 'Sangareddy',
    state: 'Telangana',
    pincode: '502001',
    country: 'India',
  },
};

export const demoShopkeeperOrders = [
  {
    id: 'SK-ORD-1082',
    orderNumber: 'SK-ORD-1082',
    date: '2026-09-08',
    deliveredDate: '2026-09-09',
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    items: [
      { name: 'Sona Masoori Rice (25 KG Bag)', unit: '25kg Bag', price: 1250, quantity: 10 },
      { name: 'Refined Sunflower Cooking Oil (15 L Tin)', unit: '15L Tin', price: 1720, quantity: 4 },
      { name: 'Pure Desi Cow Ghee (5 L Jar)', unit: '5L Jar', price: 2850, quantity: 2 },
      { name: 'Unpolished Toor Dal (5 KG Pack)', unit: '5kg Pack', price: 690, quantity: 6 }
    ],
    totalAmount: 29220,
    shippingAddress: 'Sri Sai Kirana Mart, Shop #4, Market Yard, Sangareddy – 502001'
  },
  {
    id: 'SK-ORD-1045',
    orderNumber: 'SK-ORD-1045',
    date: '2026-08-28',
    deliveredDate: '2026-08-29',
    status: 'Delivered',
    paymentMethod: 'Bank Transfer (NEFT)',
    items: [
      { name: 'Refined White Crystal Sugar (25 KG Bag)', unit: '25kg Bag', price: 980, quantity: 8 },
      { name: 'Chakki Fresh Wheat Atta (10 KG Bag)', unit: '10kg Bag', price: 420, quantity: 12 },
      { name: 'Pure Salem Turmeric Powder (1 KG)', unit: '1kg Pouch', price: 190, quantity: 15 },
      { name: 'Guntur Red Chilli Powder (1 KG)', unit: '1kg Pouch', price: 245, quantity: 10 }
    ],
    totalAmount: 18180,
    shippingAddress: 'Sri Sai Kirana Mart, Shop #4, Market Yard, Sangareddy – 502001'
  },
  {
    id: 'SK-ORD-0992',
    orderNumber: 'SK-ORD-0992',
    date: '2026-08-14',
    deliveredDate: '2026-08-15',
    status: 'Delivered',
    paymentMethod: 'UPI / PhonePe',
    items: [
      { name: 'Premium Basmati Rice (25 KG Bag)', unit: '25kg Bag', price: 2800, quantity: 5 },
      { name: 'Pure Desi Cow Ghee (1 L Tin)', unit: '1L Tin', price: 580, quantity: 20 },
      { name: 'California Almonds (1 KG Pack)', unit: '1kg Pack', price: 820, quantity: 5 }
    ],
    totalAmount: 29700,
    shippingAddress: 'Sri Sai Kirana Mart, Shop #4, Market Yard, Sangareddy – 502001'
  }
];
