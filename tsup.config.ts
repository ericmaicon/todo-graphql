import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  clean: true,
  onSuccess: 'cp src/graphql/schema.graphql dist/',
});
