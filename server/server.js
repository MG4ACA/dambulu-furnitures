import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, `product-${uniqueSuffix}${ext}`)
  }
})

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

// Data file path
const dataFilePath = path.join(__dirname, 'data', 'products.json')

// Helper functions
const readProducts = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

const writeProducts = (products) => {
  const dataDir = path.dirname(dataFilePath)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2))
}

// Initialize with sample data if empty
const initializeData = () => {
  const products = readProducts()
  if (products.length === 0) {
    const sampleProducts = [
      {
        id: '1',
        name: 'Royal Heritage Sofa Set',
        category: 'Sofas',
        categoryCode: 'sofas',
        shortDescription: 'Elegant 7-seater sofa set with premium teak wood frame and plush cushions',
        description: 'Experience luxury living with our Royal Heritage Sofa Set. Crafted from premium teak wood with hand-carved details, this stunning 7-seater set includes a 3-seater sofa, two 2-seater sofas, and matching coffee table. The plush cushions are filled with high-density foam and covered in premium fabric.',
        fullDescription: 'Experience luxury living with our Royal Heritage Sofa Set. Crafted from premium teak wood with hand-carved details, this stunning 7-seater set includes a 3-seater sofa, two 2-seater sofas, and matching coffee table. The plush cushions are filled with high-density foam and covered in premium fabric that is both durable and comfortable. The intricate woodwork showcases traditional Sri Lankan craftsmanship while the modern silhouette ensures it fits perfectly in contemporary homes.',
        price: 185000,
        originalPrice: 210000,
        images: [
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
          'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80'
        ],
        dimensions: { width: 220, height: 90, depth: 85 },
        material: 'Premium Teak Wood',
        color: 'Natural Brown',
        finish: 'Lacquer Polish',
        weight: 85,
        features: [
          'Premium teak wood frame',
          'High-density foam cushions',
          'Hand-carved details',
          'Stain-resistant fabric',
          'Includes coffee table'
        ],
        isBestSeller: true,
        isNew: false,
        inStock: true,
        rating: 5,
        reviews: 48,
        createdAt: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        name: 'Colonial Bedroom Suite',
        category: 'Bedroom Sets',
        categoryCode: 'bedroom',
        shortDescription: 'Complete bedroom set with king-size bed, wardrobes, and dressing table',
        description: 'Transform your bedroom into a royal retreat with our Colonial Bedroom Suite. This comprehensive set includes a stunning king-size bed with intricate headboard carving, two matching bedside tables, a spacious 3-door wardrobe, and an elegant dressing table with mirror.',
        price: 325000,
        originalPrice: 375000,
        images: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
          'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80'
        ],
        dimensions: { width: 180, height: 150, depth: 200 },
        material: 'Mahogany Wood',
        color: 'Dark Walnut',
        finish: 'Hand-rubbed Polish',
        weight: 250,
        features: [
          'King-size bed with carved headboard',
          'Two bedside tables included',
          '3-door wardrobe with mirror',
          'Elegant dressing table',
          'Soft-close drawer mechanisms'
        ],
        isBestSeller: true,
        isNew: false,
        inStock: true,
        rating: 5,
        reviews: 35,
        createdAt: '2024-02-10T00:00:00Z'
      },
      {
        id: '3',
        name: 'Heritage Dining Table',
        category: 'Dining Tables',
        categoryCode: 'dining',
        shortDescription: '8-seater dining table with matching chairs in solid jak wood',
        description: 'Gather your family around our magnificent Heritage Dining Table. This 8-seater masterpiece is crafted from solid jak wood, featuring a stunning grain pattern and robust construction that will last generations.',
        price: 145000,
        images: [
          'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
          'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80'
        ],
        dimensions: { width: 240, height: 76, depth: 100 },
        material: 'Jak Wood',
        color: 'Golden Brown',
        finish: 'Natural Lacquer',
        weight: 120,
        features: [
          'Solid jak wood construction',
          '8 matching chairs included',
          'Extendable design (+60cm)',
          'Carved table legs',
          'Scratch-resistant finish'
        ],
        isBestSeller: true,
        isNew: false,
        inStock: true,
        rating: 4,
        reviews: 28,
        createdAt: '2024-03-01T00:00:00Z'
      },
      {
        id: '4',
        name: 'Classic Teak Almirah',
        category: 'Almirahs',
        categoryCode: 'almirahs',
        shortDescription: 'Spacious 4-door almirah with full-length mirror and ample storage',
        description: 'Organize your wardrobe in style with our Classic Teak Almirah. This spacious 4-door unit features a full-length mirror, multiple shelves, hanging space, and dedicated drawers for accessories.',
        price: 95000,
        originalPrice: 110000,
        images: [
          'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80',
          'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80'
        ],
        dimensions: { width: 180, height: 210, depth: 60 },
        material: 'Teak Wood',
        color: 'Natural Teak',
        finish: 'Melamine Polish',
        weight: 150,
        features: [
          'Full-length mirror on door',
          'Adjustable shelving',
          'Dedicated hanging space',
          'Built-in drawers',
          'Anti-termite treated'
        ],
        isBestSeller: false,
        isNew: true,
        inStock: true,
        rating: 5,
        reviews: 22,
        createdAt: '2024-11-01T00:00:00Z'
      },
      {
        id: '5',
        name: 'Veranda Relaxer Chair Set',
        category: 'Veranda Chairs',
        categoryCode: 'veranda',
        shortDescription: 'Set of 4 comfortable outdoor chairs with matching table',
        description: 'Enjoy the outdoors with our Veranda Relaxer Chair Set. Designed for durability and comfort, these chairs feature ergonomic backs and weather-resistant finish perfect for your veranda or garden.',
        price: 68000,
        images: [
          'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80',
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
        ],
        dimensions: { width: 65, height: 95, depth: 70 },
        material: 'Treated Teak',
        color: 'Weathered Gray',
        finish: 'Outdoor Sealant',
        weight: 45,
        features: [
          'Set of 4 chairs + table',
          'Weather-resistant finish',
          'Ergonomic design',
          'UV protected',
          'Easy maintenance'
        ],
        isBestSeller: false,
        isNew: false,
        inStock: true,
        rating: 4,
        reviews: 15,
        createdAt: '2024-05-15T00:00:00Z'
      },
      {
        id: '6',
        name: 'Executive Office Desk',
        category: 'Custom Interior',
        categoryCode: 'custom',
        shortDescription: 'Premium L-shaped executive desk with integrated cable management',
        description: 'Make a statement in your office with our Executive Office Desk. This L-shaped desk combines functionality with elegance, featuring integrated cable management, lockable drawers, and a spacious work surface.',
        price: 125000,
        images: [
          'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'
        ],
        dimensions: { width: 180, height: 75, depth: 160 },
        material: 'Oak Wood',
        color: 'Dark Oak',
        finish: 'Matte Lacquer',
        weight: 95,
        features: [
          'L-shaped design',
          'Integrated cable management',
          'Lockable drawers',
          'Leather desk pad included',
          'Matching bookshelf available'
        ],
        isBestSeller: false,
        isNew: true,
        inStock: true,
        rating: 5,
        reviews: 12,
        createdAt: '2024-10-01T00:00:00Z'
      },
      {
        id: '7',
        name: 'Modern TV Console',
        category: 'Custom Interior',
        categoryCode: 'custom',
        shortDescription: 'Sleek entertainment unit with hidden storage and floating design',
        description: 'Elevate your living room with our Modern TV Console. This wall-mounted unit features a floating design, ample hidden storage, and cable management system for a clean, contemporary look.',
        price: 78000,
        images: [
          'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80'
        ],
        dimensions: { width: 200, height: 45, depth: 40 },
        material: 'Engineered Wood & Teak',
        color: 'Two-tone Walnut',
        finish: 'PU Coating',
        weight: 55,
        features: [
          'Wall-mounted floating design',
          'Hidden cable management',
          'Soft-close cabinets',
          'LED backlight ready',
          'Up to 65" TV support'
        ],
        isBestSeller: false,
        isNew: true,
        inStock: true,
        rating: 4,
        reviews: 8,
        createdAt: '2024-09-15T00:00:00Z'
      },
      {
        id: '8',
        name: 'Antique Reproduction Cabinet',
        category: 'Almirahs',
        categoryCode: 'almirahs',
        shortDescription: 'Handcrafted display cabinet with glass doors and brass fittings',
        description: 'Showcase your treasures in our Antique Reproduction Cabinet. This meticulously handcrafted piece features intricate woodwork, beveled glass doors, and authentic brass fittings that evoke colonial-era elegance.',
        price: 135000,
        images: [
          'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80'
        ],
        dimensions: { width: 120, height: 200, depth: 45 },
        material: 'Rosewood',
        color: 'Deep Burgundy',
        finish: 'French Polish',
        weight: 110,
        features: [
          'Beveled glass doors',
          'Authentic brass hardware',
          'Built-in lighting ready',
          'Adjustable glass shelves',
          'Lock and key included'
        ],
        isBestSeller: true,
        isNew: false,
        inStock: true,
        rating: 5,
        reviews: 19,
        createdAt: '2024-04-01T00:00:00Z'
      }
    ]
    writeProducts(sampleProducts)
    console.log('✓ Sample product data initialized')
  }
}

// ============ API ROUTES ============

// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  try {
    let products = readProducts()
    const { category, search, sort } = req.query

    // Filter by category
    if (category) {
      products = products.filter(p => p.categoryCode === category)
    }

    // Search filter
    if (search) {
      const query = search.toLowerCase()
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      )
    }

    // Sort
    switch (sort) {
      case 'price_asc':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        products.sort((a, b) => b.price - a.price)
        break
      case 'bestseller':
        products.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
        break
      case 'rating':
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// GET /api/products/bestsellers - Get best selling products
app.get('/api/products/bestsellers', (req, res) => {
  try {
    const products = readProducts()
    const bestSellers = products
      .filter(p => p.isBestSeller || p.rating >= 4)
      .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
      .slice(0, 8)
    res.json(bestSellers)
  } catch (error) {
    console.error('Error fetching best sellers:', error)
    res.status(500).json({ error: 'Failed to fetch best sellers' })
  }
})

// GET /api/products/:id - Get single product
app.get('/api/products/:id', (req, res) => {
  try {
    const products = readProducts()
    const product = products.find(p => p.id === req.params.id)
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

// POST /api/products - Create new product
app.post('/api/products', upload.array('images', 5), (req, res) => {
  try {
    const products = readProducts()
    
    // Parse dimensions if string
    let dimensions = req.body.dimensions
    if (typeof dimensions === 'string') {
      dimensions = JSON.parse(dimensions)
    }

    // Handle existing images
    let existingImages = []
    if (req.body.existingImages) {
      existingImages = JSON.parse(req.body.existingImages)
    }

    // Get new uploaded image URLs
    const newImages = req.files?.map(file => `/uploads/${file.filename}`) || []

    const newProduct = {
      id: uuidv4(),
      name: req.body.name,
      category: req.body.category,
      categoryCode: req.body.categoryCode,
      shortDescription: req.body.shortDescription,
      description: req.body.description || '',
      fullDescription: req.body.fullDescription || req.body.description || '',
      price: parseFloat(req.body.price) || 0,
      originalPrice: req.body.originalPrice ? parseFloat(req.body.originalPrice) : null,
      images: [...existingImages, ...newImages],
      dimensions: dimensions || { width: null, height: null, depth: null },
      material: req.body.material || '',
      color: req.body.color || '',
      finish: req.body.finish || 'Natural Lacquer',
      weight: req.body.weight ? parseFloat(req.body.weight) : null,
      features: req.body.features ? JSON.parse(req.body.features) : [],
      isBestSeller: req.body.isBestSeller === 'true',
      isNew: req.body.isNew === 'true',
      inStock: req.body.inStock !== 'false',
      rating: parseFloat(req.body.rating) || 5,
      reviews: parseInt(req.body.reviews) || 0,
      createdAt: new Date().toISOString()
    }

    products.push(newProduct)
    writeProducts(products)

    res.status(201).json(newProduct)
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ error: 'Failed to create product' })
  }
})

// PUT /api/products/:id - Update product
app.put('/api/products/:id', upload.array('images', 5), (req, res) => {
  try {
    const products = readProducts()
    const index = products.findIndex(p => p.id === req.params.id)
    
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Parse dimensions if string
    let dimensions = req.body.dimensions
    if (typeof dimensions === 'string') {
      dimensions = JSON.parse(dimensions)
    }

    // Handle existing images
    let existingImages = []
    if (req.body.existingImages) {
      existingImages = JSON.parse(req.body.existingImages)
    }

    // Get new uploaded image URLs
    const newImages = req.files?.map(file => `/uploads/${file.filename}`) || []

    const updatedProduct = {
      ...products[index],
      name: req.body.name || products[index].name,
      category: req.body.category || products[index].category,
      categoryCode: req.body.categoryCode || products[index].categoryCode,
      shortDescription: req.body.shortDescription || products[index].shortDescription,
      description: req.body.description || products[index].description,
      fullDescription: req.body.fullDescription || req.body.description || products[index].fullDescription,
      price: req.body.price ? parseFloat(req.body.price) : products[index].price,
      originalPrice: req.body.originalPrice ? parseFloat(req.body.originalPrice) : products[index].originalPrice,
      images: [...existingImages, ...newImages],
      dimensions: dimensions || products[index].dimensions,
      material: req.body.material || products[index].material,
      color: req.body.color || products[index].color,
      finish: req.body.finish || products[index].finish,
      weight: req.body.weight ? parseFloat(req.body.weight) : products[index].weight,
      isBestSeller: req.body.isBestSeller === 'true',
      isNew: req.body.isNew === 'true',
      inStock: req.body.inStock !== 'false',
      updatedAt: new Date().toISOString()
    }

    products[index] = updatedProduct
    writeProducts(products)

    res.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ error: 'Failed to update product' })
  }
})

// DELETE /api/products/:id - Delete product
app.delete('/api/products/:id', (req, res) => {
  try {
    let products = readProducts()
    const index = products.findIndex(p => p.id === req.params.id)
    
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Delete associated images from uploads folder
    const product = products[index]
    if (product.images) {
      product.images.forEach(img => {
        if (img.startsWith('/uploads/')) {
          const filePath = path.join(__dirname, img)
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
          }
        }
      })
    }

    products = products.filter(p => p.id !== req.params.id)
    writeProducts(products)

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

// POST /api/quotes - Submit quote request
app.post('/api/quotes', (req, res) => {
  try {
    const quoteData = {
      id: uuidv4(),
      ...req.body,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    // In a real app, save to database and send notification
    console.log('📋 New Quote Request:', quoteData)

    res.status(201).json({ 
      message: 'Quote request submitted successfully',
      quoteId: quoteData.id 
    })
  } catch (error) {
    console.error('Error submitting quote:', error)
    res.status(500).json({ error: 'Failed to submit quote request' })
  }
})

// POST /api/contact - Submit contact form
app.post('/api/contact', (req, res) => {
  try {
    const contactData = {
      id: uuidv4(),
      ...req.body,
      status: 'unread',
      createdAt: new Date().toISOString()
    }

    // In a real app, save to database and send notification
    console.log('📩 New Contact Message:', contactData)

    res.status(201).json({ 
      message: 'Message sent successfully',
      messageId: contactData.id 
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    name: 'Dambulu Furniture API'
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err)
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum 5MB allowed.' })
    }
    return res.status(400).json({ error: err.message })
  }
  
  res.status(500).json({ error: 'Internal server error' })
})

// Initialize data and start server
initializeData()

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🪑  Dambulu Furniture Shop - API Server                 ║
║                                                           ║
║   Server running on: http://localhost:${PORT}               ║
║   API Base URL: http://localhost:${PORT}/api                ║
║                                                           ║
║   Endpoints:                                              ║
║   • GET    /api/products         - List all products      ║
║   • GET    /api/products/:id     - Get product details    ║
║   • GET    /api/products/bestsellers - Get best sellers   ║
║   • POST   /api/products         - Create product         ║
║   • PUT    /api/products/:id     - Update product         ║
║   • DELETE /api/products/:id     - Delete product         ║
║   • POST   /api/quotes           - Submit quote request   ║
║   • POST   /api/contact          - Submit contact form    ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `)
})

export default app
