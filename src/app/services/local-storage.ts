import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  setItem(key: string, value: object[]): void{
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): string | null{
    return localStorage.getItem(key);
  }

  remoteItem(key: string): void{
    localStorage.removeItem(key);
  }

  clear(): void{
    localStorage.clear();
  }
}
