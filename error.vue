<template>
  <div class="error-page">
    <h1>{{ error.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred' }}</h1>
    <p>{{ error.message }}</p>
    <NuxtLink to="/" class="home-link">
      Return to Home
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  error: Object
})
</script> 