// import { HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { ErrorConfig } from '../../../types/types';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class ErrorHandlerService {

//   constructor(
//     private toastr: ToastrService,
//     private router: Router
//   ) {}

//   handleHttpError(error: HttpErrorResponse, config: ErrorConfig = {}): void {
//     const {
//       showToast = true,
//       customMessage,
//       redirectTo,
//       logError = true
//     } = config;

//     if (logError) {
//       console.error('HTTP Error:', error);
//     }

//     const statusCode = error.status;
//     const errorMessage = customMessage || this.getErrorMessage(error);

//     if (showToast) {
//       this.showToastByStatus(statusCode, errorMessage);
//     }

//     if (redirectTo) {
//       this.router.navigate([redirectTo]);
//     }

//     // Handle specific actions based on status code
//     this.handleSpecificActions(statusCode);
//   }

//   private getErrorMessage(error: HttpErrorResponse): string {
//     // Try to extract message from different possible locations
//     if (error.error?.message) {
//       return error.error.message;
//     }
    
//     if (error.error?.error?.message) {
//       return error.error.error.message;
//     }
    
//     if (typeof error.error === 'string') {
//       return error.error;
//     }
    
//     return error.message || 'Une erreur inconnue est survenue';
//   }

//   private showToastByStatus(statusCode: number, message: string): void {
//     switch (statusCode) {
//       case 400:
//         this.toastr.error(message, 'Erreur de validation');
//         break;
//       case 401:
//         this.toastr.error(message, 'Non autorisé');
//         break;
//       case 403:
//         this.toastr.error('Accès interdit', 'Permissions insuffisantes');
//         break;
//       case 404:
//         this.toastr.error('Ressource non trouvée', 'Erreur 404');
//         break;
//       case 409:
//         this.toastr.error(message, 'Conflit');
//         break;
//       case 422:
//         this.toastr.error(message, 'Données invalides');
//         break;
//       case 429:
//         this.toastr.warning('Trop de requêtes', 'Limite atteinte');
//         break;
//       case 500:
//         this.toastr.error('Erreur serveur interne', 'Erreur serveur');
//         break;
//       case 502:
//       case 503:
//       case 504:
//         this.toastr.error('Service temporairement indisponible', 'Erreur serveur');
//         break;
//       case 0:
//         this.toastr.error('Problème de connexion réseau', 'Erreur réseau');
//         break;
//       default:
//         if (statusCode >= 500) {
//           this.toastr.error('Erreur serveur', `Erreur ${statusCode}`);
//         } else if (statusCode >= 400) {
//           this.toastr.error(message, `Erreur ${statusCode}`);
//         } else {
//           this.toastr.error(message, 'Erreur');
//         }
//     }
//   }

//   private handleSpecificActions(statusCode: number): void {
//     switch (statusCode) {
//       case 401:
//         // Clear tokens, redirect to login
//         localStorage.removeItem('token');
//         sessionStorage.removeItem('token');
//         this.router.navigate(['/login']);
//         break;
        
//       case 403:
//         // Maybe redirect to unauthorized page
//         break;
        
//       case 404:
//         // Maybe redirect to 404 page for certain routes
//         break;
//     }
//   }

//   // Method to handle errors with validation details
//   handleValidationError(error: any): void {
//     if (error.status === 422 && error.error?.errors) {
//       const validationErrors = error.error.errors;
//       Object.keys(validationErrors).forEach(field => {
//         const fieldErrors = validationErrors[field];
//         if (Array.isArray(fieldErrors)) {
//           fieldErrors.forEach(errorMsg => {
//             this.toastr.error(errorMsg, `Erreur - ${field}`);
//           });
//         }
//       });
//     } else {
//       this.handleHttpError(error);
//     }
//   }

// }
