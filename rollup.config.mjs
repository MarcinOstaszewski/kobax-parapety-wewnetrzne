import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts', // Entry point of your TypeScript files
  output: {
    file: 'dist_kalkulator/bundle.js', // Output file
    format: 'iife', // Immediately Invoked Function Expression
    name: 'MyBundle', // Global variable name for the bundle
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json" // Path to your tsconfig.json file
    })
  ]
};
