<template>
  <div class="min-h-screen flex flex-col bg-warm-white">
    <Navbar />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
    <Toast position="top-right" />
    <ConfirmDialog />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
