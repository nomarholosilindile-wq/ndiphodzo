import { MapPin, Phone, Mail, Clock, Heart, Facebook, Instagram, Send, Sparkles } from "lucide-react";
import { BRAND_PHONE, BRAND_LOCATION, BRAND_HOURS, BRAND_EMAIL } from "../data";

interface FooterProps {
  setActivePage: (p: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const handleNav = (p: string) => {
    setActivePage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-choc text-brand-pink pt-16 pb-8 border-t border-brand-pink-dark/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <button 
            onClick={() => handleNav("home")}
            className="text-left font-serif text-2xl font-black uppercase text-white tracking-wide flex flex-col cursor-pointer"
          >
            <span>NDIPHODZO</span>
            <span className="text-brand-rosegold text-xs tracking-widest font-sans capitalize font-semibold">Cakes & Treats</span>
          </button>
          <p className="text-xs text-brand-pink/70 font-light leading-relaxed">
            Handcrafting high-end memories through spectacular premium celebration cakes, cupcakes, and custom luxury designs in Limpopo.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="p-2 rounded-full bg-brand-pink/10 hover:bg-brand-rosegold text-brand-pink transition-colors"
              aria-label="Facebook Page"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="p-2 rounded-full bg-brand-pink/10 hover:bg-brand-rosegold text-brand-pink transition-colors"
              aria-label="Instagram Page"
            >
              <Instagram className="h-4 w-4 animate-pulse" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-gold">
            Navigation Menu
          </h3>
          <ul className="space-y-2.5 text-xs text-brand-pink/80 font-medium">
            {[
              { id: "home", label: "Our Story" },
              { id: "cakes", label: "Cakes & Treats Catalog" },
              { id: "custom", label: "Custom Cake Builder" },
              { id: "gallery", label: "Creative Gallery" },
              { id: "faq", label: "Inquiry FAQ" },
              { id: "contact", label: "Get In Touch" }
            ].map(link => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => handleNav(link.id)}
                  className="hover:text-brand-gold transition-colors text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Contact Details */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-gold">
            Contact & Address
          </h3>
          <ul className="space-y-3.5 text-xs text-brand-pink/80">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-brand-rosegold shrink-0 mt-0.5" />
              <span>
                <strong>Physical Bakery:</strong><br />
                {BRAND_LOCATION},<br />
                Venda, South Africa
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-brand-rosegold shrink-0" />
              <span>{BRAND_PHONE}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-brand-rosegold shrink-0" />
              <span>{BRAND_EMAIL}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="h-4 w-4 text-brand-rosegold shrink-0 mt-0.5" />
              <span>
                <strong>Working Hours:</strong><br />
                {BRAND_HOURS}
              </span>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter Sign-up */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-gold">
            Join the VIP Suite
          </h3>
          <p className="text-xs text-brand-pink/70 font-light leading-relaxed">
            Subscribe to receive exclusive weekend menu specials, discounts on wedding packages, and new product launch alerts.
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing to Ndiphodzo Cakes VIP newsletter!");
              (e.target as HTMLFormElement).reset();
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="w-full bg-brand-pink/10 border border-brand-pink-dark/20 rounded-xl px-4 py-2.5 text-xs text-brand-pink focus:outline-none focus:border-brand-gold placeholder:text-brand-pink/45"
            />
            <button
              type="submit"
              className="bg-brand-rosegold hover:bg-white hover:text-brand-choc text-white text-xs font-bold py-2 px-3 rounded-xl transition-all flex items-center justify-center"
              aria-label="Subscribe"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Location Map Placeholder Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative rounded-2xl overflow-hidden h-36 bg-neutral-900 border border-brand-pink-dark/10 flex flex-col justify-center items-center text-center p-4">
          {/* Mock premium outline */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FAF6F0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <MapPin className="h-6 w-6 text-brand-gold animate-bounce mb-1" />
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-pink">DOPENI, VENDA, SOUTH AFRICA</h4>
          <p className="text-[10px] text-brand-pink/60 mt-1 uppercase tracking-wider">
            Serving Louis Trichardt, Thohoyandou, Sibasa, & surrounding areas
          </p>
        </div>
      </div>

      {/* Copyright Credits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-brand-pink-dark/10 text-center text-[10px] text-brand-pink/50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© 2026 Ndiphodzo Cakes and Treats. All Rights Reserved. Crafted in Venda.</p>
        <div className="flex items-center gap-1.5 justify-center">
          <span>Made with</span>
          <Heart className="h-3.5 w-3.5 text-brand-rosegold fill-current" />
          <span>in Limpopo, South Africa</span>
        </div>
      </div>
    </footer>
  );
}
