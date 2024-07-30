import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/dist/',
    build: {
        outDir: '../public/dist',
		emptyOutDir: true,
    },
	plugins: [vue()],
})
