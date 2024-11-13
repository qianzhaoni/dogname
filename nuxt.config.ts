export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'vercel'
  },
  app: {
    head: {
      title: 'AI Pet Name Generator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Generate unique and meaningful pet names with AI assistance'
        }
      ]
    }
  },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    vueI18n: {
      legacy: false,
      locale: 'en'
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api'
    }
  }
}) 