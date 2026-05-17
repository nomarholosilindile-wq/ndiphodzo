import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Sparkles, MessageCircle } from "lucide-react";
import { BRAND_PHONE } from "../data";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ activePage, setActivePage, cartCount, onOpenCart }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Our Story" },
    { id: "cakes", label: "Cakes & Treats" },
    { id: "custom", label: "Custom Cake Builder" },
    { id: "gallery", label: "Signature Gallery" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact Us" }
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Banner Details */}
      <div className="bg-brand-choc text-brand-pink text-xs py-2 px-4 transition-all duration-300 text-center flex justify-between items-center max-w-7xl mx-auto rounded-b-xl px-6 font-medium tracking-wide">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-brand-gold animate-pulse" />
          <span>Handcrafted Luxury Cakes for Venda Celebrations</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>📍 Dopeni, Limpopo</span>
          <span>📞 {BRAND_PHONE}</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          scrolled 
            ? "bg-brand-cream/90 backdrop-blur-md shadow-md border-b border-brand-pink-dark/10 py-3" 
            : "bg-brand-cream py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <button 
            onClick={() => handleNavClick("home")}
            className="flex flex-col text-left group transition-all"
            id="nav-logo-btn"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-choc flex items-center gap-1.5 uppercase">
              Ndiphodzo
              <span className="text-brand-rosegold text-xs tracking-wider font-sans font-light capitalize block sm:inline">Cakes & Treats</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-brand-gold font-medium group-hover:text-brand-rosegold transition-colors">
              Designed to Impress
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-1 py-1 text-sm font-medium tracking-wide uppercase transition-all duration-200 hover:text-brand-rosegold ${
                  activePage === link.id 
                    ? "text-brand-rosegold font-semibold" 
                    : "text-brand-choc/85"
                }`}
              >
                {link.label}
                {activePage === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-rosegold rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Actions: Cart, WhatsApp Order, and Hamburger */}
          <div className="flex items-center gap-3">
            
            {/* WhatsApp CTA Pill */}
            <a
              href={`https://wa.me/27768251182?text=Hi%20Ndiphodzo%20Cakes%20And%20Treats!%20I'm%20visiting%20your%20luxury%20website%20and%20would%20love%20to%20inquire%20about%20a%20celebration%20cake.`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs tracking-wide uppercase px-4 py-2 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Inquiry</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-brand-pink hover:bg-brand-pink-dark/20 text-brand-choc transition-all select-none group"
              aria-label="View Shopping Cart"
              id="shopping-cart-trigger"
            >
              <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform text-brand-choc_light" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-rosegold text-white font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-brand-beig hover:bg-brand-pink-dark/20 text-brand-choc transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-brand-cream border-t border-brand-pink-dark/15 shadow-xl py-6 px-4 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`py-3 px-4 rounded-xl text-left text-base font-medium tracking-wide uppercase transition-colors ${
                    activePage === link.id
                      ? "bg-brand-pink text-brand-rosegold font-bold"
                      : "text-brand-choc hover:bg-brand-beige"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              <div className="border-t border-brand-pink-dark/20 pt-4 mt-2 flex flex-col gap-3">
                <a
                  href="https://wa.me/27768251182?text=Hi%20Ndiphodzo%20Cakes%20And%20Treats!"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm py-3 rounded-xl transition-all shadow"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Chat on WhatsApp</span>
                </a>
                <div className="text-center text-xs text-brand-choc/60 mt-2 font-medium">
                  📍 Dopeni, Venda • 📞 +27 76 825 1182
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
