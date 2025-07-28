// import { Injectable } from '@angular/core';
// import { KeycloakProfile } from 'keycloak-js';
// import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
// import { KeycloakService } from 'keycloak-angular';
// import { catchError, tap, map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class KeycloakProfileService {
//   private userProfileSubject = new BehaviorSubject<KeycloakProfile | null>(null);
//   public userProfile$ = this.userProfileSubject.asObservable();

//   constructor(private keycloakService: KeycloakService) {}

//   /**
//    * Get user profile from Keycloak
//    * @returns Observable<KeycloakProfile>
//    */
//   getUserProfile(): Observable<KeycloakProfile> {
//     return from(this.keycloakService.loadUserProfile()).pipe(
//       tap(profile => {
//         this.userProfileSubject.next(profile);
//       }),
//       catchError(error => {
//         console.error('Error loading user profile:', error);
//         return throwError(() => error);
//       })
//     );
//   }

//   /**
//    * Get current cached user profile
//    * @returns KeycloakProfile | null
//    */
//   getCurrentUserProfile(): KeycloakProfile | null {
//     return this.userProfileSubject.value;
//   }

//   /**
//    * Get user profile synchronously (if already loaded)
//    * @returns Promise<KeycloakProfile>
//    */
//   async getUserProfileAsync(): Promise<KeycloakProfile> {
//     try {
//       return await this.keycloakService.loadUserProfile();
//     } catch (error) {
//       console.error('Error loading user profile:', error);
//       throw error;
//     }
//   }

//     /**
//    * Check if user is authenticated
//    * @returns boolean
//    */
//   isAuthenticated(): boolean {
//     return this.keycloakService.isLoggedIn();
//   }

  
//   /**
//    * Get user roles
//    * @returns string[]
//    */
//   getUserRoles(): string[] {
//     return this.keycloakService.getUserRoles();
//   }
  
// }