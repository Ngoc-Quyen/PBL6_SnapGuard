import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
console.log('Vite config loaded');

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Đặt cổng tùy chỉnh tại đây
        proxy: {
            '/api': {
                target: 'http://localhost:5100/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
