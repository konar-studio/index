const { description } = require("../../package");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "استودیو کُنار",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,
  base: "/",
  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["link", { rel: "icon", href: "/icons/apple-touch-icon-152x152.png" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    [
      "link",
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon-152x152.png" },
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#3eaf7c",
      },
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/msapplication-icon-144x144.png",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
    ["meta", { name: "theme-color", content: "#39b4b4" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  theme: "default-rtl",
  themeConfig: {
    persianDate: true, // used in last-update plugin
    lastUpdated: "آخرین ویرایش",
    repo: "https://github.com/konar-studio/index",
    editLinks: true,
    docsDir: "src",
    editLinkText: "ویرایش",
    nav: [
      {
        text: "درباره",
        link: "/about/",
      },
      {
        text: "تماس",
        link: "/contact/",
      },
    ],
    // sidebar: ["/ideas/", "/ideas/johari-behavers/", "/ideas/surface-scanner/"],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "@vuepress/pwa",
    {
      serviceWorker: true,
      updatePopup: true,
    },
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
  ],
};
