<template>
  <div class="home">
    <header class="hero">
      <h1>{{ $t('home.title') }}</h1>
      <p class="subtitle">{{ $t('home.subtitle') }}</p>
      <button class="primary-button">{{ $t('home.startButton') }}</button>
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

    <section class="how-it-works">
      <h2>{{ $t('home.howItWorks.title') }}</h2>
      <div class="steps">
        <div class="step">{{ $t('home.howItWorks.step1') }}</div>
        <div class="step">{{ $t('home.howItWorks.step2') }}</div>
        <div class="step">{{ $t('home.howItWorks.step3') }}</div>
        <div class="step">{{ $t('home.howItWorks.step4') }}</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 1rem;
  margin-bottom: 4rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.primary-button {
  background-color: white;
  color: #6366f1;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.primary-button:hover {
  transform: scale(1.05);
}

.features, .how-it-works {
  margin-bottom: 4rem;
}

h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1f2937;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.step {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }
}
</style> 