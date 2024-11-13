export default defineNuxtConfig({
  devtools: { enabled: true },
  
  nitro: {
    preset: 'vercel-edge'
  },

  modules: [
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts'
  },

  app: {
    head: {
      title: 'Pet Name Generator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI
  }
}) 