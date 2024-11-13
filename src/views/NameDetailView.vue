<template>
  <div class="name-detail">
    <article class="content">
      <header class="name-header">
        <h1>{{ nameDetail.name }}</h1>
        <div class="meta">
          <span>{{ formatDate(nameDetail.createdAt) }}</span>
          <span>{{ nameDetail.views }} {{ $t('detail.views') }}</span>
        </div>
      </header>

      <section class="name-meaning">
        <h2>{{ $t('detail.meaning') }}</h2>
        <p>{{ nameDetail.meaning }}</p>
      </section>

      <section class="characteristics">
        <h2>{{ $t('detail.characteristics') }}</h2>
        <div class="tags">
          <span class="tag" :class="nameDetail.type">
            {{ $t(`generator.types.${nameDetail.type}`) }}
          </span>
          <span class="tag" :class="nameDetail.gender">
            {{ $t(`generator.genders.${nameDetail.gender}`) }}
          </span>
          <span class="tag" :class="nameDetail.personality">
            {{ $t(`generator.personalities.${nameDetail.personality}`) }}
          </span>
        </div>
      </section>

      <section class="cultural-context">
        <h2>{{ $t('detail.cultural') }}</h2>
        <p>{{ nameDetail.culturalContext }}</p>
      </section>

      <section class="suggestions">
        <h2>{{ $t('detail.suggestions') }}</h2>
        <ul>
          <li v-for="(suggestion, index) in nameDetail.suggestions" :key="index">
            {{ suggestion }}
          </li>
        </ul>
      </section>

      <ShareButtons 
        :name="nameDetail.name"
        :url="currentUrl"
      />
    </article>

    <aside class="related-names">
      <h2>{{ $t('detail.relatedNames') }}</h2>
      <div class="related-grid">
        <router-link
          v-for="name in relatedNames"
          :key="name._id"
          :to="`/names/${name.slug}`"
          class="related-card"
        >
          <h3>{{ name.name }}</h3>
          <p>{{ name.meaning }}</p>
        </router-link>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getNameDetail, getRelatedNames } from '../services/api'
import ShareButtons from '../components/ShareButtons.vue'

const route = useRoute()
const nameDetail = ref({})
const relatedNames = ref([])

const currentUrl = computed(() => window.location.href)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const loadNameDetail = async () => {
  try {
    const { slug } = route.params
    const detail = await getNameDetail(slug)
    nameDetail.value = detail
    document.title = `${detail.name} - ${detail.meaning}`
    updateMetaTags(detail)
  } catch (error) {
    console.error('Failed to load name detail:', error)
  }
}

const loadRelatedNames = async () => {
  try {
    const related = await getRelatedNames(nameDetail.value._id)
    relatedNames.value = related
  } catch (error) {
    console.error('Failed to load related names:', error)
  }
}

const updateMetaTags = (detail) => {
  const meta = document.createElement('meta')
  meta.setAttribute('name', 'description')
  meta.setAttribute('content', detail.meaning)
  document.head.appendChild(meta)

  // Open Graph tags
  const ogTitle = document.createElement('meta')
  ogTitle.setAttribute('property', 'og:title')
  ogTitle.setAttribute('content', `${detail.name} - Pet Name`)
  document.head.appendChild(ogTitle)

  const ogDesc = document.createElement('meta')
  ogDesc.setAttribute('property', 'og:description')
  ogDesc.setAttribute('content', detail.meaning)
  document.head.appendChild(ogDesc)
}

onMounted(() => {
  loadNameDetail()
  loadRelatedNames()
})
</script>

<style scoped>
.name-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
}

section {
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.meta {
  display: flex;
  gap: 1rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tag {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
}

.related-names {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
}

.related-grid {
  display: grid;
  gap: 1rem;
}

.related-card {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.related-card:hover {
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .name-detail {
    grid-template-columns: 1fr;
  }
}
</style> 