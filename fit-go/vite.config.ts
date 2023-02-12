import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ 
    manifest: {  
      name: 'FitGo',  
      short_name: 'FitGo',  
      description: 'FitGo l application idéale pour les sportifs',  
      theme_color: '#ffffff', 
      start_url: '/',
      icons: [  
        {  
          src: 'pwa-192x192.png',  
          sizes: '192x192',  
          type: 'image/png',  
        },  
        {  
          src: 'pwa-512x512.png',  
          sizes: '512x512',  
          type: 'image/png',  
        }, 
        {
          src: 'pwa-512x512.png',  
          sizes: '512x512',  
          type: 'image/png',  
          purpose: 'any maskable',  
        }, 
      ],  
    },  
  }), ],
});
