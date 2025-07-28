// import { KeycloakService } from 'keycloak-angular';
// import { environment } from '../../../environments/environment';

// export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
//   return () =>
//     keycloak.init({
//       config: {
//         url: environment.config.url ,
//         realm:  environment.keycloak.realm,
//         clientId: environment.keycloak.clientId
//       },
//       initOptions: {
//         onLoad: 'login-required',
//         checkLoginIframe: false
//       },
//       enableBearerInterceptor: true,
//     });
// }
