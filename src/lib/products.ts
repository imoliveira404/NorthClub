import jersey1 from "@/assets/jersey-1.webp";
import jersey2 from "@/assets/jersey-2.webp";
import jersey3 from "@/assets/jersey-3.webp";
import jersey4 from "@/assets/jersey-4.webp";
import jersey5 from "@/assets/jersey-5.webp";
import jersey6 from "@/assets/jersey-6.webp";

export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  stock: number;
  sizes: string[];
  badge?: string;
};

const SIZES = ["P", "M", "G", "GG", "2XL", "3GG"];

export const brasileirao: Product[] = [
  {
    id: "verde-i",
    name: "Camisa Listrada Verde I 2025/26 Torcedor Masculina",
    price: 139.90,
    oldPrice: 179.90,
    image: jersey1,
    stock: 12,
    sizes: SIZES,
    badge: "Pronta entrega",
  },
  {
    id: "preto-branco-i",
    name: "Camisa Listrada Preto e Branco I 2025/26 Torcedor",
    price: 139.90,
    oldPrice: 179.90,
    image: jersey2,
    stock: 4,
    sizes: SIZES,
  },
  {
    id: "azul-i",
    name: "Camisa Azul Royal I 2025/26 Torcedor Masculina",
    price: 139.90,
    oldPrice: 179.90,
    image: jersey3,
    stock: 9,
    sizes: SIZES,
  },
  {
    id: "vermelho-i",
    name: "Camisa Vermelha e Preta I 2025/26 Torcedor Masculina",
    price: 139.90,
    oldPrice: 179.90,
    image: jersey4,
    stock: 2,
    sizes: SIZES,
    badge: "Últimas peças",
  },
];

export const internacionais: Product[] = [
  {
    id: "branca-ii",
    name: "Camisa Branca Ouro II 2025/26 Torcedor Masculina",
    price: 139.90,
    oldPrice: 179.90,
    image: jersey5,
    stock: 15,
    sizes: SIZES,
  },
  {
    id: "amarela-i",
    name: "Camisa Amarela Seleção I 2025/26 Torcedor Masculina",
    price: 139.90,
    oldPrice: 179.90,
    image: jersey6,
    stock: 7,
    sizes: SIZES,
    badge: "Mais vendida",
  },
  {
    id: "azul-ii",
    name: "Camisa Azul Treino 2025/26 Torcedor Masculina",
    price: 139.90,
    oldPrice: 179.90,
    image: jersey3,
    stock: 21,
    sizes: SIZES,
  },
  {
    id: "verde-ii",
    name: "Camisa Listrada Verde II 2025/26 Torcedor Masculina",
    price: 139.90,
    oldPrice: 179.90,
    image: jersey1,
    stock: 5,
    sizes: SIZES,
  },
];

export const teams = [
  "Flamengo",
  "Palmeiras",
  "Corinthians",
  "São Paulo",
  "Vasco",
  "Santos",
  "Cruzeiro",
  "Atlético-MG",
  "Botafogo",
  "Internacional",
  "Grêmio",
  "Fluminense",
  "Bahia",
  "Fortaleza",
  "Sport",
  "Ceará",
];

export const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
