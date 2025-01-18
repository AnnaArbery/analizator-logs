import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [react()],
    base: !isDev ? '/analizator-logs/' : '/',
    preview: {
      port: 7000,
    },
    server: {
      port: 7000,
    },
  };
});
