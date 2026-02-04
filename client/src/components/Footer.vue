<template>
  <footer class="footer-gradient text-warm-white">
    <!-- Main Footer -->
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand Column -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-14 h-14 bg-warm-white rounded-lg flex items-center justify-center">
              <span class="text-deep-oak font-serif text-3xl font-bold">D</span>
            </div>
            <div>
              <h3 class="font-serif text-2xl font-bold">Dambulu</h3>
              <p class="text-cream/80 text-sm">Furniture Shop Galle</p>
            </div>
          </div>
          <p class="text-cream/70 mb-6 leading-relaxed">
            Crafting premium furniture with passion since 1975. Every piece tells a story of 
            Sri Lankan craftsmanship and timeless elegance.
          </p>
          <div class="flex gap-4">
            <a href="https://facebook.com" target="_blank" 
               class="w-10 h-10 bg-warm-white/10 rounded-full flex items-center justify-center hover:bg-gold-accent transition-colors">
              <i class="pi pi-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank"
               class="w-10 h-10 bg-warm-white/10 rounded-full flex items-center justify-center hover:bg-gold-accent transition-colors">
              <i class="pi pi-instagram"></i>
            </a>
            <a href="https://wa.me/94777424127" target="_blank"
               class="w-10 h-10 bg-warm-white/10 rounded-full flex items-center justify-center hover:bg-gold-accent transition-colors">
              <i class="pi pi-whatsapp"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-serif text-xl font-semibold mb-6">Quick Links</h4>
          <ul class="space-y-3">
            <li>
              <router-link to="/" class="text-cream/70 hover:text-gold-accent transition-colors flex items-center gap-2">
                <i class="pi pi-chevron-right text-xs"></i> Home
              </router-link>
            </li>
            <li>
              <router-link to="/products" class="text-cream/70 hover:text-gold-accent transition-colors flex items-center gap-2">
                <i class="pi pi-chevron-right text-xs"></i> All Products
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-cream/70 hover:text-gold-accent transition-colors flex items-center gap-2">
                <i class="pi pi-chevron-right text-xs"></i> About Us
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="text-cream/70 hover:text-gold-accent transition-colors flex items-center gap-2">
                <i class="pi pi-chevron-right text-xs"></i> Contact
              </router-link>
            </li>
            <li>
              <router-link to="/admin" class="text-cream/70 hover:text-gold-accent transition-colors flex items-center gap-2">
                <i class="pi pi-chevron-right text-xs"></i> Admin
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="font-serif text-xl font-semibold mb-6">Categories</h4>
          <ul class="space-y-3">
            <li v-for="cat in categories" :key="cat.code">
              <router-link 
                :to="`/products?category=${cat.code}`" 
                class="text-cream/70 hover:text-gold-accent transition-colors flex items-center gap-2"
              >
                <i class="pi pi-chevron-right text-xs"></i> {{ cat.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="font-serif text-xl font-semibold mb-6">Contact Us</h4>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-warm-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <i class="pi pi-map-marker text-gold-accent"></i>
              </div>
              <div>
                <p class="font-medium">Address</p>
                <p class="text-cream/70 text-sm">No 379, Dangedara, Galle, Sri Lanka</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-warm-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <i class="pi pi-phone text-gold-accent"></i>
              </div>
              <div>
                <p class="font-medium">Phone</p>
                <a href="tel:+94777424127" class="text-cream/70 text-sm hover:text-gold-accent transition-colors">
                  +94 77 742 4127
                </a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-warm-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <i class="pi pi-clock text-gold-accent"></i>
              </div>
              <div>
                <p class="font-medium">Working Hours</p>
                <p class="text-cream/70 text-sm">Mon - Sat: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trust Badges -->
    <div class="border-t border-warm-white/10">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="flex flex-col items-center">
            <i class="pi pi-verified text-3xl text-gold-accent mb-2"></i>
            <p class="font-semibold">Since 1975</p>
            <p class="text-cream/60 text-sm">50+ Years Legacy</p>
          </div>
          <div class="flex flex-col items-center">
            <i class="pi pi-shield text-3xl text-gold-accent mb-2"></i>
            <p class="font-semibold">10-Year Warranty</p>
            <p class="text-cream/60 text-sm">Quality Guaranteed</p>
          </div>
          <div class="flex flex-col items-center">
            <i class="pi pi-truck text-3xl text-gold-accent mb-2"></i>
            <p class="font-semibold">Free Delivery</p>
            <p class="text-cream/60 text-sm">Island-wide</p>
          </div>
          <div class="flex flex-col items-center">
            <i class="pi pi-star text-3xl text-gold-accent mb-2"></i>
            <p class="font-semibold">Premium Quality</p>
            <p class="text-cream/60 text-sm">Handcrafted Wood</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="border-t border-warm-white/10">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-cream/60 text-sm">
          <p>&copy; {{ currentYear }} Dambulu Furniture Shop Galle. All rights reserved.</p>
          <p>Crafted with <i class="pi pi-heart text-gold-accent"></i> in Sri Lanka</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { categories } from '@/services/api'

const currentYear = computed(() => new Date().getFullYear())
</script>
