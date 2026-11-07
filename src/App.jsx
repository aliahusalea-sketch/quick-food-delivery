import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Clock, Star, Plus, Minus, Trash2, 
  MapPin, Settings, X, ChevronRight, Phone, Send, CheckCircle2,
  Smartphone, Tablet, Monitor
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from './data/product';

export default function App() {
  // Device Viewport Mode
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  // App States
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState({});
  const [adminPhone, setAdminPhone] = useState('6281410188073');
  
  // Modals & UI Controls
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Form Pembeli
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: 'Jl. Tanah Koja No. 61, Jakarta Barat',
    paymentMethod: 'Transfer Bank / E-Wallet',
    notes: ''
  });

  // Filtering Products
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch; 
  });

  // Cart Handlers
  const updateQuantity = (productId, delta) => {
    setCart(prev => {
      const currentQty = prev[productId] || 0;
      const newQty = currentQty + delta;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const getCartTotalItems = () => Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  
  const getCartSubtotal = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const product = PRODUCTS.find(p => p.id === id);
      return sum + (product ? product.price * qty : 0);
    }, 0);
  };

  const subtotal = getCartSubtotal();
  const deliveryFee = subtotal > 0 ? 10000 : 0;
  const grandTotal = subtotal + deliveryFee;

  // Format Currency
  const formatIDR = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  // Process WhatsApp Order
  const handleSendToWhatsApp = (e) => {
    e.preventDefault();
    if (!customerData.name || !customerData.phone || !customerData.address) {
      alert('Mohon lengkapi nama, nomor telepon, dan alamat pengiriman Anda.');
      return;
    }

    let itemsListText = '';
    Object.entries(cart).forEach(([id, qty], index) => {
      const p = PRODUCTS.find(prod => prod.id === id);
      if (p) {
        itemsListText += `${index + 1}. *${p.name}* (${qty}x) = ${formatIDR(p.price * qty)}\n`;
      }
    });

    const cleanAdminPhone = adminPhone.replace(/[^0-9]/g, '');

    const message = 
`🛍️ *PESANAN BARU - ASTRO FOOD EXPRESS*
---------------------------------------
👤 *Data Pemesan:*
• Nama: ${customerData.name}
• No. HP: ${customerData.phone}
• Alamat: ${customerData.address}

🍽️ *Rincian Pesanan:*
${itemsListText}
---------------------------------------
💵 Subtotal: ${formatIDR(subtotal)}
🛵 Ongkir: ${formatIDR(deliveryFee)}
💰 *TOTAL BAYAR: ${formatIDR(grandTotal)}*

💳 *Metode Pembayaran:* ${customerData.paymentMethod}
📝 *Catatan Tambahan:* ${customerData.notes || '-'}
---------------------------------------
_Mohon konfirmasi pesanan ini, terima kasih!_`;

    const encodedMsg = encodeURIComponent(message);
    const waUrl = `https://wa.me/${cleanAdminPhone}?text=${encodedMsg}`;
    
    window.open(waUrl, '_blank');
    
    setIsCheckoutOpen(false);
    setOrderSuccess(true);
    setCart({});
  };

  // Device Container Classes
  const getContainerClass = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-[390px] h-[820px] rounded-[40px] border-[12px] border-slate-800 shadow-2xl';
      case 'tablet':
        return 'w-[768px] h-[920px] rounded-[28px] border-[10px] border-slate-800 shadow-2xl';
      default:
        return 'w-full max-w-6xl rounded-2xl border border-slate-700 shadow-2xl min-h-[750px]';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-2 sm:p-6 flex flex-col items-center">
      {/* Top Controls: Switch View Mode */}
      <div className="mb-6 bg-slate-800/90 backdrop-blur border border-slate-700 p-2 rounded-xl flex items-center gap-2 text-white">
        <span className="text-xs font-semibold px-2 text-slate-400">Mode Layar:</span>
        <button 
          onClick={() => setDeviceMode('mobile')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${deviceMode === 'mobile' ? 'bg-astro-yellow text-slate-900 font-bold' : 'hover:bg-slate-700'}`}
        >
          <Smartphone size={14} /> Mobile
        </button>
        <button 
          onClick={() => setDeviceMode('tablet')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${deviceMode === 'tablet' ? 'bg-astro-yellow text-slate-900 font-bold' : 'hover:bg-slate-700'}`}
        >
          <Tablet size={14} /> Tablet
        </button>
        <button 
          onClick={() => setDeviceMode('desktop')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${deviceMode === 'desktop' ? 'bg-astro-yellow text-slate-900 font-bold' : 'hover:bg-slate-700'}`}
        >
          <Monitor size={14} /> Desktop
        </button>
      </div>

      {/* Main Container Simulation */}
      <div className={`bg-slate-50 overflow-hidden flex flex-col relative transition-all duration-300 ${getContainerClass()}`}>
        
        {/* APP HEADER */}
        <header className="bg-AUTENTHIC_CAFE-navy text-white px-4 py-3 shadow-md sticky top-0 z-20">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-astro-yellow text-slate-900 px-2 py-1 rounded-lg font-black text-sm tracking-wider">
                AUTHENTIC CAFE
              </div>
              <div className="text-xs">
                <p className="text-slate-400 text-[10px] uppercase font-bold">Kirim Ke</p>
                <div className="flex items-center font-medium gap-1 text-slate-100 cursor-pointer hover:underline">
                  <MapPin size={12} className="text-astro-yellow" />
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">Jl.Tanah Koja  No. 61</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 hover:bg-slate-800 rounded-full text-slate-300 transition"
                title="Pengaturan WA Pengelola"
              >
                <Settings size={18} />
              </button>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 bg-astro-navyLight hover:bg-slate-700 rounded-full text-white transition"
              >
                <ShoppingBag size={18} />
                {getCartTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-astro-yellow text-slate-900 font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-astro-navy">
                    {getCartTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-3 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari Nasi Goreng, Burger, Shawarma..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-astro-yellow"
            />
          </div>
        </header>

        {/* BODY CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-24">
          
          {/* Banner Promo Astro */}
          <div className="bg-gradient-to-r from-indigo-900 via-astro-navy to-slate-900 rounded-2xl p-4 text-white shadow-lg border border-slate-700 relative overflow-hidden">
            <span className="bg-astro-yellow text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-full mb-1 inline-block">
              ⚡ Jaminan 15 Menit Sampai
            </span>
            <h2 className="text-base font-extrabold">Pesan Makanan Favoritmu!</h2>
            <p className="text-xs text-slate-300 mt-1">Khusus pilihan terbaik: Indonesian, Western, & Arabian.</p>
          </div>

          {/* Category Filter Pills */}
          <div>
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Kategori Khusus</h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-astro-navy text-astro-yellow shadow-md scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-slate-800">Daftar Menu Makanan</h3>
              <span className="text-xs text-slate-500">{filteredProducts.length} Produk</span>
            </div>

            <div className={`grid gap-4 ${
              deviceMode === 'desktop' ? 'grid-cols-3' : deviceMode === 'tablet' ? 'grid-cols-2' : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => {
                const qty = cart[product.id] || 0;
                return (
                  <div key={product.id} className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                    <div>
                      <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-slate-100">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover" 
                        />
                        {product.tag && (
                          <span className="absolute top-2 left-2 bg-astro-yellow text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow">
                            {product.tag}
                          </span>
                        )}
                        <span className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Clock size={10} /> {product.prepTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
                        <Star size={12} fill="currentColor" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 capitalize font-normal">({product.category})</span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{product.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.desc}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {formatIDR(product.price)}
                      </span>

                      {qty === 0 ? (
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="bg-astro-navy hover:bg-slate-800 text-astro-yellow font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 transition"
                        >
                          <Plus size={14} /> Tambah
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="w-6 h-6 rounded-lg bg-white shadow flex items-center justify-center text-slate-800 hover:bg-slate-200"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-extrabold px-1">{qty}</span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="w-6 h-6 rounded-lg bg-astro-navy text-astro-yellow shadow flex items-center justify-center"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FLOATING CART BOTTOM BAR */}
        {getCartTotalItems() > 0 && (
          <div className="absolute bottom-4 left-4 right-4 bg-astro-navy text-white rounded-2xl p-3 shadow-2xl flex items-center justify-between border border-slate-700 z-30">
            <div className="flex items-center gap-3">
              <div className="bg-astro-yellow text-slate-900 font-extrabold p-2 rounded-xl text-xs">
                {getCartTotalItems()} Item
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Total Pesanan</p>
                <p className="text-sm font-extrabold text-white">{formatIDR(subtotal)}</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="bg-astro-yellow hover:bg-astro-yellowHover text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1 transition"
            >
              Lanjut Checkout <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* SETTINGS MODAL */}
        {isSettingsOpen && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-slate-900 text-base">Pengaturan WhatsApp Pengelola</h3>
                <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                Masukkan nomor WhatsApp tujuan penerima pesanan. (Contoh: 6281234567890).
              </p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nomor WhatsApp Toko</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-astro-navy"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-full bg-astro-navy text-white font-bold py-2.5 rounded-xl text-xs hover:bg-slate-800 transition"
                >
                  Simpan Nomor Pengelola
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CART DRAWER MODAL */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex justify-end z-50">
            <div className="bg-white w-full max-w-md h-full p-5 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <ShoppingBag size={18} /> Keranjang Belanja
                  </h3>
                  <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={18} />
                  </button>
                </div>

                <div className="divide-y divide-slate-100 max-h-[60vh] overflow-y-auto my-3">
                  {Object.keys(cart).length === 0 ? (
                    <p className="text-center text-xs text-slate-400 py-10">Keranjang belanja Anda masih kosong.</p>
                  ) : (
                    Object.entries(cart).map(([id, qty]) => {
                      const p = PRODUCTS.find(item => item.id === id);
                      if (!p) return null;
                      return (
                        <div key={id} className="py-3 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <h4 className="font-bold text-xs text-slate-900">{p.name}</h4>
                              <p className="text-xs text-slate-500">{formatIDR(p.price)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQuantity(id, -1)} className="p-1 rounded bg-slate-100"><Minus size={12} /></button>
                            <span className="text-xs font-bold">{qty}</span>
                            <button onClick={() => updateQuantity(id, 1)} className="p-1 rounded bg-astro-navy text-astro-yellow"><Plus size={12} /></button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {Object.keys(cart).length > 0 && (
                <div className="pt-4 border-t space-y-3">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold">{formatIDR(subtotal)}</span>
                  </div>
                  <button
                    onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                    className="w-full bg-astro-yellow text-slate-900 font-bold py-3 rounded-xl text-xs hover:bg-astro-yellowHover transition"
                  >
                    Lanjut Ke Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CHECKOUT & FORM WA MODAL */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 shadow-2xl">
              <div className="flex justify-between items-center pb-3 border-b mb-4">
                <h3 className="font-extrabold text-slate-900 text-base">Konfirmasi & Kirim Pesanan</h3>
                <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSendToWhatsApp} className="space-y-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between font-medium text-slate-600">
                    <span>Subtotal Produk</span>
                    <span>{formatIDR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-slate-600">
                    <span>Biaya Pengiriman Kilat</span>
                    <span>{formatIDR(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-slate-900 pt-2 border-t text-sm">
                    <span>Total Pembayaran</span>
                    <span className="text-emerald-600">{formatIDR(grandTotal)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase text-slate-500">Informasi Pengiriman</h4>
                  
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Nama Pemesan *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Masukkan nama Anda"
                      value={customerData.name}
                      onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-astro-navy"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">No. WhatsApp Pemesan *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="0812xxxxxxx"
                      value={customerData.phone}
                      onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-astro-navy"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Alamat Lengkap *</label>
                    <textarea 
                      required
                      rows={2}
                      value={customerData.address}
                      onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-astro-navy"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Catatan Tambahan (Opsional)</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Sambal dipisah, jangan pedas"
                      value={customerData.notes}
                      onChange={(e) => setCustomerData({...customerData, notes: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-astro-navy"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <Send size={16} /> Kirim Pesanan via WhatsApp
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ORDER SUCCESS MODAL */}
        {orderSuccess && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-3 shadow-2xl">
              <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
              <h3 className="font-extrabold text-slate-900 text-lg">Pesanan Terkirim!</h3>
              <p className="text-xs text-slate-600">
                Aplikasi WhatsApp telah dibuka. Silakan tekan tombol kirim pesan di WhatsApp untuk menyelesaikan pesanan Anda.
              </p>
              <button
                onClick={() => setOrderSuccess(false)}
                className="w-full bg-astro-navy text-astro-yellow font-bold py-2.5 rounded-xl text-xs hover:bg-slate-800 transition"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}