import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, MessageCircle, ShieldCheck, MapPin, Sparkles, 
  Clock, ArrowRight, Search, Heart, Eye, Check, AlertCircle, Phone, ShoppingBag, X
} from "lucide-react";

import { 
  CAKE_PRODUCTS, TESTIMONIALS, GALLERY_ITEMS, FAQS, 
  BRAND_PHONE, BRAND_LOCATION, BRAND_HOURS, BRAND_EMAIL 
} from "./data";
import { CakeProduct, CartItem } from "./types";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import ProductModal from "./components/ProductModal";
import CustomOrderForm from "./components/CustomOrderForm";
import Footer from "./components/Footer";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CakeProduct | null>(null);
  
  // Catalog parameters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState("all");
  const [sortOption, setSortOption] = useState("featured");

  // Gallery zoom parameter
  const [zoomedImage, setZoomedImage] = useState<{ id: string; title: string; image: string; desc: string } | null>(null);

  // Active testimonial index
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", email: "", occasion: "wedding", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 14, minutes: 42, seconds: 19 }; // Reset to loop next cycle
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.product.id === newItem.product.id && 
        item.selectedFlavor === newItem.selectedFlavor && 
        item.selectedSize.label === newItem.selectedSize.label
      );
      if (existing) {
        return prev.map(item => 
          item.cartId === existing.cartId 
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.cartId === cartId 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
        : item
    ));
  };

  const handleUpdateInscription = (cartId: string, text: string) => {
    setCart(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, inscription: text } : item
    ));
  };

  const handleUpdateCustomRequests = (cartId: string, text: string) => {
    setCart(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, customRequests: text } : item
    ));
  };

  const handleRemoveItem = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  // Filter & sort catalog items
  const filteredProducts = CAKE_PRODUCTS.filter(prod => {
    const matchesCategory = selectedCategory === "all" || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price;
    if (sortOption === "price-high") return b.price - a.price;
    // Featured default
    return b.rating - a.rating;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name) return;
    
    // Auto compile WhatsApp for contact
    const msg = `Hi *NDIPHODZO CAKES*! 📬✨\n\n` +
                `I just submitted the contact form on your luxury website:\n` +
                `👤 *Name:* ${contactForm.name}\n` +
                `📧 *Email:* ${contactForm.email || "Not specified"}\n` +
                `🎈 *Occasion:* ${contactForm.occasion}\n` +
                `📝 *Inquiry details:* "${contactForm.message}"\n\n` +
                `Can you please contact me back? Thank you! 💕`;
                
    const url = `https://wa.me/27768251182?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "referrer");
    
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: "", email: "", occasion: "wedding", message: "" });
    }, 2500);
  };

  return (
    <div className="bg-brand-cream min-h-screen font-sans flex flex-col justify-between selection:bg-brand-rosegold selection:text-white pb-14 sm:pb-0" id="applet-body">
      
      {/* Navigation Layer */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Areas with smooth page transition */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {/* 1. HOME VIEW */}
            {activePage === "home" && (
              <div className="space-y-20 pb-16">
                
                {/* Embedded Cinematic Hero Banner */}
                <section className="relative overflow-hidden bg-brand-choc-light text-white py-24 sm:py-32 px-4 shadow-inner" id="hero-section">
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=1400" 
                      alt="Luxury Wedding Cake Background" 
                      className="w-full h-full object-cover opacity-25 object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-choc via-brand-choc-light/85 to-transparent" />
                  </div>

                  <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-left">
                      <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/30 text-brand-gold px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest leading-none">
                        <Sparkles className="h-3 w-3 animate-spin" />
                        <span>Dopeni's Finest Master Baker</span>
                      </div>
                      
                      <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1] capitalize">
                        Made With Love, <br />
                        <span className="gold-gradient-text font-serif">Designed To Impress.</span>
                      </h1>
                      
                      <p className="text-sm sm:text-lg text-brand-pink/85 font-light leading-relaxed max-w-lg">
                        We celebrate your sweetest chapters with bespoke birthday cakes, majestic wedding masterpieces, divine cupcakes, and pristine treats crafted in the warm heart of Dopeni, Venda.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          onClick={() => setActivePage("cakes")}
                          className="bg-brand-gold hover:bg-white text-brand-choc font-bold text-xs tracking-wider uppercase px-7 py-4 rounded-xl transition-all shadow-md hover:-translate-y-0.5"
                          id="hero-view-cakes-btn"
                        >
                          Explore Cakes Catalog
                        </button>
                        <button
                          onClick={() => setActivePage("custom")}
                          className="bg-brand-pink/15 hover:bg-brand-pink/25 border border-brand-pink/35 text-white font-bold text-xs tracking-wider uppercase px-7 py-4 rounded-xl transition-all shadow-md"
                          id="hero-builder-btn"
                        >
                          Build Custom Cake
                        </button>
                      </div>
                    </div>

                    {/* Showpiece Cake Frame */}
                    <div className="hidden lg:block relative justify-self-center">
                      <div className="w-[380px] h-[380px] rounded-full overflow-hidden border-4 border-brand-gold/85 shadow-2xl relative group">
                        <img 
                          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800" 
                          alt="Signature Gold Crown Cake" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-brand-choc/80 backdrop-blur-sm p-5 text-center text-xs">
                          <p className="font-serif font-bold text-brand-gold uppercase text-sm tracking-wide">Signature Rose Crown Cake</p>
                          <p className="text-[10px] text-brand-pink/75 mt-0.5">Classic design starting at R850.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. TRUST SECTION */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                    {[
                      { title: "Pure Ingredients", desc: "No cheap artificial substitutions. 100% farm fresh butter and real vanilla bean seeds." },
                      { title: "Bespoke Finishing", desc: "Pinterest reference model? Handcrafted to precise detailed specifications." },
                      { title: "Venda Deliveries", desc: "Secure direct-delivery transit so your tiered grand cake arriving perfectly chilled." },
                      { title: "Easy WhatsApp Chat", desc: "Seamless instant assistance. No rigid checkouts, flexible friendly communication." }
                    ].map((card, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white rounded-2xl p-5 border border-brand-pink-dark/10 luxury-card-shadow hover:luxury-card-shadow-hover transition-all text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-brand-rosegold font-bold text-sm font-mono mb-4">
                          0{idx+1}
                        </div>
                        <h3 className="font-serif text-base font-bold text-brand-choc mb-1.5">{card.title}</h3>
                        <p className="text-xs text-brand-choc/60 leading-relaxed font-light">{card.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. countdown urgency & special offer banner */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="rounded-3xl bg-brand-choc text-white overflow-hidden p-8 sm:p-12 relative flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF6F0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                    <div className="space-y-4 max-w-xl text-left relative z-10">
                      <span className="bg-brand-gold text-brand-choc text-[10px] font-bold tracking-widest uppercase px-3.5 py-1 rounded-full shadow">
                        Limited Slots Left - Weekend Special
                      </span>
                      <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white capitalize">
                        Early Reservation Birthday Gift Special!
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-pink/85 leading-relaxed font-light">
                        Book any custom birthday or anniversary cake valued over R750 this week and receive <strong className="text-brand-gold text-sm">6 complimentary Gourmet Vanilla Cupcakes</strong> for your table! Use coupon code <strong>NDIPHODZO-VIP</strong> over WhatsApp booking.
                      </p>

                      {/* Timer Display */}
                      <div className="flex gap-3 text-center pt-2 select-none">
                        {[
                          { val: timeLeft.hours, lbl: "HOURS" },
                          { val: timeLeft.minutes, lbl: "MINS" },
                          { val: timeLeft.seconds, lbl: "SECS" }
                        ].map((t, idx) => (
                          <div key={idx} className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 min-w-[70px]">
                            <p className="font-mono text-xl sm:text-2xl font-bold text-brand-gold tracking-tighter">
                              {t.val.toString().padStart(2, '0')}
                            </p>
                            <p className="text-[9px] uppercase tracking-wider text-brand-pink/65 mt-0.5">{t.lbl}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0 relative z-10 w-full md:w-auto">
                      <a
                        href={`https://wa.me/27768251182?text=Hi%20Ndiphodzo%20Cakes!%20I'm%20claiming%20the%20Early%20Reservation%20Birthday%20Special%20(Code:%20NDIPHODZO-VIP)%20for%20my%20upcoming%20celebration!`}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-white text-brand-choc font-bold text-xs tracking-wider uppercase px-8 py-4 rounded-xl transition-all shadow hover:-translate-y-0.5"
                        id="countdown-claim-btn"
                      >
                        <MessageCircle className="h-4.5 w-4.5" />
                        <span>Reserve My Complementary Cupcakes Now</span>
                      </a>
                    </div>
                  </div>
                </section>

                {/* 4. FEATURED PRODUCTS PREVIEW */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                  <div className="text-center space-y-2">
                    <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase block">Handpicked Decadence</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-choc tracking-tight">Best-Selling Celebration Cakes</h2>
                    <div className="h-0.5 w-16 bg-brand-rosegold mx-auto my-3" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {CAKE_PRODUCTS.slice(0, 3).map((prod) => (
                      <div 
                        key={prod.id}
                        className="bg-white rounded-3xl overflow-hidden border border-brand-pink-dark/10 luxury-card-shadow hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div className="relative h-64 overflow-hidden bg-brand-choc-light">
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          {prod.bestSeller && (
                            <span className="absolute top-4 left-4 bg-brand-gold text-brand-choc text-[10px] font-bold tracking-widest uppercase px-3.5 py-1 rounded-full shadow">
                              Best Seller
                            </span>
                          )}
                          <div className="absolute top-4 right-4 bg-brand-cream/80 backdrop-blur text-brand-choc text-[10px] font-bold px-3 py-1 rounded-full shadow">
                            R{prod.price}
                          </div>
                        </div>

                        <div className="p-6 space-y-4 text-left flex-grow flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-brand-rosegold font-bold uppercase tracking-widest">{prod.category} series</span>
                              <div className="flex items-center gap-1 text-brand-gold text-xs">
                                <Star className="h-3.5 w-3.5 fill-current" />
                                <span className="font-bold">{prod.rating}</span>
                              </div>
                            </div>
                            <h3 className="font-serif text-lg font-bold text-brand-choc group-hover:text-brand-rosegold transition-colors">
                              {prod.name}
                            </h3>
                            <p className="text-xs text-brand-choc/60 line-clamp-2 leading-relaxed">
                              {prod.description}
                            </p>
                          </div>

                          <div className="space-y-3 pt-2">
                            {/* Card CTA Actions */}
                            <button
                              type="button"
                              onClick={() => setSelectedProduct(prod)}
                              className="w-full text-center text-xs font-bold uppercase tracking-widest py-3 rounded-xl bg-brand-pink/60 hover:bg-brand-pink text-brand-choc transition-colors cursor-pointer"
                            >
                              Customize Filling & Size
                            </button>
                            <a
                              href={`https://wa.me/27768251182?text=Hi%20Ndiphodzo%20Cakes!%20I'm%20extremely%20interested%20in%20ordering%20"${prod.name}"%20starting%20at%20R${prod.price}.%20Can%20we%20chat%20about%20booking%2520this?`}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="w-full flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-800 transition-colors py-1.5"
                            >
                              <MessageCircle className="h-4 w-4" />
                              <span>Instant WhatsApp Inquiry</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-4">
                    <button
                      onClick={() => setActivePage("cakes")}
                      className="inline-flex items-center gap-2 bg-brand-choc hover:bg-brand-choc-light text-white font-bold text-xs tracking-wider uppercase px-8 py-4 rounded-xl transition-all shadow"
                    >
                      <span>View Full Cakes Catalog</span>
                      <ArrowRight className="h-4 w-4 text-brand-gold" />
                    </button>
                  </div>
                </section>

                {/* 5. ABOUT BRAND SECTION */}
                <section className="bg-brand-beige py-16 px-4">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    <div className="relative justify-self-center lg:order-2">
                      <div className="relative rounded-3xl overflow-hidden w-full max-w-[420px] aspect-[4/5] border border-brand-pink-dark/15 shadow-xl">
                        <img 
                          src="https://images.unsplash.com/photo-1616690710400-a16d5569ca1a?auto=format&fit=crop&q=80&w=800" 
                          alt="Bespoke Cake Finished Look" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl flex items-center gap-1.5 text-[10px] font-bold text-brand-choc uppercase shadow">
                          <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
                          <span>Strictly Handmade Quality</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 text-left lg:order-1">
                      <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase block">The Secret Ingredient is Love</span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-choc tracking-tight">
                        Our Story: Crafting Unforgettable Cake Art in Dopeni
                      </h2>
                      <div className="h-px bg-brand-pink-dark/20 w-32" />
                      
                      <p className="text-xs sm:text-sm text-brand-choc/85 leading-relaxed font-light space-y-4">
                        At <strong className="text-brand-choc">Ndiphodzo Cakes and Treats</strong>, we believe every happy celebration deserves a show-stopping sweet centerpiece. Based in beautiful Dopeni, Venda, our boutique bakery operates as a dedicated kitchen studio, crafting luxurious tiers of pure artisanal cake perfection.
                      </p>
                      
                      <blockquote className="border-l-4 border-brand-rosegold pl-4 italic text-sm text-brand-choc/80 bg-brand-pink/20 py-2.5 rounded-r-xl">
                        "A recipe is only as good as the memories and wide smiles it sparks. We do not mass-produce; we build unique visual confectionery art."
                      </blockquote>

                      <p className="text-xs text-brand-choc/70 font-light leading-relaxed">
                        Whether it is a grandiose gold-leaf wedding cake delivered safely to Thohoyandou, or a beautiful vintage buttercream package for a child’s magical birthday party, we whip up happiness using raw local organic ingredients & our master piping techniques.
                      </p>

                      <div className="pt-2 flex items-center gap-4">
                        <div>
                          <p className="font-serif text-2xl font-black text-brand-choc font-mono">100%</p>
                          <p className="text-[10px] text-brand-choc/60 uppercase font-bold tracking-wider">Hygienic Kitchen Studio</p>
                        </div>
                        <div className="h-8 w-px bg-brand-pink-dark/25" />
                        <div>
                          <p className="font-serif text-2xl font-black text-brand-choc font-mono">1000+</p>
                          <p className="text-[10px] text-brand-choc/60 uppercase font-bold tracking-wider">Celebrants Delighted</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* 6. why choose us grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <div className="text-center">
                    <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase block">Baking Excellence</span>
                    <h2 className="font-serif text-3xl font-bold text-brand-choc tracking-tight">Why Our Cakes Taste Superior</h2>
                    <div className="h-0.5 w-16 bg-brand-rosegold mx-auto my-3" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      { title: "No Preservatives", desc: "Every single sponge is baked fresh to order from scratch. No freeze-prepackaged mixes ever." },
                      { title: "Zero Sweetness Fatigue", desc: "Our signature Swiss Meringue Buttercream is whipped to be incredibly airy, buttery, and intentionally less sweet." },
                      { title: "Personalized Support", desc: "Direct one-on-one consultation over WhatsApp layout design, budget alignments, and tailored sizes." }
                    ].map((feat, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white border border-brand-pink-dark/10 shadow-sm text-left">
                        <div className="p-3 rounded-xl bg-brand-pink inline-block text-brand-rosegold mb-4">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <h4 className="font-serif text-base font-bold text-brand-choc mb-1.5">{feat.title}</h4>
                        <p className="text-xs text-brand-choc/65 leading-relaxed font-light">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 7. REVIEWS SLIDER CAROUSEL */}
                <section className="max-w-5xl mx-auto px-4 sm:px-6">
                  <div className="bg-brand-pink/25 border border-brand-pink-dark/15 rounded-3xl p-8 sm:p-12 relative text-center space-y-6">
                    <Stars rating={5} />
                    
                    <p className="font-serif text-lg sm:text-2xl text-brand-choc/90 italic font-semibold leading-relaxed">
                      "{TESTIMONIALS[activeReviewIndex].review}"
                    </p>

                    <div>
                      <h4 className="font-serif text-base font-bold text-brand-choc">
                        {TESTIMONIALS[activeReviewIndex].name}
                      </h4>
                      <p className="text-[11px] text-brand-rosegold uppercase font-bold tracking-widest mt-0.5">
                        {TESTIMONIALS[activeReviewIndex].eventType}
                      </p>
                    </div>

                    <div className="flex justify-center gap-2 pt-2 select-none">
                      {TESTIMONIALS.map((t, idx) => (
                        <button
                          key={t.id}
                          onClick={() => setActiveReviewIndex(idx)}
                          className={`w-3.5 h-3.5 rounded-full border transition-all ${
                            idx === activeReviewIndex 
                              ? "bg-brand-choc border-brand-choc" 
                              : "bg-white border-brand-pink-dark/40"
                          }`}
                          aria-label={`Slide to review ${idx+1}`}
                        />
                      ))}
                    </div>
                  </div>
                </section>

              </div>
            )}

            {/* 2. CAKES CATALOG VIEW */}
            {activePage === "cakes" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                
                {/* Header title */}
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase block">The Confectionery Catalog</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-choc tracking-tight">Indulge in Our Majestic Creations</h2>
                  <div className="h-0.5 w-16 bg-brand-rosegold mx-auto my-3" />
                  <p className="text-xs sm:text-sm text-brand-choc/65 leading-relaxed font-light">
                    Select from our tested formulas. Adjust size, select filling flavors, specify cake-surface writings, and place your luxury WhatsApp order securely.
                  </p>
                </div>

                {/* Filter and Search Bar Section */}
                <div className="bg-white rounded-3xl p-6 border border-brand-pink-dark/10 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                  
                  {/* Category Pills */}
                  <div className="flex gap-1.5 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto -mx-4 px-4 md:mx-0 md:px-0">
                    {[
                      { id: "all", label: "All Items" },
                      { id: "birthday", label: "Birthdays" },
                      { id: "wedding", label: "Weddings" },
                      { id: "cupcakes", label: "Cupcakes" },
                      { id: "treats", label: "Treat Boxes" },
                      { id: "luxury", label: "Luxury Series" }
                    ].map(pill => (
                      <button
                        key={pill.id}
                        onClick={() => setSelectedCategory(pill.id)}
                        className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all shrink-0 uppercase tracking-wider outline-none ${
                          selectedCategory === pill.id
                            ? "bg-brand-choc text-white hover:bg-brand-choc shadow"
                            : "bg-brand-pink/45 text-brand-choc hover:bg-brand-pink"
                        }`}
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>

                  {/* Search Input & Sorter */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-3.5 text-brand-choc/50 pointer-events-none" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for red velvet, vintage..."
                        className="bg-brand-cream/45 border border-brand-pink-dark/15 rounded-xl text-xs pl-9 pr-4 py-3 w-full sm:w-56 focus:outline-none focus:border-brand-rosegold text-brand-choc font-semibold"
                      />
                    </div>

                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="bg-brand-cream/45 border border-brand-pink-dark/15 rounded-xl text-xs px-4 py-3 focus:outline-none focus:border-brand-rosegold text-brand-choc font-semibold"
                    >
                      <option value="featured">Sort by: Popularity</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>

                </div>

                {/* Grid display */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-brand-pink-dark/15">
                    <AlertCircle className="h-10 w-10 text-brand-rosegold mx-auto mb-3" />
                    <p className="font-serif text-lg font-bold text-brand-choc">No Cakes Found</p>
                    <p className="text-xs text-brand-choc/60 mt-1">We couldn't matching items for your search. Try another query.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
                    {filteredProducts.map((prod) => (
                      <div 
                        key={prod.id}
                        className="bg-white rounded-3xl overflow-hidden border border-brand-pink-dark/10 luxury-card-shadow hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div className="relative h-64 overflow-hidden bg-brand-choc-light">
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          {prod.bestSeller && (
                            <span className="absolute top-4 left-4 bg-brand-gold text-brand-choc text-[10px] font-bold tracking-widest uppercase px-3.5 py-1 rounded-full shadow">
                              Best Seller
                            </span>
                          )}
                          <div className="absolute top-4 right-4 bg-brand-cream/95 backdrop-blur text-brand-choc text-xs font-bold px-3 py-1 rounded-full shadow">
                            R{prod.price}
                          </div>
                        </div>

                        <div className="p-6 space-y-4 text-left flex-grow flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-brand-rosegold font-bold uppercase tracking-widest">{prod.category} series</span>
                              <div className="flex items-center gap-1 text-brand-gold text-xs">
                                <Star className="h-3.5 w-3.5 fill-current" />
                                <span className="font-bold">{prod.rating}</span>
                              </div>
                            </div>
                            <h3 className="font-serif text-lg font-bold text-brand-choc group-hover:text-brand-rosegold transition-colors">
                              {prod.name}
                            </h3>
                            <p className="text-xs text-brand-choc/60 line-clamp-2 leading-relaxed">
                              {prod.description}
                            </p>
                            
                            {/* Available flavor tags list */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {prod.flavors.map(fl => (
                                <span key={fl} className="text-[9px] px-2 py-0.5 rounded bg-brand-pink text-brand-choc_light">
                                  {fl}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2 pt-2 border-t border-brand-pink-dark/10">
                            <button
                              type="button"
                              onClick={() => setSelectedProduct(prod)}
                              className="w-full text-center text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl bg-brand-choc text-white hover:bg-brand-choc-light transition-colors cursor-pointer flex items-center justify-center gap-1"
                            >
                              <span>Customize & Add</span>
                            </button>
                            <a
                              href={`https://wa.me/27768251182?text=Hi%20Ndiphodzo%20Cakes!%20I'm%20extremely%2520interested%2520in%2520ordering%2520the%2520"${prod.name}"%2520starting%2520at%2520R${prod.price}.%2520Can%252520we%252520discuss%252520availability%252520for%252520booking?`}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="w-full flex items-center justify-center gap-1 bg-white border border-emerald-600/30 text-emerald-700 hover:text-emerald-800 rounded-xl text-xs font-bold py-2.5"
                            >
                              <MessageCircle className="h-4 w-4" />
                              <span>Instant WhatsApp Check</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* 3. CUSTOM BOOKING FORM VIEW */}
            {activePage === "custom" && (
              <div className="py-10">
                <CustomOrderForm />
              </div>
            )}

            {/* 4. GALLERY VIEW */}
            {activePage === "gallery" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase block">Visual Showcase</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-choc tracking-tight">Our Confectionery Signature Gallery</h2>
                  <div className="h-0.5 w-16 bg-brand-rosegold mx-auto my-3" />
                  <p className="text-xs sm:text-sm text-brand-choc/65 leading-relaxed font-light font-sans">
                    Browse authentic masterpieces. See something you love? Tap to zoom, then send a screenshot over WhatsApp to replicate the design with premium personalized finishing.
                  </p>
                </div>

                {/* Gallery Category Filter Tabs */}
                <div className="flex flex-wrap gap-2 justify-center pb-2">
                  {[
                    { id: "all", label: "Show All" },
                    { id: "wedding", label: "Weddings" },
                    { id: "birthday", label: "Birthdays" },
                    { id: "cupcakes", label: "Cupcakes" },
                    { id: "treats", label: "Treat Boxes" },
                    { id: "luxury", label: "Luxury & Gold Leaf" },
                    { id: "celebration", label: "Celebrations" }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedGalleryCategory(tab.id)}
                      className={`px-4.5 py-2.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all outline-none ${
                        selectedGalleryCategory === tab.id
                          ? "bg-brand-choc text-white shadow-md hover:bg-brand-choc"
                          : "bg-brand-pink/45 text-brand-choc hover:bg-brand-pink"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Pinterest style columns structure */}
                <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6 pt-4">
                  {GALLERY_ITEMS.filter(item => selectedGalleryCategory === "all" || item.category === selectedGalleryCategory).map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => setZoomedImage(item)}
                      className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-brand-pink-dark/10 shadow-sm cursor-zoom-in hover:shadow-lg transition-all group relative animate-in fade-in duration-300"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-choc/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-left text-white">
                        <span className="text-[9px] text-brand-gold uppercase font-bold tracking-widest">{item.category}</span>
                        <h4 className="font-serif text-sm font-bold">{item.title}</h4>
                        <p className="text-[10px] text-brand-pink/80 line-clamp-2 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. FAQ VIEW */}
            {activePage === "faq" && (
              <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-left">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase block">Help & Booking Guidance</span>
                  <h2 className="font-serif text-3xl font-bold text-brand-choc tracking-tight">Frequently Asked Questions</h2>
                  <div className="h-0.5 w-16 bg-brand-rosegold mx-auto my-3" />
                </div>

                <div className="space-y-4">
                  {FAQS.map((faq, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-brand-pink-dark/10 shadow-sm space-y-2 hover:border-brand-rosegold/50 transition-colors"
                    >
                      <h4 className="font-serif text-base font-bold text-brand-choc flex gap-3">
                        <span className="text-brand-rosegold">Q.</span>
                        {faq.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-brand-choc/75 leading-relaxed font-light pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>

                {/* FAQ conversion block */}
                <div className="rounded-3xl bg-brand-pink p-8 text-center space-y-4">
                  <h3 className="font-serif text-xl font-bold text-brand-choc">Have a Custom Request on Your Mind?</h3>
                  <p className="text-xs text-brand-choc/75 max-w-md mx-auto">
                    Each celebration carries a distinct heart. Contact our master decorator directly on WhatsApp with any questions or custom drawing references.
                  </p>
                  <div>
                    <a
                      href={`https://wa.me/27768251182?text=Hi%21%20I%20have%20a%20highly%20custom%20cake%20concept%20for%20an%20upcoming%20celebration%2C%20could%20you%20help%20me%20plan%20this%3F`}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Chat Direct Over Chat</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 6. CONTACT VIEW */}
            {activePage === "contact" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                  
                  {/* Left Column: Coordinates */}
                  <div className="lg:col-span-5 text-left space-y-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-xs font-bold tracking-[0.2em] text-brand-gold uppercase block">Immediate Response Suite</span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-choc tracking-tight">Let's Connect For Your Event</h2>
                      <div className="h-0.5 w-16 bg-brand-rosegold my-3" />
                      <p className="text-xs sm:text-sm text-brand-choc/65 leading-relaxed font-light font-sans">
                        Need event consultations, specific wedding package tastings, or secure delivery coordinates in Dopeni / Limpopo?
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-brand-pink-dark/15">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-brand-pink rounded-xl text-brand-rosegold">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-bold text-brand-choc uppercase tracking-wider">Kitchen Studio Location</h4>
                          <p className="text-xs text-brand-choc/70 font-light mt-0.5">{BRAND_LOCATION}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-brand-pink rounded-xl text-brand-rosegold">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-bold text-brand-choc uppercase tracking-wider">Phone Call & WhatsApp</h4>
                          <p className="text-xs text-brand-choc/70 font-light mt-0.5 font-mono">{BRAND_PHONE}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-brand-pink rounded-xl text-brand-rosegold">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-bold text-brand-choc uppercase tracking-wider">Operating Slots</h4>
                          <p className="text-xs text-brand-choc/70 font-light mt-0.5">{BRAND_HOURS}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-brand-pink-dark/10 shadow-sm space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-choc flex items-center gap-1.5">
                        <Sparkles className="h-4.5 w-4.5 text-brand-gold animate-bounce" />
                        Complimentary Advisory
                      </h4>
                      <p className="text-[11px] text-brand-choc/60 leading-relaxed font-light">
                        We assist in calculations of cake size per guest head to make sure no guests walk away hungry. Just pop us a detailed message!
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Contact form */}
                  <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-brand-pink-dark/10 shadow-sm text-left">
                    <form onSubmit={handleContactSubmit} className="space-y-5">
                      
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-brand-choc/70">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="e.g. Tendani Neluonde"
                          className="w-full bg-brand-cream/35 border border-brand-pink-dark/15 rounded-xl px-4 py-3 text-xs text-brand-choc font-semibold focus:outline-none focus:border-brand-rosegold"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-brand-choc/70">Email Address (Optional)</label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="e.g. tendani@gmail.com"
                          className="w-full bg-brand-cream/35 border border-brand-pink-dark/15 rounded-xl px-4 py-3 text-xs text-brand-choc font-semibold focus:outline-none focus:border-brand-rosegold"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-brand-choc/70">Event Category Type</label>
                        <select
                          value={contactForm.occasion}
                          onChange={(e) => setContactForm({ ...contactForm, occasion: e.target.value })}
                          className="w-full bg-brand-cream/35 border border-brand-pink-dark/15 rounded-xl px-4 py-3 text-xs text-brand-choc font-semibold focus:outline-none focus:border-brand-rosegold"
                        >
                          <option value="wedding">Wedding Ceremony</option>
                          <option value="birthday">Birthday Party</option>
                          <option value="corporate">Corporate Event Launcher</option>
                          <option value="treat-box">Treats Delivery Box</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-brand-choc/70">Detailed Message *</label>
                        <textarea
                          required
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Describe your design, flavors desired, or physical delivery location details..."
                          rows={4}
                          className="w-full bg-brand-cream/35 border border-brand-pink-dark/15 rounded-xl px-4 py-3 text-xs text-brand-choc focus:outline-none focus:border-brand-rosegold"
                        />
                      </div>

                      {contactSuccess && (
                        <div className="p-3 bg-emerald-50 text-emerald-800 text-center font-bold text-xs rounded-xl animate-pulse">
                          ✨ Forwarding message parameters directly to WhatsApp...
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-widest uppercase py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageCircle className="h-4.5 w-4.5" />
                        <span>Submit inquiry over chat</span>
                      </button>

                    </form>
                  </div>

                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <Footer setActivePage={setActivePage} />

      {/* Floating Sticky Actions Bar (Mobile Highlight) */}
      <div className="sm:hidden fixed bottom-3 inset-x-4 z-45 bg-brand-choc rounded-full shadow-2xl border border-brand-pink-dark/10 p-2 flex justify-between items-center transition-all select-none gap-2">
        <a 
          href="https://wa.me/27768251182?text=Hi%20Ndiphodzo%20Cakes%20And%20Treats!%20"
          target="_blank"
          referrerPolicy="no-referrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] tracking-wide uppercase py-3 rounded-full transition-all"
        >
          <MessageCircle className="h-4 w-4 shrink-0" />
          <span>WhatsApp Chat</span>
        </a>
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 bg-brand-gold text-brand-choc font-bold text-[10px] tracking-wide uppercase py-3 rounded-full transition-colors relative"
        >
          <ShoppingBag className="h-4 w-4 shrink-0" />
          <span>Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
        </button>
      </div>

      {/* Side Cart Drawer Component */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateInscription={handleUpdateInscription}
        onUpdateCustomRequests={handleUpdateCustomRequests}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />

      {/* View Product Details Modal Component */}
      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Gallery Photo Zoom Overlay Pop-up Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-choc/85 backdrop-blur-sm" onClick={() => setZoomedImage(null)} />
          <div className="relative bg-brand-cream border border-brand-pink-dark/15 max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setZoomedImage(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-brand-pink hover:bg-brand-pink-dark/20 text-brand-choc transition-colors z-20"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="bg-brand-choc text-white relative">
              <img 
                src={zoomedImage.image} 
                alt={zoomedImage.title} 
                className="w-full max-h-[70vh] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-5 text-left bg-gradient-to-t from-brand-choc via-brand-choc/90 to-transparent">
                <span className="text-[10px] text-brand-gold uppercase tracking-wider font-bold">Category: {zoomedImage.category}</span>
                <h4 className="font-serif text-lg font-bold text-white mt-1">{zoomedImage.title}</h4>
                <p className="text-xs text-brand-pink/80 mt-1 font-light">{zoomedImage.description}</p>
                <div className="mt-4 flex gap-2">
                  <a
                    href={`https://wa.me/27768251182?text=Hi%20Ndiphodzo%20Cakes!%20I%20saw%20this%20particular%21%20model%20"${zoomedImage.title}"%20(${zoomedImage.image})%20on%20your%20signature%20gallery%20and%20want%2520to%2520order%2520similar!`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="h-4.5 w-4.5" />
                    <span>Inquire Replicating This Design</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Sub-Component Star display helper (highly compact and neat)
function Stars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  return (
    <div className="flex items-center justify-center gap-1 text-brand-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star 
          key={i} 
          className={`h-4.5 w-4.5 ${i < fullStars ? "fill-current" : "opacity-30"}`} 
        />
      ))}
    </div>
  );
}
