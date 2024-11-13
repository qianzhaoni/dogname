<template>
  <div class="layout">
    <header class="header">
      <nav class="navigation">
        <NuxtLink to="/" class="logo">
          {{ $t('site.name') }}
        </NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/generator">
            {{ $t('nav.generator') }}
          </NuxtLink>
          <NuxtLink to="/favorites">
            {{ $t('nav.favorites') }}
          </NuxtLink>
          <NuxtLink to="/history">
            {{ $t('nav.history') }}
          </NuxtLink>
        </div>
        <LanguageSwitcher />
      </nav>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <p>{{ $t('site.footer') }}</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.navigation {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.main {
  flex: 1;
  padding: 2rem;
}

.footer {
  background: white;
  padding: 2rem;
  text-align: center;
  color: var(--text-color);
}
</style> 