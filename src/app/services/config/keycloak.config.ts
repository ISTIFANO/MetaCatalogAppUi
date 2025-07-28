// import { KeycloakConfig } from 'keycloak-js';
// import { environment } from '../../../environments/environment';

// export const keycloakConfig: KeycloakConfig = {
//   url: environment.keycloak.url + '/realms/master/protocol/openid-connect/token',
//   realm:  environment.keycloak.realm,     
//   clientId: environment.keycloak.clientId,   
// };


// export const initOptions = {
//   onLoad: 'login-required' as const,
//   flow: 'standard' as const,
//   checkLoginIframe: false,
//   silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
// };