const esbuild = require('esbuild');

// Browser
esbuild.build({
    entryPoints: ['./assets/js/effects.js'],
    outfile: './public/assets/dist/effects.js',
    minify: false,
    bundle: false,
    sourcemap: true,
    format: 'iife',
    globalName: 'CtmEffects',
    target: ['es2015']
}).catch((e) => console.error(e.message))
