<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Categories Section -->
    <section class="py-20 bg-warm-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <span class="inline-block text-gold-accent font-medium mb-2">Browse By</span>
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-deep-oak mb-4">
            Our Categories
          </h2>
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
            <div
              class="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-gold-accent"
            >
              <!-- Category Image -->
              <div class="relative h-32 overflow-hidden">
                <img
                  :src="cat.image"
                  :alt="cat.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-deep-oak/80 to-transparent"
                ></div>
              </div>

              <!-- Category Info -->
              <div class="p-4 text-center">
                <h3 class="font-semibold text-deep-oak mb-1">{{ cat.name }}</h3>
                <p v-if="cat.description" class="text-xs text-oak-light">{{ cat.description }}</p>
              </div>
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
              Premium Teak Wood Furniture
            </h2>
            <p class="text-oak-light text-lg mb-6 leading-relaxed">
              Sene Lanka Furniture - Established in 1996 with over 28 years of industry experience. We specialize in high-quality teak wood furniture with custom-built options. Each piece is manufactured with 100% control from timber sourcing to final assembly.
            </p>
            <p class="text-oak-light text-lg mb-6 leading-relaxed">
              Our commitment is simple: "Uncommon designs, creativity, and innovation" combined with "Quality furniture at an affordable price". We blend traditional Sri Lankan craftsmanship with modern design excellence.
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-center gap-3">
                <div
                  class="w-8 h-8 bg-gold-accent/20 rounded-full flex items-center justify-center"
                >
                  <i class="pi pi-check text-gold-accent"></i>
                </div>
                <span class="text-deep-oak">Premium teak wood with 10-year warranty</span>
              </li>
              <li class="flex items-center gap-3">
                <div
                  class="w-8 h-8 bg-gold-accent/20 rounded-full flex items-center justify-center"
                >
                  <i class="pi pi-check text-gold-accent"></i>
                </div>
                <span class="text-deep-oak">Fully customizable sizes, colors & fabrics (HS & PE)</span>
              </li>
              <li class="flex items-center gap-3">
                <div
                  class="w-8 h-8 bg-gold-accent/20 rounded-full flex items-center justify-center"
                >
                  <i class="pi pi-check text-gold-accent"></i>
                </div>
                <span class="text-deep-oak">Multiple payment options with installment plans</span>
              </li>
              <li class="flex items-center gap-3">
                <div
                  class="w-8 h-8 bg-gold-accent/20 rounded-full flex items-center justify-center"
                >
                  <i class="pi pi-check text-gold-accent"></i>
                </div>
                <span class="text-deep-oak">Free delivery in Negombo & Kelaniya</span>
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
    <!-- Features Section -->
    <section class="py-20 bg-cream">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <span class="inline-block text-gold-accent font-medium mb-2">Why Choose Us</span>
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-deep-oak mb-4">
            Our Key Features
          </h2>
          <p class="text-oak-light max-w-2xl mx-auto">
            Experience excellence with our premium teak furniture
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1: Warranty -->
          <div class="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-shadow">
            <div
              class="w-16 h-16 bg-gold-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i class="pi pi-shield text-3xl text-gold-accent"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak mb-3">10-Year Warranty</h3>
            <p class="text-oak-light">
              All teak furniture structures come with a comprehensive 10-year warranty. We stand behind the quality of our craftsmanship.
            </p>
          </div>

          <!-- Feature 2: Customization -->
          <div class="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-shadow">
            <div
              class="w-16 h-16 bg-gold-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i class="pi pi-pencil text-3xl text-gold-accent"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak mb-3">Fully Customizable</h3>
            <p class="text-oak-light">
              Custom sizes, colors, and fabrics (HS & PE materials). Design your furniture exactly as you envision it.
            </p>
          </div>

          <!-- Feature 3: Payment Methods -->
          <div class="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-shadow">
            <div
              class="w-16 h-16 bg-gold-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i class="pi pi-wallet text-3xl text-gold-accent"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak mb-3">Flexible Payments</h3>
            <p class="text-oak-light">
              Cash on delivery, bank transfers, card payments (Visa/Mastercard/Amex), and installment plans via credit cards.
            </p>
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
              <div
                class="bg-warm-white/10 backdrop-blur-sm rounded-2xl p-8 border border-warm-white/20"
              >
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
          Visit our showroom or contact us for a free consultation. Let's bring your dream furniture
          to life.
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
            @click="window.open('tel:+94727592810')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import BestSellers from '@/components/BestSellers.vue';
import HeroSection from '@/components/HeroSection.vue';
import { categories } from '@/services/api';
import { ref } from 'vue';

const testimonials = ref([
  {
    name: 'Nimal Perera',
    location: 'Colombo',
    text: 'Absolutely stunning teak craftsmanship! Our furniture has transformed our home. The quality is exceptional and the warranty gives great peace of mind.',
  },
  {
    name: 'Samanthi Fernando',
    location: 'Kandy',
    text: 'Sene Lanka Furniture exceeded our expectations. The custom-built teak dining set is a masterpiece. Highly recommend their dedication to quality!',
  },
  {
    name: 'Rohan Silva',
    location: 'Galle',
    text: 'For over 28 years, they have delivered premium teak furniture. Their craftsmanship and customer service are unmatched. True artisans!',
  },
  {
    name: 'Kumari Jayawardena',
    location: 'Negombo',
    text: 'The teak sofa set we ordered is simply beautiful and durable. Comfortable, elegant, and built to last. Thank you for the excellent service!',
  },
]);

const testimonialResponsive = ref([
  { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
  { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
  { breakpoint: '768px', numVisible: 1, numScroll: 1 },
]);
</script>
