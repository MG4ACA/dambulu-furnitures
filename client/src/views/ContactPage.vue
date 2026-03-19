<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-deep-oak py-20">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt="Contact"
          class="w-full h-full object-cover opacity-20"
        />
      </div>
      <div class="container mx-auto px-4 relative z-10">
        <Breadcrumb :home="{ icon: 'pi pi-home', to: '/' }" :model="breadcrumbItems" class="mb-4" />
        <h1 class="font-serif text-4xl md:text-6xl font-bold text-warm-white mb-4">Contact Us</h1>
        <p class="text-cream/80 max-w-2xl text-lg">
          We'd love to hear from you. Visit our showroom or get in touch with us.
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-20 bg-warm-white">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="font-serif text-3xl font-bold text-deep-oak mb-6">Send us a Message</h2>
            <form @submit.prevent="submitContact" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-4">
                <div class="flex flex-col gap-2">
                  <label class="font-medium text-deep-oak">Your Name *</label>
                  <InputText
                    v-model="form.name"
                    placeholder="Enter your name"
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
              </div>

              <div class="flex flex-col gap-2">
                <label class="font-medium text-deep-oak">Email Address</label>
                <InputText v-model="form.email" type="email" placeholder="your.email@example.com" />
              </div>

              <div class="flex flex-col gap-2">
                <label class="font-medium text-deep-oak">Subject</label>
                <Dropdown
                  v-model="form.subject"
                  :options="subjectOptions"
                  placeholder="Select a subject"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="font-medium text-deep-oak">Your Message *</label>
                <Textarea
                  v-model="form.message"
                  rows="5"
                  placeholder="How can we help you?"
                  :class="{ 'p-invalid': errors.message }"
                />
                <small v-if="errors.message" class="text-red-500">{{ errors.message }}</small>
              </div>

              <Button
                type="submit"
                label="Send Message"
                icon="pi pi-send"
                class="w-full p-button-lg"
                :loading="submitting"
              />
            </form>
          </div>

          <!-- Contact Info -->
          <div class="space-y-8">
            <!-- Quick Contact Cards -->
            <div class="grid gap-4">
              <div class="bg-cream rounded-2xl p-6 flex items-start gap-4">
                <div
                  class="w-14 h-14 bg-deep-oak rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <i class="pi pi-map-marker text-warm-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-serif text-xl font-bold text-deep-oak mb-1">
                    Kelaniya Showroom (Main)
                  </h3>
                  <p class="text-oak-light text-sm">342/21 Udana Mawatha, Biyagama Road</p>
                  <p class="text-oak-light text-sm">Gonawala, Kelaniya 11600</p>
                  <p class="text-oak-light text-sm mt-2 font-medium">+94 72 759 2810</p>
                  <a
                    href="https://maps.google.com/?q=342/21+Udana+Mawatha+Gonawala+Kelaniya+11600"
                    target="_blank"
                    class="text-gold-accent hover:underline text-sm mt-2 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div class="bg-cream rounded-2xl p-6 flex items-start gap-4">
                <div
                  class="w-14 h-14 bg-deep-oak rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <i class="pi pi-map-marker text-warm-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-serif text-xl font-bold text-deep-oak mb-1">Negombo Showroom</h3>
                  <p class="text-oak-light text-sm">616 Negombo - Colombo Main Rd</p>
                  <p class="text-oak-light text-sm">Negombo 11500</p>
                  <p class="text-oak-light text-sm mt-2 font-medium">+94 70 659 2815</p>
                  <a
                    href="https://maps.google.com/?q=616+Negombo+Colombo+Main+Rd+Negombo+11500"
                    target="_blank"
                    class="text-gold-accent hover:underline text-sm mt-2 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div class="bg-cream rounded-2xl p-6 flex items-start gap-4">
                <div
                  class="w-14 h-14 bg-deep-oak rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <i class="pi pi-phone text-warm-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-serif text-xl font-bold text-deep-oak mb-1">Call Us</h3>
                  <p class="text-oak-light text-sm mb-2">Kelaniya:</p>
                  <a
                    href="tel:+94727592810"
                    class="text-oak-light hover:text-gold-accent text-lg font-medium block"
                  >
                    +94 72 759 2810
                  </a>
                  <p class="text-oak-light text-sm mt-3 mb-2">Negombo:</p>
                  <a
                    href="tel:+94706592815"
                    class="text-oak-light hover:text-gold-accent text-lg font-medium block"
                  >
                    +94 70 659 2815
                  </a>
                  <p class="text-oak-light text-sm mt-3">8:00 AM - 8:00 PM (Daily)</p>
                </div>
              </div>

              <div class="bg-cream rounded-2xl p-6 flex items-start gap-4">
                <div
                  class="w-14 h-14 bg-deep-oak rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <i class="pi pi-envelope text-warm-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-serif text-xl font-bold text-deep-oak mb-1">Email</h3>
                  <a
                    href="mailto:senelanka1@gmail.com"
                    class="text-oak-light hover:text-gold-accent text-lg"
                  >
                    senelanka1@gmail.com
                  </a>
                  <p class="text-oak-light text-sm mt-2">We reply within 24 hours</p>
                </div>
              </div>

              <div class="bg-cream rounded-2xl p-6 flex items-start gap-4">
                <div
                  class="w-14 h-14 bg-deep-oak rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <i class="pi pi-whatsapp text-warm-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-serif text-xl font-bold text-deep-oak mb-1">WhatsApp</h3>
                  <p class="text-oak-light text-sm">Quick responses on WhatsApp</p>
                  <a
                    href="https://wa.me/94727592810"
                    target="_blank"
                    class="text-gold-accent hover:underline text-sm mt-2 inline-block"
                  >
                    Kelaniya: +94 72 759 2810 →
                  </a>
                  <br />
                  <a
                    href="https://wa.me/94706592815"
                    target="_blank"
                    class="text-gold-accent hover:underline text-sm mt-2 inline-block"
                  >
                    Negombo: +94 70 659 2815 →
                  </a>
                </div>
              </div>

              <div class="bg-cream rounded-2xl p-6 flex items-start gap-4">
                <div
                  class="w-14 h-14 bg-deep-oak rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <i class="pi pi-facebook text-warm-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-serif text-xl font-bold text-deep-oak mb-1">Follow Us</h3>
                  <p class="text-oak-light text-sm">Stay updated on our latest designs</p>
                  <a
                    href="https://instagram.com/sene_lankafurniture"
                    target="_blank"
                    class="text-gold-accent hover:underline text-sm mt-2 inline-block"
                  >
                    Follow @sene_lankafurniture →
                  </a>
                </div>
              </div>
            </div>

            <!-- Working Hours -->
            <div class="bg-deep-oak rounded-2xl p-6 text-warm-white">
              <h3 class="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                <i class="pi pi-clock text-gold-accent"></i>
                Working Hours
              </h3>
              <div class="space-y-2">
                <div>
                  <p class="font-semibold text-warm-white mb-2">Kelaniya Showroom:</p>
                  <div class="flex justify-between pl-4">
                    <span class="text-cream/80">Daily</span>
                    <span class="font-medium">8:00 AM - 8:00 PM</span>
                  </div>
                </div>
                <div class="mt-4">
                  <p class="font-semibold text-warm-white mb-2">Negombo Showroom:</p>
                  <div class="flex justify-between pl-4">
                    <span class="text-cream/80">Daily</span>
                    <span class="font-medium">9:00 AM - 7:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-12 bg-cream">
      <div class="container mx-auto px-4">
        <h2 class="font-serif text-3xl font-bold text-deep-oak mb-8 text-center">Find Us</h2>
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.3845!2d80.63480!3d6.91640!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24516cd5c7b11%3A0x37db2c9cc1bf34a0!2sSene%20Lanka%20Furniture%20-%20Kelaniya%20Showroom!5e0!3m2!1sen!2slk!4v1234567890"
            width="100%"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-warm-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <span class="inline-block text-gold-accent font-medium mb-2">Common Questions</span>
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-deep-oak mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div class="max-w-3xl mx-auto space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <button
              class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-cream transition-colors"
              @click="toggleFaq(index)"
            >
              <span class="font-semibold text-deep-oak">{{ faq.question }}</span>
              <i
                :class="['pi', activeFaq === index ? 'pi-minus' : 'pi-plus', 'text-gold-accent']"
              ></i>
            </button>
            <div v-show="activeFaq === index" class="px-6 pb-4 text-oak-light">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { contactService } from '@/services/api';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

const toast = useToast();

const breadcrumbItems = ref([{ label: 'Contact' }]);

const form = ref({
  name: '',
  phone: '',
  email: '',
  subject: null,
  message: '',
});

const errors = ref({});
const submitting = ref(false);
const activeFaq = ref(null);

const subjectOptions = ref([
  'General Inquiry',
  'Product Information',
  'Custom Order Request',
  'Quote Request',
  'Delivery Information',
  'Warranty & Returns',
  'Business Partnership',
  'Other',
]);

const faqs = ref([
  {
    question: 'What is your delivery time?',
    answer:
      'For ready-made teak furniture, delivery typically takes 3-7 days within Sri Lanka. Custom orders may take 4-8 weeks depending on complexity. We offer free delivery for Negombo and Kelaniya areas.',
  },
  {
    question: 'Do you offer custom furniture design?',
    answer:
      'Yes! We specialize in custom teak furniture design. Our team will work with you from concept to completion to create pieces that perfectly match your vision and space requirements.',
  },
  {
    question: 'What is included in your 10-year warranty?',
    answer:
      'Our comprehensive warranty covers manufacturing defects, structural integrity issues, and finish problems in teak wood structures under normal use. It does not cover damage from misuse, accidents, or normal wear and tear.',
  },
  {
    question: 'Can I visit your showroom without an appointment?',
    answer:
      'Absolutely! Our Kelaniya showroom is open daily 8 AM to 8 PM, and our Negombo showroom is open 9 AM to 7:30 PM. Walk-ins are always welcome!',
  },
  {
    question: 'What types of wood do you use?',
    answer:
      'We primarily work with premium teak, mango wood, and other high-quality hardwoods. All our wood is sustainably sourced, properly seasoned, and treated for durability. We offer various finishes including lacquer polish and natural finishes.',
  },
  {
    question: 'Do you offer interior design services?',
    answer:
      'Yes, we provide complete interior design services including space planning, custom teak furniture selection, design consultation, and professional installation. Contact us for a free initial consultation.',
  },
]);

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

const validate = () => {
  errors.value = {};

  if (!form.value.name?.trim()) {
    errors.value.name = 'Name is required';
  }

  if (!form.value.phone?.trim()) {
    errors.value.phone = 'Phone number is required';
  }

  if (!form.value.message?.trim()) {
    errors.value.message = 'Message is required';
  }

  return Object.keys(errors.value).length === 0;
};

const submitContact = async () => {
  if (!validate()) return;

  submitting.value = true;

  try {
    await contactService.submitContact(form.value);

    toast.add({
      severity: 'success',
      summary: 'Message Sent!',
      detail: 'Thank you for contacting us. We will respond within 24 hours.',
      life: 5000,
    });

    // Reset form
    form.value = {
      name: '',
      phone: '',
      email: '',
      subject: null,
      message: '',
    };
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to send message. Please try again or call us directly.',
      life: 5000,
    });
  } finally {
    submitting.value = false;
  }
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
