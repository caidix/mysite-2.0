import colors from "vuetify/es5/util/colors";
import dotenv from "dotenv";
dotenv.config();

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  watchers: {
    webpack: {
      ignored: /node_modules/,
    },
  },
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: "CD的个人小屋",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0",
      },
      {
        hid: "description",
        name: "description",
        content: "CD的个人小屋，只是记录自己的知识，没有认真打理请抱歉",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href:
          "http://cd-blog.oss-cn-shenzhen.aliyuncs.com/ebe2c395b5c0109cc929acabfdf4f77e.png",
      },
      {
        rel: "stylesheet",
        href: "https://at.alicdn.com/t/font_1852995_mi7lhrph6vb.css",
      },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/animate.css@4.1.1/animate.min.css",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/clipboard.js", "~/plugins/vue-component.js"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    "@nuxtjs/vuetify",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    // '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    "moment",
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/auth/login" },
          logout: { url: "/auth/logout" },
          user: { url: "/auth/user", propertyName: false },
        },
        // tokenRequired: true,
        // tokenType: 'bearer'
      },
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/css/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.lightBlue.darken3,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
