export default {
    input: "src/plugin.mjs",
    external: [ 'node-fetch', 'url' ],
    output: [
      { file: "dist/plugin.cjs.js", format: "cjs" },
    ]
};
