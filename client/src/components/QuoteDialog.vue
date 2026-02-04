<template>
  <Dialog
    v-model:visible="visible"
    :header="'Request Quote for ' + (product?.name || 'Product')"
    :modal="true"
    :style="{ width: '500px' }"
    :breakpoints="{ '640px': '95vw' }"
  >
    <form @submit.prevent="submitQuote" class="space-y-4">
      <div class="flex flex-col gap-2">
        <label class="font-medium text-deep-oak">Your Name *</label>
        <InputText
          v-model="form.name"
          placeholder="Enter your full name"
          :class="{ 'p-invalid': errors.name }"
        />
        <small v-if="errors.name" class="text-red-500">{{ errors.name }}</small>
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-medium text-deep-oak">Phone Number *</label>
        <InputText
          v-model="form.phone"
          placeholder="+94 XX XXX XXXX"
          :class="{ 'p-invalid': errors.phone }"
        />
        <small v-if="errors.phone" class="text-red-500">{{ errors.phone }}</small>
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-medium text-deep-oak">Email</label>
        <InputText v-model="form.email" type="email" placeholder="your.email@example.com" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-medium text-deep-oak">Quantity</label>
        <InputNumber
          v-model="form.quantity"
          :min="1"
          :max="100"
          showButtons
          buttonLayout="horizontal"
          :inputStyle="{ width: '60px', textAlign: 'center' }"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-medium text-deep-oak">Additional Notes</label>
        <Textarea
          v-model="form.notes"
          rows="3"
          placeholder="Any specific requirements, customizations, or questions..."
        />
      </div>

      <!-- Product Summary -->
      <div v-if="product" class="bg-cream rounded-lg p-4">
        <div class="flex items-center gap-4">
          <img
            :src="product.images?.[0] || 'https://via.placeholder.com/80'"
            :alt="product.name"
            class="w-20 h-20 object-cover rounded-lg"
          />
          <div>
            <h4 class="font-semibold text-deep-oak">{{ product.name }}</h4>
            <p class="text-oak-light text-sm">{{ product.category }}</p>
            <p class="text-deep-oak font-bold mt-1">Rs. {{ formatPrice(product.price) }}</p>
          </div>
        </div>
      </div>
    </form>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="visible = false" />
      <Button
        label="Submit Quote Request"
        icon="pi pi-send"
        :loading="submitting"
        @click="submitQuote"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { quoteService } from '@/services/api';
import { useToast } from 'primevue/usetoast';
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  product: Object,
});

const emit = defineEmits(['update:modelValue']);

const toast = useToast();
const submitting = ref(false);

const visible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
  },
);

watch(visible, (val) => {
  emit('update:modelValue', val);
});

const form = ref({
  name: '',
  phone: '',
  email: '',
  quantity: 1,
  notes: '',
});

const errors = ref({});

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-LK').format(price);
};

const validate = () => {
  errors.value = {};

  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required';
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = 'Phone number is required';
  } else if (!/^[\d\s\+\-]{10,15}$/.test(form.value.phone)) {
    errors.value.phone = 'Please enter a valid phone number';
  }

  return Object.keys(errors.value).length === 0;
};

const submitQuote = async () => {
  if (!validate()) return;

  submitting.value = true;

  try {
    await quoteService.submitQuote({
      ...form.value,
      productId: props.product?.id,
      productName: props.product?.name,
      productPrice: props.product?.price,
    });

    toast.add({
      severity: 'success',
      summary: 'Quote Request Submitted!',
      detail: 'We will contact you within 24 hours.',
      life: 5000,
    });

    // Reset form
    form.value = {
      name: '',
      phone: '',
      email: '',
      quantity: 1,
      notes: '',
    };

    visible.value = false;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to submit quote request. Please try again.',
      life: 5000,
    });
  } finally {
    submitting.value = false;
  }
};
</script>
