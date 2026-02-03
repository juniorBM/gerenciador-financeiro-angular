import {inject, Injectable} from '@angular/core';
import {LocalStorageToken} from '../tokens/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenStorageService {

  private readonly key: string = 'auth-token';
  localStorageToken = inject(LocalStorageToken)

  set(token: string): void {
    this.localStorageToken.setItem(this.key, token);
  }

  get(): string | null {
    return this.localStorageToken.getItem(this.key);
  }

  has(): boolean {
    return Boolean(this.get());
  }

  remove(): void {
      return this.localStorageToken.removeItem(this.key);
  }
}
