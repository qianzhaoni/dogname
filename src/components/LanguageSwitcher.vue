<template>
  <div class="language-switcher">
    <select v-model="currentLocale" @change="changeLanguage">
      <option value="en">English</option>
      <option value="zh">中文</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentLocale = ref(locale.value)

const changeLanguage = () => {
  locale.value = currentLocale.value
  localStorage.setItem('locale', currentLocale.value)
}
</script>

<style scoped>
.language-switcher {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

select {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-color);
  background-color: white;
  cursor: pointer;
}
</style> 