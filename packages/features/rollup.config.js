import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import ttypescript from "ttypescript";

import pkg from "./package.json";

const extensions = [".ts", ".tsx"];
const input = "src/index.tsx";

const plugins = [
  peerDepsExternal(),
  resolve({ extensions }),
  typescript({ typescript: ttypescript }),
  commonjs({
    include: /node_modules/,
  }),
  babel({
    extensions,
    exclude: /node_modules/,
    babelHelpers: "bundled",
    babelrc: true,
  }),
];

const config = {
  input,
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
  plugins,
};

export default config;
