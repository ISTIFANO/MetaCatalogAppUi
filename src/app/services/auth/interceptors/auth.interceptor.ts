// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { KeycloakService } from 'keycloak-angular';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const keycloakService = inject(KeycloakService);

//   if (keycloakService.getKeycloakInstance().authenticated) {
//       const token = keycloakService.getKeycloakInstance().token;
//       if (token) {
//         const authReq = req.clone({
//           headers: req.headers.set('Authorization', 'Bearer ' + token)
//         });
//         return next(authReq);
//       }
//   }

//   return next(req);
// // };