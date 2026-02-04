<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-deep-oak py-20">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1920&q=80"
          alt="Workshop"
          class="w-full h-full object-cover opacity-20"
        />
      </div>
      <div class="container mx-auto px-4 relative z-10">
        <Breadcrumb :home="{ icon: 'pi pi-home', to: '/' }" :model="breadcrumbItems" class="mb-4" />
        <h1 class="font-serif text-4xl md:text-6xl font-bold text-warm-white mb-4">Our Story</h1>
        <p class="text-cream/80 max-w-2xl text-lg">
          Five decades of craftsmanship, tradition, and excellence in furniture making
        </p>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-20 bg-warm-white">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block text-gold-accent font-medium mb-2">Established 1975</span>
            <h2 class="font-serif text-4xl md:text-5xl font-bold text-deep-oak mb-6">
              A Legacy of Excellence
            </h2>
            <p class="text-oak-light text-lg leading-relaxed mb-6">
              Dambulu Furniture Shop was founded in 1975 in the heart of Galle, Sri Lanka, with a
              simple vision: to create furniture that combines traditional Sri Lankan craftsmanship
              with timeless design.
            </p>
            <p class="text-oak-light text-lg leading-relaxed mb-6">
              What started as a small workshop has grown into one of the most respected furniture
              establishments in the Southern Province, serving generations of families who value
              quality and authenticity.
            </p>
            <p class="text-oak-light text-lg leading-relaxed">
              Today, we continue the tradition passed down through three generations, combining
              time-honored woodworking techniques with modern design sensibilities to create pieces
              that will be cherished for years to come.
            </p>
          </div>
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80"
              alt="Our Workshop"
              class="rounded-2xl shadow-2xl"
            />
            <div
              class="absolute -bottom-6 -left-6 bg-gold-accent text-deep-oak p-6 rounded-2xl shadow-xl"
            >
              <p class="text-5xl font-serif font-bold">50+</p>
              <p class="font-medium">Years of Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-cream">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <span class="inline-block text-gold-accent font-medium mb-2">What Drives Us</span>
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-deep-oak mb-4">
            Our Core Values
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-warm-white rounded-2xl p-8 text-center shadow-lg">
            <div
              class="w-16 h-16 bg-gold-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i class="pi pi-star text-3xl text-gold-accent"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak mb-3">Quality First</h3>
            <p class="text-oak-light">
              We use only the finest quality solid wood and materials, ensuring every piece meets
              our exacting standards.
            </p>
          </div>
          <div class="bg-warm-white rounded-2xl p-8 text-center shadow-lg">
            <div
              class="w-16 h-16 bg-gold-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i class="pi pi-users text-3xl text-gold-accent"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak mb-3">Family Values</h3>
            <p class="text-oak-light">
              As a family business, we treat every customer like family, providing personalized
              service and genuine care.
            </p>
          </div>
          <div class="bg-warm-white rounded-2xl p-8 text-center shadow-lg">
            <div
              class="w-16 h-16 bg-gold-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i class="pi pi-cog text-3xl text-gold-accent"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak mb-3">Master Craftsmanship</h3>
            <p class="text-oak-light">
              Our artisans have decades of experience, using traditional techniques passed down
              through generations.
            </p>
          </div>
          <div class="bg-warm-white rounded-2xl p-8 text-center shadow-lg">
            <div
              class="w-16 h-16 bg-gold-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i class="pi pi-shield text-3xl text-gold-accent"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak mb-3">10-Year Warranty</h3>
            <p class="text-oak-light">
              We stand behind every piece with our comprehensive 10-year warranty, a testament to
              our confidence in quality.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-warm-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <span class="inline-block text-gold-accent font-medium mb-2">The People Behind</span>
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-deep-oak mb-4">
            Our Expert Team
          </h2>
          <p class="text-oak-light max-w-2xl mx-auto">
            Meet the skilled artisans and dedicated professionals who bring your furniture dreams to
            life
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div
              class="w-40 h-40 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center"
            >
              <i class="pi pi-user text-6xl text-oak-light"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak">Sunil Fernando</h3>
            <p class="text-gold-accent mb-2">Founder & Master Craftsman</p>
            <p class="text-oak-light text-sm">50+ years of woodworking excellence</p>
          </div>
          <div class="text-center">
            <div
              class="w-40 h-40 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center"
            >
              <i class="pi pi-user text-6xl text-oak-light"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak">Nimal Fernando</h3>
            <p class="text-gold-accent mb-2">Managing Director</p>
            <p class="text-oak-light text-sm">Leading the family legacy</p>
          </div>
          <div class="text-center">
            <div
              class="w-40 h-40 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center"
            >
              <i class="pi pi-user text-6xl text-oak-light"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak">Kumara Silva</h3>
            <p class="text-gold-accent mb-2">Head of Design</p>
            <p class="text-oak-light text-sm">25 years of creative excellence</p>
          </div>
          <div class="text-center">
            <div
              class="w-40 h-40 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center"
            >
              <i class="pi pi-user text-6xl text-oak-light"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak">Anura Perera</h3>
            <p class="text-gold-accent mb-2">Production Manager</p>
            <p class="text-oak-light text-sm">Ensuring quality standards</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-20 bg-deep-oak">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <span class="inline-block text-gold-accent font-medium mb-2">What We Offer</span>
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-warm-white mb-4">
            Our Services
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="bg-warm-white/10 backdrop-blur-sm rounded-2xl p-8 border border-warm-white/20"
          >
            <i class="pi pi-home text-4xl text-gold-accent mb-4"></i>
            <h3 class="font-serif text-2xl font-bold text-warm-white mb-3">Ready-Made Furniture</h3>
            <p class="text-cream/80">
              Explore our extensive collection of bedroom sets, sofas, dining tables, and more.
              Immediate availability with island-wide delivery.
            </p>
          </div>
          <div
            class="bg-warm-white/10 backdrop-blur-sm rounded-2xl p-8 border border-warm-white/20"
          >
            <i class="pi pi-palette text-4xl text-gold-accent mb-4"></i>
            <h3 class="font-serif text-2xl font-bold text-warm-white mb-3">Custom Design</h3>
            <p class="text-cream/80">
              Have a unique vision? Our design team will work with you to create bespoke furniture
              tailored to your exact specifications.
            </p>
          </div>
          <div
            class="bg-warm-white/10 backdrop-blur-sm rounded-2xl p-8 border border-warm-white/20"
          >
            <i class="pi pi-building text-4xl text-gold-accent mb-4"></i>
            <h3 class="font-serif text-2xl font-bold text-warm-white mb-3">Interior Design</h3>
            <p class="text-cream/80">
              Complete interior design services for homes and businesses. From concept to
              installation, we handle everything.
            </p>
          </div>
          <div
            class="bg-warm-white/10 backdrop-blur-sm rounded-2xl p-8 border border-warm-white/20"
          >
            <i class="pi pi-wrench text-4xl text-gold-accent mb-4"></i>
            <h3 class="font-serif text-2xl font-bold text-warm-white mb-3">Restoration</h3>
            <p class="text-cream/80">
              Breathe new life into your cherished antique or damaged furniture with our expert
              restoration services.
            </p>
          </div>
          <div
            class="bg-warm-white/10 backdrop-blur-sm rounded-2xl p-8 border border-warm-white/20"
          >
            <i class="pi pi-truck text-4xl text-gold-accent mb-4"></i>
            <h3 class="font-serif text-2xl font-bold text-warm-white mb-3">
              Delivery & Installation
            </h3>
            <p class="text-cream/80">
              Free island-wide delivery with professional installation by our trained team. Your
              furniture, perfectly placed.
            </p>
          </div>
          <div
            class="bg-warm-white/10 backdrop-blur-sm rounded-2xl p-8 border border-warm-white/20"
          >
            <i class="pi pi-comments text-4xl text-gold-accent mb-4"></i>
            <h3 class="font-serif text-2xl font-bold text-warm-white mb-3">Consultation</h3>
            <p class="text-cream/80">
              Free design consultation at our showroom or your location. Let our experts help you
              make the right choice.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-cream">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-serif text-4xl md:text-5xl font-bold text-deep-oak mb-6">
          Visit Our Showroom
        </h2>
        <p class="text-oak-light text-xl mb-8 max-w-2xl mx-auto">
          Experience our craftsmanship firsthand. Visit us at Dangedara, Galle, and let us help you
          find the perfect furniture for your home.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <Button
            label="Get Directions"
            icon="pi pi-map-marker"
            class="p-button-lg"
            @click="openMaps"
          />
          <Button
            label="Contact Us"
            icon="pi pi-phone"
            class="p-button-lg p-button-outlined"
            @click="$router.push('/contact')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const breadcrumbItems = ref([{ label: 'About Us' }]);

const openMaps = () => {
  window.open('https://maps.google.com/?q=No+379+Dangedara+Galle+Sri+Lanka', '_blank');
};
</script>

<style scoped>
:deep(.p-breadcrumb) {
  background: transparent;
  border: none;
  padding: 0;
}

:deep(.p-breadcrumb .p-breadcrumb-list li .p-menuitem-link) {
  color: rgba(250, 248, 245, 0.7);
}

:deep(.p-breadcrumb .p-breadcrumb-list li.p-menuitem-separator) {
  color: rgba(250, 248, 245, 0.5);
}
</style>
