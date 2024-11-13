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
        <div class="name-header">
          <h3>{{ generatedName.name }}</h3>
          <span 
            class="generation-badge"
            :class="{ 'ai-generated': generatedName.isGenerated }"
          >
            {{ generatedName.isGenerated ? $t('score.generated') : $t('score.original') }}
          </span>
        </div>
        
        <ScoreDisplay
          v-if="nameScore"
          :score="nameScore.total"
          :lengthScore="nameScore.length"
          :soundScore="nameScore.sound"
          :personalityScore="nameScore.personality"
        />

        <p class="meaning">{{ generatedName.meaning }}</p>
        
        <NameDetails 
          v-if="showDetails"
          :nameInfo="generatedName"
        />
        
        <button 
          class="details-button"
          @click="showDetails = !showDetails"
        >
          {{ showDetails ? $t('generator.hideDetails') : $t('generator.showDetails') }}
        </button>
        
        <div class="action-buttons">
          <button 
            class="favorite-button" 
            @click="addToFavorites"
            :disabled="isSaving"
          >
            {{ isSaving ? $t('generator.saving') : $t('generator.addToFavorites') }}
          </button>
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

    <div v-if="recentNames.length" class="recent-names">
      <h2>{{ $t('generator.recentNames') }}</h2>
      <div class="names-grid">
        <div 
          v-for="name in recentNames" 
          :key="name.id" 
          class="name-item"
        >
          {{ name.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { generatePetName } from '../services/api'
import ScoreDisplay from '../components/ScoreDisplay.vue'
import NameDetails from '../components/NameDetails.vue'

const filters = reactive({
  type: 'dog',
  gender: 'male',
  personality: 'friendly'
})

const generatedName = ref(null)
const error = ref('')
const isLoading = ref(false)
const isSaving = ref(false)
const recentNames = ref([])
const showDetails = ref(false)

const nameScore = computed(() => {
  if (!generatedName.value) return null
  
  return {
    total: generatedName.value.score || 0,
    length: generatedName.value.lengthScore || 0,
    sound: generatedName.value.soundScore || 0,
    personality: generatedName.value.personalityScore || 0
  }
})

const generateName = async () => {
  try {
    isLoading.value = true
    error.value = ''
    const response = await generatePetName(filters)
    generatedName.value = response.name
    
    // Add to recent names
    if (response.name) {
      recentNames.value.unshift(response.name)
      if (recentNames.value.length > 10) {
        recentNames.value.pop()
      }
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to generate name'
  } finally {
    isLoading.value = false
  }
}

const addToFavorites = async () => {
  if (!generatedName.value) return
  
  try {
    isSaving.value = true
    // Implementation will be added later
  } catch (err) {
    error.value = 'Failed to save to favorites'
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.generator {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
}

select {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-color);
  background-color: white;
}

.generate-button {
  width: 100%;
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.generate-button:hover {
  background: var(--secondary-color);
}

.result {
  margin-top: 2rem;
  text-align: center;
}

.name-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.favorite-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.favorite-button:hover {
  background: var(--primary-color);
  color: white;
}

.error {
  color: #ef4444;
  text-align: center;
  margin: 1rem 0;
}

.meaning {
  color: #6b7280;
  margin: 0.5rem 0;
}

.recent-names {
  margin-top: 3rem;
}

.names-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.name-item {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.name-item:hover {
  transform: translateY(-2px);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.name-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.generation-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  background: #e5e7eb;
  color: #374151;
}

.generation-badge.ai-generated {
  background: #dbeafe;
  color: #1e40af;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.regenerate-button {
  flex: 1;
  padding: 0.5rem 1rem;
  background: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.regenerate-button:hover {
  opacity: 0.9;
}

.favorite-button {
  flex: 1;
}

.details-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--text-color);
  color: var(--text-color);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.details-button:hover {
  background: var(--text-color);
  color: white;
}
</style> 