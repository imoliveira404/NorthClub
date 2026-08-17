import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-2y9krRSi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "futz-cart";
var CartContext = (0, import_react.createContext)(null);
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setItems(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	}, [items, hydrated]);
	const value = (0, import_react.useMemo)(() => {
		const key = (i) => `${i.id}__${i.size}`;
		return {
			items,
			count: items.reduce((sum, i) => sum + i.quantity, 0),
			total: items.reduce((sum, i) => sum + i.quantity * i.price, 0),
			addItem: (item, quantity = 1) => setItems((prev) => {
				if (prev.find((i) => key(i) === `${item.id}__${item.size}`)) return prev.map((i) => key(i) === `${item.id}__${item.size}` ? {
					...i,
					quantity: i.quantity + quantity
				} : i);
				return [...prev, {
					...item,
					quantity
				}];
			}),
			updateQuantity: (id, size, quantity) => setItems((prev) => quantity <= 0 ? prev.filter((i) => key(i) !== `${id}__${size}`) : prev.map((i) => key(i) === `${id}__${size}` ? {
				...i,
				quantity
			} : i)),
			removeItem: (id, size) => setItems((prev) => prev.filter((i) => key(i) !== `${id}__${size}`)),
			clear: () => setItems([])
		};
	}, [items]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
	return ctx;
}
//#endregion
export { useCart as n, CartProvider as t };
