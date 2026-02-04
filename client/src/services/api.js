import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product API calls
export const productService = {
  // Get all products with optional filters
  async getAll(params = {}) {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get single product by ID
  async getById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get best sellers
  async getBestSellers() {
    const response = await api.get('/products/bestsellers');
    return response.data;
  },

  // Get products by category
  async getByCategory(category) {
    const response = await api.get('/products', { params: { category } });
    return response.data;
  },

  // Create new product (admin)
  async create(productData) {
    const response = await api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update product (admin)
  async update(id, productData) {
    const response = await api.put(`/products/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete product (admin)
  async delete(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Quote request API
export const quoteService = {
  async submitQuote(quoteData) {
    const response = await api.post('/quotes', quoteData);
    return response.data;
  },
};

// Contact form API
export const contactService = {
  async submitContact(contactData) {
    const response = await api.post('/contact', contactData);
    return response.data;
  },
};

// Categories
export const categories = [
  {
    name: 'Bedroom Sets',
    code: 'bedroom',
    icon: 'pi pi-moon',
    description: 'Complete bedroom furniture sets',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80',
  },
  {
    name: 'Sofas',
    code: 'sofas',
    icon: 'pi pi-home',
    description: 'Comfortable living room sofas',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
  },
  {
    name: 'Almirahs',
    code: 'almirahs',
    icon: 'pi pi-inbox',
    description: 'Elegant storage solutions',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80',
  },
  {
    name: 'Dining Tables',
    code: 'dining',
    icon: 'pi pi-users',
    description: 'Dining tables & chairs',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80',
  },
  {
    name: 'Veranda Chairs',
    code: 'veranda',
    icon: 'pi pi-sun',
    description: 'Outdoor furniture',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&q=80',
  },
  {
    name: 'Custom Interior',
    code: 'custom',
    icon: 'pi pi-pencil',
    description: 'Bespoke furniture design',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80',
  },
];

export default api;
