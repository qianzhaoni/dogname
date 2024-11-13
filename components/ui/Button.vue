<template>
  <button 
    class="ui-button"
    :class="[variant, { loading }]"
    :disabled="loading || disabled"
    @click="$emit('click')"
  >
    <span v-if="loading" class="loader"></span>
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  },
  loading: Boolean,
  disabled: Boolean
})

defineEmits(['click'])
</script>

<style scoped>
.ui-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.primary {
  background: var(--primary-color);
  color: white;
  border: none;
}

.secondary {
  background: var(--secondary-color);
  color: white;
  border: none;
}

.outline {
  background: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}

.loading {
  position: relative;
  cursor: wait;
}

.loader {
  width: 1rem;
  height: 1rem;
  border: 2px solid #ffffff;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.ui-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style> 