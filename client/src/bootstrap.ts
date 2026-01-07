/**
 * Service Worker Registration Bootstrap
 * 
 * This module handles service worker registration for PWA functionality.
 * Extracted from inline script to comply with Content Security Policy.
 */

export function registerServiceWorker() {
  // Only register if service worker is supported and PWA is enabled
  if ('serviceWorker' in navigator && import.meta.env.VITE_PWA_ENABLED === 'true') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful');
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  } else if (import.meta.env.VITE_PWA_ENABLED !== 'true' && import.meta.env.DEV) {
    console.log('PWA disabled (VITE_PWA_ENABLED not set to true)');
  }
}
