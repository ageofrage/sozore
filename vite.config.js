import {resolve} from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `sozore.${format}.js`
    }
  },
  rollupOptions: {
    output: {
      preserveModules: true,
      exports: 'named',
    }
  },
  test: {
    globals: true,
  }
})