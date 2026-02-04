<template>
  <div>
    <!-- Page Header -->
    <section class="bg-deep-oak py-16">
      <div class="container mx-auto px-4">
        <Breadcrumb :home="{ icon: 'pi pi-home', to: '/' }" :model="breadcrumbItems" class="mb-4" />
        <h1 class="font-serif text-4xl md:text-5xl font-bold text-warm-white mb-4">
          Admin Dashboard
        </h1>
        <p class="text-cream/80">Manage your products, orders, and store settings</p>
      </div>
    </section>

    <!-- Admin Content -->
    <section class="py-12 bg-warm-white">
      <div class="container mx-auto px-4">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-oak-light text-sm mb-1">Total Products</p>
                <p class="text-3xl font-bold text-deep-oak">{{ products.length }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="pi pi-box text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-oak-light text-sm mb-1">Best Sellers</p>
                <p class="text-3xl font-bold text-deep-oak">{{ bestSellerCount }}</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <i class="pi pi-star text-yellow-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-oak-light text-sm mb-1">Categories</p>
                <p class="text-3xl font-bold text-deep-oak">{{ categories.length }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i class="pi pi-tags text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-oak-light text-sm mb-1">Quote Requests</p>
                <p class="text-3xl font-bold text-deep-oak">24</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i class="pi pi-envelope text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Products Management -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <!-- Header -->
          <div class="p-6 border-b border-gray-100">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 class="font-serif text-2xl font-bold text-deep-oak">Products Management</h2>
                <p class="text-oak-light text-sm">
                  Add, edit, or remove products from your catalog
                </p>
              </div>
              <Button label="Add New Product" icon="pi pi-plus" @click="openAddDialog" />
            </div>
          </div>

          <!-- Filters -->
          <div class="p-4 bg-cream border-b border-gray-100">
            <div class="flex flex-wrap gap-4 items-center">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters.global.value" placeholder="Search products..." />
              </span>
              <Dropdown
                v-model="selectedCategoryFilter"
                :options="categoryFilterOptions"
                optionLabel="name"
                optionValue="code"
                placeholder="Filter by Category"
                :showClear="true"
                class="w-48"
              />
            </div>
          </div>

          <!-- DataTable -->
          <DataTable
            :value="filteredProducts"
            :paginator="true"
            :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            :filters="filters"
            filterDisplay="menu"
            :loading="loading"
            responsiveLayout="scroll"
            stripedRows
            showGridlines
            class="p-datatable-sm"
          >
            <template #empty>
              <div class="text-center py-8">
                <i class="pi pi-inbox text-4xl text-gray-300 mb-2"></i>
                <p class="text-oak-light">No products found</p>
              </div>
            </template>

            <Column field="id" header="ID" sortable style="width: 80px"></Column>

            <Column header="Image" style="width: 100px">
              <template #body="slotProps">
                <img
                  :src="slotProps.data.images?.[0] || 'https://via.placeholder.com/60'"
                  :alt="slotProps.data.name"
                  class="w-16 h-16 object-cover rounded-lg"
                />
              </template>
            </Column>

            <Column field="name" header="Product Name" sortable style="min-width: 200px">
              <template #body="slotProps">
                <div>
                  <p class="font-semibold text-deep-oak">{{ slotProps.data.name }}</p>
                  <p class="text-oak-light text-sm truncate max-w-xs">
                    {{ slotProps.data.shortDescription }}
                  </p>
                </div>
              </template>
            </Column>

            <Column field="category" header="Category" sortable style="width: 150px">
              <template #body="slotProps">
                <Chip :label="slotProps.data.category" />
              </template>
            </Column>

            <Column field="price" header="Price" sortable style="width: 130px">
              <template #body="slotProps">
                <span class="font-semibold">Rs. {{ formatPrice(slotProps.data.price) }}</span>
              </template>
            </Column>

            <Column field="isBestSeller" header="Status" style="width: 120px">
              <template #body="slotProps">
                <div class="flex flex-col gap-1">
                  <Tag v-if="slotProps.data.isBestSeller" value="Best Seller" severity="warning" />
                  <Tag v-if="slotProps.data.isNew" value="New" severity="success" />
                  <Tag
                    v-if="slotProps.data.inStock === false"
                    value="Out of Stock"
                    severity="danger"
                  />
                </div>
              </template>
            </Column>

            <Column field="rating" header="Rating" sortable style="width: 120px">
              <template #body="slotProps">
                <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
              </template>
            </Column>

            <Column header="Actions" style="width: 150px">
              <template #body="slotProps">
                <div class="flex gap-2">
                  <Button
                    icon="pi pi-eye"
                    class="p-button-rounded p-button-text p-button-sm"
                    v-tooltip.top="'View'"
                    @click="$router.push(`/products/${slotProps.data.id}`)"
                  />
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-rounded p-button-text p-button-sm p-button-warning"
                    v-tooltip.top="'Edit'"
                    @click="openEditDialog(slotProps.data)"
                  />
                  <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-text p-button-sm p-button-danger"
                    v-tooltip.top="'Delete'"
                    @click="confirmDelete(slotProps.data)"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </section>

    <!-- Add/Edit Product Dialog -->
    <Dialog
      v-model:visible="productDialogVisible"
      :header="isEditing ? 'Edit Product' : 'Add New Product'"
      :modal="true"
      :style="{ width: '700px' }"
      :breakpoints="{ '960px': '90vw' }"
    >
      <form @submit.prevent="saveProduct" class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-medium text-deep-oak">Product Name *</label>
            <InputText
              v-model="productForm.name"
              placeholder="Enter product name"
              :class="{ 'p-invalid': errors.name }"
            />
            <small v-if="errors.name" class="text-red-500">{{ errors.name }}</small>
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-medium text-deep-oak">Category *</label>
            <Dropdown
              v-model="productForm.categoryCode"
              :options="categories"
              optionLabel="name"
              optionValue="code"
              placeholder="Select category"
              :class="{ 'p-invalid': errors.category }"
            />
            <small v-if="errors.category" class="text-red-500">{{ errors.category }}</small>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-medium text-deep-oak">Short Description *</label>
          <InputText
            v-model="productForm.shortDescription"
            placeholder="Brief description for listings"
            :class="{ 'p-invalid': errors.shortDescription }"
          />
          <small v-if="errors.shortDescription" class="text-red-500">
            {{ errors.shortDescription }}
          </small>
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-medium text-deep-oak">Full Description</label>
          <Textarea
            v-model="productForm.description"
            rows="4"
            placeholder="Detailed product description..."
          />
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-medium text-deep-oak">Price (Rs.) *</label>
            <InputNumber
              v-model="productForm.price"
              mode="currency"
              currency="LKR"
              locale="en-LK"
              :class="{ 'p-invalid': errors.price }"
            />
            <small v-if="errors.price" class="text-red-500">{{ errors.price }}</small>
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-medium text-deep-oak">Original Price (Rs.)</label>
            <InputNumber
              v-model="productForm.originalPrice"
              mode="currency"
              currency="LKR"
              locale="en-LK"
            />
            <small class="text-oak-light">Optional - for showing discounts</small>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-medium text-deep-oak">Width (cm)</label>
            <InputNumber v-model="productForm.dimensions.width" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-medium text-deep-oak">Height (cm)</label>
            <InputNumber v-model="productForm.dimensions.height" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-medium text-deep-oak">Depth (cm)</label>
            <InputNumber v-model="productForm.dimensions.depth" />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-medium text-deep-oak">Material</label>
            <InputText v-model="productForm.material" placeholder="e.g., Teak Wood" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="font-medium text-deep-oak">Color</label>
            <InputText v-model="productForm.color" placeholder="e.g., Natural Brown" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-medium text-deep-oak">Product Images</label>
          <FileUpload
            name="images"
            :multiple="true"
            accept="image/*"
            :maxFileSize="5000000"
            @select="onImageSelect"
            :auto="false"
            chooseLabel="Select Images"
          >
            <template #empty>
              <p class="text-oak-light">Drag and drop images here or click to browse.</p>
            </template>
          </FileUpload>

          <!-- Existing Images Preview -->
          <div v-if="productForm.images?.length" class="flex flex-wrap gap-2 mt-2">
            <div v-for="(img, index) in productForm.images" :key="index" class="relative">
              <img :src="img" class="w-20 h-20 object-cover rounded-lg" />
              <Button
                icon="pi pi-times"
                class="p-button-rounded p-button-danger p-button-sm absolute -top-2 -right-2"
                @click="removeImage(index)"
              />
            </div>
          </div>
        </div>

        <Divider />

        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              v-model="productForm.isBestSeller"
              id="bestSeller"
              class="w-4 h-4"
            />
            <label for="bestSeller" class="text-deep-oak">Mark as Best Seller</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="productForm.isNew" id="isNew" class="w-4 h-4" />
            <label for="isNew" class="text-deep-oak">Mark as New Arrival</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="productForm.inStock" id="inStock" class="w-4 h-4" />
            <label for="inStock" class="text-deep-oak">In Stock</label>
          </div>
        </div>
      </form>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="productDialogVisible = false"
        />
        <Button
          :label="isEditing ? 'Update Product' : 'Add Product'"
          icon="pi pi-check"
          :loading="saving"
          @click="saveProduct"
        />
      </template>
    </Dialog>

    <!-- Delete Confirmation -->
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { categories, productService } from '@/services/api';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';

const toast = useToast();
const confirm = useConfirm();

const products = ref([]);
const loading = ref(true);
const saving = ref(false);
const productDialogVisible = ref(false);
const isEditing = ref(false);
const selectedCategoryFilter = ref(null);
const uploadedFiles = ref([]);

const breadcrumbItems = ref([{ label: 'Admin' }]);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const categoryFilterOptions = computed(() => [
  { name: 'All Categories', code: null },
  ...categories,
]);

const filteredProducts = computed(() => {
  if (!selectedCategoryFilter.value) return products.value;
  return products.value.filter((p) => p.categoryCode === selectedCategoryFilter.value);
});

const bestSellerCount = computed(() => {
  return products.value.filter((p) => p.isBestSeller).length;
});

const defaultProductForm = {
  name: '',
  categoryCode: null,
  shortDescription: '',
  description: '',
  price: null,
  originalPrice: null,
  dimensions: { width: null, height: null, depth: null },
  material: '',
  color: '',
  images: [],
  isBestSeller: false,
  isNew: true,
  inStock: true,
  rating: 5,
  reviews: 0,
};

const productForm = ref({ ...defaultProductForm });
const errors = ref({});

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-LK').format(price);
};

const openAddDialog = () => {
  isEditing.value = false;
  productForm.value = {
    ...defaultProductForm,
    dimensions: { width: null, height: null, depth: null },
  };
  errors.value = {};
  uploadedFiles.value = [];
  productDialogVisible.value = true;
};

const openEditDialog = (product) => {
  isEditing.value = true;
  productForm.value = {
    ...product,
    dimensions: { ...product.dimensions },
  };
  errors.value = {};
  uploadedFiles.value = [];
  productDialogVisible.value = true;
};

const onImageSelect = (event) => {
  uploadedFiles.value = event.files;
};

const removeImage = (index) => {
  productForm.value.images.splice(index, 1);
};

const validate = () => {
  errors.value = {};

  if (!productForm.value.name?.trim()) {
    errors.value.name = 'Product name is required';
  }

  if (!productForm.value.categoryCode) {
    errors.value.category = 'Category is required';
  }

  if (!productForm.value.shortDescription?.trim()) {
    errors.value.shortDescription = 'Short description is required';
  }

  if (!productForm.value.price || productForm.value.price <= 0) {
    errors.value.price = 'Valid price is required';
  }

  return Object.keys(errors.value).length === 0;
};

const saveProduct = async () => {
  if (!validate()) return;

  saving.value = true;

  try {
    // Get category name from code
    const category = categories.find((c) => c.code === productForm.value.categoryCode);
    const productData = {
      ...productForm.value,
      category: category?.name || productForm.value.categoryCode,
    };

    // Create FormData for file upload
    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key === 'dimensions') {
        formData.append(key, JSON.stringify(productData[key]));
      } else if (key === 'images') {
        // Keep existing images
        formData.append('existingImages', JSON.stringify(productData[key]));
      } else {
        formData.append(key, productData[key]);
      }
    });

    // Add new uploaded files
    uploadedFiles.value.forEach((file) => {
      formData.append('images', file);
    });

    if (isEditing.value) {
      await productService.update(productForm.value.id, formData);
      toast.add({
        severity: 'success',
        summary: 'Product Updated',
        detail: 'Product has been updated successfully',
        life: 3000,
      });
    } else {
      await productService.create(formData);
      toast.add({
        severity: 'success',
        summary: 'Product Added',
        detail: 'New product has been added successfully',
        life: 3000,
      });
    }

    productDialogVisible.value = false;
    await fetchProducts();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to save product. Please try again.',
      life: 5000,
    });
  } finally {
    saving.value = false;
  }
};

const confirmDelete = (product) => {
  confirm.require({
    message: `Are you sure you want to delete "${product.name}"?`,
    header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => deleteProduct(product.id),
    reject: () => {},
  });
};

const deleteProduct = async (id) => {
  try {
    await productService.delete(id);
    toast.add({
      severity: 'success',
      summary: 'Product Deleted',
      detail: 'Product has been deleted successfully',
      life: 3000,
    });
    await fetchProducts();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete product. Please try again.',
      life: 5000,
    });
  }
};

const fetchProducts = async () => {
  loading.value = true;
  try {
    products.value = await productService.getAll();
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
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

:deep(.p-datatable .p-datatable-tbody > tr) {
  background: white;
}

:deep(.p-datatable .p-datatable-tbody > tr:nth-child(even)) {
  background: #faf8f5;
}
</style>
