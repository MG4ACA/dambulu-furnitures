<template>
  <header class="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-md shadow-sm">
    <div class="container mx-auto px-4">
      <!-- Top bar -->
      <div class="hidden md:flex justify-between items-center py-2 text-sm border-b border-cream">
        <div class="flex items-center gap-4 text-oak-light">
          <span class="flex items-center gap-1">
            <i class="pi pi-phone text-xs"></i>
            +94 112 312 408
          </span>
          <span class="flex items-center gap-1">
            <i class="pi pi-map-marker text-xs"></i>
            340 Lake Rd, Boralesgamuwa
          </span>
        </div>
        <div class="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            class="text-oak-light hover:text-deep-oak transition-colors"
          >
            <i class="pi pi-facebook"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            class="text-oak-light hover:text-deep-oak transition-colors"
          >
            <i class="pi pi-instagram"></i>
          </a>
          <a
            href="https://wa.me/94764496913"
            target="_blank"
            class="text-oak-light hover:text-deep-oak transition-colors"
          >
            <i class="pi pi-whatsapp"></i>
          </a>
        </div>
      </div>

      <!-- Main navigation -->
      <nav class="flex items-center justify-between py-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3">
          <img src="/logo.png" alt="Rimaco Furniture" class="h-12 w-auto" />
          <div class="hidden sm:block">
            <h1 class="font-serif text-xl font-bold text-deep-oak leading-tight">Rimaco</h1>
            <p class="text-xs text-oak-light">Custom Furniture</p>
          </div>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center gap-8">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="text-deep-oak hover:text-gold-accent transition-colors font-medium relative group"
          >
            {{ item.label }}
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-accent transition-all group-hover:w-full"
            ></span>
          </router-link>
        </div>

        <!-- CTA Button -->
        <div class="hidden lg:flex items-center gap-4">
          <Button
            label="Request Quote"
            icon="pi pi-send"
            class="!bg-gold-accent hover:!bg-gold-accent/90 !border-gold-accent !text-deep-oak font-semibold !px-6 !py-3"
            @click="$router.push('/contact')"
          />
        </div>

        <!-- Mobile Menu Button -->
        <Button
          icon="pi pi-bars"
          class="lg:hidden p-button-text p-button-rounded"
          @click="mobileMenuOpen = true"
        />
      </nav>
    </div>

    <!-- Mobile Sidebar -->
    <Sidebar v-model:visible="mobileMenuOpen" position="right" class="w-80">
      <template #header>
        <div class="flex items-center gap-3">
          <img src="/logo.png" alt="Rimaco Furniture" class="h-10 w-auto" />
          <span class="font-serif text-lg font-bold text-deep-oak">Menu</span>
        </div>
      </template>

      <div class="flex flex-col gap-2 mt-4">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-cream transition-colors text-deep-oak"
          @click="mobileMenuOpen = false"
        >
          <i :class="item.icon" class="text-gold-accent"></i>
          {{ item.label }}
        </router-link>

        <Divider />

        <div class="p-3 bg-cream rounded-lg">
          <p class="text-sm text-oak-light mb-2">Contact Us</p>
          <p class="flex items-center gap-2 text-deep-oak">
            <i class="pi pi-phone text-gold-accent"></i>
            +94 112 312 408
          </p>
          <p class="flex items-center gap-2 text-deep-oak mt-1 text-sm">
            <i class="pi pi-map-marker text-gold-accent"></i>
            340 Lake Rd, Boralesgamuwa
          </p>
        </div>

        <Button
          label="Request Quote"
          icon="pi pi-send"
          class="p-button-primary mt-4"
          @click="
            mobileMenuOpen = false;
            $router.push('/contact');
          "
        />
      </div>
    </Sidebar>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const mobileMenuOpen = ref(false);

const menuItems = [
  { label: 'Home', path: '/', icon: 'pi pi-home' },
  { label: 'Products', path: '/products', icon: 'pi pi-th-large' },
  { label: 'About Us', path: '/about', icon: 'pi pi-info-circle' },
  { label: 'Contact', path: '/contact', icon: 'pi pi-envelope' },
];
</script>
