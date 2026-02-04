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
        <h1 class="font-serif text-4xl md:text-6xl font-bold text-warm-white mb-4">
          Contact Us
        </h1>
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
                <InputText 
                  v-model="form.email" 
                  type="email"
                  placeholder="your.email@example.com"
                />
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
                <div class="w-14 h-14 bg-deep-oak rounded-xl flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-map-marker text-warm-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-serif text-xl font-bold text-deep-oak mb-1">Visit Our Showroom</h3>
                  <p class="text-oak-light">No 379, Dangedara, Galle, Sri Lanka</p>
                  <a 
                    href="https://maps.google.com/?q=No+379+Dangedara+Galle+Sri+Lanka" 
                    target="_blank"
                    class="text-gold-accent hover:underline text-sm mt-2 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div class="bg-cream rounded-2xl p-6 flex items-start gap-4">
                <div class="w-14 h-14 bg-deep-oak rounded-xl flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-phone text-warm-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-serif text-xl font-bold text-deep-oak mb-1">Call Us</h3>
                  <a 
                    href="tel:+94777424127" 
                    class="text-oak-light hover:text-gold-accent text-lg"
                  >
                    +94 77 742 4127
                  </a>
                  <p class="text-oak-light text-sm mt-1">Mon - Sat: 8:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div class="bg-cream rounded-2xl p-6 flex items-start gap-4">
                <div class="w-14 h-14 bg-deep-oak rounded-xl flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-whatsapp text-warm-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-serif text-xl font-bold text-deep-oak mb-1">WhatsApp</h3>
                  <p class="text-oak-light">Quick responses on WhatsApp</p>
                  <a 
                    href="https://wa.me/94777424127" 
                    target="_blank"
                    class="text-gold-accent hover:underline text-sm mt-2 inline-block"
                  >
                    Start Chat →
                  </a>
                </div>
              </div>

              <div class="bg-cream rounded-2xl p-6 flex items-start gap-4">
                <div class="w-14 h-14 bg-deep-oak rounded-xl flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-facebook text-warm-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-serif text-xl font-bold text-deep-oak mb-1">Follow Us</h3>
                  <p class="text-oak-light">Stay updated on our latest designs</p>
                  <a 
                    href="https://facebook.com" 
                    target="_blank"
                    class="text-gold-accent hover:underline text-sm mt-2 inline-block"
                  >
                    Visit Facebook Page →
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
                <div class="flex justify-between">
                  <span class="text-cream/80">Monday - Friday</span>
                  <span class="font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-cream/80">Saturday</span>
                  <span class="font-medium">8:00 AM - 5:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-cream/80">Sunday</span>
                  <span class="font-medium text-gold-accent">By Appointment</span>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.4485!2d80.2!3d6.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDMnMDAuMCJOIDgwwrAxMicwMC4wIkU!5e0!3m2!1sen!2slk!4v1600000000000!5m2!1sen!2slk"
            width="100%" 
            height="450" 
            style="border:0;" 
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
              <i :class="['pi', activeFaq === index ? 'pi-minus' : 'pi-plus', 'text-gold-accent']"></i>
            </button>
            <div 
              v-show="activeFaq === index"
              class="px-6 pb-4 text-oak-light"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { contactService } from '@/services/api'

const toast = useToast()

const breadcrumbItems = ref([
  { label: 'Contact' }
])

const form = ref({
  name: '',
  phone: '',
  email: '',
  subject: null,
  message: ''
})

const errors = ref({})
const submitting = ref(false)
const activeFaq = ref(null)

const subjectOptions = ref([
  'General Inquiry',
  'Product Information',
  'Custom Order Request',
  'Quote Request',
  'Delivery Information',
  'Warranty & Returns',
  'Business Partnership',
  'Other'
])

const faqs = ref([
  {
    question: 'What is your delivery time?',
    answer: 'For ready-made furniture, delivery typically takes 3-7 days within Sri Lanka. Custom orders may take 4-8 weeks depending on complexity. We offer free delivery island-wide.'
  },
  {
    question: 'Do you offer custom furniture design?',
    answer: 'Yes! We specialize in custom furniture design. Our team will work with you from concept to completion to create pieces that perfectly match your vision and space requirements.'
  },
  {
    question: 'What is included in your 10-year warranty?',
    answer: 'Our comprehensive warranty covers manufacturing defects, structural integrity issues, and finish problems under normal use. It does not cover damage from misuse, accidents, or normal wear and tear.'
  },
  {
    question: 'Can I visit your showroom without an appointment?',
    answer: 'Absolutely! Our showroom is open Monday through Saturday, 8 AM to 6 PM. Walk-ins are welcome. For Sunday visits, please call ahead to schedule an appointment.'
  },
  {
    question: 'What types of wood do you use?',
    answer: 'We primarily work with premium teak, mahogany, jak wood, and other high-quality local hardwoods. All our wood is sustainably sourced and properly seasoned for durability.'
  },
  {
    question: 'Do you offer interior design services?',
    answer: 'Yes, we provide complete interior design services including space planning, furniture selection, custom design, and installation. Contact us for a free consultation.'
  }
])

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const validate = () => {
  errors.value = {}
  
  if (!form.value.name?.trim()) {
    errors.value.name = 'Name is required'
  }
  
  if (!form.value.phone?.trim()) {
    errors.value.phone = 'Phone number is required'
  }
  
  if (!form.value.message?.trim()) {
    errors.value.message = 'Message is required'
  }
  
  return Object.keys(errors.value).length === 0
}

const submitContact = async () => {
  if (!validate()) return
  
  submitting.value = true
  
  try {
    await contactService.submitContact(form.value)
    
    toast.add({
      severity: 'success',
      summary: 'Message Sent!',
      detail: 'Thank you for contacting us. We will respond within 24 hours.',
      life: 5000
    })
    
    // Reset form
    form.value = {
      name: '',
      phone: '',
      email: '',
      subject: null,
      message: ''
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to send message. Please try again or call us directly.',
      life: 5000
    })
  } finally {
    submitting.value = false
  }
}
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
