import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registered:', registration.scope);
        
        if (navigator.serviceWorker.controller) {
          console.log('✅ Page is controlled by Service Worker');
        } else {
          console.log('⚠️ Page not yet controlled. Reload may be needed.');
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'activated' && !navigator.serviceWorker.controller) {
                console.log('🔄 New Service Worker activated. Reloading...');
                window.location.reload();
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error('❌ Service Worker registration failed:', error);
      });
  });
  
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('🔄 Service Worker controller changed');
  });
}

createRoot(document.getElementById("root")!).render(<App />);
