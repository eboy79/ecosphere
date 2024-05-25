import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/js/main.js',
  output: {
    file: 'dist/js/main.min.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    commonjs(),
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    }),
    terser(),
    postcss({
      plugins: [autoprefixer],
      extract: false,
      minimize: true,
      sourceMap: true
    })
  ],
  watch: {
    clearScreen: false
  }
};
