<template>
  <div class="generator">
    <h1>{{ $t('generator.title') }}</h1>
    
    <div class="filters">
      <div class="filter-group">
        <label>{{ $t('generator.petType') }}</label>
        <select v-model="filters.type">
          <option value="dog">{{ $t('generator.types.dog') }}</option>
          <option value="cat">{{ $t('generator.types.cat') }}</option>
          <option value="bird">{{ $t('generator.types.bird') }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label>{{ $t('generator.gender') }}</label>
        <select v-model="filters.gender">
          <option value="male">{{ $t('generator.genders.male') }}</option>
          <option value="female">{{ $t('generator.genders.female') }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label>{{ $t('generator.personality') }}</label>
        <select v-model="filters.personality">
          <option value="friendly">{{ $t('generator.personalities.friendly') }}</option>
          <option value="brave">{{ $t('generator.personalities.brave') }}</option>
          <option value="cute">{{ $t('generator.personalities.cute') }}</option>
        </select>
      </div>
    </div>

    <button 
      class="generate-button" 
      @click="generateName"
      :disabled="isLoading"
    >
      {{ isLoading ? $t('generator.generating') : $t('generator.generateButton') }}
    </button>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="generatedName" class="result">
      <h2>{{ $t('generator.result') }}</h2>
      <div class="name-card">
        <h3>{{ generatedName.name }}</h3>
        <p class="meaning">{{ generatedName.meaning }}</p>
        <button 
          class="regenerate-button"
          @click="generateName"
          :disabled="isLoading"
        >
          {{ $t('generator.regenerate') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const filters = reactive({
  type: 'dog',
  gender: 'male',
  personality: 'friendly'
})

const generatedName = ref(null)
const error = ref('')
const isLoading = ref(false)

const generateName = async () => {
  try {
    isLoading.value = true
    error.value = ''
    const response = await $fetch('/api/generate', {
      method: 'POST',
      body: {
        ...filters,
        language: useNuxtApp().$i18n.locale.value
      }
    })
    generatedName.value = response.name
  } catch (err) {
    error.value = 'Failed to generate name'
  } finally {
    isLoading.value = false
  }
}
</script> 