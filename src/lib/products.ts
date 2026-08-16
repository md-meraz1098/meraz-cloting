export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  details: string[];
};

export const products: Product[] = [
  {
    id: "tailored-wool-coat",
    name: "Tailored Wool Coat",
    price: 428,
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop",
    description:
      "A precision-cut wool coat crafted for cold-weather elegance. Structured shoulders and a full canvas construction give it a timeless silhouette.",
    details: [
      "100% Italian virgin wool",
      "Full canvas construction",
      "Horn buttons",
      "Dry clean only",
    ],
  },
  {
    id: "silk-button-shirt",
    name: "Silk Button-Up Shirt",
    price: 168,
    category: "Shirts",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop",
    description:
      "A fluid silk shirt with mother-of-pearl buttons, designed to move effortlessly from studio to street.",
    details: [
      "100% mulberry silk",
      "Mother-of-pearl buttons",
      "Relaxed fit",
      "Hand wash cold",
    ],
  },
  {
    id: "cashmere-crewneck",
    name: "Cashmere Crewneck Sweater",
    price: 245,
    category: "Knitwear",
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1200&auto=format&fit=crop",
    description:
      "Ultra-soft cashmere knit in a classic crewneck cut, finished with ribbed cuffs and hem for a refined everyday layer.",
    details: [
      "100% grade-A cashmere",
      "Ribbed cuffs and hem",
      "Regular fit",
      "Hand wash cold",
    ],
  },
  {
    id: "straight-leg-trousers",
    name: "Straight-Leg Wool Trousers",
    price: 195,
    category: "Trousers",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200&auto=format&fit=crop",
    description:
      "Tailored straight-leg trousers with a high-rise waist, cut from a fine wool blend that holds its shape all day.",
    details: [
      "Wool-blend fabric",
      "High-rise, straight leg",
      "Side pockets, zip fly",
      "Dry clean only",
    ],
  },
  {
    id: "leather-ankle-boots",
    name: "Leather Ankle Boots",
    price: 312,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1200&auto=format&fit=crop",
    description:
      "Hand-finished leather ankle boots with a block heel and a supple sole built for all-day comfort.",
    details: [
      "Full-grain leather upper",
      "Leather sole with rubber grip",
      "Block heel, 4cm",
      "Made in Portugal",
    ],
  },
  {
    id: "linen-midi-dress",
    name: "Linen Midi Dress",
    price: 214,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop",
    description:
      "A breathable linen midi dress with a relaxed drape and self-tie waist, made for warm-weather ease.",
    details: [
      "100% European linen",
      "Self-tie waist",
      "Relaxed, midi length",
      "Machine wash cold",
    ],
  },
  {
    id: "premium-shirts",
    name: "Premium Shirts",
    price: 700,
    category: "Fshoin",
    image: "/shirt-demp.jpg",
    description: "Premium Shirts For Premium People",
    details: [
      "Premium fabric construction",
      "Tailored fit",
      "Reinforced stitching",
      "Dry clean recommended",
    ],
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}
