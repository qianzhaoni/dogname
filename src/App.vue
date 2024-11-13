<template>
  <div class="app">
    <LanguageSwitcher />
    <nav class="navigation">
      <router-link to="/">Home</router-link>
      <router-link to="/generator">Generator</router-link>
      <router-link to="/favorites">Favorites</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import LanguageSwitcher from './components/LanguageSwitcher.vue'
</script>

<style>
.app {
  min-height: 100vh;
  position: relative;
}

.navigation {
  background: white;
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
}

.navigation a {
  color: var(--text-color);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.navigation a:hover {
  background-color: var(--background-color);
}

.navigation a.router-link-active {
  color: var(--primary-color);
  font-weight: 500;
}
</style> 