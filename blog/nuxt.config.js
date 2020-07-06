import dotenv from 'dotenv'
dotenv.config()
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'CD的个人小屋',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'CD的个人小屋，只是记录自己的知识，没有认真打理请抱歉'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          'http://cd-blog.oss-cn-shenzhen.aliyuncs.com/ebe2c395b5c0109cc929acabfdf4f77e.png'
      },
      {
        rel: 'stylesheet',
        href: 'https://at.alicdn.com/t/font_1852995_mi7lhrph6vb.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~assets/css/reset.scss',
    'highlight.js/styles/monokai-sublime.css',
    '~assets/css/layout.scss',
    'iview/dist/styles/iview.css',
    '~assets/css/animate.min.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/iview'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    'moment'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout' },
          user: { url: '/auth/user', method: 'get', propertyName: false }
        }
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    }
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
