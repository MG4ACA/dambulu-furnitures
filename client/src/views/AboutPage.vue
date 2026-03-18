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
          Specializing in custom-made melamine furniture for homes and offices
        </p>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-20 bg-warm-white">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block text-gold-accent font-medium mb-2">Established Today</span>
            <h2 class="font-serif text-4xl md:text-5xl font-bold text-deep-oak mb-6">
              Custom-Made Melamine Furniture Excellence
            </h2>
            <p class="text-oak-light text-lg leading-relaxed mb-6">
              Rimaco Furniture (PVT) LTD is a Sri Lankan manufacturer and distributor specializing
              in custom-made melamine furniture for homes and offices. We are primarily known for
              our bespoke wardrobes, TV consoles, and dressing units, and have completed projects
              for several prominent Sri Lankan personalities.
            </p>
            <p class="text-oak-light text-lg leading-relaxed mb-6">
              Our showroom is located at 340 Lake Rd, Boralesgamuwa 10280, near the Boralesgamuwa
              tank. We offer comprehensive customization options with high-quality melamine boards
              (18mm and 15mm) available in gloss or matte finishes.
            </p>
            <p class="text-oak-light text-lg leading-relaxed">
              From custom wardrobes and living room furniture to bedroom units and office solutions,
              we deliver tailored designs that perfectly fit your space and lifestyle. Free delivery
              is provided within Colombo areas, with convenient delivery options across the island.
            </p>
          </div>
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80"
              alt="Our Workshop"
              class="rounded-2xl shadow-2xl"
            />
            <div>
              <p class="text-5xl font-serif font-bold">Custom</p>
              <p class="font-medium">Design Solutions</p>
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
            <h3 class="font-serif text-xl font-bold text-deep-oak mb-3">Premium Materials</h3>
            <p class="text-oak-light">
              High-quality 18mm and 15mm melamine boards with gloss and matte finish options for
              durability and style.
            </p>
          </div>
          <div class="bg-warm-white rounded-2xl p-8 text-center shadow-lg">
            <div
              class="w-16 h-16 bg-gold-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i class="pi pi-users text-3xl text-gold-accent"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak mb-3">Custom Designs</h3>
            <p class="text-oak-light">
              Wardrobes, TV consoles, dressing units, and office furniture tailored to your exact
              specifications and space.
            </p>
          </div>
          <div class="bg-warm-white rounded-2xl p-8 text-center shadow-lg">
            <div
              class="w-16 h-16 bg-gold-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i class="pi pi-cog text-3xl text-gold-accent"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak mb-3">Expert Craftsmanship</h3>
            <p class="text-oak-light">
              Professional installation and finishing with attention to detail. We've served several
              prominent Sri Lankan celebrities.
            </p>
          </div>
          <div class="bg-warm-white rounded-2xl p-8 text-center shadow-lg">
            <div
              class="w-16 h-16 bg-gold-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i class="pi pi-shield text-3xl text-gold-accent"></i>
            </div>
            <h3 class="font-serif text-xl font-bold text-deep-oak mb-3">Convenient Delivery</h3>
            <p class="text-oak-light">
              Free delivery within Colombo areas with affordable rates across the island. Reliable
              and timely service.
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
