const esbuild = require('esbuild');

// Browser
esbuild.build({
    entryPoints: ['./assets/js/effects.js'],
    outfile: './public/assets/dist/effects.js',
    minify: true,
    bundle: true,
    sourcemap: false,
    format: 'iife',
    globalName: 'CtmEffects',
    target: ['es2015']
}).catch((e) => console.error(e.message))
