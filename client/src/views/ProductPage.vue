<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-12">
      <div class="grid lg:grid-cols-2 gap-12">
        <Skeleton height="500px" class="rounded-2xl" />
        <div>
          <Skeleton width="30%" class="mb-4" />
          <Skeleton width="80%" height="40px" class="mb-4" />
          <Skeleton width="100%" class="mb-2" />
          <Skeleton width="100%" class="mb-2" />
          <Skeleton width="60%" class="mb-6" />
          <Skeleton width="40%" height="50px" class="mb-6" />
          <Skeleton width="100%" height="48px" />
        </div>
      </div>
    </div>

    <!-- Product Content -->
    <div v-else-if="product">
      <!-- Breadcrumb -->
      <section class="bg-cream py-4">
        <div class="container mx-auto px-4">
          <Breadcrumb :home="{ icon: 'pi pi-home', to: '/' }" :model="breadcrumbItems" />
        </div>
      </section>

      <!-- Main Product Section -->
      <section class="py-12 bg-warm-white">
        <div class="container mx-auto px-4">
          <div class="grid lg:grid-cols-2 gap-12">
            <!-- Product Images -->
            <div>
              <Galleria
                :value="productImages"
                :numVisible="4"
                :thumbnailsPosition="'bottom'"
                :showItemNavigators="true"
                :showThumbnailNavigators="false"
                :responsiveOptions="galleriaResponsive"
                containerClass="rounded-2xl overflow-hidden shadow-lg"
              >
                <template #item="slotProps">
                  <img
                    :src="slotProps.item"
                    :alt="product.name"
                    class="w-full h-[500px] object-cover"
                  />
                </template>
                <template #thumbnail="slotProps">
                  <img
                    :src="slotProps.item"
                    :alt="product.name"
                    class="w-20 h-20 object-cover rounded-lg"
                  />
                </template>
              </Galleria>
            </div>

            <!-- Product Info -->
            <div>
              <!-- Tags -->
              <div class="flex items-center gap-3 mb-4">
                <Chip :label="product.category" />
                <Tag v-if="product.isBestSeller" value="Best Seller" class="premium-badge" />
                <Tag v-if="product.isNew" value="New Arrival" severity="success" />
                <Tag v-if="product.inStock === false" value="Out of Stock" severity="danger" />
              </div>

              <!-- Title -->
              <h1 class="font-serif text-4xl md:text-5xl font-bold text-deep-oak mb-4">
                {{ product.name }}
              </h1>

              <!-- Rating -->
              <div class="flex items-center gap-4 mb-6">
                <Rating :modelValue="product.rating" :readonly="true" :cancel="false" />
                <span class="text-oak-light">({{ product.reviews || 0 }} reviews)</span>
              </div>

              <!-- Price -->
              <div class="mb-6">
                <span class="text-4xl font-bold text-deep-oak">
                  Rs. {{ formatPrice(product.price) }}
                </span>
                <span v-if="product.originalPrice" class="text-oak-light line-through ml-3 text-xl">
                  Rs. {{ formatPrice(product.originalPrice) }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-oak-light text-lg leading-relaxed mb-8">
                {{ product.description }}
              </p>

              <!-- Features -->
              <div class="mb-8">
                <h3 class="font-semibold text-deep-oak mb-3">Key Features:</h3>
                <ul class="space-y-2">
                  <li
                    v-for="(feature, index) in product.features"
                    :key="index"
                    class="flex items-center gap-2"
                  >
                    <i class="pi pi-check-circle text-gold-accent"></i>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <!-- Dimensions -->
              <div v-if="product.dimensions" class="mb-8 bg-cream rounded-xl p-4">
                <h3 class="font-semibold text-deep-oak mb-3">Dimensions:</h3>
                <div class="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p class="text-2xl font-bold text-deep-oak">{{ product.dimensions.width }}</p>
                    <p class="text-oak-light text-sm">Width (cm)</p>
                  </div>
                  <div>
                    <p class="text-2xl font-bold text-deep-oak">{{ product.dimensions.height }}</p>
                    <p class="text-oak-light text-sm">Height (cm)</p>
                  </div>
                  <div>
                    <p class="text-2xl font-bold text-deep-oak">{{ product.dimensions.depth }}</p>
                    <p class="text-oak-light text-sm">Depth (cm)</p>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-wrap gap-4 mb-8">
                <Button
                  label="Request Quote"
                  icon="pi pi-send"
                  class="p-button-lg flex-1"
                  @click="quoteDialogVisible = true"
                />
                <Button
                  icon="pi pi-heart"
                  class="p-button-lg p-button-outlined"
                  v-tooltip.top="'Add to Wishlist'"
                />
                <Button
                  icon="pi pi-share-alt"
                  class="p-button-lg p-button-outlined"
                  v-tooltip.top="'Share'"
                  @click="shareProduct"
                />
              </div>

              <!-- Trust Badges -->
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-3 bg-cream rounded-lg p-3">
                  <i class="pi pi-shield text-2xl text-gold-accent"></i>
                  <div>
                    <p class="font-semibold text-deep-oak text-sm">10-Year Warranty</p>
                    <p class="text-oak-light text-xs">Quality guaranteed</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 bg-cream rounded-lg p-3">
                  <i class="pi pi-truck text-2xl text-gold-accent"></i>
                  <div>
                    <p class="font-semibold text-deep-oak text-sm">Free Delivery</p>
                    <p class="text-oak-light text-xs">Island-wide shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Details Tabs -->
      <section class="py-12 bg-cream">
        <div class="container mx-auto px-4">
          <TabView>
            <TabPanel header="Description">
              <div class="prose max-w-none">
                <p class="text-oak-light leading-relaxed">
                  {{ product.fullDescription || product.description }}
                </p>

                <h3 class="font-serif text-2xl font-bold text-deep-oak mt-8 mb-4">Craftsmanship</h3>
                <p class="text-oak-light leading-relaxed">
                  Each piece from Dambulu Furniture is handcrafted by our master artisans with over
                  50 years of combined experience. We use only the finest quality solid wood,
                  sourced sustainably from local suppliers.
                </p>

                <h3 class="font-serif text-2xl font-bold text-deep-oak mt-8 mb-4">Materials</h3>
                <ul class="space-y-2">
                  <li class="flex items-center gap-2 text-oak-light">
                    <i class="pi pi-check text-gold-accent"></i>
                    Premium grade {{ product.material || 'solid wood' }}
                  </li>
                  <li class="flex items-center gap-2 text-oak-light">
                    <i class="pi pi-check text-gold-accent"></i>
                    High-quality lacquer finish
                  </li>
                  <li class="flex items-center gap-2 text-oak-light">
                    <i class="pi pi-check text-gold-accent"></i>
                    Durable brass/steel hardware
                  </li>
                </ul>
              </div>
            </TabPanel>

            <TabPanel header="Specifications">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div class="flex justify-between py-3 border-b border-gray-200">
                    <span class="text-oak-light">Category</span>
                    <span class="font-semibold text-deep-oak">{{ product.category }}</span>
                  </div>
                  <div class="flex justify-between py-3 border-b border-gray-200">
                    <span class="text-oak-light">Material</span>
                    <span class="font-semibold text-deep-oak">
                      {{ product.material || 'Solid Wood' }}
                    </span>
                  </div>
                  <div class="flex justify-between py-3 border-b border-gray-200">
                    <span class="text-oak-light">Finish</span>
                    <span class="font-semibold text-deep-oak">
                      {{ product.finish || 'Natural Lacquer' }}
                    </span>
                  </div>
                  <div class="flex justify-between py-3 border-b border-gray-200">
                    <span class="text-oak-light">Color</span>
                    <span class="font-semibold text-deep-oak">
                      {{ product.color || 'Natural Wood' }}
                    </span>
                  </div>
                </div>
                <div class="space-y-4">
                  <div
                    v-if="product.dimensions"
                    class="flex justify-between py-3 border-b border-gray-200"
                  >
                    <span class="text-oak-light">Dimensions (W×H×D)</span>
                    <span class="font-semibold text-deep-oak">
                      {{ product.dimensions.width }} × {{ product.dimensions.height }} ×
                      {{ product.dimensions.depth }} cm
                    </span>
                  </div>
                  <div class="flex justify-between py-3 border-b border-gray-200">
                    <span class="text-oak-light">Weight</span>
                    <span class="font-semibold text-deep-oak">{{ product.weight || '25' }} kg</span>
                  </div>
                  <div class="flex justify-between py-3 border-b border-gray-200">
                    <span class="text-oak-light">Warranty</span>
                    <span class="font-semibold text-deep-oak">10 Years</span>
                  </div>
                  <div class="flex justify-between py-3 border-b border-gray-200">
                    <span class="text-oak-light">Assembly</span>
                    <span class="font-semibold text-deep-oak">
                      {{ product.assembly || 'Professional installation included' }}
                    </span>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel header="Warranty & Care">
              <div class="prose max-w-none">
                <h3 class="font-serif text-2xl font-bold text-deep-oak mb-4">10-Year Warranty</h3>
                <p class="text-oak-light leading-relaxed mb-6">
                  All Dambulu Furniture products come with our comprehensive 10-year warranty,
                  covering manufacturing defects and structural integrity issues.
                </p>

                <h3 class="font-serif text-2xl font-bold text-deep-oak mb-4">Care Instructions</h3>
                <ul class="space-y-3">
                  <li class="flex items-start gap-2 text-oak-light">
                    <i class="pi pi-info-circle text-gold-accent mt-1"></i>
                    <span>Dust regularly with a soft, dry cloth</span>
                  </li>
                  <li class="flex items-start gap-2 text-oak-light">
                    <i class="pi pi-info-circle text-gold-accent mt-1"></i>
                    <span>Avoid direct sunlight to prevent fading</span>
                  </li>
                  <li class="flex items-start gap-2 text-oak-light">
                    <i class="pi pi-info-circle text-gold-accent mt-1"></i>
                    <span>Clean spills immediately with a damp cloth</span>
                  </li>
                  <li class="flex items-start gap-2 text-oak-light">
                    <i class="pi pi-info-circle text-gold-accent mt-1"></i>
                    <span>Use coasters and placemats to protect surfaces</span>
                  </li>
                  <li class="flex items-start gap-2 text-oak-light">
                    <i class="pi pi-info-circle text-gold-accent mt-1"></i>
                    <span>Polish with furniture wax every 6 months</span>
                  </li>
                </ul>
              </div>
            </TabPanel>
          </TabView>
        </div>
      </section>

      <!-- Related Products -->
      <section v-if="relatedProducts.length" class="py-12 bg-warm-white">
        <div class="container mx-auto px-4">
          <h2 class="font-serif text-3xl font-bold text-deep-oak mb-8 text-center">
            You May Also Like
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="relProduct in relatedProducts"
              :key="relProduct.id"
              class="product-card bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              @click="$router.push(`/products/${relProduct.id}`)"
            >
              <div class="relative image-zoom">
                <img
                  :src="relProduct.images?.[0] || 'https://via.placeholder.com/400x300'"
                  :alt="relProduct.name"
                  class="w-full h-48 object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-serif text-lg font-semibold text-deep-oak mb-2 line-clamp-1">
                  {{ relProduct.name }}
                </h3>
                <p class="text-deep-oak font-bold">Rs. {{ formatPrice(relProduct.price) }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Product Not Found -->
    <div v-else class="container mx-auto px-4 py-20 text-center">
      <i class="pi pi-exclamation-circle text-6xl text-gray-300 mb-4"></i>
      <h2 class="text-2xl font-bold text-deep-oak mb-2">Product Not Found</h2>
      <p class="text-oak-light mb-6">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <Button label="Browse Products" icon="pi pi-arrow-left" @click="$router.push('/products')" />
    </div>

    <!-- Quote Dialog -->
    <QuoteDialog v-model="quoteDialogVisible" :product="product" />
  </div>
</template>

<script setup>
import QuoteDialog from '@/components/QuoteDialog.vue';
import { productService } from '@/services/api';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const product = ref(null);
const relatedProducts = ref([]);
const loading = ref(true);
const quoteDialogVisible = ref(false);

const breadcrumbItems = computed(() => [
  { label: 'Products', to: '/products' },
  { label: product.value?.name || 'Loading...' },
]);

const productImages = computed(() => {
  if (product.value?.images?.length) {
    return product.value.images;
  }
  return ['https://via.placeholder.com/800x600?text=No+Image'];
});

const galleriaResponsive = ref([
  { breakpoint: '1024px', numVisible: 4 },
  { breakpoint: '768px', numVisible: 3 },
  { breakpoint: '560px', numVisible: 2 },
]);

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-LK').format(price);
};

const shareProduct = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: product.value.name,
        text: product.value.shortDescription,
        url: window.location.href,
      });
    } catch (err) {
      console.log('Share cancelled');
    }
  } else {
    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(window.location.href);
    toast.add({
      severity: 'success',
      summary: 'Link Copied!',
      detail: 'Product link copied to clipboard',
      life: 3000,
    });
  }
};

const fetchProduct = async (id) => {
  loading.value = true;
  try {
    product.value = await productService.getById(id);

    // Fetch related products
    const allProducts = await productService.getAll();
    relatedProducts.value = allProducts
      .filter((p) => p.categoryCode === product.value.categoryCode && p.id !== product.value.id)
      .slice(0, 4);
  } catch (error) {
    console.error('Error fetching product:', error);
    product.value = null;
  } finally {
    loading.value = false;
  }
};

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchProduct(newId);
      window.scrollTo(0, 0);
    }
  },
  { immediate: true },
);

onMounted(() => {
  fetchProduct(route.params.id);
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.p-breadcrumb) {
  background: transparent;
  border: none;
  padding: 0;
}

:deep(.p-galleria .p-galleria-thumbnail-container) {
  background: transparent;
}

:deep(.p-tabview .p-tabview-nav) {
  background: transparent;
  border: none;
}

:deep(.p-tabview .p-tabview-nav li .p-tabview-nav-link) {
  background: transparent;
  border: none;
  color: var(--oak-light);
}

:deep(.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link) {
  color: var(--deep-oak);
  border-bottom: 2px solid var(--deep-oak);
}

:deep(.p-tabview .p-tabview-panels) {
  background: transparent;
  padding: 2rem 0;
}
</style>
