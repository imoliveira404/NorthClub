import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  removeItem: (id: string, size: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "futz-cart";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const key = (i: CartItem) => `${i.id}__${i.size}`;
    return {
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      total: items.reduce((sum, i) => sum + i.quantity * i.price, 0),
      addItem: (item, quantity = 1) =>
        setItems((prev) => {
          const existing = prev.find(
            (i) => key(i) === `${item.id}__${item.size}`,
          );
          if (existing) {
            return prev.map((i) =>
              key(i) === `${item.id}__${item.size}`
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            );
          }
          return [...prev, { ...item, quantity }];
        }),
      updateQuantity: (id, size, quantity) =>
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((i) => key(i) !== `${id}__${size}`)
            : prev.map((i) =>
                key(i) === `${id}__${size}` ? { ...i, quantity } : i,
              ),
        ),
      removeItem: (id, size) =>
        setItems((prev) => prev.filter((i) => key(i) !== `${id}__${size}`)),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}
