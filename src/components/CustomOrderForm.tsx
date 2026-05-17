import React, { useState } from "react";
import { Sparkles, Check, MessageCircle, Calendar, User, Heart, Cake } from "lucide-react";
import { FLAVORS, FROSTINGS, TOPPINGS, CAKE_SIZES } from "../data";

export default function CustomOrderForm() {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("Birthday");
  const [tiers, setTiers] = useState("1"); // 1, 2, 3
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVORS[0].split(" - ")[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(FROSTINGS[0]);
  const [isDripCake, setIsDripCake] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [inscription, setInscription] = useState("");
  const [notes, setNotes] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Constants for pricing
  const basePrices: { [key: string]: number } = {
    "1": 480, // Single tier starting price
    "2": 950, // Double tier starting price
    "3": 1800 // Triple tier starting price
  };

  const getToppingsTotal = () => {
    return selectedToppings.reduce((sum, topName) => {
      const toppingData = TOPPINGS.find(t => t.name === topName);
      return sum + (toppingData?.price || 0);
    }, 0) + (isDripCake ? 50 : 0);
  };

  const getEstimatedTotal = () => {
    return basePrices[tiers] + getToppingsTotal();
  };

  const handleToppingToggle = (topName: string) => {
    if (selectedToppings.includes(topName)) {
      setSelectedToppings(selectedToppings.filter(t => t !== topName));
    } else {
      setSelectedToppings([...selectedToppings, topName]);
    }
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !eventDate) {
      alert("Please enter both your name and event date to compile quotation.");
      return;
    }

    let msg = `Hi *NDIPHODZO CAKES AND TREATS*! 🎂✨🎨\n\n`;
    msg += `I just designed my own custom cake on your luxury website! Here is my compiled quotation request:\n\n`;
    msg += `👤 *Client Name:* ${clientName}\n`;
    if (phone) msg += `📞 *Contact Phone:* ${phone}\n`;
    msg += `📅 *Date of Celebration:* ${eventDate}\n`;
    msg += `🎈 *Occasion:* ${eventType}\n\n`;
    msg += `-----------------------------------\n`;
    msg += `🎂 *Tier Layout:* ${tiers} Tier${tiers !== "1" ? "s" : ""} Design\n`;
    msg += `🍰 *Sponge Flavor:* ${selectedFlavor}\n`;
    msg += `🧁 *Frosting Choice:* ${selectedFrosting}\n`;
    msg += `➕ *Gourmet Toppings Added:*\n`;
    if (isDripCake) {
      msg += `   • Gourmet Chocolate Drip (R50)\n`;
    }
    selectedToppings.forEach(top => {
      const topData = TOPPINGS.find(t => t.name === top);
      msg += `   • ${top} (+R${topData?.price || 0})\n`;
    });
    if (selectedToppings.length === 0 && !isDripCake) {
      msg += `   • None selected (clean smooth minimalist frosting)\n`;
    }
    if (inscription.trim()) {
      msg += `✍️ *Custom Writing on Cake:* "${inscription}"\n`;
    }
    if (notes.trim()) {
      msg += `📝 *Client Extra Specifications:* ${notes}\n`;
    }
    msg += `-----------------------------------\n`;
    msg += `💰 *Self Estimated Total:* R${getEstimatedTotal().toFixed(2)}\n\n`;
    msg += `Please check if this design is available for booking. I'll also send reference images in the conversation. Thank you! 😍`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/27768251182?text=${encoded}`;
    window.open(url, "_blank", "referrer");

    setSubmissionSuccess(true);
    setTimeout(() => setSubmissionSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-4 px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-brand-gold uppercase block">
          Artisanal Custom Studio
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-choc tracking-tight">
          Design Your Signature Cake
        </h2>
        <div className="h-0.5 w-16 bg-brand-rosegold mx-auto my-3" />
        <p className="text-xs sm:text-sm text-brand-choc/70 font-light leading-relaxed">
          Unleash your creativity. Select your architectural tiers, core flavor profiles, luxury frostings, and gold-leaf details. Check the virtual design reactive preview instantly!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        
        {/* Live Visual 3D-feeling Cake Preview Pane */}
        <div className="lg:col-span-5 bg-brand-pink/45 border border-brand-pink-dark/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center relative overflow-hidden h-[380px] sm:h-auto min-h-[460px] shadow-sm">
          
          {/* Shimmer Deco */}
          <div className="absolute top-0 right-0 p-6 opacity-35">
            <Sparkles className="h-10 w-10 text-brand-gold animate-pulse" />
          </div>

          <div className="text-center w-full">
            <span className="text-[10px] uppercase font-bold text-brand-rosegold tracking-wider bg-white/70 px-3 py-1 rounded-full border border-brand-pink-dark/10">
              Interactive Design Preview
            </span>
          </div>

          {/* Graphical Cake Stack Display */}
          <div className="relative flex flex-col items-center justify-end flex-grow w-full py-12 max-w-[260px]">
            
            {/* Custom Interactive Floating Decoration Marks */}
            {selectedToppings.includes("Fresh Signature Roses") && (
              <div className="absolute top-1 right-2 bg-emerald-100 border border-emerald-200 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full z-20 shadow animate-bounce">
                🌹 Blush Roses Decorated
              </div>
            )}
            {selectedToppings.includes("Edible 24k Gold Leaf") && (
              <div className="absolute top-8 left-0 text-brand-gold bg-brand-choc text-[9px] font-bold px-2 py-0.5 rounded-full z-20 shadow animate-pulse flex items-center gap-1">
                <span>✨ 24K Gold Leaf Dust</span>
              </div>
            )}

            {/* Topper Layer */}
            {selectedToppings.includes("Personalized Glitter Topper") && (
              <div className="flex flex-col items-center relative -mb-3 z-30 animate-in slide-in-from-top-4 duration-300">
                <div className="h-7 px-3 bg-brand-gold/90 border border-brand-rosegold text-brand-choc text-[9px] font-bold rounded-lg flex items-center justify-center uppercase shadow-md select-none">
                  {inscription ? `"${inscription.substring(0, 12)}..."` : "Best Day Ever!"}
                </div>
                <div className="w-1.5 h-6 bg-brand-gold/60 border-l border-brand-choc/20" />
              </div>
            )}

            {/* Macaron scattered elements */}
            {selectedToppings.includes("Assorted French Macarons") && (
              <div className="absolute right-0 top-1/4 flex gap-1 z-30">
                <div className="w-3 h-2 rounded-full bg-pink-300 animate-spin" />
                <div className="w-3 h-2 rounded-full bg-amber-200 animate-bounce" />
              </div>
            )}

            {/* Tier 3 (Stacked Top - visible if 3 tiers selected) */}
            {tiers === "3" && (
              <div 
                className="w-16 h-12 bg-white rounded-t-xl border-x-2 border-t-2 border-brand-pink-dark/20 relative shadow transition-all duration-300 flex items-center justify-center z-20"
                style={{
                  backgroundColor: selectedFrosting.includes("Chocolate") ? "#4A332E" : selectedFrosting.includes("Cheese") ? "#FFFFF4" : "#FAF0EA"
                }}
              >
                {isDripCake && (
                  <div className="absolute top-0 left-0 w-full h-2 bg-yellow-900/60 rounded-t-lg flex justify-around overflow-hidden">
                    <div className="w-1 h-3.5 bg-yellow-900/60 rounded-b" />
                    <div className="w-1 h-2 bg-yellow-900/60 rounded-b" />
                    <div className="w-1 h-4 bg-yellow-900/60 rounded-b" />
                  </div>
                )}
                <span className="text-[7px] text-brand-choc/40 select-none font-bold">Top Layer</span>
              </div>
            )}

            {/* Tier 2 (Stacked Mid - visible if 2 or 3 tiers selected) */}
            {(tiers === "2" || tiers === "3") && (
              <div 
                className="w-28 h-14 bg-white border-x-2 border-t border-brand-pink-dark/20 relative shadow transition-all duration-300 flex items-center justify-center z-15 -mt-0.5"
                style={{
                  backgroundColor: selectedFrosting.includes("Chocolate") ? "#4A332E" : selectedFrosting.includes("Cheese") ? "#FFFFF4" : "#FAF0EA"
                }}
              >
                {isDripCake && (
                  <div className="absolute top-0 left-0 w-full h-2 bg-yellow-900/60 flex justify-around overflow-hidden">
                    <div className="w-1 h-4.5 bg-yellow-900/60 rounded-b" />
                    <div className="w-1 h-3 bg-yellow-900/60 rounded-b" />
                    <div className="w-1 h-6 bg-yellow-900/60 rounded-b" />
                    <div className="w-1 h-2 bg-yellow-900/60 rounded-b" />
                  </div>
                )}
                <span className="text-[8px] text-brand-choc/45 select-none font-bold">Mid Layer</span>
              </div>
            )}

            {/* Tier 1 (Base - Always visible) */}
            <div 
              className="w-40 h-16 rounded-b-xl border-x-2 border-b-2 border-t border-brand-pink-dark/25 relative shadow-lg transition-all duration-300 flex items-center justify-center z-10 -mt-0.5"
              style={{
                backgroundColor: selectedFrosting.includes("Chocolate") ? "#4A332E" : selectedFrosting.includes("Cheese") ? "#FFFFF4" : "#FAF0EA"
              }}
            >
              {isDripCake && (
                <div className="absolute top-0 left-0 w-full h-2.5 bg-yellow-900/60 flex justify-around overflow-hidden">
                  <div className="w-1.5 h-6 bg-yellow-900/60 rounded-b" />
                  <div className="w-1 h-3 bg-yellow-900/60 rounded-b" />
                  <div className="w-1.5 h-5 bg-yellow-900/60 rounded-b" />
                  <div className="w-1.5 h-4 bg-yellow-900/60 rounded-b" />
                  <div className="w-1.5 h-6.5 bg-yellow-900/60 rounded-b" />
                </div>
              )}
              {selectedToppings.includes("Fresh Berries & Fig Medley") && (
                <div className="absolute -bottom-1 left-2 flex gap-1">
                  <span className="text-red-500 animate-pulse text-xs">🍓</span>
                  <span className="text-purple-600 font-bold text-[8px]">🍇</span>
                </div>
              )}
              <span className="text-[9px] uppercase tracking-wide text-brand-choc/50 select-none font-bold">
                {tiers === "1" ? "Single Block Base" : "Grand Base"}
              </span>
            </div>

            {/* Elegant Cake Stand */}
            <div className="w-48 h-2.5 bg-brand-beige border border-brand-pink-dark/25 rounded-full shadow" />
            <div className="w-14 h-6 bg-brand-beig border-x border-b border-brand-pink-dark/25" />
            <div className="w-24 h-1.5 bg-brand-choc rounded-full" />
          </div>

          <div className="w-full space-y-2 mt-4">
            <div className="flex justify-between items-baseline bg-white/70 backdrop-blur rounded-2xl px-5 py-3 border border-brand-pink-dark/10">
              <span className="text-xs font-semibold text-brand-choc">Self Designed Estimate:</span>
              <span className="text-xl font-mono font-bold text-brand-choc">R{getEstimatedTotal().toFixed(2)}</span>
            </div>
            <div className="text-[10px] text-brand-choc/50 text-center flex items-center justify-center gap-1">
              <span>💡 All basic sprinkles and matching ribbons are complimentary.</span>
            </div>
          </div>
        </div>

        {/* Customization Details Input Panel */}
        <form 
          onSubmit={handleWhatsAppSend}
          className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-brand-pink-dark/10 space-y-6 shadow-sm"
        >
          {/* Step 1: Base Tiers Layout */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-choc border-b pb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-pink text-brand-rosegold flex items-center justify-center text-[10px] font-mono font-black">1</span>
              Architectural Layers & Tier Height
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { label: "1 Tier (Single)", value: "1", desc: "For intimate feasts" },
                { label: "2 Tiers (Duet)", value: "2", desc: "For lavish birthdays" },
                { label: "3 Tiers (Wedding)", value: "3", desc: "Pure grand celebration" }
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTiers(opt.value)}
                  className={`px-3 py-3 rounded-2xl text-xs font-medium border text-center flex flex-col items-center justify-center gap-1.5 transition-all outline-none ${
                    tiers === opt.value
                      ? "bg-brand-choc text-white border-brand-choc shadow-md scale-[1.02]"
                      : "bg-white text-brand-choc border-brand-pink-dark/15 hover:bg-brand-pink/15"
                  }`}
                >
                  <Cake className="h-4 w-4" />
                  <span className="font-bold">{opt.label}</span>
                  <span className={`text-[9px] ${tiers === opt.value ? "text-brand-pink-dark" : "text-brand-choc/55"}`}>
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Flavor selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-bold text-brand-choc/80 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-brand-pink text-brand-rosegold flex items-center justify-center text-[9px] font-mono">2</span>
                Sponge Cake Base
              </label>
              <select
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                className="w-full bg-brand-cream/40 text-xs border border-brand-pink-dark/15 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-rosegold text-brand-choc font-semibold"
              >
                {FLAVORS.map(flv => {
                  const nameOnly = flv.split(" - ")[0];
                  return (
                    <option key={nameOnly} value={nameOnly}>
                      {nameOnly}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-bold text-brand-choc/80 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-brand-pink text-brand-rosegold flex items-center justify-center text-[9px] font-mono">3</span>
                Frosting & Cream Base
              </label>
              <select
                value={selectedFrosting}
                onChange={(e) => setSelectedFrosting(e.target.value)}
                className="w-full bg-brand-cream/40 text-xs border border-brand-pink-dark/15 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-rosegold text-brand-choc font-semibold"
              >
                {FROSTINGS.map(frost => (
                  <option key={frost} value={frost}>
                    {frost}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 3: Premium toppings checklist */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-wider font-bold text-brand-choc/80 flex items-center gap-1.5 border-b pb-1.5">
              <span className="w-4 h-4 rounded-full bg-brand-pink text-brand-rosegold flex items-center justify-center text-[9px] font-mono">4</span>
              Add Premium Gourmet Finishes (Optional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Gourmet drip */}
              <button
                type="button"
                onClick={() => setIsDripCake(!isDripCake)}
                className={`flex justify-between items-center text-left py-2.5 px-4 rounded-xl text-xs font-semibold border transition-colors outline-none ${
                  isDripCake 
                    ? "bg-brand-pink border-brand-rosegold text-brand-choc" 
                    : "bg-white border-brand-pink-dark/15 text-brand-choc/70"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${isDripCake ? "bg-brand-rosegold text-white border-brand-rosegold" : "border-gray-300"}`}>
                    {isDripCake && <Check className="h-3 w-3" />}
                  </div>
                  <span>Gourmet Drip Glazing</span>
                </div>
                <span className="font-mono text-brand-rosegold font-bold">R50</span>
              </button>

              {/* Other toppings */}
              {TOPPINGS.map(top => {
                const isSelected = selectedToppings.includes(top.name);
                return (
                  <button
                    key={top.name}
                    type="button"
                    onClick={() => handleToppingToggle(top.name)}
                    className={`flex justify-between items-center text-left py-2.5 px-4 rounded-xl text-xs font-semibold border transition-colors outline-none ${
                      isSelected 
                        ? "bg-brand-pink border-brand-rosegold text-brand-choc" 
                        : "bg-white border-brand-pink-dark/15 text-brand-choc/70"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${isSelected ? "bg-brand-rosegold text-white border-brand-rosegold" : "border-gray-300"}`}>
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      <span>{top.name}</span>
                    </div>
                    <span className="font-mono text-brand-rosegold font-bold">R{top.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inscription & Special note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-brand-pink-dark/10 pt-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider font-bold text-brand-choc/75 block">
                Message Custom Text (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Happy 50th Anniversary Mom"
                value={inscription}
                onChange={(e) => setInscription(e.target.value)}
                className="w-full bg-brand-cream/35 text-xs border border-brand-pink-dark/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-rosegold text-brand-choc"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider font-bold text-brand-choc/75 block">
                Additional Design Specifications
              </label>
              <textarea
                placeholder="e.g. Please use matte white icing with red sprinkles and roses"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={1}
                className="w-full bg-brand-cream/35 text-xs border border-brand-pink-dark/15 rounded-xl px-4 py-2 focus:outline-none focus:border-brand-rosegold text-brand-choc"
              />
            </div>
          </div>

          {/* Client Details */}
          <div className="bg-brand-pink/25 border border-brand-pink-dark/10 rounded-2xl p-4 sm:p-5 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-bold text-brand-choc flex items-center gap-1.5">
              <sparkles className="h-4 w-4 text-brand-gold" />
              Your Booking Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div className="space-y-1.5 relative">
                <span className="absolute left-3.5 top-9 text-brand-choc/45">
                  <User className="h-4 w-4" />
                </span>
                <label className="text-[10px] uppercase font-bold text-brand-choc/70 block">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lindelani Nematandani"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-white text-xs border border-brand-pink-dark/15 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:outline-brand-rosegold text-brand-choc font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-brand-choc/70 block">Event Type</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-white text-xs border border-brand-pink-dark/15 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-rosegold text-brand-choc font-medium"
                >
                  <option value="Birthday">Birthday Celebrations</option>
                  <option value="Wedding">Wedding Day</option>
                  <option value="Graduation">Graduation Feast</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Corporate">Corporate Event</option>
                  <option value="Other">Other Happy Celebration</option>
                </select>
              </div>

              <div className="space-y-1.5 relative">
                <span className="absolute left-3.5 top-9 text-brand-choc/45">
                  <Calendar className="h-4 w-4" />
                </span>
                <label className="text-[10px] uppercase font-bold text-brand-choc/70 block">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-white text-xs border border-brand-pink-dark/15 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:outline-brand-rosegold text-brand-choc font-medium"
                />
              </div>
            </div>
          </div>

          {submissionSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 text-center text-xs font-bold rounded-xl animate-pulse">
              🎉 Quotation Compiled! Launching WhatsApp window...
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            id="builder-message-submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-widest uppercase py-4 rounded-2xl transition-all shadow-md hover:-translate-y-0.5 mt-2"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Compile Quote & Send to WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
}
