if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,c,n)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const t={uri:location.origin+s.slice(1)};return Promise.all(c.map(s=>{switch(s){case"exports":return a;case"module":return t;default:return e(s)}})).then(e=>{const s=n(...e);return a.default||(a.default=s),a})}))}}define("./sw.js",["./workbox-c2b5e142"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/71247caf95475e3ea7f9a0f8a30beb258b23d005.72903ec5e5ef2cb0a360.js",revision:"23d5ce39b0084c0de1edf49cb1efc24b"},{url:"/_next/static/chunks/commons.d700607b675274da2417.js",revision:"dca8734056492617ce711c42ab7119b8"},{url:"/_next/static/chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.184af87df5dc93d762a1.js",revision:"01a11044717e07e6334408c0f7b91c8f"},{url:"/_next/static/chunks/framework.1d36bc031662b4dc4c28.js",revision:"7eafc2b810ea3395615465510119d273"},{url:"/_next/static/chunks/main-a6d1146a39a99ec522e9.js",revision:"ab79ad8c843c20c8f549db2da2c24779"},{url:"/_next/static/chunks/pages/_app-e377c99e2fc6c81c90b5.js",revision:"4266aa31dbde3ae79865fe29821dc23d"},{url:"/_next/static/chunks/pages/_error-56dc58b7598aa79d4584.js",revision:"0520e0ff91b8c009597d2431114a2fc5"},{url:"/_next/static/chunks/pages/index-759659bb47cf29bb0bf6.js",revision:"9649d1130f394a1cc65a0b8746ed7a88"},{url:"/_next/static/chunks/polyfills-78705b198ab7d012011b.js",revision:"fbfcf46e8cf294e94ceca2f41c04988c"},{url:"/_next/static/chunks/webpack-eb080e3f091731f228fb.js",revision:"2019297a9ccffe0e261600bad1b1f98a"},{url:"/_next/static/css/d750bfe38c24aa6e7136.css",revision:"0db2865f4428907eadfa08d9096f7e6b"},{url:"/_next/static/hUp89K6GgWl-7RDgitMep/_buildManifest.js",revision:"6c967073caf15d88f82fb8a0612bfc9b"},{url:"/_next/static/hUp89K6GgWl-7RDgitMep/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/favicon.png",revision:"ae7036dfd87003ddf27fd935a7fb11de"},{url:"/logo.png",revision:"ebf64b949302cfe5cc822bb91b8195aa"},{url:"/manifest.json",revision:"1283095595b43b1ea07d0d922966fcc4"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
