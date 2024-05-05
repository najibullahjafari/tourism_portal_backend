const mix = require("laravel-mix");
require("laravel-mix-vite");

mix.js("resources/js/app.js", "public/js").vite();
