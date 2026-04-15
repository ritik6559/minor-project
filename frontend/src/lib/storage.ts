declare global {
  interface Window {
    storage: {
      list(prefix: string): Promise<{ keys: string[] } | null>;
      get(key: string): Promise<{ value: string } | null>;
      set(key: string, value: string): Promise<void>;
      delete(key: string): Promise<void>;
    };
  }
}

export async function storageList(prefix: string): Promise<string[]> {
  try {
    const r = await window.storage.list(prefix);
    return r?.keys ?? [];
  } catch(error) {
    console.log(error);
    return [];
  }
}

export async function storageGet<T>(key: string): Promise<T | null> {
  try {
    const r = await window.storage.get(key);
    return r ? JSON.parse(r.value) : null;
  } catch(error) {
    console.log(error)
    return null;
  }
}

export async function storageSet(key: string, val: unknown): Promise<void> {
  try {
    await window.storage.set(key, JSON.stringify(val));
  } catch(error) {
    console.log(error)
  }
}

export async function storageDel(key: string): Promise<void> {
  try {
    await window.storage.delete(key);
  } catch(error) {
    console.log(error)
  }
}
