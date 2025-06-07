import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],      // Your entry file
  format: ['esm', 'cjs'],      // Build both module systems
  dts: true,                   // Generate .d.ts type files
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',              // Output directory
})