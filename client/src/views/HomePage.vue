<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Categories Section -->
    <section class="py-20 bg-warm-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <span class="inline-block text-gold-accent font-medium mb-2">Browse By</span>
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-deep-oak mb-4">Our Categories</h2>
          <p class="text-oak-light max-w-2xl mx-auto">
            Explore our wide range of premium handcrafted furniture collections
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <router-link 
            v-for="cat in categories" 
            :key="cat.code"
            :to="`/products?category=${cat.code}`"
            class="group"
          >
            <div class="bg-cream rounded-2xl p-6 text-center transition-all hover:bg-deep-oak hover:text-warm-white">
              <div class="w-16 h-16 mx-auto mb-4 bg-warm-white rounded-full flex items-center justify-center group-hover:bg-gold-accent transition-colors">
                <i :class="cat.icon" class="text-2xl text-deep-oak"></i>
              </div>
              <h3 class="font-medium">{{ cat.name }}</h3>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Best Sellers Carousel -->
    <BestSellers />

    <!-- About Preview Section -->
    <section class="py-20 bg-warm-white">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Image Grid -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&q=80" 
                alt="Craftsmanship"
                class="rounded-2xl shadow-lg w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" 
                alt="Showroom"
                class="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div class="space-y-4 pt-8">
              <img 
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80" 
                alt="Workshop"
                class="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80" 
                alt="Furniture"
                class="rounded-2xl shadow-lg w-full h-48 object-cover"
              />
            </div>
          </div>

          <!-- Content -->
          <div>
            <span class="inline-block text-gold-accent font-medium mb-2">Our Story</span>
            <h2 class="font-serif text-4xl md:text-5xl font-bold text-deep-oak mb-6">
              Crafting Excellence Since 1975
            </h2>
            <p class="text-oak-light text-lg mb-6 leading-relaxed">
              For over five decades, Dambulu Furniture Shop has been the cornerstone of premium 
              furniture craftsmanship in Galle. Our master artisans blend traditional Sri Lankan 
              woodworking techniques with modern design sensibilities.
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gold-accent/20 rounded-full flex items-center justify-center">
                  <i class="pi pi-check text-gold-accent"></i>
                </div>
                <span class="text-deep-oak">Premium quality solid wood construction</span>
              </li>
              <li class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gold-accent/20 rounded-full flex items-center justify-center">
                  <i class="pi pi-check text-gold-accent"></i>
                </div>
                <span class="text-deep-oak">10-year comprehensive warranty</span>
              </li>
              <li class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gold-accent/20 rounded-full flex items-center justify-center">
                  <i class="pi pi-check text-gold-accent"></i>
                </div>
                <span class="text-deep-oak">Custom interior design services</span>
              </li>
              <li class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gold-accent/20 rounded-full flex items-center justify-center">
                  <i class="pi pi-check text-gold-accent"></i>
                </div>
                <span class="text-deep-oak">Island-wide delivery & installation</span>
              </li>
            </ul>
            <Button 
              label="Learn More About Us" 
              icon="pi pi-arrow-right" 
              iconPos="right"
              class="p-button-lg"
              @click="$router.push('/about')"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-deep-oak">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <span class="inline-block text-gold-accent font-medium mb-2">Testimonials</span>
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-warm-white mb-4">
            What Our Customers Say
          </h2>
        </div>

        <Carousel 
          :value="testimonials" 
          :numVisible="3" 
          :numScroll="1"
          :responsiveOptions="testimonialResponsive"
          :autoplayInterval="6000"
          circular
        >
          <template #item="slotProps">
            <div class="p-4">
              <div class="bg-warm-white/10 backdrop-blur-sm rounded-2xl p-8 border border-warm-white/20">
                <div class="flex items-center gap-1 mb-4">
                  <i v-for="n in 5" :key="n" class="pi pi-star-fill text-gold-accent"></i>
                </div>
                <p class="text-warm-white/90 italic mb-6 leading-relaxed">
                  "{{ slotProps.data.text }}"
                </p>
                <div class="flex items-center gap-4">
                  <Avatar 
                    :label="slotProps.data.name.charAt(0)" 
                    size="large" 
                    class="bg-gold-accent text-deep-oak"
                  />
                  <div>
                    <p class="text-warm-white font-semibold">{{ slotProps.data.name }}</p>
                    <p class="text-warm-white/60 text-sm">{{ slotProps.data.location }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-cream">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-serif text-4xl md:text-5xl font-bold text-deep-oak mb-6">
          Ready to Transform Your Space?
        </h2>
        <p class="text-oak-light text-xl mb-8 max-w-2xl mx-auto">
          Visit our showroom or contact us for a free consultation. Let's bring your dream furniture to life.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <Button 
            label="Visit Showroom" 
            icon="pi pi-map-marker" 
            class="p-button-lg"
            @click="$router.push('/contact')"
          />
          <Button 
            label="Call Now" 
            icon="pi pi-phone" 
            class="p-button-lg p-button-outlined"
            @click="window.open('tel:+94777424127')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import BestSellers from '@/components/BestSellers.vue'
import { categories } from '@/services/api'

const testimonials = ref([
  {
    name: 'Nimal Perera',
    location: 'Colombo',
    text: 'Absolutely stunning craftsmanship! Our bedroom set has transformed our home. The quality is exceptional and worth every rupee.'
  },
  {
    name: 'Samanthi Fernando',
    location: 'Kandy',
    text: 'Dambulu Furniture delivered beyond our expectations. The custom dining table is a masterpiece. Highly recommend their services!'
  },
  {
    name: 'Rohan Silva',
    location: 'Galle',
    text: 'Being a local, I\'ve known them for years. Their commitment to quality and customer satisfaction is unmatched. True artisans!'
  },
  {
    name: 'Kumari Jayawardena',
    location: 'Matara',
    text: 'The sofa set we ordered is simply beautiful. Comfortable, elegant, and built to last. Thank you for the wonderful service!'
  }
])

const testimonialResponsive = ref([
  { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
  { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
  { breakpoint: '768px', numVisible: 1, numScroll: 1 }
])
</script>
