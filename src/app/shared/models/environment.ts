export const environment = {
  production: false,
  apiUrl: 'https://fedd573d3b09.ngrok-free.app/wordpress/',
  appName: 'MetaCatalogApp',
  version: '1.0.0',
  
  // Configuration API
  api: {
    baseUrl: 'https://fedd573d3b09.ngrok-free.app/wordpress/',
    timeout: 30000, // 30 secondes
    retryAttempts: 3,
    endpoints: {
      products: '/products',
      auth: '/auth',
      users: '/users',
      stats: '/stats'
    }
  },

  // Configuration des fonctionnalités
  features: {
    enableNotifications: true,
    enableAnalytics: false,
    enableDebugMode: true,
    maxFileUploadSize: 5242880, // 5MB
    itemsPerPage: 12
  },

  // Configuration de logging
  logging: {
    level: 'debug', // 'error', 'warn', 'info', 'debug'
    enableConsoleLog: true,
    enableRemoteLogging: false
  },

  // Configuration des notifications
  notifications: {
    position: 'toast-top-right',
    timeout: 3000,
    showProgressBar: true,
    enableSound: false
  },

  // Configuration de l'authentification (si nécessaire)
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    tokenExpirationBuffer: 300000 // 5 minutes en ms
  }
};