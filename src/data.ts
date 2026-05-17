import { CakeProduct, GalleryItem, Testimonial } from "./types";

export const BRAND_PHONE = "+27768251182";
export const BRAND_WHATSAPP_LINK = "https://wa.me/27768251182";
export const BRAND_EMAIL = "orders@ndiphodzocakes.co.za";
export const BRAND_LOCATION = "Dopeni, Venda, Limpopo";
export const BRAND_HOURS = "Mon - Sat: 08:00 - 17:00 | Sun: Closed (Deliveries only)";

export const FLAVORS = [
  "Double Chocolate Fudge - Decadent cocoa layers with dark chocolate ganache",
  "Madagascan Vanilla Velvet - Signature soft vanilla sponge with whipped cream",
  "Red Velvet Delight - Crimson luxury layers with creamy white-chocolate frosting",
  "Salted Caramel Butterscotch - Caramelized sponge with sea-salted caramel drip",
  "Creamy Zesty Lemon - Fluffy sponge layered with handcrafted tangy lemon curd",
  "Rich Espresso Mocha - Dark coffee-infused sponge with chocolate-coffee cream"
];

export const FROSTINGS = [
  "Signature Swiss Meringue Buttercream (Soft & Less Sweet)",
  "Decadent Belgian Chocolate Ganache",
  "Classic Smooth Cream Cheese Icing",
  "Traditional Royal Fondant Crafting"
];

export const TOPPINGS = [
  { name: "Edible 24k Gold Leaf", price: 80 },
  { name: "Fresh Signature Roses", price: 120 },
  { name: "Assorted French Macarons", price: 100 },
  { name: "Gourmet Chocolate Drip", price: 50 },
  { name: "Personalized Glitter Topper", price: 60 },
  { name: "Fresh Berries & Fig Medley", price: 150 }
];

export const CAKE_SIZES = [
  { label: "Petite Sweet (15cm - Serves 6-8)", priceModifier: 0 },
  { label: "Celebration Medium (20cm - Serves 12-16)", priceModifier: 180 },
  { label: "Grand Feast (25cm - Serves 20-25)", priceModifier: 350 },
  { label: "Double Royale Tier (15cm + 20cm - Serves 30-35)", priceModifier: 750 },
  { label: "Majestic Triple Tier (Wedding - Serves 60+)", priceModifier: 1600 }
];

export const CAKE_PRODUCTS: CakeProduct[] = [
  {
    id: "dopeni-majestic",
    name: "The Dopeni Gold Majestic",
    category: "wedding",
    price: 1350,
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=800",
    description: "Our signature wedding masterpiece. Shimmering edible gold veins meet cascading blush roses, layered with silky vanilla velvet & luxury swiss buttercream.",
    bestSeller: true,
    flavors: ["Madagascan Vanilla Velvet", "Red Velvet Delight", "Double Chocolate Fudge"],
    sizes: [
      { label: "Petite Sweet (15cm)", priceModifier: 0 },
      { label: "Celebration Medium (20cm)", priceModifier: 180 },
      { label: "Grand Feast (25cm)", priceModifier: 350 },
      { label: "Double Royale Tier (15cm + 20cm)", priceModifier: 750 },
      { label: "Majestic Triple Tier", priceModifier: 1600 }
    ],
    rating: 5,
    reviewsCount: 34
  },
  {
    id: "rose-all-day",
    name: "Rosé All Day Floral Crown",
    category: "birthday",
    price: 850,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
    description: "Sophisticated birthday elegance. Features textured ombre pink frosting, an absolute crown of biological organic roses, and delicious gold drips.",
    bestSeller: true,
    flavors: ["Red Velvet Delight", "Madagascan Vanilla Velvet", "Zesty Lemon Cream"],
    sizes: [
      { label: "Petite Sweet (15cm)", priceModifier: 0 },
      { label: "Celebration Medium (20cm)", priceModifier: 180 },
      { label: "Grand Feast (25cm)", priceModifier: 350 },
      { label: "Double Royale Tier (15cm + 20cm)", priceModifier: 750 }
    ],
    rating: 4.9,
    reviewsCount: 28
  },
  {
    id: "chocolate-ganache-classic",
    name: "Death By Chocolate Ganache",
    category: "celebration",
    price: 650,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
    description: "Intense black cocoa sponge layers saturated with liquid gold Belgian chocolate ganache, decorated with dark chocolate curls and gold leaf dusting.",
    bestSeller: false,
    flavors: ["Double Chocolate Fudge", "Rich Espresso Mocha"],
    sizes: [
      { label: "Petite Sweet (15cm)", priceModifier: 0 },
      { label: "Celebration Medium (20cm)", priceModifier: 150 },
      { label: "Grand Feast (25cm)", priceModifier: 300 },
      { label: "Double Royale Tier", priceModifier: 650 }
    ],
    rating: 4.8,
    reviewsCount: 41
  },
  {
    id: "salted-caramel-premium",
    name: "Salted Caramel Pecan Premium",
    category: "luxury",
    price: 780,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800",
    description: "A decadent pairing of roasted toasted pecans, homemade recipe butterscotch drizzle, and layers of rich moist caramelized sponge.",
    bestSeller: true,
    flavors: ["Salted Caramel Butterscotch", "Double Chocolate Fudge"],
    sizes: [
      { label: "Petite Sweet (15cm)", priceModifier: 0 },
      { label: "Celebration Medium (20cm)", priceModifier: 180 },
      { label: "Grand Feast (25cm)", priceModifier: 350 }
    ],
    rating: 5,
    reviewsCount: 19
  },
  {
    id: "vintage-piping-cherry",
    name: "Classic Vintage Piping Royal",
    category: "birthday",
    price: 790,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=800",
    description: "Elegant retro Pinterest-style design. Elaborate royal lambeth piping technique with custom text engraving, crowned with sweet glaciated cherries.",
    bestSeller: false,
    flavors: ["Madagascan Vanilla Velvet", "Red Velvet Delight", "Rich Espresso Mocha"],
    sizes: [
      { label: "Petite Sweet (15cm)", priceModifier: 0 },
      { label: "Celebration Medium (20cm)", priceModifier: 180 },
      { label: "Grand Feast (25cm)", priceModifier: 350 }
    ],
    rating: 4.9,
    reviewsCount: 22
  },
  {
    id: "red-velvet-crown",
    name: "Red Velvet Splendor Crown",
    category: "luxury",
    price: 720,
    image: "https://images.unsplash.com/photo-1616690710400-a16d5569ca1a?auto=format&fit=crop&q=80&w=800",
    description: "Deep crimson light crumb sponge separated by velvety white chocolate vanilla cream cheese layers, finished with luxury white velvet flock spraying.",
    bestSeller: false,
    flavors: ["Red Velvet Delight"],
    sizes: [
      { label: "Petite Sweet (15cm)", priceModifier: 0 },
      { label: "Celebration Medium (20cm)", priceModifier: 150 },
      { label: "Grand Feast (25cm)", priceModifier: 300 }
    ],
    rating: 4.7,
    reviewsCount: 15
  },
  {
    id: "gourmet-cupcakes-box",
    name: "Assorted Gourmet Cupcake Box",
    category: "cupcakes",
    price: 290,
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800",
    description: "Perfect parcel of 12 luxury cupcakes comprising 4x Red Velvet, 4x Double Chocolate and 4x Madagascan Vanilla, decorated with luxury pearls and gold flecks.",
    bestSeller: true,
    flavors: ["Assorted Favorites"],
    sizes: [
      { label: "Luxury Box of 12", priceModifier: 0 },
      { label: "Grand Host Box of 24", priceModifier: 260 }
    ],
    rating: 5,
    reviewsCount: 57
  },
  {
    id: "luxury-treat-box",
    name: "Celebration Luxe Treat Box",
    category: "treats",
    price: 380,
    image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=800",
    description: "Ideal gift option. Comes with 4 exquisite French macarons, 4 chocolate-dipped cake pops, 2 luxury mini donuts, and personalized sugar biscuits.",
    bestSeller: false,
    flavors: ["Baker's Selection of Flavoring"],
    sizes: [
      { label: "Standard Celebration Box", priceModifier: 0 },
      { label: "Double Deluxe Box", priceModifier: 320 }
    ],
    rating: 4.8,
    reviewsCount: 13
  },
  {
    id: "unicorn-whispers-kids",
    name: "Unicorn Whispers & Rainbows",
    category: "celebration",
    price: 680,
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&q=80&w=800",
    description: "An absolute dream cake for the little ones! Rainbow tier fillings, soft whipped magic buttercream, custom unicorn golden horn, and magical pastel swirls.",
    bestSeller: false,
    flavors: ["Madagascan Vanilla Velvet", "Double Chocolate Fudge"],
    sizes: [
      { label: "Petite Sweet (15cm)", priceModifier: 0 },
      { label: "Celebration Medium (20cm)", priceModifier: 180 },
      { label: "Grand Feast (25cm)", priceModifier: 350 }
    ],
    rating: 4.9,
    reviewsCount: 31
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "review-1",
    name: "Phathutshedzo Netshifhefhe",
    eventType: "Luxurious Wedding, Thohoyandou",
    rating: 5,
    review: "I ordered the Majestic Triple Tier wedding cake for my daughter's wedding in Thohoyandou. It was spectacular! Absolute perfection. Guests are still asking who bakes such heavenly, elegant cakes! Thank you, Ndiphodzo!",
    date: "April 2026",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "review-2",
    name: "Lindiwe Baloyi",
    eventType: "30th Birthday Party, Dopeni",
    rating: 5,
    review: "The Rosé All Day cake took my breath away. It looked completely luxurious and tasted even better. Very responsive over WhatsApp and highly professional. Highly recommended!",
    date: "May 2026",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "review-3",
    name: "Tshilidzi Munyai",
    eventType: "Kids Corporate Day, Sibasa",
    rating: 5,
    review: "The custom cupcakes and treat boxes were highly fresh, and the chocolate was out of this world. Delivery to Sibasa was fast and correct on time. Best baker in Limpopo!",
    date: "March 2026",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "review-4",
    name: "Nomsa Nkosi",
    eventType: "Anniversary Cake, Louis Trichardt",
    rating: 5,
    review: "Best Customer service, they customized the cake exactly like the picture I sent. The Salted Caramel flavor is highly addictive! Booking was so effortless via WhatsApp.",
    date: "February 2026",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    title: "Elegant 3-Tier Blush Wedding",
    category: "wedding",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=800",
    description: "Decorated with biological roses and delicate gold foliage."
  },
  {
    id: "g-2",
    title: "Double-tier Red Velvet Crown",
    category: "luxury",
    image: "https://images.unsplash.com/photo-1616690710400-a16d5569ca1a?auto=format&fit=crop&q=80&w=800",
    description: "Stately appearance for a premium brand birthday celebration."
  },
  {
    id: "g-3",
    title: "Hand-piped Vintage Buttercream",
    category: "birthday",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=800",
    description: "Artisanal Lambeth vintage design with gloss cherries."
  },
  {
    id: "g-4",
    title: "Signature Rosebud Cupcakes",
    category: "cupcakes",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800",
    description: "Double chocolate bases topped with vanilla bean rosettes."
  },
  {
    id: "g-5",
    title: "Dessert Box French Macarons",
    category: "treats",
    image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=800",
    description: "Decadent box sets including gourmet macarons and mini pops."
  },
  {
    id: "g-6",
    title: "Gourmet Salted Caramel Glaze",
    category: "luxury",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800",
    description: "Handcrafted pecan butterscotch drip decoration close-up."
  },
  {
    id: "g-7",
    title: "Double Choc Mud Celebration Block",
    category: "celebration",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
    description: "Satisfying rich chocolate cream frosting anniversary design."
  },
  {
    id: "g-8",
    title: "Magical Pastel Swirls Kids",
    category: "birthday",
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&q=80&w=800",
    description: "Rainbow cake with clouds and golden horn for kids."
  },
  {
    id: "g-9",
    title: "Symphony Rose Macaron Tower",
    category: "luxury",
    image: "https://images.unsplash.com/photo-1535140728325-a4d3707eee61?auto=format&fit=crop&q=80&w=800",
    description: "A gorgeous modern wedding or anniversary piece with hand-turned pastel macarons cascading gracefully."
  },
  {
    id: "g-10",
    title: "Blueberry Lavender Velvet Zest",
    category: "celebration",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=800",
    description: "Delicate lavender-tinted cream topped with plump fresh local blueberries and white-chocolate shards."
  },
  {
    id: "g-11",
    title: "Emerald Forest Gold-Speckled",
    category: "luxury",
    image: "https://images.unsplash.com/photo-1557925923-cd4648e21187?auto=format&fit=crop&q=80&w=800",
    description: "Spackled gold-leaf detailing on deep velvet buttercream layers, perfect for high-class corporate launches."
  },
  {
    id: "g-12",
    title: "Classic Court Lambeth Vintage",
    category: "birthday",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=800",
    description: "Traditional pristine white piping royal technique with high density detail work for classic vintage celebrants."
  },
  {
    id: "g-13",
    title: "Harvest Wild Fig & Berry Drip",
    category: "wedding",
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&q=80&w=800",
    description: "Stunning rustic naked chocolate cake topped with freshly cut figs, biological berries, and gourmet honeycomb."
  },
  {
    id: "g-14",
    title: "Orange Blossom Pastel Citrus",
    category: "celebration",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800",
    description: "Whimsical summer cake with real dried blood orange wheels, meringue details and delicate yellow rosettes."
  },
  {
    id: "g-15",
    title: "Parchment Heart Hand-Painted Tart",
    category: "treats",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800",
    description: "Decadent cream-filled heart tart cookie, decorated with soft pink rose petals and white chocolate pearls."
  },
  {
    id: "g-16",
    title: "Cozy Cloud White Meringue Crown",
    category: "birthday",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bdf7f81b1?auto=format&fit=crop&q=80&w=800",
    description: "A minimalist rustic white-frosted cake topped with hand-baked meringue cookies and a sprinkle of organic lavender."
  }
];

export const FAQS = [
  {
    question: "How do I place an order with Ndiphodzo Cakes and Treats?",
    answer: "Placing an order is extremely simple! You can browse our Cakes Catalog here, select your desired flavor, size, and adding custom inscription, then click the WhatsApp button. This instantly adds it to your cart or generates a pre-filled WhatsApp message. Alternatively, you can use our Interactive Custom Order form to build your cake from scratch and submit the quote directly to us on WhatsApp (+27 76 825 1182)."
  },
  {
    question: "Can I customize the cake design and flavor?",
    answer: "Absolutely! We specialize in custom cakes. You can choose from our luxurious sponge flavors (Double Chocolate Fudge, Red Velvet Delight, Madagascan Vanilla Velvet, Salted Caramel Butterscotch, Creamy Zesty Lemon, Mocha Espresso), select your preferred frosting, specify a tiered layout, and customize the toppings (e.g., fresh signature roses, gold leaf, customized cake toppers, or berries)."
  },
  {
    question: "Do you deliver to my location? How much is delivery?",
    answer: "We are based in DOPENI and deliver throughout Venda (including Thohoyandou, Sibasa, Makwarela, Louis Trichardt, and surrounding Limpopo areas). Delivery fees are calculated based on your exact distance from Dopeni. Secure delivery for multi-tier wedding cakes is highly recommended so that our bakery master delivers the cake in perfect condition."
  },
  {
    question: "How many days in advance should I book my cake?",
    answer: "For standard celebration cakes, birthday cakes, and cupcakes, we require at least 2 to 4 days' notice. For elaborate custom designs and wedding cakes, we recommend booking at least 1 to 2 weeks in advance to secure your slot, as we prioritize quality and handcraft every single floral and cream element by hand."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept EFT (Electronic Funds Transfer), cash deposits, and secure card transactions. We require a 50% non-refundable deposit to secure your booking date, with the balance payable either 24 hours before or on delivery/collection."
  },
  {
    question: "Can you recreate a cake design from a photo?",
    answer: "Yes, we love inspiration photos! In our Custom Orders page, you can describe your dream cake and even paste/list design details. When we connect over WhatsApp, you can send us any Pinterest or Instagram reference images, and we will model it with luxury premium finishing."
  }
];
