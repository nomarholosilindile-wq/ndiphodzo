import { ShoppingBag, X, Trash2, MessageCircle, AlertCircle, Plus, Minus } from "lucide-react";
import { CartItem } from "../types";
import { BRAND_PHONE } from "../data";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onUpdateInscription: (cartId: string, text: string) => void;
  onUpdateCustomRequests: (cartId: string, text: string) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onUpdateInscription,
  onUpdateCustomRequests,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  if (!isOpen) return null;

  const calculateItemPrice = (item: CartItem) => {
    return (item.product.price + item.selectedSize.priceModifier) * item.quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + calculateItemPrice(item), 0);
  };

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    let message = `Hi *NDIPHODZO CAKES AND TREATS*! 🎂✨\n\n`;
    message += `I would love to place an order through your luxury website. Here are my reservation details:\n\n`;
    message += `===============================\n`;

    cart.forEach((item, index) => {
      const itemBaseAndSize = item.product.price + item.selectedSize.priceModifier;
      message += `*${index + 1}. ${item.product.name}* (Qty: ${item.quantity})\n`;
      message += `   • *Size/Tier:* ${item.selectedSize.label}\n`;
      message += `   • *Flavor Selection:* ${item.selectedFlavor}\n`;
      if (item.inscription.trim().length > 0) {
        message += `   • *Writing on Cake:* "${item.inscription}"\n`;
      }
      if (item.customRequests?.trim()) {
        message += `   • *Special Requests:* ${item.customRequests}\n`;
      }
      message += `   • *Subtotal:* R${(itemBaseAndSize * item.quantity).toFixed(2)} (R${itemBaseAndSize} each)\n\n`;
    });

    message += `===============================\n`;
    message += `*Grand Total Price:* R${calculateTotal().toFixed(2)}\n\n`;
    message += `📅 *Preferred Date of Event:* [Please enter event date]\n`;
    message += `📍 *Delivery (Venda area) or Collection:* [Please specify]\n\n`;
    message += `Can you please confirm slot availability and send deposit details? thank you! ❤️`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/27768251182?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank", "referrer");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-choc/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-cream border-l border-brand-pink-dark/15 h-full flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 bg-brand-choc text-brand-pink flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-brand-gold" />
              <h2 className="font-serif text-lg font-bold tracking-wide uppercase">Your Cake Order Bag</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-brand-pink-dark/20 text-brand-pink transition-colors"
              aria-label="Close Cart"
              id="close-cart-btn"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-brand-pink flex items-center justify-center text-brand-rosegold">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <p className="font-serif text-lg font-medium text-brand-choc">Your bag is empty</p>
                <p className="text-xs text-brand-choc/60 max-w-[240px]">
                  Explore our luxury birthday and wedding cakes to fill it with delightful treats.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-brand-rosegold hover:bg-brand-choc text-white font-semibold text-xs py-3 px-6 rounded-full tracking-wider uppercase transition-colors"
                >
                  Browse our Menu
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const singlePrice = item.product.price + item.selectedSize.priceModifier;
                return (
                  <div 
                    key={item.cartId}
                    className="p-4 rounded-2xl bg-white border border-brand-pink-dark/10 luxury-card-shadow flex flex-col space-y-3 relative group"
                  >
                    {/* Upper block */}
                    <div className="flex gap-3">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-16 h-16 rounded-xl object-cover border border-brand-pink-dark/10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-brand-choc truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-brand-rosegold font-semibold">
                          {item.selectedSize.label}
                        </p>
                        <p className="text-[10px] text-brand-choc/70 truncate">
                          Flavor: {item.selectedFlavor}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.cartId)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg text-brand-choc/40 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Quantity Selector and Total price */}
                    <div className="flex items-center justify-between border-t border-dashed border-brand-pink-dark/10 pt-2.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, -1)}
                          disabled={item.quantity <= 1}
                          className="p-1 rounded bg-brand-pink hover:bg-brand-pink-dark/30 text-brand-choc disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-mono text-xs font-semibold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, 1)}
                          className="p-1 rounded bg-brand-pink hover:bg-brand-pink-dark/30 text-brand-choc transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-mono text-sm font-bold text-brand-choc">
                        R{(singlePrice * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Custom Cake Inscriptions */}
                    {item.product.category !== "cupcakes" && item.product.category !== "treats" && (
                      <div className="space-y-1 mt-2">
                        <label className="text-[10px] uppercase tracking-wider text-brand-choc/60 font-medium">
                          Writing on Cake (Free):
                        </label>
                        <input
                          type="text"
                          value={item.inscription}
                          onChange={(e) => onUpdateInscription(item.cartId, e.target.value)}
                          placeholder="e.g. Happy 30th Birthday Lindy!"
                          className="w-full bg-brand-cream/65 text-xs rounded-lg px-2.5 py-1.5 border border-brand-pink-dark/15 focus:outline-none focus:border-brand-rosegold text-brand-choc placeholder:text-brand-choc/30"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-brand-choc/60 font-medium">
                        Special Requests (frosting color, accents):
                      </label>
                      <textarea
                        value={item.customRequests || ""}
                        onChange={(e) => onUpdateCustomRequests(item.cartId, e.target.value)}
                        placeholder="e.g. Please put gold ribbons instead of pink"
                        rows={1}
                        className="w-full bg-brand-cream/65 text-xs rounded-lg px-2.5 py-1 text-brand-choc border border-brand-pink-dark/15 focus:outline-none focus:border-brand-rosegold placeholder:text-brand-choc/30"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Billing Area */}
          {cart.length > 0 && (
            <div className="border-t border-brand-pink-dark/20 p-6 bg-brand-pink/30 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-brand-choc/70 font-medium">
                  <span>Subtotal:</span>
                  <span className="font-mono text-sm">R{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-brand-choc/70 font-medium pb-2 border-b border-dashed border-brand-pink-dark/15">
                  <span>Delivery (Dopeni / Venda area):</span>
                  <span className="font-sans italic text-emerald-600">Calculated over chat</span>
                </div>
                <div className="flex justify-between text-base font-bold text-brand-choc pt-1">
                  <span>Estimated Total:</span>
                  <span className="font-mono text-lg gold-gradient-text">R{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Security Advisory */}
              <div className="p-3 bg-white/70 border border-brand-pink-dark/10 rounded-xl flex items-start gap-2.5 text-[10px] text-brand-choc/70">
                <AlertCircle className="h-4 w-4 text-brand-rosegold shrink-0 mt-0.5" />
                <p>
                  No payment is done on this site. Submitting your luxury bag triggers a <strong>direct WhatsApp invoice verification</strong> with our master baker.
                </p>
              </div>

              {/* Conversion Actions */}
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide uppercase py-3.5 rounded-xl transition-all shadow-md hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Send Order to WhatsApp</span>
                </button>
                <div className="flex justify-between text-[11px] text-brand-choc/50 px-1">
                  <button 
                    onClick={onClearCart}
                    className="hover:text-red-500 hover:underline cursor-pointer"
                  >
                    Clear All Items
                  </button>
                  <span>WhatsApp: +27 76 825 1182</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
