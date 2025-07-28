// import { Injectable } from '@angular/core';
// import { KeycloakService } from 'keycloak-angular';
// import { Observable, from } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private keycloak: KeycloakService) {}

//   isAuthenticated(): boolean {
//     return this.keycloak.isLoggedIn();
//   }

//   getUserProfile(): Observable<any> {
//     return from(this.keycloak.loadUserProfile());
//   }

//   getUserRoles(): string[] {
//     return this.keycloak.getUserRoles();
//   }

//   getUsername(): string {
//     return this.keycloak.getUsername();
//   }

//   // Get access token
//   // getToken(): string {
//   //   return this.keycloak.getToken();
//   // }

//   login(): Observable<void> {
//     return from(this.keycloak.login());
//   }

//   logout(): Observable<void> {
//     return from(this.keycloak.logout(window.location.origin));
//   }

//   hasRole(role: string): boolean {
//     return this.keycloak.isUserInRole(role);
//   }

//   hasAnyRole(roles: string[]): boolean {
//     return roles.some(role => this.keycloak.isUserInRole(role));
//   }

//   updateToken(minValidity: number = 30): Observable<boolean> {
//     return from(this.keycloak.updateToken(minValidity));
//   }
// }