import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // overlay: false,
})

// export default {
//   server: {
//     hmr: {
//       overlay: false,
//     },
//   },
// };
