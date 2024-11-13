export default defineNuxtPlugin(() => {
  if (process.client) {
    const reportWebVitals = ({ id, name, value }) => {
      if (process.env.NODE_ENV === 'production') {
        // 发送到你的分析服务
        console.log('Performance:', { id, name, value })
      }
    }

    window.addEventListener('load', () => {
      if ('performance' in window) {
        const paint = performance
          .getEntriesByType('paint')
          .find(({ name }) => name === 'first-contentful-paint')
        
        if (paint) {
          reportWebVitals({
            id: 'FCP',
            name: 'First Contentful Paint',
            value: paint.startTime
          })
        }
      }
    })
  }
}) 