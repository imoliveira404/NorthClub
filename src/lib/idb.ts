const DB_NAME = "north-store";
const DB_VERSION = 1;
const STORE = "products";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      reject(new Error("IndexedDB indisponível"));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Falha ao abrir o armazenamento"));
  });
}

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (!dbPromise) dbPromise = openDB();
  return dbPromise;
}

async function withStore<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<unknown>,
): Promise<T> {
  const db = await getDB();
  return await new Promise<T>((resolve, reject) => {
    let result: unknown;
    const tx = db.transaction(STORE, mode);
    const request = run(tx.objectStore(STORE));
    request.onsuccess = () => {
      result = request.result;
    };
    request.onerror = () => reject(request.error ?? new Error("Falha no armazenamento"));
    tx.oncomplete = () => resolve(result as T);
    tx.onerror = () => reject(tx.error ?? new Error("Falha no armazenamento"));
    tx.onabort = () => reject(tx.error ?? new Error("Transação cancelada"));
  });
}

export function getAllRecords<T>(): Promise<T[]> {
  return withStore<T[]>("readonly", (store) => store.getAll() as IDBRequest<unknown>);
}

export function putRecord<T>(value: T): Promise<void> {
  return withStore<void>("readwrite", (store) => store.put(value) as IDBRequest<unknown>);
}

export function deleteRecord(id: string): Promise<void> {
  return withStore<void>("readwrite", (store) => store.delete(id) as IDBRequest<unknown>);
}

export function clearRecords(): Promise<void> {
  return withStore<void>("readwrite", (store) => store.clear() as IDBRequest<unknown>);
}
