<template>
  <section class="relative min-h-[90vh] flex items-center overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80"
        alt="Elegant furniture showroom"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 hero-gradient"></div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-20 right-10 w-64 h-64 bg-gold-accent/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 left-10 w-96 h-96 bg-warm-white/5 rounded-full blur-3xl"></div>

    <!-- Content -->
    <div class="container mx-auto px-4 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div class="text-warm-white">
          <div
            class="inline-flex items-center gap-2 bg-warm-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in-up"
          >
            <i class="pi pi-verified text-gold-accent"></i>
            <span class="text-sm font-medium">Established Since 1996 • 28+ Years Excellence</span>
          </div>

          <h1
            class="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up delay-100"
          >
            Premium
            <span class="text-gold-accent">Teak Furniture</span>
            <br />
            Crafted for Life
          </h1>

          <p
            class="text-xl text-cream/90 mb-8 max-w-lg leading-relaxed animate-fade-in-up delay-200"
          >
            Uncommon designs, creativity, and innovation combined with quality furniture at an
            affordable price. Every piece backed by our
            <strong>10-year warranty</strong>
            .
          </p>

          <div class="flex flex-wrap gap-4 animate-fade-in-up delay-300">
            <Button
              label="Explore Collection"
              icon="pi pi-arrow-right"
              iconPos="right"
              class="p-button-lg bg-gold-accent border-gold-accent hover:bg-yellow-600"
              @click="$router.push('/products')"
            />
            <Button
              label="Request Custom Design"
              icon="pi pi-palette"
              class="p-button-lg p-button-outlined border-warm-white text-warm-white hover:bg-warm-white/10"
              @click="$router.push('/contact')"
            />
          </div>

          <!-- Stats -->
          <div
            class="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-warm-white/20 animate-fade-in-up delay-400"
          >
            <div>
              <p class="text-4xl font-serif font-bold text-gold-accent">50+</p>
              <p class="text-cream/70 text-sm">Years of Excellence</p>
            </div>
            <div>
              <p class="text-4xl font-serif font-bold text-gold-accent">10K+</p>
              <p class="text-cream/70 text-sm">Happy Customers</p>
            </div>
            <div>
              <p class="text-4xl font-serif font-bold text-gold-accent">10yr</p>
              <p class="text-cream/70 text-sm">Warranty</p>
            </div>
          </div>
        </div>

        <!-- Featured Product Card -->
        <div class="hidden lg:block animate-fade-in-up delay-500">
          <div
            class="bg-warm-white/10 backdrop-blur-md rounded-3xl p-6 border border-warm-white/20"
          >
            <div class="relative rounded-2xl overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
                alt="Featured Sofa"
                class="w-full h-72 object-cover"
              />
              <div class="absolute top-4 left-4">
                <Tag value="Best Seller" class="premium-badge" />
              </div>
            </div>
            <h3 class="font-serif text-2xl text-warm-white mb-2">Royal Heritage Sofa</h3>
            <p class="text-cream/70 mb-4">Handcrafted luxury sofa with premium teak wood frame</p>
            <div class="flex justify-between items-center">
              <div>
                <span class="text-gold-accent text-2xl font-bold">Rs. 185,000</span>
              </div>
              <Button
                icon="pi pi-arrow-right"
                class="p-button-rounded bg-gold-accent border-gold-accent"
                @click="$router.push('/products/1')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div class="flex flex-col items-center text-warm-white/60">
        <span class="text-sm mb-2">Scroll to explore</span>
        <i class="pi pi-chevron-down"></i>
      </div>
    </div>
  </section>
</template>

<script setup></script>
