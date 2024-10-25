import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Thêm các đuôi để Vite nhận diện
    },
    esbuild: {
        loader: { '.js': 'jsx' },
        include: /src\/.*\.(js|jsx)$/, // Áp dụng loader cho các tệp .js và .jsx trong thư mục src
        exclude: /node_modules/, // Bỏ qua node_modules
    },
    server: {
        port: 3005, // Đặt cổng tùy chỉnh tại đây
        proxy: {
            '/api': {
                target: process.env.VITE_API_ENDPOINT,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
