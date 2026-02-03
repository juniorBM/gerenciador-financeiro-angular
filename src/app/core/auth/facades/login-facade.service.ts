import {inject, Injectable} from '@angular/core';
import {UserCredentials} from "../interfaces/user-credentials";
import {AuthService} from "../services/auth.service";
import {pipe, switchMap, tap} from "rxjs";
import {AuthTokenStorageService} from "../services/auth-token-storage.service";
import {LoggedInUserStoreService} from "../stores/logged-in-user-store.service";
import {AuthTokenResponse} from "../interfaces/auth-token-response";

@Injectable({
    providedIn: 'root',
})
export class LoginFacadeService {
    private readonly authService = inject(AuthService);
    private readonly authTokenService = inject(AuthTokenStorageService);
    private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);

    login(userCredentials: UserCredentials) {
        return this.authService.login(userCredentials).pipe(this.createUserSession());
    }

    refreshToken(token: string) {
        return this.authService.refreshToken(token).pipe(this.createUserSession());
    }

    private createUserSession() {
        return pipe(
            tap((response: AuthTokenResponse) => this.authTokenService.set(response.token)),
            switchMap((response) => this.authService.getCurrentUser(response.token)),
            tap(user => this.loggedInUserStoreService.setUser(user))
        )
    }
}
