export abstract class Service {
  protected getCached(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  protected setCache<T>(key: string, data: T): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
}
