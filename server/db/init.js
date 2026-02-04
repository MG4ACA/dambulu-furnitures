import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const initDatabase = async () => {
  // First connect without database to create it if needed
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  const dbName = process.env.DB_NAME || 'dambulu_furniture';

  try {
    console.log('🔧 Initializing Dambulu Furniture Database...\n');

    // Create database if not exists
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    console.log(`✓ Database '${dbName}' ready`);

    // Use the database
    await connection.query(`USE \`${dbName}\``);

    // Create products table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        category_code VARCHAR(50) NOT NULL,
        short_description TEXT,
        description TEXT,
        full_description TEXT,
        price DECIMAL(12, 2) NOT NULL,
        original_price DECIMAL(12, 2),
        images JSON,
        dimensions JSON,
        material VARCHAR(100),
        color VARCHAR(100),
        finish VARCHAR(100),
        weight DECIMAL(8, 2),
        features JSON,
        is_best_seller BOOLEAN DEFAULT FALSE,
        is_new BOOLEAN DEFAULT TRUE,
        in_stock BOOLEAN DEFAULT TRUE,
        rating DECIMAL(2, 1) DEFAULT 5.0,
        reviews INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category_code),
        INDEX idx_best_seller (is_best_seller),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Products table ready');

    // Create quotes table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS quotes (
        id VARCHAR(36) PRIMARY KEY,
        product_id VARCHAR(36),
        product_name VARCHAR(255),
        product_price DECIMAL(12, 2),
        customer_name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255),
        quantity INT DEFAULT 1,
        notes TEXT,
        status ENUM('pending', 'contacted', 'completed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
        INDEX idx_status (status),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Quotes table ready');

    // Create contacts table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Contacts table ready');

    // Check if products table is empty
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM products');

    if (rows[0].count === 0) {
      console.log('\n📦 Inserting sample products...');
      await insertSampleProducts(connection);
      console.log('✓ Sample products inserted');
    } else {
      console.log(`\n✓ Products table already has ${rows[0].count} products`);
    }

    console.log('\n✅ Database initialization complete!');
    console.log(`\n📊 Database: ${dbName}`);
    console.log('   Tables: products, quotes, contacts');
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    throw error;
  } finally {
    await connection.end();
  }
};

const insertSampleProducts = async (connection) => {
  const products = [
    {
      id: 'prod_001',
      name: 'Royal Heritage Sofa Set',
      category: 'Sofas',
      category_code: 'sofas',
      short_description:
        'Elegant 7-seater sofa set with premium teak wood frame and plush cushions',
      description:
        'Experience luxury living with our Royal Heritage Sofa Set. Crafted from premium teak wood with hand-carved details.',
      full_description:
        'Experience luxury living with our Royal Heritage Sofa Set. Crafted from premium teak wood with hand-carved details, this stunning 7-seater set includes a 3-seater sofa, two 2-seater sofas, and matching coffee table.',
      price: 185000,
      original_price: 210000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
      ]),
      dimensions: JSON.stringify({ width: 220, height: 90, depth: 85 }),
      material: 'Premium Teak Wood',
      color: 'Natural Brown',
      finish: 'Lacquer Polish',
      weight: 85,
      features: JSON.stringify([
        'Premium teak wood frame',
        'High-density foam cushions',
        'Hand-carved details',
        'Includes coffee table',
      ]),
      is_best_seller: true,
      is_new: false,
      in_stock: true,
      rating: 5.0,
      reviews: 48,
    },
    {
      id: 'prod_002',
      name: 'Colonial Bedroom Suite',
      category: 'Bedroom Sets',
      category_code: 'bedroom',
      short_description: 'Complete bedroom set with king-size bed, wardrobes, and dressing table',
      description: 'Transform your bedroom into a royal retreat with our Colonial Bedroom Suite.',
      full_description:
        'Transform your bedroom into a royal retreat with our Colonial Bedroom Suite. This comprehensive set includes a stunning king-size bed with intricate headboard carving, two matching bedside tables, a spacious 3-door wardrobe, and an elegant dressing table with mirror.',
      price: 325000,
      original_price: 375000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
      ]),
      dimensions: JSON.stringify({ width: 180, height: 150, depth: 200 }),
      material: 'Mahogany Wood',
      color: 'Dark Walnut',
      finish: 'Hand-rubbed Polish',
      weight: 250,
      features: JSON.stringify([
        'King-size bed with carved headboard',
        'Two bedside tables',
        '3-door wardrobe with mirror',
        'Dressing table included',
      ]),
      is_best_seller: true,
      is_new: false,
      in_stock: true,
      rating: 5.0,
      reviews: 35,
    },
    {
      id: 'prod_003',
      name: 'Heritage Dining Table',
      category: 'Dining Tables',
      category_code: 'dining',
      short_description: '8-seater dining table with matching chairs in solid jak wood',
      description: 'Gather your family around our magnificent Heritage Dining Table.',
      full_description:
        'Gather your family around our magnificent Heritage Dining Table. This 8-seater masterpiece is crafted from solid jak wood, featuring a stunning grain pattern and robust construction.',
      price: 145000,
      original_price: null,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
      ]),
      dimensions: JSON.stringify({ width: 240, height: 76, depth: 100 }),
      material: 'Jak Wood',
      color: 'Golden Brown',
      finish: 'Natural Lacquer',
      weight: 120,
      features: JSON.stringify([
        'Solid jak wood construction',
        '8 matching chairs included',
        'Extendable design',
        'Scratch-resistant finish',
      ]),
      is_best_seller: true,
      is_new: false,
      in_stock: true,
      rating: 4.5,
      reviews: 28,
    },
    {
      id: 'prod_004',
      name: 'Classic Teak Almirah',
      category: 'Almirahs',
      category_code: 'almirahs',
      short_description: 'Spacious 4-door almirah with full-length mirror and ample storage',
      description: 'Organize your wardrobe in style with our Classic Teak Almirah.',
      full_description:
        'Organize your wardrobe in style with our Classic Teak Almirah. This spacious 4-door unit features a full-length mirror, multiple shelves, hanging space, and dedicated drawers.',
      price: 95000,
      original_price: 110000,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80',
      ]),
      dimensions: JSON.stringify({ width: 180, height: 210, depth: 60 }),
      material: 'Teak Wood',
      color: 'Natural Teak',
      finish: 'Melamine Polish',
      weight: 150,
      features: JSON.stringify([
        'Full-length mirror',
        'Adjustable shelving',
        'Built-in drawers',
        'Anti-termite treated',
      ]),
      is_best_seller: false,
      is_new: true,
      in_stock: true,
      rating: 5.0,
      reviews: 22,
    },
    {
      id: 'prod_005',
      name: 'Veranda Relaxer Chair Set',
      category: 'Veranda Chairs',
      category_code: 'veranda',
      short_description: 'Set of 4 comfortable outdoor chairs with matching table',
      description: 'Enjoy the outdoors with our Veranda Relaxer Chair Set.',
      full_description:
        'Enjoy the outdoors with our Veranda Relaxer Chair Set. Designed for durability and comfort, these chairs feature ergonomic backs and weather-resistant finish.',
      price: 68000,
      original_price: null,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80',
      ]),
      dimensions: JSON.stringify({ width: 65, height: 95, depth: 70 }),
      material: 'Treated Teak',
      color: 'Weathered Gray',
      finish: 'Outdoor Sealant',
      weight: 45,
      features: JSON.stringify([
        'Set of 4 chairs + table',
        'Weather-resistant',
        'Ergonomic design',
        'UV protected',
      ]),
      is_best_seller: false,
      is_new: false,
      in_stock: true,
      rating: 4.0,
      reviews: 15,
    },
    {
      id: 'prod_006',
      name: 'Executive Office Desk',
      category: 'Custom Interior',
      category_code: 'custom',
      short_description: 'Premium L-shaped executive desk with integrated cable management',
      description: 'Make a statement in your office with our Executive Office Desk.',
      full_description:
        'Make a statement in your office with our Executive Office Desk. This L-shaped desk combines functionality with elegance.',
      price: 125000,
      original_price: null,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
      ]),
      dimensions: JSON.stringify({ width: 180, height: 75, depth: 160 }),
      material: 'Oak Wood',
      color: 'Dark Oak',
      finish: 'Matte Lacquer',
      weight: 95,
      features: JSON.stringify([
        'L-shaped design',
        'Cable management',
        'Lockable drawers',
        'Leather desk pad included',
      ]),
      is_best_seller: false,
      is_new: true,
      in_stock: true,
      rating: 5.0,
      reviews: 12,
    },
    {
      id: 'prod_007',
      name: 'Modern TV Console',
      category: 'Custom Interior',
      category_code: 'custom',
      short_description: 'Sleek entertainment unit with hidden storage and floating design',
      description: 'Elevate your living room with our Modern TV Console.',
      full_description:
        'Elevate your living room with our Modern TV Console. This wall-mounted unit features a floating design and ample hidden storage.',
      price: 78000,
      original_price: null,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80',
      ]),
      dimensions: JSON.stringify({ width: 200, height: 45, depth: 40 }),
      material: 'Engineered Wood & Teak',
      color: 'Two-tone Walnut',
      finish: 'PU Coating',
      weight: 55,
      features: JSON.stringify([
        'Wall-mounted floating design',
        'Hidden cable management',
        'Soft-close cabinets',
        'Up to 65" TV support',
      ]),
      is_best_seller: false,
      is_new: true,
      in_stock: true,
      rating: 4.5,
      reviews: 8,
    },
    {
      id: 'prod_008',
      name: 'Antique Reproduction Cabinet',
      category: 'Almirahs',
      category_code: 'almirahs',
      short_description: 'Handcrafted display cabinet with glass doors and brass fittings',
      description: 'Showcase your treasures in our Antique Reproduction Cabinet.',
      full_description:
        'Showcase your treasures in our Antique Reproduction Cabinet. This meticulously handcrafted piece features intricate woodwork and beveled glass doors.',
      price: 135000,
      original_price: null,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80',
      ]),
      dimensions: JSON.stringify({ width: 120, height: 200, depth: 45 }),
      material: 'Rosewood',
      color: 'Deep Burgundy',
      finish: 'French Polish',
      weight: 110,
      features: JSON.stringify([
        'Beveled glass doors',
        'Authentic brass hardware',
        'Adjustable glass shelves',
        'Lock and key included',
      ]),
      is_best_seller: true,
      is_new: false,
      in_stock: true,
      rating: 5.0,
      reviews: 19,
    },
  ];

  const insertQuery = `
    INSERT INTO products (
      id, name, category, category_code, short_description, description, full_description,
      price, original_price, images, dimensions, material, color, finish, weight,
      features, is_best_seller, is_new, in_stock, rating, reviews
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  for (const product of products) {
    await connection.query(insertQuery, [
      product.id,
      product.name,
      product.category,
      product.category_code,
      product.short_description,
      product.description,
      product.full_description,
      product.price,
      product.original_price,
      product.images,
      product.dimensions,
      product.material,
      product.color,
      product.finish,
      product.weight,
      product.features,
      product.is_best_seller,
      product.is_new,
      product.in_stock,
      product.rating,
      product.reviews,
    ]);
  }
};

// Run initialization
initDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
