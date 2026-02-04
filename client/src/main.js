import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'

// PrimeVue Components
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import DataView from 'primevue/dataview'
import Carousel from 'primevue/carousel'
import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Rating from 'primevue/rating'
import Badge from 'primevue/badge'
import Galleria from 'primevue/galleria'
import InputNumber from 'primevue/inputnumber'
import Skeleton from 'primevue/skeleton'
import Divider from 'primevue/divider'
import Chip from 'primevue/chip'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import Sidebar from 'primevue/sidebar'
import Breadcrumb from 'primevue/breadcrumb'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Image from 'primevue/image'
import ProgressSpinner from 'primevue/progressspinner'

// PrimeVue Styles - Aura Theme for premium feel
import 'primevue/resources/themes/aura-light-amber/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// Custom styles
import './assets/main.css'

import App from './App.vue'

// Route imports
import HomePage from './views/HomePage.vue'
import ProductsPage from './views/ProductsPage.vue'
import ProductPage from './views/ProductPage.vue'
import AdminPage from './views/AdminPage.vue'
import AboutPage from './views/AboutPage.vue'
import ContactPage from './views/ContactPage.vue'

// Router setup
const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/products', name: 'Products', component: ProductsPage },
  { path: '/products/:id', name: 'ProductDetail', component: ProductPage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/admin', name: 'Admin', component: AdminPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Create app
const app = createApp(App)

// Use plugins
app.use(router)
app.use(PrimeVue, { 
  ripple: true,
  inputStyle: 'filled'
})
app.use(ToastService)
app.use(ConfirmationService)
app.use(DialogService)

// Register PrimeVue components globally
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Textarea', Textarea)
app.component('Dropdown', Dropdown)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('DataView', DataView)
app.component('Carousel', Carousel)
app.component('Dialog', Dialog)
app.component('FileUpload', FileUpload)
app.component('Toast', Toast)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Card', Card)
app.component('Tag', Tag)
app.component('Rating', Rating)
app.component('Badge', Badge)
app.component('Galleria', Galleria)
app.component('InputNumber', InputNumber)
app.component('Skeleton', Skeleton)
app.component('Divider', Divider)
app.component('Chip', Chip)
app.component('Avatar', Avatar)
app.component('Menu', Menu)
app.component('Sidebar', Sidebar)
app.component('Breadcrumb', Breadcrumb)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('Image', Image)
app.component('ProgressSpinner', ProgressSpinner)

app.mount('#app')
