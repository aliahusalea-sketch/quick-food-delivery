export const CATEGORIES = [
  { id: 'all', name: 'Semua Menu', icon: '🍽️' },
  { id: 'indonesian', name: 'Indonesian', icon: '🇮🇩' },
  { id: 'western', name: 'Western', icon: '🍔' },
  { id: 'arabian', name: 'Arabian', icon: '🕌' },
];

export const PRODUCTS = [
  // Indonesian
  {
    id: 'indo-1',
    name: 'Nasi Goreng Spesial Telur Ceplok',
    category: 'indonesian',
    price: 28000,
    rating: 4.8,
    prepTime: '10-15 mnt',
    desc: 'Nasi goreng bumbu rempah nusantara dengan ayam suwir, bakso, dan telur ceplok.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=80',
    tag: 'Terlaris'
  },
  {
    id: 'indo-2',
    name: 'Sate Ayam Madura (10 Tusuk)',
    category: 'indonesian',
    price: 32000,
    rating: 4.9,
    prepTime: '15-20 mnt',
    desc: 'Daging ayam pilihan dibakar dengan bumbu kacang gurih khas Madura + lontong.',
    image: 'https://images.unsplash.com/photo-1529563064382-f56f8f10b719?auto=format&fit=crop&w=500&q=80',
    tag: 'Rekomendasi'
  },
  {
    id: 'indo-3',
    name: 'Rendang Sapi Daging Empuk',
    category: 'indonesian',
    price: 45000,
    rating: 5.0,
    prepTime: '10 mnt',
    desc: 'Daging sapi olahan santan dan 16 macam rempah khas Minang dimasak berjam-jam.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80',
    tag: 'Spesial'
  },
  // Western
  {
    id: 'west-1',
    name: 'Classic Double Beef Burger',
    category: 'western',
    price: 48000,
    rating: 4.7,
    prepTime: '12-15 mnt',
    desc: 'Patty daging sapi ganda, keju melt cheddar, saus spesial, dan kentang goreng.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    tag: 'Favorit'
  },
  {
    id: 'west-2',
    name: 'Creamy Carbonara Pasta',
    category: 'western',
    price: 42000,
    rating: 4.6,
    prepTime: '15 mnt',
    desc: 'Spaghetti saus krim susu gurih dengan smoked beef potongan tebal dan parmesan.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'west-3',
    name: 'Grilled Ribeye Steak 200g',
    category: 'western',
    price: 95000,
    rating: 4.9,
    prepTime: '20 mnt',
    desc: 'Daging Ribeye impor panggang medium dengan saus mushroom dan mashed potato.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=500&q=80',
    tag: 'Premium'
  },
  // Arabian
  {
    id: 'arab-1',
    name: 'Nasi Mandhi Ayam Biryani',
    category: 'arabian',
    price: 52000,
    rating: 4.9,
    prepTime: '15-20 mnt',
    desc: 'Nasi Basmati khas Timur Tengah dimasak rempah saffron dengan 1/4 ayam panggang.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80',
    tag: 'Laris'
  },
  {
    id: 'arab-2',
    name: 'Beef Shawarma Roll Jumbo',
    category: 'arabian',
    price: 38000,
    rating: 4.8,
    prepTime: '10 mnt',
    desc: 'Daging sapi rempah iris tipis dibungkus roti pita dengan saus garlic & acar.',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'arab-3',
    name: 'Hummus & Warm Pita Bread Set',
    category: 'arabian',
    price: 30000,
    rating: 4.5,
    prepTime: '8 mnt',
    desc: 'Dip saus kacang arab halus dengan minyak zaitun murni dan 2 roti pita hangat.',
    image: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=500&q=80'
  }
];