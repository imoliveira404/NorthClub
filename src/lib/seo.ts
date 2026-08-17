export const SITE_URL = "https://northclub.com.br";
export const SITE_NAME = "North Football Club";

export const DEFAULT_KEYWORDS = [
  "camisas de time tailandesas 1.1",
  "camisas de futebol pronta entrega",
  "fornecedor camisas de futebol atacado",
  "camisas de time tailandesa pronta entrega brasil",
  "camisas retrô futebol 1.1",
  "camisa do flamengo tailandesa",
  "camisa do palmeiras tailandesa",
  "camisa do corinthians tailandesa",
  "camisa do sao paulo tailandesa",
  "mantos de futebol 1.1",
  "camisas de time atacado e varejo",
].join(", ");

export function buildSeoMeta({
  title,
  description,
  path = "",
  image = "/assets/hero-stadium.webp",
  keywords = DEFAULT_KEYWORDS,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string;
}) {
  const canonicalUrl = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "author", content: SITE_NAME },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { name: "theme-color", content: "#ec4899" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-title", content: SITE_NAME },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },

    // Open Graph / WhatsApp / Facebook
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:image", content: imageUrl },
    { property: "og:image:secure_url", content: imageUrl },
    { property: "og:image:type", content: "image/webp" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: `${title} — ${SITE_NAME}` },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: `${title} — ${SITE_NAME}` },
  ];
}

export function getStructuredDataJSON() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/favicon.svg`,
    "image": `${SITE_URL}/assets/hero-stadium.webp`,
    "description": "Loja especializada em camisas de time versão tailandesa 1.1 a pronta entrega com envio rápido para todo o Brasil.",
    "telephone": "+5511966973200",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR",
      "addressRegion": "SP"
    },
    "sameAs": [
      "https://wa.me/5511966973200"
    ]
  });
}
