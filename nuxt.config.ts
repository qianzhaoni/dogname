export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'vercel'
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
  }
}) 