import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import pool, { testConnection } from './db/connection.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}))
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

// Helper function to transform DB row to API response format
const transformProduct = (row) => {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    categoryCode: row.category_code,
    shortDescription: row.short_description,
    description: row.description,
    fullDescription: row.full_description,
    price: parseFloat(row.price),
    originalPrice: row.original_price ? parseFloat(row.original_price) : null,
    images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images,
    dimensions: typeof row.dimensions === 'string' ? JSON.parse(row.dimensions) : row.dimensions,
    material: row.material,
    color: row.color,
    finish: row.finish,
    weight: row.weight ? parseFloat(row.weight) : null,
    features: typeof row.features === 'string' ? JSON.parse(row.features) : row.features,
    isBestSeller: Boolean(row.is_best_seller),
    isNew: Boolean(row.is_new),
    inStock: Boolean(row.in_stock),
    rating: parseFloat(row.rating),
    reviews: row.reviews,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

// ============ API ROUTES ============

// GET /api/products - Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { category, search, sort } = req.query
    
    let query = 'SELECT * FROM products WHERE 1=1'
    const params = []

    // Filter by category
    if (category) {
      query += ' AND category_code = ?'
      params.push(category)
    }

    // Search filter
    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ? OR category LIKE ?)'
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm, searchTerm)
    }

    // Sort
    switch (sort) {
      case 'price_asc':
        query += ' ORDER BY price ASC'
        break
      case 'price_desc':
        query += ' ORDER BY price DESC'
        break
      case 'bestseller':
        query += ' ORDER BY is_best_seller DESC, reviews DESC'
        break
      case 'rating':
        query += ' ORDER BY rating DESC'
        break
      default:
        query += ' ORDER BY created_at DESC'
    }

    const [rows] = await pool.query(query, params)
    const products = rows.map(transformProduct)
    
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// GET /api/products/bestsellers - Get best selling products
app.get('/api/products/bestsellers', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE is_best_seller = TRUE OR rating >= 4 ORDER BY reviews DESC LIMIT 8'
    )
    const products = rows.map(transformProduct)
    res.json(products)
  } catch (error) {
    console.error('Error fetching best sellers:', error)
    res.status(500).json({ error: 'Failed to fetch best sellers' })
  }
})

// GET /api/products/:id - Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id])
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.json(transformProduct(rows[0]))
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

// POST /api/products - Create new product
app.post('/api/products', upload.array('images', 5), async (req, res) => {
  try {
    const id = uuidv4()
    
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
    const allImages = [...existingImages, ...newImages]

    // Parse features if string
    let features = req.body.features
    if (typeof features === 'string') {
      try {
        features = JSON.parse(features)
      } catch {
        features = []
      }
    }

    await pool.query(
      `INSERT INTO products (
        id, name, category, category_code, short_description, description, full_description,
        price, original_price, images, dimensions, material, color, finish, weight,
        features, is_best_seller, is_new, in_stock, rating, reviews
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        req.body.name,
        req.body.category,
        req.body.categoryCode,
        req.body.shortDescription,
        req.body.description || '',
        req.body.fullDescription || req.body.description || '',
        parseFloat(req.body.price) || 0,
        req.body.originalPrice ? parseFloat(req.body.originalPrice) : null,
        JSON.stringify(allImages),
        JSON.stringify(dimensions || { width: null, height: null, depth: null }),
        req.body.material || '',
        req.body.color || '',
        req.body.finish || 'Natural Lacquer',
        req.body.weight ? parseFloat(req.body.weight) : null,
        JSON.stringify(features || []),
        req.body.isBestSeller === 'true',
        req.body.isNew === 'true',
        req.body.inStock !== 'false',
        parseFloat(req.body.rating) || 5,
        parseInt(req.body.reviews) || 0
      ]
    )

    // Fetch and return the created product
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id])
    res.status(201).json(transformProduct(rows[0]))
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ error: 'Failed to create product' })
  }
})

// PUT /api/products/:id - Update product
app.put('/api/products/:id', upload.array('images', 5), async (req, res) => {
  try {
    // Check if product exists
    const [existing] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id])
    if (existing.length === 0) {
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
    const allImages = [...existingImages, ...newImages]

    await pool.query(
      `UPDATE products SET
        name = COALESCE(?, name),
        category = COALESCE(?, category),
        category_code = COALESCE(?, category_code),
        short_description = COALESCE(?, short_description),
        description = COALESCE(?, description),
        full_description = COALESCE(?, full_description),
        price = COALESCE(?, price),
        original_price = ?,
        images = ?,
        dimensions = COALESCE(?, dimensions),
        material = COALESCE(?, material),
        color = COALESCE(?, color),
        finish = COALESCE(?, finish),
        weight = ?,
        is_best_seller = ?,
        is_new = ?,
        in_stock = ?
      WHERE id = ?`,
      [
        req.body.name,
        req.body.category,
        req.body.categoryCode,
        req.body.shortDescription,
        req.body.description,
        req.body.fullDescription || req.body.description,
        req.body.price ? parseFloat(req.body.price) : null,
        req.body.originalPrice ? parseFloat(req.body.originalPrice) : null,
        JSON.stringify(allImages),
        dimensions ? JSON.stringify(dimensions) : null,
        req.body.material,
        req.body.color,
        req.body.finish,
        req.body.weight ? parseFloat(req.body.weight) : null,
        req.body.isBestSeller === 'true',
        req.body.isNew === 'true',
        req.body.inStock !== 'false',
        req.params.id
      ]
    )

    // Fetch and return the updated product
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id])
    res.json(transformProduct(rows[0]))
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ error: 'Failed to update product' })
  }
})

// DELETE /api/products/:id - Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    // Get product to delete its images
    const [rows] = await pool.query('SELECT images FROM products WHERE id = ?', [req.params.id])
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Delete associated images from uploads folder
    const images = typeof rows[0].images === 'string' ? JSON.parse(rows[0].images) : rows[0].images
    if (images && Array.isArray(images)) {
      images.forEach(img => {
        if (img.startsWith('/uploads/')) {
          const filePath = path.join(__dirname, img)
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
          }
        }
      })
    }

    await pool.query('DELETE FROM products WHERE id = ?', [req.params.id])
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

// POST /api/quotes - Submit quote request
app.post('/api/quotes', async (req, res) => {
  try {
    const id = uuidv4()
    
    await pool.query(
      `INSERT INTO quotes (id, product_id, product_name, product_price, customer_name, phone, email, quantity, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        req.body.productId || null,
        req.body.productName || null,
        req.body.productPrice || null,
        req.body.name,
        req.body.phone,
        req.body.email || null,
        req.body.quantity || 1,
        req.body.notes || null
      ]
    )

    console.log('📋 New Quote Request:', { id, ...req.body })

    res.status(201).json({ 
      message: 'Quote request submitted successfully',
      quoteId: id 
    })
  } catch (error) {
    console.error('Error submitting quote:', error)
    res.status(500).json({ error: 'Failed to submit quote request' })
  }
})

// POST /api/contact - Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const id = uuidv4()
    
    await pool.query(
      `INSERT INTO contacts (id, name, phone, email, subject, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        req.body.name,
        req.body.phone,
        req.body.email || null,
        req.body.subject || null,
        req.body.message
      ]
    )

    console.log('📩 New Contact Message:', { id, ...req.body })

    res.status(201).json({ 
      message: 'Message sent successfully',
      messageId: id 
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const dbConnected = await testConnection()
  res.json({ 
    status: dbConnected ? 'ok' : 'degraded',
    database: dbConnected ? 'connected' : 'disconnected',
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

// Start server
const startServer = async () => {
  // Test database connection
  const dbConnected = await testConnection()
  
  if (!dbConnected) {
    console.warn('⚠️  Warning: Database connection failed. Some features may not work.')
    console.warn('   Run "npm run db:init" to initialize the database.')
  }

  app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🪑  Dambulu Furniture Shop - API Server                 ║
║                                                           ║
║   Server running on: http://localhost:${PORT}               ║
║   API Base URL: http://localhost:${PORT}/api                ║
║   Database: MySQL ${dbConnected ? '✓ Connected' : '✗ Not Connected'}                      ║
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
║   • GET    /api/health           - Health check           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `)
  })
}

startServer()

export default app
