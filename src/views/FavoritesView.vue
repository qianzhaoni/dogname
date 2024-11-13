<template>
  <div class="favorites">
    <h1>{{ $t('favorites.title') }}</h1>

    <div v-if="loading" class="loading">
      {{ $t('common.loading') }}
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="favorites.length === 0" class="empty">
      {{ $t('favorites.empty') }}
    </div>

    <div v-else class="favorites-grid">
      <div v-for="name in favorites" :key="name._id" class="favorite-card">
        <h3>{{ name.name }}</h3>
        <p class="meaning">{{ name.meaning }}</p>
        <div class="tags">
          <span class="tag">{{ $t(`generator.types.${name.type}`) }}</span>
          <span class="tag">{{ $t(`generator.genders.${name.gender}`) }}</span>
          <span class="tag">{{ $t(`generator.personalities.${name.personality}`) }}</span>
        </div>
        <button 
          class="remove-button"
          @click="removeFavorite(name._id)"
        >
          {{ $t('favorites.remove') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getFavorites, removeFromFavorites } from '../services/api'

const favorites = ref([])
const loading = ref(true)
const error = ref('')

// 临时使用固定用户ID，实际应该从认证系统获取
const userId = localStorage.getItem('userId')

const loadFavorites = async () => {
  try {
    loading.value = true
    error.value = ''
    favorites.value = await getFavorites(userId)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load favorites'
  } finally {
    loading.value = false
  }
}

const removeFavorite = async (nameId) => {
  try {
    await removeFromFavorites(userId, nameId)
    favorites.value = favorites.value.filter(fav => fav._id !== nameId)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to remove favorite'
  }
}

onMounted(loadFavorites)
</script>

<style scoped>
.favorites {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.favorite-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
}

.meaning {
  color: #6b7280;
  margin: 0.5rem 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tag {
  background: var(--background-color);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
}

.remove-button {
  width: 100%;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.remove-button:hover {
  background: #ef4444;
  color: white;
}

.loading, .error, .empty {
  text-align: center;
  margin: 2rem 0;
}

.error {
  color: #ef4444;
}
</style> 