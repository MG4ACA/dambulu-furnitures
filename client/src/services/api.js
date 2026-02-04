import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Product API calls
export const productService = {
  // Get all products with optional filters
  async getAll(params = {}) {
    const response = await api.get('/products', { params })
    return response.data
  },

  // Get single product by ID
  async getById(id) {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  // Get best sellers
  async getBestSellers() {
    const response = await api.get('/products/bestsellers')
    return response.data
  },

  // Get products by category
  async getByCategory(category) {
    const response = await api.get('/products', { params: { category } })
    return response.data
  },

  // Create new product (admin)
  async create(productData) {
    const response = await api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  // Update product (admin)
  async update(id, productData) {
    const response = await api.put(`/products/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  // Delete product (admin)
  async delete(id) {
    const response = await api.delete(`/products/${id}`)
    return response.data
  }
}

// Quote request API
export const quoteService = {
  async submitQuote(quoteData) {
    const response = await api.post('/quotes', quoteData)
    return response.data
  }
}

// Contact form API
export const contactService = {
  async submitContact(contactData) {
    const response = await api.post('/contact', contactData)
    return response.data
  }
}

// Categories
export const categories = [
  { name: 'Bedroom Sets', code: 'bedroom', icon: 'pi pi-moon' },
  { name: 'Sofas', code: 'sofas', icon: 'pi pi-home' },
  { name: 'Almirahs', code: 'almirahs', icon: 'pi pi-box' },
  { name: 'Dining Tables', code: 'dining', icon: 'pi pi-table' },
  { name: 'Veranda Chairs', code: 'veranda', icon: 'pi pi-sun' },
  { name: 'Custom Interior', code: 'custom', icon: 'pi pi-palette' }
]

export default api
