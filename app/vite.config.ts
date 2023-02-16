import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {

  const ENV = loadEnv(mode, process.cwd());

  return { plugins: [react()], define: { 'VITE_API_URL': ENV['API_URL'] } }
});
