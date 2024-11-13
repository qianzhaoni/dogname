<template>
  <div class="name-details">
    <div class="details-section">
      <h4>{{ $t('nameDetails.origin') }}</h4>
      <p>{{ nameInfo.origin || $t('nameDetails.noOrigin') }}</p>
    </div>

    <div class="details-section">
      <h4>{{ $t('nameDetails.meaning') }}</h4>
      <p>{{ nameInfo.meaning }}</p>
    </div>

    <div class="details-section characteristics">
      <h4>{{ $t('nameDetails.characteristics') }}</h4>
      <div class="tags">
        <span class="tag" :class="nameInfo.type">
          {{ $t(`generator.types.${nameInfo.type}`) }}
        </span>
        <span class="tag" :class="nameInfo.gender">
          {{ $t(`generator.genders.${nameInfo.gender}`) }}
        </span>
        <span class="tag" :class="nameInfo.personality">
          {{ $t(`generator.personalities.${nameInfo.personality}`) }}
        </span>
      </div>
    </div>

    <div v-if="nameInfo.isGenerated" class="details-section combination">
      <h4>{{ $t('nameDetails.combination') }}</h4>
      <p>{{ nameInfo.combinationInfo }}</p>
    </div>

    <div class="details-section cultural">
      <h4>{{ $t('nameDetails.cultural') }}</h4>
      <p>{{ getCulturalContext(nameInfo) }}</p>
    </div>

    <div class="details-section suggestions">
      <h4>{{ $t('nameDetails.suggestions') }}</h4>
      <ul>
        <li v-for="(suggestion, index) in getSuggestions(nameInfo)" :key="index">
          {{ suggestion }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  nameInfo: {
    type: Object,
    required: true
  }
})

const getCulturalContext = (nameInfo) => {
  const contexts = {
    dog: {
      brave: {
        en: 'Traditionally associated with loyal and protective qualities, perfect for guard dogs or working breeds.',
        zh: '传统上与忠诚和保护性品质相关，适合警卫犬或工作犬。'
      },
      cute: {
        en: 'Reflects a playful and affectionate nature, ideal for family pets and companion dogs.',
        zh: '反映了顽皮和亲昵的天性，适合家庭宠物和伴侣犬。'
      },
      friendly: {
        en: 'Emphasizes sociable and gentle characteristics, great for therapy dogs or social environments.',
        zh: '强调社交和温和的特点，适合治疗犬或社交环境。'
      }
    },
    cat: {
      brave: {
        en: 'Captures the independent and adventurous spirit common in felines.',
        zh: '捕捉猫科动物常见的独立和冒险精神。'
      },
      cute: {
        en: 'Highlights the graceful and charming aspects of feline nature.',
        zh: '突出猫科动物优雅和迷人的特点。'
      },
      friendly: {
        en: 'Represents the warm and affectionate side of cats, perfect for social felines.',
        zh: '代表猫咪温暖和亲昵的一面，适合社交型猫咪。'
      }
    },
    bird: {
      brave: {
        en: 'Reflects the free-spirited and bold nature of birds.',
        zh: '反映鸟类自由奔放和大胆的天性。'
      },
      cute: {
        en: 'Emphasizes the delicate and sweet characteristics of birds.',
        zh: '强调鸟类精致和甜美的特点。'
      },
      friendly: {
        en: 'Highlights the social and cheerful nature of companion birds.',
        zh: '突出伴侣鸟类群居和欢快的天性。'
      }
    }
  }

  return contexts[nameInfo.type]?.[nameInfo.personality]?.[nameInfo.language] || 
         t('nameDetails.noCultural')
}

const getSuggestions = (nameInfo) => {
  const suggestions = {
    dog: {
      brave: [
        t('nameDetails.suggestions.dog.brave.training'),
        t('nameDetails.suggestions.dog.brave.activities'),
        t('nameDetails.suggestions.dog.brave.environment')
      ],
      cute: [
        t('nameDetails.suggestions.dog.cute.training'),
        t('nameDetails.suggestions.dog.cute.activities'),
        t('nameDetails.suggestions.dog.cute.environment')
      ],
      friendly: [
        t('nameDetails.suggestions.dog.friendly.training'),
        t('nameDetails.suggestions.dog.friendly.activities'),
        t('nameDetails.suggestions.dog.friendly.environment')
      ]
    },
    // 可以添加更多动物类型的建议...
  }

  return suggestions[nameInfo.type]?.[nameInfo.personality] || 
         [t('nameDetails.noSuggestions')]
}
</script>

<style scoped>
.name-details {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 1rem;
}

.details-section {
  margin-bottom: 1.5rem;
}

.details-section:last-child {
  margin-bottom: 0;
}

h4 {
  color: var(--text-color);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

p {
  color: #4b5563;
  line-height: 1.6;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
}

.tag.brave {
  background: #fee2e2;
  color: #991b1b;
}

.tag.cute {
  background: #dbeafe;
  color: #1e40af;
}

.tag.friendly {
  background: #d1fae5;
  color: #065f46;
}

.tag.male {
  background: #e0e7ff;
  color: #3730a3;
}

.tag.female {
  background: #fce7f3;
  color: #9d174d;
}

.tag.dog {
  background: #f3e8ff;
  color: #6b21a8;
}

.tag.cat {
  background: #fff7ed;
  color: #9a3412;
}

.tag.bird {
  background: #ecfeff;
  color: #155e75;
}

ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  color: #4b5563;
}

li {
  margin-bottom: 0.5rem;
}

.combination {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid var(--primary-color);
}
</style> 