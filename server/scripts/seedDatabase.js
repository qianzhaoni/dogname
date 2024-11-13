const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

const PetName = require('../models/PetName');

// 示例数据
const petNames = {
  en: [
    // Dogs - Mythology & History
    {
      name: 'Zeus',
      meaning: 'King of the Greek gods - Perfect for a majestic and powerful dog',
      type: 'dog',
      gender: 'male',
      personality: 'brave',
      language: 'en'
    },
    {
      name: 'Athena',
      meaning: 'Greek goddess of wisdom - Ideal for an intelligent and noble dog',
      type: 'dog',
      gender: 'female',
      personality: 'brave',
      language: 'en'
    },
    // Dogs - Nature Inspired
    {
      name: 'River',
      meaning: 'Flowing water - Great for a calm and graceful dog',
      type: 'dog',
      gender: 'male',
      personality: 'friendly',
      language: 'en'
    },
    {
      name: 'Willow',
      meaning: 'Graceful tree - Perfect for a gentle and flexible personality',
      type: 'dog',
      gender: 'female',
      personality: 'friendly',
      language: 'en'
    },
    // Dogs - Cute & Playful
    {
      name: 'Cookie',
      meaning: 'Sweet treat - Perfect for a lovable and cute dog',
      type: 'dog',
      gender: 'female',
      personality: 'cute',
      language: 'en'
    },
    {
      name: 'Ziggy',
      meaning: 'Playful and energetic - Great for a fun-loving dog',
      type: 'dog',
      gender: 'male',
      personality: 'cute',
      language: 'en'
    },

    // Cats - Mythology & Royalty
    {
      name: 'Artemis',
      meaning: 'Greek goddess of the hunt - Perfect for an independent cat',
      type: 'cat',
      gender: 'female',
      personality: 'brave',
      language: 'en'
    },
    {
      name: 'Loki',
      meaning: 'Norse god of mischief - Ideal for a clever and playful cat',
      type: 'cat',
      gender: 'male',
      personality: 'cute',
      language: 'en'
    },
    // Cats - Elegant & Sophisticated
    {
      name: 'Duchess',
      meaning: 'Noble lady - Perfect for an elegant and graceful cat',
      type: 'cat',
      gender: 'female',
      personality: 'cute',
      language: 'en'
    },
    {
      name: 'Winston',
      meaning: 'Distinguished and noble - Great for a dignified cat',
      type: 'cat',
      gender: 'male',
      personality: 'brave',
      language: 'en'
    },
    // Cats - Sweet & Friendly
    {
      name: 'Mochi',
      meaning: 'Sweet rice cake - Perfect for a soft and sweet cat',
      type: 'cat',
      gender: 'female',
      personality: 'friendly',
      language: 'en'
    },
    {
      name: 'Jasper',
      meaning: 'Precious stone - Great for a treasured companion',
      type: 'cat',
      gender: 'male',
      personality: 'friendly',
      language: 'en'
    },

    // Birds - Mythological
    {
      name: 'Phoenix',
      meaning: 'Mythical fire bird - Perfect for a vibrant and remarkable bird',
      type: 'bird',
      gender: 'male',
      personality: 'brave',
      language: 'en'
    },
    {
      name: 'Iris',
      meaning: 'Rainbow goddess - Ideal for a colorful and beautiful bird',
      type: 'bird',
      gender: 'female',
      personality: 'cute',
      language: 'en'
    },
    // Birds - Nature Inspired
    {
      name: 'Storm',
      meaning: 'Powerful weather - Great for an energetic bird',
      type: 'bird',
      gender: 'male',
      personality: 'brave',
      language: 'en'
    },
    {
      name: 'Dawn',
      meaning: 'Early morning light - Perfect for a cheerful bird',
      type: 'bird',
      gender: 'female',
      personality: 'friendly',
      language: 'en'
    }
  ],
  zh: [
    // Dogs - Traditional
    {
      name: '福宝',
      meaning: '寓意带来福气的宝贝',
      type: 'dog',
      gender: 'male',
      personality: 'friendly',
      language: 'zh'
    },
    {
      name: '锦儿',
      meaning: '美丽如锦缎般优雅',
      type: 'dog',
      gender: 'female',
      personality: 'cute',
      language: 'zh'
    },
    // Dogs - Nature
    {
      name: '云朵',
      meaning: '轻盈如云朵般可爱',
      type: 'dog',
      gender: 'female',
      personality: 'cute',
      language: 'zh'
    },
    {
      name: '小虎',
      meaning: '勇敢如小老虎',
      type: 'dog',
      gender: 'male',
      personality: 'brave',
      language: 'zh'
    },

    // Cats - Traditional
    {
      name: '玉儿',
      meaning: '温润如玉般优雅',
      type: 'cat',
      gender: 'female',
      personality: 'cute',
      language: 'zh'
    },
    {
      name: '大壮',
      meaning: '健康强壮的寓意',
      type: 'cat',
      gender: 'male',
      personality: 'brave',
      language: 'zh'
    },
    // Cats - Modern
    {
      name: '奶茶',
      meaning: '甜美可口如奶茶',
      type: 'cat',
      gender: 'female',
      personality: 'friendly',
      language: 'zh'
    },
    {
      name: '小贝',
      meaning: '可爱帅气如明星',
      type: 'cat',
      gender: 'male',
      personality: 'cute',
      language: 'zh'
    },

    // Birds - Traditional
    {
      name: '金翼',
      meaning: '金色翅膀，寓意高贵',
      type: 'bird',
      gender: 'male',
      personality: 'brave',
      language: 'zh'
    },
    {
      name: '彩云',
      meaning: '美丽如彩云般绚丽',
      type: 'bird',
      gender: 'female',
      personality: 'cute',
      language: 'zh'
    },
    // Birds - Modern
    {
      name: '星星',
      meaning: '闪耀如星星般明亮',
      type: 'bird',
      gender: 'female',
      personality: 'cute',
      language: 'zh'
    },
    {
      name: '阳光',
      meaning: '温暖如阳光般快乐',
      type: 'bird',
      gender: 'male',
      personality: 'friendly',
      language: 'zh'
    }
  ]
};

// 执行数据迁移
const seedDatabase = async () => {
  try {
    // 清空现有数据
    await PetName.deleteMany({});
    console.log('Cleared existing data');

    // 插入新数据
    const allNames = [...petNames.en, ...petNames.zh];
    await PetName.insertMany(allNames);
    console.log('Successfully seeded database');

    // 显示详细统计信息
    const stats = await PetName.aggregate([
      {
        $group: {
          _id: {
            type: '$type',
            language: '$language',
            personality: '$personality',
            gender: '$gender'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          '_id.language': 1,
          '_id.type': 1,
          '_id.personality': 1,
          '_id.gender': 1
        }
      }
    ]);

    console.log('\nDatabase statistics:');
    stats.forEach(stat => {
      console.log(`${stat._id.language} - ${stat._id.type} - ${stat._id.personality} - ${stat._id.gender}: ${stat.count} names`);
    });

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 