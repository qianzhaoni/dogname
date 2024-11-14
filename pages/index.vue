<template>
  <div class="home">
    <header class="hero">
      <h1>{{ $t('home.title') }}</h1>
      <p class="subtitle">{{ $t('home.subtitle') }}</p>
      <NuxtLink to="/generator" class="primary-button">
        {{ $t('home.startButton') }}
      </NuxtLink>
    </header>

    <section class="features">
      <h2>{{ $t('home.features.title') }}</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="icon">🤖</div>
          <h3>{{ $t('home.features.smart') }}</h3>
        </div>
        <div class="feature-card">
          <div class="icon">⭐</div>
          <h3>{{ $t('home.features.unique') }}</h3>
        </div>
        <div class="feature-card">
          <div class="icon">🌍</div>
          <h3>{{ $t('home.features.multilingual') }}</h3>
        </div>
      </div>
    </section>
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