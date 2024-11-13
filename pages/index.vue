<template>
  <div class="container">
    <h1>{{ $t('home.title') }}</h1>
    <p>{{ $t('home.subtitle') }}</p>
    <NuxtLink to="/generator" class="button">
      {{ $t('home.startButton') }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.button {
  display: inline-block;
  padding: 1rem 2rem;
  background: #6366f1;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  margin-top: 2rem;
}
</style> 