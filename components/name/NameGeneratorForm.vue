<template>
  <div class="filters">
    <div class="filter-group">
      <label>{{ $t('generator.petType') }}</label>
      <select v-model="modelValue.type">
        <option v-for="type in types" :key="type" :value="type">
          {{ $t(`generator.types.${type}`) }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label>{{ $t('generator.gender') }}</label>
      <select v-model="modelValue.gender">
        <option v-for="gender in genders" :key="gender" :value="gender">
          {{ $t(`generator.genders.${gender}`) }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label>{{ $t('generator.personality') }}</label>
      <select v-model="modelValue.personality">
        <option v-for="personality in personalities" :key="personality" :value="personality">
          {{ $t(`generator.personalities.${personality}`) }}
        </option>
      </select>
    </div>

    <UiButton 
      :loading="loading"
      @click="$emit('generate')"
    >
      {{ loading ? $t('generator.generating') : $t('generator.generateButton') }}
    </UiButton>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  loading: Boolean
})

const emit = defineEmits(['update:modelValue', 'generate'])

const types = ['dog', 'cat', 'bird']
const genders = ['male', 'female']
const personalities = ['friendly', 'brave', 'cute']
</script>

<style scoped>
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
</style> 