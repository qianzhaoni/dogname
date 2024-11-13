<template>
  <div class="generator">
    <h1>{{ $t('generator.title') }}</h1>
    
    <NameGeneratorForm 
      v-model:filters="filters"
      :loading="isLoading"
      @generate="generateName"
    />

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <GeneratedNameCard
      v-if="generatedName"
      :name="generatedName"
      :loading="isLoading"
      @regenerate="generateName"
      @favorite="addToFavorites"
    />

    <RecentNamesList
      v-if="recentNames.length"
      :names="recentNames"
    />
  </div>
</template>

<script setup>
const { generatePetName } = useApi()

const filters = ref({
  type: 'dog',
  gender: 'male',
  personality: 'friendly'
})

const generatedName = ref(null)
const recentNames = ref([])
const error = ref('')
const isLoading = ref(false)

// SEO
useHead({
  title: 'Generate Pet Name - AI Pet Name Generator',
  meta: [
    {
      name: 'description',
      content: 'Generate unique and meaningful pet names using AI technology'
    }
  ]
})

const generateName = async () => {
  try {
    isLoading.value = true
    error.value = ''
    const response = await generatePetName(filters.value)
    generatedName.value = response.name
    
    if (response.name) {
      recentNames.value.unshift(response.name)
      if (recentNames.value.length > 10) {
        recentNames.value.pop()
      }
    }
  } catch (err) {
    error.value = err.message || 'Failed to generate name'
  } finally {
    isLoading.value = false
  }
}
</script> 