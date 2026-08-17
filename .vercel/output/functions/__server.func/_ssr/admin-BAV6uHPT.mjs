import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Toaster$1 } from "./sonner-DoFKumIW.mjs";
import { D as ImagePlus, E as LoaderCircle, T as Lock, a as Trash2, g as Pencil, h as Plus, p as Save, t as X, w as LogOut } from "../_libs/lucide-react.mjs";
import { i as formatBRL, n as SiteHeader, t as SiteFooter } from "./products-DoTCJ6Ja.mjs";
import { a as emptyDraft, c as upsertProduct, i as deleteProduct, o as listProducts, r as SIZE_OPTIONS, s as seedProducts, t as CATEGORIES } from "./admin-products-tqBJ-AOB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BAV6uHPT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AUTH_KEY = "futz-admin-auth";
var ADMIN_PASSWORD = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/"
}["VITE_ADMIN_PASSWORD"] || "futz-admin";
function isAdminAuthed() {
	if (typeof window === "undefined") return false;
	return window.sessionStorage.getItem(AUTH_KEY) === "1";
}
function adminSignIn(password) {
	if (typeof window === "undefined") return false;
	if (password !== ADMIN_PASSWORD) return false;
	window.sessionStorage.setItem(AUTH_KEY, "1");
	return true;
}
function adminSignOut() {
	if (typeof window === "undefined") return;
	window.sessionStorage.removeItem(AUTH_KEY);
}
var MAX_DIMENSION = 1e3;
var QUALITY = .8;
/** Lê um arquivo de imagem, redimensiona para no máximo 1000px e converte para WebP compacto. */
function compressImage(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			try {
				const scale = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
				const width = Math.max(1, Math.round(img.naturalWidth * scale));
				const height = Math.max(1, Math.round(img.naturalHeight * scale));
				const canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext("2d");
				if (!ctx) throw new Error("Canvas indisponível");
				ctx.drawImage(img, 0, 0, width, height);
				resolve(canvas.toDataURL("image/webp", QUALITY));
			} catch (error) {
				reject(error instanceof Error ? error : /* @__PURE__ */ new Error("Falha ao compactar a imagem"));
			} finally {
				URL.revokeObjectURL(url);
			}
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("Não foi possível carregar a imagem"));
		};
		img.src = url;
	});
}
function Label({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mb-1 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
		children
	});
}
var inputClass = "w-full border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary";
function PasswordGate({ onSuccess }) {
	const [password, setPassword] = (0, import_react.useState)("");
	function handleSubmit(event) {
		event.preventDefault();
		if (!password.trim()) return;
		if (!adminSignIn(password)) {
			toast.error("Senha incorreta.");
			setPassword("");
			return;
		}
		toast.success("Acesso liberado!");
		onSuccess();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex max-w-md flex-col px-4 py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-8 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-center font-display text-3xl uppercase tracking-tight text-foreground",
				children: "Painel de produtos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-sm text-muted-foreground",
				children: "Área interna da loja. Informe a senha de administrador para continuar."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "mt-8 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
						children: "Senha"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						type: "password",
						autoComplete: "current-password",
						value: password,
						onChange: (e) => setPassword(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "w-full bg-foreground py-4 text-xs font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary hover:text-primary-foreground",
					children: "Entrar no painel"
				})]
			})
		]
	});
}
function AdminPage() {
	const navigate = useNavigate();
	const [authed, setAuthed] = (0, import_react.useState)(false);
	const [products, setProducts] = (0, import_react.useState)(() => seedProducts());
	const [draft, setDraft] = (0, import_react.useState)(emptyDraft);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	const loadProducts = (0, import_react.useCallback)(async () => {
		const loaded = await listProducts();
		setProducts(loaded);
	}, []);
	(0, import_react.useEffect)(() => {
		setAuthed(isAdminAuthed());
	}, []);
	(0, import_react.useEffect)(() => {
		if (!authed) return;
		loadProducts();
	}, [authed, loadProducts]);
	function resetForm() {
		setDraft(emptyDraft());
		setEditingId(null);
		if (fileRef.current) fileRef.current.value = "";
	}
	function toggleSize(size) {
		setDraft((d) => ({
			...d,
			sizes: d.sizes.includes(size) ? d.sizes.filter((s) => s !== size) : [...d.sizes, size]
		}));
	}
	function handleImage(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			toast.error("Selecione um arquivo de imagem.");
			return;
		}
		if (file.size > 10485760) {
			toast.error("Imagem muito grande", { description: "Limite de 10 MB antes da compactação." });
			return;
		}
		setUploading(true);
		compressImage(file).then((dataUrl) => {
			setDraft((d) => ({
				...d,
				image: dataUrl
			}));
			toast.success("Imagem adicionada", { description: "Compactada automaticamente para não pesar a loja." });
		}).catch(() => {
			toast.error("Não foi possível processar a imagem.");
		}).finally(() => setUploading(false));
	}
	async function handleSubmit(event) {
		event.preventDefault();
		const name = draft.name.trim();
		if (name.length < 3) {
			toast.error("Informe um nome com pelo menos 3 caracteres.");
			return;
		}
		if (draft.price <= 0) {
			toast.error("Informe um preço maior que zero.");
			return;
		}
		if (draft.sizes.length === 0) {
			toast.error("Selecione ao menos um tamanho.");
			return;
		}
		if (!draft.image) {
			toast.error("Anexe uma imagem do produto.");
			return;
		}
		const payload = {
			name,
			price: draft.price,
			...draft.oldPrice !== void 0 ? { oldPrice: draft.oldPrice } : {},
			stock: draft.stock,
			sizes: draft.sizes,
			...draft.badge && draft.badge.trim() ? { badge: draft.badge.trim().slice(0, 40) } : {},
			category: draft.category,
			description: draft.description.trim().slice(0, 1200),
			image: draft.image,
			active: draft.active
		};
		setSaving(true);
		const saved = await upsertProduct(payload, editingId ?? void 0);
		setSaving(false);
		if (!saved) {
			toast.error("Não foi possível salvar", { description: "Não foi possível acessar o armazenamento do navegador." });
			return;
		}
		toast.success(editingId ? "Produto atualizado" : "Produto cadastrado");
		resetForm();
		loadProducts();
	}
	function startEdit(product) {
		setDraft({
			name: product.name,
			price: product.price,
			oldPrice: product.oldPrice,
			stock: product.stock,
			sizes: product.sizes,
			badge: product.badge ?? "",
			category: product.category,
			description: product.description,
			image: product.image,
			active: product.active
		});
		setEditingId(product.id);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	async function remove(id) {
		if (!await deleteProduct(id)) {
			toast.error("Não foi possível remover", { description: "Não foi possível acessar o armazenamento do navegador." });
			return;
		}
		if (editingId === id) resetForm();
		toast.success("Produto removido");
		loadProducts();
	}
	function handleLogout() {
		adminSignOut();
		setAuthed(false);
		resetForm();
		navigate({
			to: "/",
			search: {
				q: "",
				cat: "",
				size: "",
				sort: "recentes",
				min: 0,
				max: 0
			},
			replace: true
		});
	}
	if (!authed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordGate, { onSuccess: () => setAuthed(true) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-7xl px-4 py-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl uppercase tracking-tight text-foreground",
						children: "Painel de produtos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted-foreground",
						children: "Cadastre camisas com imagem, nome, preço, tamanhos, estoque e descrição. Imagens são compactadas e tudo fica salvo no navegador, publicado na vitrine automaticamente."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleLogout,
						className: "flex items-center gap-2 border border-border px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-foreground hover:border-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5" }), " Sair"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "h-fit space-y-6 border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl uppercase text-foreground",
									children: editingId ? "Editar produto" : "Novo produto"
								}), editingId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: resetForm,
									className: "flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" }), " Cancelar"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Imagem" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-28 shrink-0 items-center justify-center border border-dashed border-border bg-secondary",
									children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-muted-foreground" }) : draft.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: draft.image,
										alt: "Pré-visualização do produto",
										referrerPolicy: "no-referrer",
										className: "size-28 object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-6 text-muted-foreground" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											ref: fileRef,
											type: "file",
											accept: "image/*",
											onChange: handleImage,
											className: "w-full text-xs text-muted-foreground file:mr-3 file:border file:border-border file:bg-secondary file:px-3 file:py-2 file:text-[11px] file:font-bold file:uppercase file:tracking-widest file:text-foreground"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-[11px] text-muted-foreground",
											children: "JPG ou PNG, até 10 MB. A imagem é compactada para no máximo 1000px e convertida para WebP antes de salvar."
										}),
										draft.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setDraft((d) => ({
													...d,
													image: ""
												}));
												if (fileRef.current) fileRef.current.value = "";
											},
											className: "mt-2 text-[11px] font-bold uppercase tracking-widest text-destructive",
											children: "Remover imagem"
										})
									]
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome do produto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: inputClass,
									maxLength: 140,
									value: draft.name,
									onChange: (e) => setDraft({
										...draft,
										name: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Preço (R$)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: inputClass,
											type: "number",
											min: 0,
											step: "0.01",
											value: draft.price || "",
											onChange: (e) => setDraft({
												...draft,
												price: Number(e.target.value)
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Preço antigo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: inputClass,
											type: "number",
											min: 0,
											step: "0.01",
											value: draft.oldPrice ?? "",
											onChange: (e) => setDraft({
												...draft,
												oldPrice: e.target.value ? Number(e.target.value) : void 0
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Estoque" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: inputClass,
											type: "number",
											min: 0,
											step: 1,
											value: draft.stock,
											onChange: (e) => setDraft({
												...draft,
												stock: Number(e.target.value)
											})
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tamanhos disponíveis" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: SIZE_OPTIONS.map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => toggleSize(size),
									"aria-pressed": draft.sizes.includes(size),
									className: `border px-3 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${draft.sizes.includes(size) ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground"}`,
									children: size
								}, size))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: inputClass,
										value: draft.category,
										onChange: (e) => setDraft({
											...draft,
											category: e.target.value
										}),
										children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c,
											children: c
										}, c))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Selo (opcional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inputClass,
										maxLength: 40,
										placeholder: "Pronta entrega",
										value: draft.badge ?? "",
										onChange: (e) => setDraft({
											...draft,
											badge: e.target.value
										})
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: `${inputClass} min-h-28 resize-y`,
									maxLength: 1200,
									placeholder: "Material, caimento, detalhes de acabamento e prazo de envio.",
									value: draft.description,
									onChange: (e) => setDraft({
										...draft,
										description: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: draft.active,
									onChange: (e) => setDraft({
										...draft,
										active: e.target.checked
									})
								}), "Publicar na vitrine"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: saving,
								className: "flex w-full items-center justify-center gap-2 bg-foreground py-4 text-xs font-bold uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-60",
								children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : editingId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), editingId ? "Salvar alterações" : "Cadastrar produto"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "h-fit border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl uppercase text-foreground",
								children: "Cadastrados"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
								children: [products.length, " itens"]
							})]
						}), products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm text-muted-foreground",
							children: "Nenhum produto cadastrado ainda. Use o formulário ao lado para criar o primeiro."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 divide-y divide-border",
							children: products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: product.image,
									alt: product.name,
									loading: "lazy",
									referrerPolicy: "no-referrer",
									className: "size-16 shrink-0 object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-semibold text-foreground",
											children: [product.name, !product.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-2 text-[10px] uppercase text-muted-foreground",
												children: "(rascunho)"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-[11px] uppercase text-muted-foreground",
											children: [
												product.category,
												" · ",
												product.sizes.join(", "),
												" · ",
												product.stock,
												" em estoque"
											]
										}),
										product.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 line-clamp-2 text-[11px] text-muted-foreground",
											children: product.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex items-center gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-bold text-foreground",
													children: formatBRL(product.price)
												}),
												product.oldPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] text-muted-foreground line-through",
													children: formatBRL(product.oldPrice)
												}) : null,
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-label": `Editar ${product.name}`,
													onClick: () => startEdit(product),
													className: "ml-auto text-muted-foreground hover:text-primary",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-label": `Remover ${product.name}`,
													onClick: () => void remove(product.id),
													className: "text-muted-foreground hover:text-destructive",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
												})
											]
										})
									]
								})]
							}, product.id))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		]
	});
}
//#endregion
export { AdminPage as component };
