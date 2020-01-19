import rimraf from 'rimraf';
import ts from '@rollup/plugin-typescript';
import loadz0r from "rollup-plugin-loadz0r";
import { readFileSync } from 'fs';
import html from '@rollup/plugin-html';

rimraf.sync("./public/dist");

function build({ watch } = {}) {
  return {
    input: 'index.ts',
    output: {
      dir: './dist',
      format: 'amd',
      sourcemap: watch,
      entryFileNames: "[name].js",
      chunkFileNames: "[name]-[hash].js"
    },
    watch: { clearScreen: false },
    plugins: [
      loadz0r({
        loader: readFileSync("./lib/loadz0r-loader.ejs").toString(),
        prependLoader: (chunk, inputs) => {
          return (
            Object.keys(chunk.modules).some(mod =>
              /worker\/index\.[jt]s$/.test(mod)
            ) || loadz0r.isEntryModule(chunk, inputs)
          );
        }
      }),
      ts({ tsconfig: './tsconfig.json'}),
      html()
    ]
  }
}

export default function({ watch }) {
  return [build({ watch })];
}