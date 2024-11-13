import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'
import PetName from '../models/PetName'

export async function generateSitemap() {
  try {
    const sitemap = new SitemapStream({
      hostname: 'https://your-domain.vercel.app'
    })

    // 添加静态页面
    sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 })
    sitemap.write({ url: '/generator', changefreq: 'daily', priority: 0.9 })
    sitemap.write({ url: '/history', changefreq: 'daily', priority: 0.8 })

    // 添加动态生成的名字页面
    const names = await PetName.find({}, 'slug updatedAt')
    names.forEach(name => {
      sitemap.write({
        url: `/names/${name.slug}`,
        lastmod: name.updatedAt.toISOString(),
        changefreq: 'weekly',
        priority: 0.7
      })
    })

    sitemap.end()

    // 保存sitemap
    const sitemapXML = await streamToPromise(sitemap)
    createWriteStream('./public/sitemap.xml').write(sitemapXML.toString())

  } catch (error) {
    console.error('Error generating sitemap:', error)
  }
} 