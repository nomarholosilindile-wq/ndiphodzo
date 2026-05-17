import { useState, useEffect } from "react";
import { X, Star, MessageCircle, ShoppingBag, Plus, Minus, ShieldCheck, Heart } from "lucide-react";
import { CakeProduct, CartItem } from "../types";

interface ProductModalProps {
  product: CakeProduct | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [inscription, setInscription] = useState("");
  const [customRequests, setCustomRequests] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Reset defaults on product change
  useEffect(() => {
    if (product) {
      setSelectedFlavor(product.flavors[0] || "Madagascan Vanilla Velvet");
      setSelectedSize(product.sizes[0]);
      setInscription("");
      setCustomRequests("");
      setQuantity(1);
      setAddedMessage(false);
    }
  }, [product]);

  const unitPrice = product.price + selectedSize.priceModifier;
  const totalPrice = unitPrice * quantity;

  const handlePushToCart = () => {
    const cartItem: CartItem = {
      cartId: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      product,
      selectedFlavor,
      selectedSize,
      quantity,
      inscription: inscription.trim(),
      customRequests: customRequests.trim()
    };
    onAddToCart(cartItem);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      onClose();
    }, 1800);
  };

  const handleInstantWhatsApp = () => {
    let msg = `Hi *NDIPHODZO CAKES AND TREATS*! 🎂💕\n\n`;
    msg += `I fell in love with a cake on your luxury website and want to make an instant inquiry:\n\n`;
    msg += `🧁 *Cake Name:* ${product.name}\n`;
    msg += `📐 *Size/Tier Selection:* ${selectedSize.label}\n`;
    msg += `🍓 *Flavor Chosen:* ${selectedFlavor}\n`;
    if (inscription.trim().length > 0) {
      msg += `✍️ *Writing on Cake:* "${inscription}"\n`;
    }
    if (customRequests.trim().length > 0) {
      msg += `✨ *Special Request detail:* ${customRequests}\n`;
    }
    msg += `🔢 *Quantity:* ${quantity}\n`;
    msg += `💰 *Subtotal Price (R):* R${totalPrice.toFixed(2)}\n\n`;
    msg += `Can you please advise on availability and booking details? Thank you! 😍`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/27768251182?text=${encoded}`;
    window.open(url, "_blank", "referrer");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-brand-choc/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content Box */}
      <div className="relative bg-brand-cream border border-brand-pink-dark/15 max-w-3xl w-full rounded-3xl overflow-hidden luxury-card-shadow flex flex-col md:flex-row z-10 animate-in zoom-in-95 duration-200">
        
        {/* Left Side: Product Image & Badges */}
        <div className="w-full md:w-1/2 relative bg-brand-choc-light h-64 md:h-auto min-h-[300px]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-choc/85 to-transparent flex flex-col justify-end p-6">
            {product.bestSeller && (
              <span className="absolute top-4 left-4 bg-brand-gold text-brand-choc text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow">
                Best Seller
              </span>
            )}

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-2 rounded-full bg-brand-cream/20 backdrop-blur text-white hover:bg-brand-cream/40 transition-all"
            >
              <Heart className={`h-4.5 w-4.5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </button>

            <span className="text-[11px] font-semibold text-brand-pink-dark uppercase tracking-widest">
              {product.category} Series
            </span>
            <h3 className="font-serif text-2xl font-bold text-white tracking-wide mt-1">
              {product.name}
            </h3>
            <p className="text-xs text-brand-pink/80 mt-2 line-clamp-3 font-light leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Right Side: Options Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between max-h-[85vh] md:max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-brand-pink hover:bg-brand-pink-dark/20 text-brand-choc transition-colors z-20"
            aria-label="Close details"
            id="close-product-btn"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-5">
            {/* Header info */}
            <div className="flex justify-between items-start pt-2">
              <div>
                <span className="text-2xl font-mono font-bold text-brand-choc">
                  R{unitPrice.toFixed(0)}
                </span>
                <span className="text-[10px] text-brand-choc/60 ml-1.5 italic">
                  starting price
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-brand-pink px-2.5 py-1 rounded-full text-brand-rosegold">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-xs font-bold font-mono">{product.rating}</span>
                <span className="text-[10px] text-brand-choc/50">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <div className="h-px bg-brand-pink-dark/15" />

            {/* Flavor selection */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-bold text-brand-choc/80">
                1. Choose Gourmet Filling Flavor:
              </label>
              <select
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                className="w-full bg-white text-xs border border-brand-pink-dark/15 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-rosegold text-brand-choc font-medium"
              >
                {product.flavors.map((flv) => (
                  <option key={flv} value={flv}>
                    {flv}
                  </option>
                ))}
              </select>
            </div>

            {/* Size selection */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-bold text-brand-choc/80">
                2. Select Layer Size & Tiers:
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {product.sizes.map((sz) => {
                  const szPrice = product.price + sz.priceModifier;
                  const isCur = sz.label === selectedSize.label;
                  return (
                    <button
                      key={sz.label}
                      onClick={() => setSelectedSize(sz)}
                      type="button"
                      className={`flex justify-between items-center text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isCur 
                          ? "bg-brand-choc text-white border-brand-choc shadow-md" 
                          : "bg-white border border-brand-pink-dark/15 text-brand-choc/80 hover:bg-brand-pink/20"
                      }`}
                    >
                      <span>{sz.label}</span>
                      <span className="font-mono font-bold">R{szPrice}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inscription text */}
            {product.category !== "cupcakes" && product.category !== "treats" && (
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-bold text-brand-choc/80 flex justify-between">
                  <span>3. Writing on Cake (Free):</span>
                  <span className="text-[9px] text-brand-choc/50 normal-case">max 50 letters</span>
                </label>
                <input
                  type="text"
                  maxLength={50}
                  value={inscription}
                  onChange={(e) => setInscription(e.target.value)}
                  placeholder="e.g. Happy 21st Birthday Lerato!"
                  className="w-full bg-white text-xs border border-brand-pink-dark/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-rosegold text-brand-choc"
                />
              </div>
            )}

            {/* Special Instructions */}
            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider font-bold text-brand-choc/80">
                Special Requests or Color changes:
              </label>
              <textarea
                value={customRequests}
                onChange={(e) => setCustomRequests(e.target.value)}
                placeholder="e.g. Please make the icing baby blue instead of pink for a boy celebrations"
                rows={2}
                className="w-full bg-white text-xs border border-brand-pink-dark/15 rounded-xl px-4 py-2 focus:outline-none focus:border-brand-rosegold text-brand-choc"
              />
            </div>

            {/* Quantity select */}
            <div className="flex items-center justify-between bg-brand-white p-3 rounded-xl border border-brand-pink-dark/10">
              <span className="text-xs font-bold text-brand-choc">QTY Required:</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 rounded-full bg-brand-pink text-brand-choc hover:bg-brand-pink-dark/30 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-mono text-sm font-bold w-6 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 rounded-full bg-brand-pink text-brand-choc hover:bg-brand-pink-dark/30 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Subtotal & Call to Actions */}
          <div className="mt-6 pt-5 border-t border-brand-pink-dark/15 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-choc/60">Estimated Cost:</span>
              <span className="text-2xl font-mono font-bold gold-gradient-text">R{totalPrice.toFixed(2)}</span>
            </div>

            {/* Quick response badge successfully added to cart */}
            {addedMessage && (
              <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-center rounded-xl text-xs font-semibold animate-bounce mt-2">
                ✨ Successfully added to cart bag! Closing...
              </div>
            )}

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handlePushToCart}
                id="cart-submit-btn"
                className="w-full flex items-center justify-center gap-2 bg-brand-choc hover:bg-brand-choc-light text-white font-bold text-xs tracking-widest uppercase py-3.5 rounded-xl transition-all shadow hover:-translate-y-0.5"
              >
                <ShoppingBag className="h-4 w-4 text-brand-gold" />
                <span>Add to Order Bag</span>
              </button>

              <button
                type="button"
                onClick={handleInstantWhatsApp}
                id="whatsapp-instant-btn"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-widest uppercase py-3.5 rounded-xl transition-all shadow hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Instant WhatsApp Inquiry</span>
              </button>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-brand-choc/50 justify-center">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Dopeni, Venda Location Slots Checked Over WhatsApp Chat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
