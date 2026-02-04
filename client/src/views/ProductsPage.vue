<template>
  <div>
    <!-- Page Header -->
    <section class="bg-deep-oak py-16">
      <div class="container mx-auto px-4">
        <Breadcrumb :home="{ icon: 'pi pi-home', to: '/' }" :model="breadcrumbItems" class="mb-4" />
        <h1 class="font-serif text-4xl md:text-5xl font-bold text-warm-white mb-4">Our Products</h1>
        <p class="text-cream/80 max-w-2xl">
          Explore our complete collection of premium handcrafted furniture
        </p>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-12 bg-warm-white">
      <div class="container mx-auto px-4">
        <!-- Filters Bar -->
        <div class="bg-cream rounded-2xl p-6 mb-8">
          <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <!-- Search -->
            <div class="w-full lg:w-80">
              <span class="p-input-icon-left w-full">
                <i class="pi pi-search" />
                <InputText v-model="searchQuery" placeholder="Search products..." class="w-full" />
              </span>
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap gap-4 items-center">
              <Dropdown
                v-model="selectedCategory"
                :options="categoryOptions"
                optionLabel="name"
                optionValue="code"
                placeholder="All Categories"
                :showClear="true"
                class="w-48"
              />
              <Dropdown
                v-model="sortBy"
                :options="sortOptions"
                optionLabel="name"
                optionValue="code"
                placeholder="Sort By"
                class="w-48"
              />
              <div class="flex border border-gray-300 rounded-lg overflow-hidden">
                <Button
                  :icon="viewMode === 'grid' ? 'pi pi-th-large' : 'pi pi-list'"
                  :class="['p-button-text', viewMode === 'grid' ? 'bg-deep-oak text-white' : '']"
                  @click="viewMode = 'grid'"
                />
                <Button
                  :icon="viewMode === 'list' ? 'pi pi-list' : 'pi pi-th-large'"
                  :class="['p-button-text', viewMode === 'list' ? 'bg-deep-oak text-white' : '']"
                  @click="viewMode = 'list'"
                />
              </div>
            </div>
          </div>

          <!-- Active Filters -->
          <div v-if="selectedCategory || searchQuery" class="flex gap-2 mt-4 flex-wrap">
            <Chip
              v-if="selectedCategory"
              :label="getCategoryName(selectedCategory)"
              removable
              @remove="selectedCategory = null"
            />
            <Chip
              v-if="searchQuery"
              :label="`Search: ${searchQuery}`"
              removable
              @remove="searchQuery = ''"
            />
          </div>
        </div>

        <!-- Loading State -->
        <div
          v-if="loading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div v-for="n in 8" :key="n" class="bg-white rounded-2xl overflow-hidden shadow">
            <Skeleton height="200px" />
            <div class="p-4">
              <Skeleton width="60%" class="mb-2" />
              <Skeleton width="100%" class="mb-2" />
              <Skeleton width="40%" />
            </div>
          </div>
        </div>

        <!-- DataView -->
        <DataView
          v-else
          :value="filteredProducts"
          :layout="viewMode"
          :paginator="true"
          :rows="12"
          :rowsPerPageOptions="[12, 24, 48]"
        >
          <template #empty>
            <div class="text-center py-12">
              <i class="pi pi-inbox text-6xl text-gray-300 mb-4"></i>
              <h3 class="text-xl font-semibold text-deep-oak mb-2">No Products Found</h3>
              <p class="text-oak-light">Try adjusting your filters or search query</p>
              <Button label="Clear Filters" class="mt-4" @click="clearFilters" />
            </div>
          </template>

          <template #grid="slotProps">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
              <div
                v-for="product in slotProps.items"
                :key="product.id"
                class="product-card bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                @click="$router.push(`/products/${product.id}`)"
              >
                <!-- Image -->
                <div class="relative image-zoom">
                  <img
                    :src="product.images?.[0] || 'https://via.placeholder.com/400x300'"
                    :alt="product.name"
                    class="w-full h-56 object-cover"
                  />
                  <div class="absolute top-4 left-4 flex gap-2">
                    <Tag v-if="product.isBestSeller" value="Best Seller" class="premium-badge" />
                    <Tag v-if="product.isNew" value="New" severity="success" />
                  </div>
                </div>

                <!-- Content -->
                <div class="p-5">
                  <Chip :label="product.category" class="text-xs mb-2" />
                  <h3 class="font-serif text-lg font-semibold text-deep-oak mb-2 line-clamp-1">
                    {{ product.name }}
                  </h3>
                  <p class="text-oak-light text-sm mb-3 line-clamp-2">
                    {{ product.shortDescription }}
                  </p>
                  <div class="flex items-center mb-3">
                    <Rating :modelValue="product.rating" :readonly="true" :cancel="false" />
                    <span class="text-sm text-oak-light ml-2">({{ product.reviews || 0 }})</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-deep-oak text-xl font-bold">
                      Rs. {{ formatPrice(product.price) }}
                    </span>
                    <Button
                      icon="pi pi-eye"
                      class="p-button-rounded p-button-sm"
                      @click.stop="$router.push(`/products/${product.id}`)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #list="slotProps">
            <div class="flex flex-col gap-4 p-4">
              <div
                v-for="product in slotProps.items"
                :key="product.id"
                class="product-card bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row cursor-pointer"
                @click="$router.push(`/products/${product.id}`)"
              >
                <!-- Image -->
                <div class="relative md:w-64 flex-shrink-0 image-zoom">
                  <img
                    :src="product.images?.[0] || 'https://via.placeholder.com/400x300'"
                    :alt="product.name"
                    class="w-full h-48 md:h-full object-cover"
                  />
                  <div class="absolute top-4 left-4 flex gap-2">
                    <Tag v-if="product.isBestSeller" value="Best Seller" class="premium-badge" />
                    <Tag v-if="product.isNew" value="New" severity="success" />
                  </div>
                </div>

                <!-- Content -->
                <div class="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-4 mb-2">
                      <Chip :label="product.category" class="text-xs" />
                      <div class="flex items-center">
                        <Rating :modelValue="product.rating" :readonly="true" :cancel="false" />
                        <span class="text-sm text-oak-light ml-2">
                          ({{ product.reviews || 0 }})
                        </span>
                      </div>
                    </div>
                    <h3 class="font-serif text-2xl font-semibold text-deep-oak mb-2">
                      {{ product.name }}
                    </h3>
                    <p class="text-oak-light mb-4">
                      {{ product.shortDescription }}
                    </p>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-deep-oak text-2xl font-bold">
                      Rs. {{ formatPrice(product.price) }}
                    </span>
                    <div class="flex gap-2">
                      <Button
                        label="View Details"
                        icon="pi pi-eye"
                        @click.stop="$router.push(`/products/${product.id}`)"
                      />
                      <Button
                        label="Request Quote"
                        icon="pi pi-send"
                        class="p-button-outlined"
                        @click.stop="openQuoteDialog(product)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </section>

    <!-- Quote Dialog -->
    <QuoteDialog v-model="quoteDialogVisible" :product="selectedProduct" />
  </div>
</template>

<script setup>
import QuoteDialog from '@/components/QuoteDialog.vue';
import { categories, productService } from '@/services/api';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const products = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref(null);
const sortBy = ref('newest');
const viewMode = ref('grid');
const quoteDialogVisible = ref(false);
const selectedProduct = ref(null);

const breadcrumbItems = ref([{ label: 'Products' }]);

const categoryOptions = computed(() => [{ name: 'All Categories', code: null }, ...categories]);

const sortOptions = ref([
  { name: 'Newest First', code: 'newest' },
  { name: 'Price: Low to High', code: 'price_asc' },
  { name: 'Price: High to Low', code: 'price_desc' },
  { name: 'Best Sellers', code: 'bestseller' },
  { name: 'Rating', code: 'rating' },
]);

const filteredProducts = computed(() => {
  let result = [...products.value];

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query),
    );
  }

  // Filter by category
  if (selectedCategory.value) {
    result = result.filter((p) => p.categoryCode === selectedCategory.value);
  }

  // Sort
  switch (sortBy.value) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'bestseller':
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      break;
    case 'rating':
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    default:
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return result;
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-LK').format(price);
};

const getCategoryName = (code) => {
  const cat = categories.find((c) => c.code === code);
  return cat?.name || code;
};

const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = null;
  sortBy.value = 'newest';
};

const openQuoteDialog = (product) => {
  selectedProduct.value = product;
  quoteDialogVisible.value = true;
};

// Watch for category in URL
watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory) {
      selectedCategory.value = newCategory;
    }
  },
  { immediate: true },
);

onMounted(async () => {
  try {
    const data = await productService.getAll();
    products.value = data;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
});
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
