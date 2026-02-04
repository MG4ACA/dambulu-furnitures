<template>
  <section class="py-20 bg-cream">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <span class="inline-block text-gold-accent font-medium mb-2">Customer Favorites</span>
        <h2 class="font-serif text-4xl md:text-5xl font-bold text-deep-oak mb-4">Best Sellers</h2>
        <p class="text-oak-light max-w-2xl mx-auto">
          Discover our most loved furniture pieces, chosen by thousands of satisfied customers
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <ProgressSpinner strokeWidth="4" />
      </div>

      <!-- Carousel -->
      <Carousel 
        v-else
        :value="products" 
        :numVisible="3" 
        :numScroll="1" 
        :responsiveOptions="responsiveOptions"
        :autoplayInterval="5000"
        circular
        class="custom-carousel"
      >
        <template #item="slotProps">
          <div class="p-4">
            <div class="product-card bg-warm-white rounded-2xl overflow-hidden shadow-lg">
              <!-- Image -->
              <div class="relative image-zoom">
                <img 
                  :src="slotProps.data.images?.[0] || 'https://via.placeholder.com/400x300'" 
                  :alt="slotProps.data.name"
                  class="w-full h-64 object-cover"
                />
                <div class="absolute top-4 left-4 flex gap-2">
                  <Tag v-if="slotProps.data.isBestSeller" value="Best Seller" class="premium-badge" />
                  <Tag v-if="slotProps.data.isNew" value="New" severity="success" />
                </div>
                <div class="absolute top-4 right-4">
                  <Button 
                    icon="pi pi-heart" 
                    class="p-button-rounded p-button-text bg-warm-white/80 hover:bg-warm-white"
                  />
                </div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <div class="flex items-center gap-2 mb-2">
                  <Chip :label="slotProps.data.category" class="text-xs" />
                </div>
                <h3 class="font-serif text-xl font-semibold text-deep-oak mb-2 line-clamp-1">
                  {{ slotProps.data.name }}
                </h3>
                <p class="text-oak-light text-sm mb-4 line-clamp-2">
                  {{ slotProps.data.shortDescription }}
                </p>
                <div class="flex items-center mb-4">
                  <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                  <span class="text-sm text-oak-light ml-2">({{ slotProps.data.reviews || 0 }})</span>
                </div>
                <div class="flex justify-between items-center">
                  <div>
                    <span class="text-deep-oak text-2xl font-bold">
                      Rs. {{ formatPrice(slotProps.data.price) }}
                    </span>
                  </div>
                  <Button 
                    label="View" 
                    icon="pi pi-eye" 
                    class="p-button-sm"
                    @click="$router.push(`/products/${slotProps.data.id}`)"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>

      <!-- View All Button -->
      <div class="text-center mt-8">
        <Button 
          label="View All Products" 
          icon="pi pi-arrow-right" 
          iconPos="right"
          class="p-button-lg p-button-outlined"
          @click="$router.push('/products')"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { productService } from '@/services/api'

const products = ref([])
const loading = ref(true)

const responsiveOptions = ref([
  { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
  { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
  { breakpoint: '768px', numVisible: 1, numScroll: 1 }
])

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-LK').format(price)
}

onMounted(async () => {
  try {
    const data = await productService.getBestSellers()
    products.value = data
  } catch (error) {
    console.error('Error fetching best sellers:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
