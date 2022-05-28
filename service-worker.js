/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "6a182eb3d585dab5a00163ad262db317"
  },
  {
    "url": "about/index.html",
    "revision": "f4021449a8fa035791deccb31404a8e5"
  },
  {
    "url": "assets/css/0.styles.e0058bb9.css",
    "revision": "92b483357af9694218b0771522e1992a"
  },
  {
    "url": "assets/fonts/GanjNamehSans-Regular.0242b17d.woff",
    "revision": "0242b17d856f3436530a661764eac22f"
  },
  {
    "url": "assets/fonts/GanjNamehSans-Regular.0dacb2cd.woff2",
    "revision": "0dacb2cdbcda95a6988d0c4e50a091a2"
  },
  {
    "url": "assets/fonts/GanjNamehSans-Regular.a6a8d2e5.ttf",
    "revision": "a6a8d2e5b65086c657b470bac8bf9a44"
  },
  {
    "url": "assets/img/search.d9fc2039.svg",
    "revision": "d9fc2039e038b57b2b20b5d6ee63ca85"
  },
  {
    "url": "assets/js/10.5ffb9bb5.js",
    "revision": "26376fec672ae3406eb17d018d1015a6"
  },
  {
    "url": "assets/js/11.cc8304fc.js",
    "revision": "955559ae63927b6e55910548a6a1ee9c"
  },
  {
    "url": "assets/js/12.e72421b2.js",
    "revision": "6f5fdb9e6335fb36487378f84c25fb31"
  },
  {
    "url": "assets/js/14.1519883e.js",
    "revision": "a31f799bbcb52c35885e3e59e911b040"
  },
  {
    "url": "assets/js/2.09633375.js",
    "revision": "81d851e6c550f6c7c736eb02686333b7"
  },
  {
    "url": "assets/js/3.3dbbbc4a.js",
    "revision": "eddcaf7043c8b4bec5e5c4b2cb18266d"
  },
  {
    "url": "assets/js/4.526ca625.js",
    "revision": "86bbe6c1f2bc18f6a581a6ee6d75a772"
  },
  {
    "url": "assets/js/5.dfbcbe43.js",
    "revision": "2f49acd28a510ed04381f900ae676fb0"
  },
  {
    "url": "assets/js/6.dfeea2f2.js",
    "revision": "9ad98d8624e07b0b8f04c5bec3aa8763"
  },
  {
    "url": "assets/js/7.40f3f619.js",
    "revision": "fe4b681346561d6b9b7d0c595c3cb949"
  },
  {
    "url": "assets/js/8.67d28a6c.js",
    "revision": "23088e320c0ba7198547e30ad2a3c4a8"
  },
  {
    "url": "assets/js/9.d2e94432.js",
    "revision": "28ebb6d4411244a66bcfec7bd6c3ccbe"
  },
  {
    "url": "assets/js/app.519463e9.js",
    "revision": "855d64a6b4ce49a150d6b06e8fbfd0f4"
  },
  {
    "url": "coming-soon.jpg",
    "revision": "27129189ecb48b5fba03ee20a809d17e"
  },
  {
    "url": "contact/index.html",
    "revision": "856ea0205f19a25232a473016414ca98"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "f7d33b5f8eebdc71e7904a93d5703273"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "02b334bde81e850f74c3f294fb5bfcb0"
  },
  {
    "url": "icons/apple-icon-180x180.png",
    "revision": "8491d74c8d3c11c8e21c657d41824bfe"
  },
  {
    "url": "icons/apple-touch-icon-114x114.png",
    "revision": "9a420d9e2e5268b34407a9c8ba3a3dbd"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "437d08ff40586b3cbda76d07d0040f33"
  },
  {
    "url": "icons/apple-touch-icon-144x144.png",
    "revision": "176be1a260baba00d27fd2b66af2e624"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "8c6493d70e5b835bca4bf25824cf8b70"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "7c8f7a17c34335c50bbf67bba7776f08"
  },
  {
    "url": "icons/apple-touch-icon-57x57.png",
    "revision": "16028ca5f26ec3dd6c497b3e4b22f97c"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "56732357a6281c8adceca224e07ace07"
  },
  {
    "url": "icons/apple-touch-icon-72x72.png",
    "revision": "6508032165ad3c8228ed739410a1646d"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "66165b6adba652d57031cc3465fe839c"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "7c8f7a17c34335c50bbf67bba7776f08"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "1d7276482071171037e47b281e24ad02"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "3222256e37239360dd2aa2ed48c07674"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "df6b7fd7c4da8908154152a6369256bf"
  },
  {
    "url": "ideas/index.html",
    "revision": "7a5fefe2f4d46402f370777cc2e089b9"
  },
  {
    "url": "ideas/johari-behavers/index.html",
    "revision": "278ca595a8ecd818888aa295061e5494"
  },
  {
    "url": "ideas/surface-scanner/index.html",
    "revision": "cbb21e7c5cc749ab81baf840cd69097b"
  },
  {
    "url": "index.html",
    "revision": "412dc6e75070869637d2b4e27d689f0d"
  },
  {
    "url": "tree.svg",
    "revision": "b987a92e4f122500a20c4b932a5cd9ca"
  },
  {
    "url": "wasm/loader/wasm_exec.js",
    "revision": "972f1a882e242be285f4d71474d528dd"
  },
  {
    "url": "wasm/loader/worker.js",
    "revision": "a7864ccfcc0daa8161e44cad3e15683c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
