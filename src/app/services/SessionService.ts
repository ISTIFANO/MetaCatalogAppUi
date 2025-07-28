import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private storage: { [key: string]: any } = {};

  set(key: string, value: any): void {
    this.storage[key] = value;
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    return this.storage[key] || JSON.parse(localStorage.getItem(key) || 'null');
  }

  remove(key: string): void {
    delete this.storage[key];
    localStorage.removeItem(key);
  }

  clear(): void {
    this.storage = {};
    localStorage.clear();
  }
}