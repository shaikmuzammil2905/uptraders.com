// UP TRADERS DEMO PRODUCT CATALOGUE
// All values are initial sample/demo values for UI rendering and testing.
// Full management (add/edit/delete/prices/stock/variants) is enabled via Admin.

export const products = [
  // ─── RICE ─────────────────────────────────────────────────────────────
  {
    id: 'rice-1',
    name: 'Premium Basmati Rice',
    brand: 'UP Selection',
    category: 'Rice',
    description: 'Aged long-grain royal Basmati rice with exquisite aroma. Ideal for Biryani, Pulao, and festive meals.',
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    is_bestseller: true,
    is_festive: true,
    variants: [
      {
        color: 'Classic White',
        images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '1 KG', mrp: 160, our_price: 135, stock: 50, code: 'RICE-BAS-1KG' },
          { size: '5 KG', mrp: 780, our_price: 649, stock: 35, code: 'RICE-BAS-5KG' },
          { size: '10 KG', mrp: 1520, our_price: 1260, stock: 20, code: 'RICE-BAS-10KG' },
          { size: '25 KG', mrp: 3700, our_price: 3100, stock: 15, code: 'RICE-BAS-25KG' }
        ]
      }
    ]
  },
  {
    id: 'rice-2',
    name: 'Sona Masoori Rice (Aged)',
    brand: 'UP Selection',
    category: 'Rice',
    description: 'Lightweight, aromatic, and premium aged Sona Masoori rice. Ideal for daily lunch and dinner.',
    image_url: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    is_bestseller: true,
    variants: [
      {
        color: 'Standard',
        images: ['https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '1 KG', mrp: 70, our_price: 58, stock: 100, code: 'RICE-SONA-1KG' },
          { size: '5 KG', mrp: 340, our_price: 285, stock: 60, code: 'RICE-SONA-5KG' },
          { size: '10 KG', mrp: 670, our_price: 560, stock: 40, code: 'RICE-SONA-10KG' },
          { size: '25 KG (Bag)', mrp: 1625, our_price: 1375, stock: 50, code: 'RICE-SONA-25KG' }
        ]
      }
    ]
  },
  {
    id: 'rice-3',
    name: 'Raw Rice (Sona Raw)',
    brand: 'UP Selection',
    category: 'Rice',
    description: 'High quality raw rice for traditional meals, temple offerings, and pooja preparations.',
    image_url: 'https://images.unsplash.com/photo-1568271677068-5915e8b7ec99?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Standard',
        images: ['https://images.unsplash.com/photo-1568271677068-5915e8b7ec99?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '1 KG', mrp: 65, our_price: 54, stock: 40, code: 'RICE-RAW-1KG' },
          { size: '5 KG', mrp: 320, our_price: 265, stock: 30, code: 'RICE-RAW-5KG' },
          { size: '25 KG', mrp: 1550, our_price: 1290, stock: 25, code: 'RICE-RAW-25KG' }
        ]
      }
    ]
  },
  {
    id: 'rice-4',
    name: 'Idli Rice (Special Dosa/Idli Grain)',
    brand: 'UP Selection',
    category: 'Rice',
    description: 'Short, plump short grains for soft fluffy idlis and crisp golden dosas.',
    image_url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Standard',
        images: ['https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '1 KG', mrp: 60, our_price: 50, stock: 50, code: 'RICE-IDLI-1KG' },
          { size: '5 KG', mrp: 290, our_price: 240, stock: 30, code: 'RICE-IDLI-5KG' }
        ]
      }
    ]
  },

  // ─── COOKING OIL ──────────────────────────────────────────────────────
  {
    id: 'oil-1',
    name: 'Refined Sunflower Cooking Oil',
    brand: 'Sun Choice',
    category: 'Cooking Oil',
    description: 'Light, clear, vitamin-enriched refined sunflower oil for everyday healthy frying and cooking.',
    image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    is_bestseller: true,
    variants: [
      {
        color: 'Standard',
        images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '1 L Pouch', mrp: 150, our_price: 128, stock: 80, code: 'OIL-SUN-1L' },
          { size: '2 L Jar', mrp: 310, our_price: 260, stock: 40, code: 'OIL-SUN-2L' },
          { size: '5 L Can', mrp: 760, our_price: 635, stock: 30, code: 'OIL-SUN-5L' },
          { size: '15 L Tin (Bulk)', mrp: 2200, our_price: 1850, stock: 15, code: 'OIL-SUN-15L' }
        ]
      }
    ]
  },
  {
    id: 'oil-2',
    name: 'Pure Groundnut Oil (Cold Pressed / Filtered)',
    brand: 'Traditional Press',
    category: 'Cooking Oil',
    description: 'Rich nutty aroma groundnut oil for authentic Indian curries, snacks, and deep frying.',
    image_url: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    variants: [
      {
        color: 'Standard',
        images: ['https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '1 L', mrp: 210, our_price: 180, stock: 60, code: 'OIL-GNUT-1L' },
          { size: '5 L Can', mrp: 1020, our_price: 880, stock: 25, code: 'OIL-GNUT-5L' }
        ]
      }
    ]
  },
  {
    id: 'oil-3',
    name: 'Physically Refined Rice Bran Oil',
    brand: 'Heart Care',
    category: 'Cooking Oil',
    description: 'High smoke point cooking oil with natural Oryzanol for heart-healthy cooking.',
    image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Standard',
        images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '1 L Pouch', mrp: 160, our_price: 135, stock: 45, code: 'OIL-RBRAN-1L' },
          { size: '5 L Jar', mrp: 790, our_price: 660, stock: 20, code: 'OIL-RBRAN-5L' }
        ]
      }
    ]
  },
  {
    id: 'oil-4',
    name: 'Pure Mustard Oil (Kachi Ghani)',
    brand: 'Kisan Gold',
    category: 'Cooking Oil',
    description: 'Strong, pungent and pure cold pressed mustard oil for pickles and aromatic gravies.',
    image_url: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Standard',
        images: ['https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '1 L Bottle', mrp: 180, our_price: 155, stock: 40, code: 'OIL-MUST-1L' }
        ]
      }
    ]
  },

  // ─── GHEE ─────────────────────────────────────────────────────────────
  {
    id: 'ghee-1',
    name: 'Pure Desi Cow Ghee (Danedar)',
    brand: 'UP Dairy Pure',
    category: 'Ghee',
    description: 'Traditional golden granulated cow ghee made from fresh cream. Rich aroma and authentic taste.',
    image_url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    is_bestseller: true,
    is_festive: true,
    variants: [
      {
        color: 'Golden',
        images: ['https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '200 ML Jar', mrp: 160, our_price: 140, stock: 40, code: 'GHEE-COW-200ML' },
          { size: '500 ML Jar', mrp: 380, our_price: 330, stock: 50, code: 'GHEE-COW-500ML' },
          { size: '1 L Tin', mrp: 740, our_price: 640, stock: 35, code: 'GHEE-COW-1L' },
          { size: '5 L Jar (Bulk)', mrp: 3600, our_price: 3100, stock: 10, code: 'GHEE-COW-5L' }
        ]
      }
    ]
  },
  {
    id: 'ghee-2',
    name: 'A2 Vedic Bilona Desi Ghee',
    brand: 'Vedic Gold',
    category: 'Ghee',
    description: 'Bilona churned A2 cultured ghee rich in nutrients, aroma and therapeutic benefits.',
    image_url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Golden',
        images: ['https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '500 ML Glass Jar', mrp: 850, our_price: 750, stock: 20, code: 'GHEE-A2-500ML' },
          { size: '1 L Glass Jar', mrp: 1650, our_price: 1450, stock: 15, code: 'GHEE-A2-1L' }
        ]
      }
    ]
  },

  // ─── PULSES & DAL ─────────────────────────────────────────────────────
  {
    id: 'dal-1',
    name: 'Unpolished Toor Dal (Pigeon Pea)',
    brand: 'Farm Fresh',
    category: 'Pulses & Dal',
    description: 'High protein unpolished premium toor dal for daily rich sambar, dal tadka and rasam.',
    image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    is_bestseller: true,
    variants: [
      {
        color: 'Yellow',
        images: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '500 G', mrp: 95, our_price: 82, stock: 80, code: 'DAL-TOOR-500G' },
          { size: '1 KG', mrp: 185, our_price: 160, stock: 65, code: 'DAL-TOOR-1KG' },
          { size: '2 KG', mrp: 360, our_price: 310, stock: 30, code: 'DAL-TOOR-2KG' },
          { size: '5 KG (Bulk Pack)', mrp: 890, our_price: 760, stock: 20, code: 'DAL-TOOR-5KG' }
        ]
      }
    ]
  },
  {
    id: 'dal-2',
    name: 'Yellow Moong Dal (Split)',
    brand: 'Farm Fresh',
    category: 'Pulses & Dal',
    description: 'Easy-to-digest yellow split moong dal, perfect for khichdi, dal fry, and pongal.',
    image_url: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Yellow',
        images: ['https://images.unsplash.com/photo-1585994192701-f1a505c817ea?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '500 G', mrp: 75, our_price: 64, stock: 70, code: 'DAL-MOONG-500G' },
          { size: '1 KG', mrp: 145, our_price: 125, stock: 50, code: 'DAL-MOONG-1KG' }
        ]
      }
    ]
  },
  {
    id: 'dal-3',
    name: 'Premium Urad Gota (Whole White)',
    brand: 'Farm Fresh',
    category: 'Pulses & Dal',
    description: 'Top-grade whole urad dal for batter fermentation, crispy vadas, and soft idlis.',
    image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'White',
        images: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '500 G', mrp: 90, our_price: 78, stock: 60, code: 'DAL-URAD-500G' },
          { size: '1 KG', mrp: 175, our_price: 152, stock: 45, code: 'DAL-URAD-1KG' }
        ]
      }
    ]
  },
  {
    id: 'dal-4',
    name: 'Chana Dal (Bengal Gram Split)',
    brand: 'Farm Fresh',
    category: 'Pulses & Dal',
    description: 'Sweet, nutty and clean chana dal for snacks, tadka, dal fry, and puran poli.',
    image_url: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Yellow',
        images: ['https://images.unsplash.com/photo-1585994192701-f1a505c817ea?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '500 G', mrp: 60, our_price: 52, stock: 60, code: 'DAL-CHANA-500G' },
          { size: '1 KG', mrp: 115, our_price: 98, stock: 40, code: 'DAL-CHANA-1KG' }
        ]
      }
    ]
  },
  {
    id: 'dal-5',
    name: 'Kabuli Chana (Big White Chickpeas)',
    brand: 'UP Selection',
    category: 'Pulses & Dal',
    description: 'Jumbo size clean white chickpeas for Chole Masala and healthy protein salads.',
    image_url: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Standard',
        images: ['https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '500 G', mrp: 85, our_price: 74, stock: 50, code: 'PULSE-KABULI-500G' },
          { size: '1 KG', mrp: 165, our_price: 142, stock: 35, code: 'PULSE-KABULI-1KG' }
        ]
      }
    ]
  },

  // ─── GRAINS & MILLETS ─────────────────────────────────────────────────
  {
    id: 'grain-1',
    name: 'Sharbati Whole Wheat Grains',
    brand: 'UP Selection',
    category: 'Grains',
    description: 'Golden heavy Sharbati wheat grains from Madhya Pradesh. Cleaned and ready for home flour milling.',
    image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Golden',
        images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '1 KG', mrp: 48, our_price: 40, stock: 60, code: 'GRAIN-WHT-1KG' },
          { size: '5 KG', mrp: 230, our_price: 195, stock: 40, code: 'GRAIN-WHT-5KG' },
          { size: '25 KG (Bag)', mrp: 1100, our_price: 940, stock: 25, code: 'GRAIN-WHT-25KG' }
        ]
      }
    ]
  },
  {
    id: 'grain-2',
    name: 'Organic Ragi (Finger Millet)',
    brand: 'Millet Pure',
    category: 'Grains',
    description: 'Calcium-rich whole ragi grains for porridge, malt, ragi mudde, and nutritious flour.',
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Brown',
        images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '500 G', mrp: 40, our_price: 34, stock: 50, code: 'GRAIN-RAGI-500G' },
          { size: '1 KG', mrp: 75, our_price: 64, stock: 40, code: 'GRAIN-RAGI-1KG' }
        ]
      }
    ]
  },

  // ─── SUGAR & SALT ─────────────────────────────────────────────────────
  {
    id: 'sugar-1',
    name: 'Refined White Crystal Sugar',
    brand: 'Madhur / UP Selection',
    category: 'Sugar',
    description: 'Sulphur-free, clean, sparkling crystal white sugar for tea, sweets, and everyday baking.',
    image_url: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    is_bestseller: true,
    variants: [
      {
        color: 'White',
        images: ['https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '1 KG', mrp: 52, our_price: 44, stock: 120, code: 'SUGAR-WHT-1KG' },
          { size: '5 KG', mrp: 250, our_price: 215, stock: 70, code: 'SUGAR-WHT-5KG' },
          { size: '25 KG (Bag)', mrp: 1220, our_price: 1040, stock: 30, code: 'SUGAR-WHT-25KG' }
        ]
      }
    ]
  },
  {
    id: 'sugar-2',
    name: 'Pure Organic Jaggery Blocks (Bellam)',
    brand: 'Nature Pure',
    category: 'Sugar',
    description: 'Chemical-free natural sugarcane jaggery for traditional sweets, payasam, and everyday tea.',
    image_url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Golden Brown',
        images: ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '500 G', mrp: 50, our_price: 42, stock: 60, code: 'JAGGERY-500G' },
          { size: '1 KG', mrp: 95, our_price: 80, stock: 50, code: 'JAGGERY-1KG' }
        ]
      }
    ]
  },
  {
    id: 'salt-1',
    name: 'Iodized Crystal & Table Salt',
    brand: 'Tata / UP Selection',
    category: 'Salt',
    description: 'Vacuum evaporated iodized table salt with essential minerals for daily health.',
    image_url: 'https://images.unsplash.com/photo-1626197031507-c17099753214?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'White',
        images: ['https://images.unsplash.com/photo-1626197031507-c17099753214?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '1 KG Packet', mrp: 28, our_price: 24, stock: 150, code: 'SALT-IOD-1KG' }
        ]
      }
    ]
  },

  // ─── SPICES & MASALA ──────────────────────────────────────────────────
  {
    id: 'spice-1',
    name: 'Pure Salem Turmeric Powder (Haldi)',
    brand: 'UP Spices',
    category: 'Spices & Masala',
    description: 'High curcumin bright golden turmeric powder. 100% pure without artificial colors or preservatives.',
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    is_bestseller: true,
    variants: [
      {
        color: 'Yellow',
        images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '200 G', mrp: 55, our_price: 46, stock: 80, code: 'SPICE-TURM-200G' },
          { size: '500 G', mrp: 130, our_price: 110, stock: 60, code: 'SPICE-TURM-500G' },
          { size: '1 KG', mrp: 250, our_price: 210, stock: 40, code: 'SPICE-TURM-1KG' }
        ]
      }
    ]
  },
  {
    id: 'spice-2',
    name: 'Guntur Red Chilli Powder (Mirchi Powder)',
    brand: 'UP Spices',
    category: 'Spices & Masala',
    description: 'Authentic fiery red chilli powder with rich color and pungent heat for spicy curries.',
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    variants: [
      {
        color: 'Red',
        images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '200 G', mrp: 70, our_price: 58, stock: 90, code: 'SPICE-CHILLI-200G' },
          { size: '500 G', mrp: 165, our_price: 140, stock: 70, code: 'SPICE-CHILLI-500G' },
          { size: '1 KG', mrp: 320, our_price: 270, stock: 50, code: 'SPICE-CHILLI-1KG' }
        ]
      }
    ]
  },
  {
    id: 'spice-3',
    name: 'Royal Garam Masala Blend',
    brand: 'UP Spices',
    category: 'Spices & Masala',
    description: 'Aromatic roasted whole spice blend with cardamom, cloves, cinnamon, and mace for rich curries.',
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Standard',
        images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '100 G', mrp: 65, our_price: 54, stock: 60, code: 'SPICE-GARAM-100G' },
          { size: '250 G', mrp: 155, our_price: 130, stock: 40, code: 'SPICE-GARAM-250G' }
        ]
      }
    ]
  },
  {
    id: 'spice-4',
    name: 'Special Biryani Masala',
    brand: 'UP Spices',
    category: 'Spices & Masala',
    description: 'Authentic Hyderabadi biryani masala with shahi jeera, star anise, and whole aromatics.',
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    is_festive: true,
    variants: [
      {
        color: 'Standard',
        images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '100 G', mrp: 75, our_price: 62, stock: 50, code: 'SPICE-BIRYANI-100G' }
        ]
      }
    ]
  },

  // ─── ATTA & FLOUR ─────────────────────────────────────────────────────
  {
    id: 'atta-1',
    name: 'Chakki Fresh 100% Whole Wheat Atta',
    brand: 'Aashirvaad / UP Selection',
    category: 'Atta & Flour',
    description: 'Traditional stone-ground whole wheat flour with dietary fiber for soft, fluffy rotis.',
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    is_bestseller: true,
    variants: [
      {
        color: 'Natural',
        images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '1 KG', mrp: 60, our_price: 52, stock: 100, code: 'ATTA-WHT-1KG' },
          { size: '5 KG Bag', mrp: 290, our_price: 245, stock: 80, code: 'ATTA-WHT-5KG' },
          { size: '10 KG Bag', mrp: 560, our_price: 475, stock: 50, code: 'ATTA-WHT-10KG' }
        ]
      }
    ]
  },
  {
    id: 'atta-2',
    name: 'Pure Besan (Gram Flour)',
    brand: 'UP Selection',
    category: 'Atta & Flour',
    description: 'Fine ground pure chana dal flour for crispy pakoras, sweets, and snacks.',
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Yellow',
        images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '500 G', mrp: 60, our_price: 50, stock: 70, code: 'FLOUR-BESAN-500G' },
          { size: '1 KG', mrp: 115, our_price: 96, stock: 50, code: 'FLOUR-BESAN-1KG' }
        ]
      }
    ]
  },

  // ─── DRY FRUITS & NUTS ────────────────────────────────────────────────
  {
    id: 'dryfruit-1',
    name: 'California Almonds (Badam Giri)',
    brand: 'Royal Nuts',
    category: 'Dry Fruits & Nuts',
    description: 'Crunchy, sweet, premium California almonds packed with protein, Vitamin E and healthy fats.',
    image_url: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    is_festive: true,
    variants: [
      {
        color: 'Standard',
        images: ['https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '250 G', mrp: 280, our_price: 235, stock: 50, code: 'DRY-ALM-250G' },
          { size: '500 G', mrp: 540, our_price: 450, stock: 35, code: 'DRY-ALM-500G' },
          { size: '1 KG Value Pack', mrp: 1050, our_price: 880, stock: 20, code: 'DRY-ALM-1KG' }
        ]
      }
    ]
  },
  {
    id: 'dryfruit-2',
    name: 'Whole Cashew Nuts (W320 Kaju)',
    brand: 'Royal Nuts',
    category: 'Dry Fruits & Nuts',
    description: 'Crisp, creamy whole white cashew nuts for curries, sweets, and healthy snacking.',
    image_url: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    variants: [
      {
        color: 'White',
        images: ['https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '250 G', mrp: 310, our_price: 260, stock: 45, code: 'DRY-KAJU-250G' },
          { size: '500 G', mrp: 590, our_price: 499, stock: 30, code: 'DRY-KAJU-500G' }
        ]
      }
    ]
  },

  // ─── TEA & COFFEE ─────────────────────────────────────────────────────
  {
    id: 'tea-1',
    name: 'Premium CTC Assam Leaf Tea',
    brand: 'Taj / Red Label / UP Selection',
    category: 'Tea & Coffee',
    description: 'Strong, aromatic CTC blend offering deep liquor and refreshing kadak chai flavour.',
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    is_bestseller: true,
    variants: [
      {
        color: 'Standard',
        images: ['https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '250 G', mrp: 140, our_price: 120, stock: 80, code: 'TEA-CTC-250G' },
          { size: '500 G', mrp: 270, our_price: 230, stock: 60, code: 'TEA-CTC-500G' },
          { size: '1 KG', mrp: 520, our_price: 440, stock: 30, code: 'TEA-CTC-1KG' }
        ]
      }
    ]
  },

  // ─── SNACKS & FMCG ────────────────────────────────────────────────────
  {
    id: 'snack-1',
    name: 'Classic Salted Potato Chips',
    brand: 'Crunch Corner',
    category: 'Snacks',
    description: 'Crispy wafer-thin potato chips seasoned with sea salt. Perfect tea-time snack.',
    image_url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80',
    is_trending: true,
    variants: [
      {
        color: 'Yellow',
        images: ['https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '100 G', mrp: 35, our_price: 30, stock: 100, code: 'SNACK-CHIPS-100G' },
          { size: '250 G Family Pack', mrp: 85, our_price: 72, stock: 60, code: 'SNACK-CHIPS-250G' }
        ]
      }
    ]
  },
  {
    id: 'fmcg-1',
    name: 'All-Purpose Floor Cleaner Liquid (Citrus/Pine)',
    brand: 'Clean Pro',
    category: 'Home Care',
    description: '99.9% germ-kill disinfectant floor cleaner leaves a fresh pleasant fragrance.',
    image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Citrus',
        images: ['https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '500 ML', mrp: 99, our_price: 85, stock: 60, code: 'HC-FLOOR-500ML' },
          { size: '1 L', mrp: 180, our_price: 150, stock: 50, code: 'HC-FLOOR-1L' },
          { size: '5 L Can', mrp: 750, our_price: 620, stock: 20, code: 'HC-FLOOR-5L' }
        ]
      }
    ]
  },
  {
    id: 'fmcg-2',
    name: 'Dishwash Gel with Lemon Active',
    brand: 'Shine Sparkle',
    category: 'Cleaning Products',
    description: 'Tough on grease, gentle on hands. Leaves utensils sparkling clean.',
    image_url: 'https://images.unsplash.com/photo-1584820927498-cafe3c0b1bb6?w=600&auto=format&fit=crop&q=80',
    variants: [
      {
        color: 'Lemon Green',
        images: ['https://images.unsplash.com/photo-1584820927498-cafe3c0b1bb6?w=600&auto=format&fit=crop&q=80'],
        sizes: [
          { size: '500 ML Bottle', mrp: 115, our_price: 98, stock: 70, code: 'CLEAN-DISH-500ML' },
          { size: '2 L Refill Pack', mrp: 380, our_price: 320, stock: 35, code: 'CLEAN-DISH-2L' }
        ]
      }
    ]
  }
];
