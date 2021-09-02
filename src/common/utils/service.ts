export abstract class Service {
  protected getCached(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  protected setCache<T>(key: string, data: T): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
}

export function getCached<T>(key: string): T | null {
  const data = window.localStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : null;
}

export function setCache<T>(key: string, data: T): void {
  window.localStorage.setItem(key, JSON.stringify(data));
}

export function isCached(key: string): boolean {
  return !!window.localStorage.getItem(key);
}
