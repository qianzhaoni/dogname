<template>
  <div class="score-display">
    <div class="score-circle" :style="scoreStyle">
      {{ score }}
    </div>
    <div class="score-details">
      <h4>{{ $t('score.title') }}</h4>
      <div class="score-bars">
        <div class="score-bar">
          <span>{{ $t('score.length') }}</span>
          <div class="bar-container">
            <div class="bar" :style="{ width: `${lengthScore}%` }"></div>
          </div>
        </div>
        <div class="score-bar">
          <span>{{ $t('score.sound') }}</span>
          <div class="bar-container">
            <div class="bar" :style="{ width: `${soundScore}%` }"></div>
          </div>
        </div>
        <div class="score-bar">
          <span>{{ $t('score.personality') }}</span>
          <div class="bar-container">
            <div class="bar" :style="{ width: `${personalityScore}%` }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: {
    type: Number,
    required: true
  },
  lengthScore: {
    type: Number,
    required: true
  },
  soundScore: {
    type: Number,
    required: true
  },
  personalityScore: {
    type: Number,
    required: true
  }
})

const scoreStyle = computed(() => {
  const hue = props.score * 1.2 // 0-120 range for red to green
  return {
    background: `conic-gradient(hsl(${hue}, 70%, 50%) ${props.score}%, #f3f4f6 0)`
  }
})
</script>

<style scoped>
.score-display {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.score-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;
}

.score-circle::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
}

.score-circle::before {
  content: attr(data-score);
  position: relative;
  z-index: 1;
  color: var(--text-color);
}

.score-details {
  flex: 1;
}

h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
}

.score-bars {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.score-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.score-bar span {
  width: 100px;
  font-size: 0.875rem;
  color: var(--text-color);
}

.bar-container {
  flex: 1;
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: var(--primary-color);
  border-radius: 4px;
  transition: width 0.3s ease;
}
</style> 