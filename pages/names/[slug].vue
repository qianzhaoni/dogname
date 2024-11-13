<template>
  <div class="name-detail">
    <article class="content">
      <header class="name-header">
        <h1>{{ name.name }}</h1>
        <div class="meta">
          <span>{{ formatDate(name.createdAt) }}</span>
          <span>{{ name.views }} {{ $t('detail.views') }}</span>
        </div>
      </header>

      <section class="name-meaning">
        <h2>{{ $t('detail.meaning') }}</h2>
        <p>{{ name.meaning }}</p>
      </section>

      <NameCharacteristics :name="name" />
      <NameSuggestions :name="name" />
      <ShareButtons :name="name.name" :url="currentUrl" />
    </article>

    <aside v-if="relatedNames.length" class="related-names">
      <h2>{{ $t('detail.relatedNames') }}</h2>
      <RelatedNamesList :names="relatedNames" />
    </aside>
  </div>
</template>

<script setup>
const route = useRoute()
const { getNameDetail } = useApi()

const name = ref(null)
const relatedNames = ref([])
const error = ref(null)

const currentUrl = computed(() => process.client ? window.location.href : '')

// SEO
useHead(() => ({
  title: name.value ? `${name.value.name} - Pet Name` : 'Pet Name',
  meta: [
    {
      name: 'description',
      content: name.value?.meaning || 'Pet name details'
    },
    {
      property: 'og:title',
      content: name.value ? `${name.value.name} - Pet Name` : 'Pet Name'
    },
    {
      property: 'og:description',
      content: name.value?.meaning || 'Pet name details'
    }
  ]
}))

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

// Server-side data fetching
const { data: nameData } = await useAsyncData(
  `name-${route.params.slug}`,
  () => getNameDetail(route.params.slug)
)

name.value = nameData.value
</script> 