// Mock ecommerce data
const categories = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Home & Garden' },
  { id: '4', name: 'Sports & Outdoors' },
];

const products = [
  {
    id: '1',
    name: 'Laptop Pro 15',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    categoryId: '1',
    sku: 'ELEC-LAPTOP-001',
    images: ['laptop1.jpg', 'laptop2.jpg'],
  },
  {
    id: '2',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with 6 buttons',
    price: 29.99,
    categoryId: '1',
    sku: 'ELEC-MOUSE-001',
    images: ['mouse1.jpg'],
  },
  {
    id: '3',
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt',
    price: 19.99,
    categoryId: '2',
    sku: 'CLO-TSHIRT-001',
    images: ['tshirt1.jpg', 'tshirt2.jpg'],
  },
  {
    id: '4',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with excellent cushioning',
    price: 89.99,
    categoryId: '4',
    sku: 'SPO-SHOES-001',
    images: ['shoes1.jpg'],
  },
  {
    id: '5',
    name: 'Garden Hose',
    description: '50ft expandable garden hose',
    price: 34.99,
    categoryId: '3',
    sku: 'HOME-HOSE-001',
    images: ['hose1.jpg'],
  },
  {
    id: '6',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches',
    price: 129.99,
    categoryId: '1',
    sku: 'ELEC-KEYB-001',
    images: ['keyboard1.jpg', 'keyboard2.jpg'],
  },
  {
    id: '7',
    name: 'Yoga Mat',
    description: 'Non-slip exercise yoga mat',
    price: 24.99,
    categoryId: '4',
    sku: 'SPO-YOGA-001',
    images: ['yogamat1.jpg'],
  },
  {
    id: '8',
    name: 'Coffee Maker',
    description: 'Programmable 12-cup coffee maker',
    price: 79.99,
    categoryId: '3',
    sku: 'HOME-COFFEE-001',
    images: ['coffee1.jpg'],
  },
];

const variants = [
  // Laptop variants (different configurations)
  {
    id: 'v1',
    productId: '1',
    name: '256GB SSD',
    sku: 'ELEC-LAPTOP-001-256',
    price: 1299.99,
    attributes: [
      { name: 'Storage', value: '256GB SSD' },
      { name: 'RAM', value: '8GB' },
    ],
  },
  {
    id: 'v2',
    productId: '1',
    name: '512GB SSD',
    sku: 'ELEC-LAPTOP-001-512',
    price: 1499.99,
    attributes: [
      { name: 'Storage', value: '512GB SSD' },
      { name: 'RAM', value: '16GB' },
    ],
  },
  // T-shirt variants (colors/sizes)
  {
    id: 'v3',
    productId: '3',
    name: 'Small - Blue',
    sku: 'CLO-TSHIRT-001-S-BLU',
    price: 19.99,
    attributes: [
      { name: 'Size', value: 'Small' },
      { name: 'Color', value: 'Blue' },
    ],
  },
  {
    id: 'v4',
    productId: '3',
    name: 'Medium - Blue',
    sku: 'CLO-TSHIRT-001-M-BLU',
    price: 19.99,
    attributes: [
      { name: 'Size', value: 'Medium' },
      { name: 'Color', value: 'Blue' },
    ],
  },
  {
    id: 'v5',
    productId: '3',
    name: 'Large - Red',
    sku: 'CLO-TSHIRT-001-L-RED',
    price: 19.99,
    attributes: [
      { name: 'Size', value: 'Large' },
      { name: 'Color', value: 'Red' },
    ],
  },
  // Running shoes variants (sizes)
  {
    id: 'v6',
    productId: '4',
    name: 'Size 9',
    sku: 'SPO-SHOES-001-9',
    price: 89.99,
    attributes: [{ name: 'Size', value: '9' }],
  },
  {
    id: 'v7',
    productId: '4',
    name: 'Size 10',
    sku: 'SPO-SHOES-001-10',
    price: 89.99,
    attributes: [{ name: 'Size', value: '10' }],
  },
  {
    id: 'v8',
    productId: '4',
    name: 'Size 11',
    sku: 'SPO-SHOES-001-11',
    price: 89.99,
    attributes: [{ name: 'Size', value: '11' }],
  },
];

const inventory = {
  '1': { inStock: true, quantity: 15, warehouse: 'West Coast' },
  '2': { inStock: true, quantity: 150, warehouse: 'East Coast' },
  '3': { inStock: true, quantity: 200, warehouse: 'Central' },
  '4': { inStock: true, quantity: 45, warehouse: 'West Coast' },
  '5': { inStock: true, quantity: 80, warehouse: 'Central' },
  '6': { inStock: false, quantity: 0, warehouse: 'East Coast' },
  '7': { inStock: true, quantity: 120, warehouse: 'Central' },
  '8': { inStock: true, quantity: 30, warehouse: 'West Coast' },
  'v1': { inStock: true, quantity: 8, warehouse: 'West Coast' },
  'v2': { inStock: true, quantity: 7, warehouse: 'West Coast' },
  'v3': { inStock: true, quantity: 50, warehouse: 'Central' },
  'v4': { inStock: true, quantity: 75, warehouse: 'Central' },
  'v5': { inStock: true, quantity: 40, warehouse: 'Central' },
  'v6': { inStock: true, quantity: 15, warehouse: 'West Coast' },
  'v7': { inStock: true, quantity: 12, warehouse: 'West Coast' },
  'v8': { inStock: true, quantity: 10, warehouse: 'West Coast' },
};

const customers = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
  },
];

const orders = [
  {
    id: '1',
    customerId: '1',
    items: [
      { productId: '1', quantity: 1, price: 1299.99 },
      { productId: '2', quantity: 2, price: 29.99 },
    ],
    total: 1359.97,
    status: 'DELIVERED',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    customerId: '2',
    items: [
      { productId: '3', quantity: 3, price: 19.99 },
      { productId: '4', quantity: 1, price: 89.99 },
    ],
    total: 149.96,
    status: 'SHIPPED',
    createdAt: '2024-01-20T14:20:00Z',
  },
];

// Resolvers
const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => products.find(p => p.id === id),
    searchProducts: (_, { query }) =>
      products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
      ),
    productsByCategory: (_, { categoryId }) =>
      products.filter(p => p.categoryId === categoryId),
    categories: () => categories,
    category: (_, { id }) => categories.find(c => c.id === id),
    customer: (_, { id }) => customers.find(c => c.id === id),
    order: (_, { id }) => orders.find(o => o.id === id),
  },

  Mutation: {
    addProduct: (_, { name, description, price, categoryId, sku }) => {
      const newProduct = {
        id: String(products.length + 1),
        name,
        description,
        price,
        categoryId,
        sku,
        images: [],
      };
      products.push(newProduct);
      inventory[newProduct.id] = { inStock: true, quantity: 0, warehouse: 'Central' };
      return newProduct;
    },

    updateProductPrice: (_, { id, price }) => {
      const product = products.find(p => p.id === id);
      if (!product) throw new Error('Product not found');
      product.price = price;
      return product;
    },

    createOrder: (_, { customerId, items }) => {
      const orderItems = items.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) throw new Error(`Product ${item.productId} not found`);
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      });

      const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const newOrder = {
        id: String(orders.length + 1),
        customerId,
        items: orderItems,
        total,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };

      orders.push(newOrder);
      return newOrder;
    },
  },

  Product: {
    category: (product) => categories.find(c => c.id === product.categoryId),
    variants: (product) => variants.filter(v => v.productId === product.id),
    inventory: (product) => inventory[product.id] || { inStock: false, quantity: 0, warehouse: null },
  },

  ProductVariant: {
    inventory: (variant) => inventory[variant.id] || { inStock: false, quantity: 0, warehouse: null },
  },

  Category: {
    products: (category) => products.filter(p => p.categoryId === category.id),
  },

  Customer: {
    orders: (customer) => orders.filter(o => o.customerId === customer.id),
  },

  OrderItem: {
    product: (orderItem) => products.find(p => p.id === orderItem.productId),
  },
};

module.exports = { resolvers };
