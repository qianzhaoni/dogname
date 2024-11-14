export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      home: {
        title: 'AI Pet Name Generator',
        subtitle: 'Find the Perfect Name for Your Furry Friend',
        startButton: 'Start Generating Names'
      },
      generator: {
        title: 'Generate Pet Name',
        petType: 'Pet Type',
        gender: 'Gender',
        personality: 'Personality',
        generateButton: 'Generate Name',
        regenerate: 'Generate Another Name',
        generating: 'Generating...',
        result: 'Your Pet Name',
        types: {
          dog: 'Dog',
          cat: 'Cat',
          bird: 'Bird'
        },
        genders: {
          male: 'Male',
          female: 'Female'
        },
        personalities: {
          friendly: 'Friendly',
          brave: 'Brave',
          cute: 'Cute'
        }
      }
    },
    zh: {
      // 中文翻译...
    }
  }
})) 