const lessons = [
  // Lesson 1: Basic Query
  {
    title: 'Your First GraphQL Query',
    description: `Welcome! In GraphQL, you ask for exactly what you need using a "query".
Unlike REST where you might get all product data, in GraphQL you specify which fields you want.

Think of it like ordering at a restaurant - you don't get the entire menu, just what you ask for.`,

    challenge: 'Fetch ALL products, but only their names and prices.',

    example: `{
  products {
    name
  }
}`,

    starter: `{
  products {

  }
}`,

    validate: (data, query) => {
      return data.products &&
             data.products.length > 0 &&
             data.products[0].name &&
             data.products[0].price &&
             query.includes('name') &&
             query.includes('price');
    },

    hint: 'You need to ask for both "name" and "price" fields inside products { }',

    solution: `{
  products {
    name
    price
  }
}`,

    explanation: `In GraphQL, you specify exactly which fields you want. The structure is:
• Start with the query type (products)
• Inside { }, list the fields you want (name, price)
• You only get what you ask for - no over-fetching!

This is powerful for performance with 40k+ SKUs - you don't load unnecessary data.`
  },

  // Lesson 2: Nested Fields
  {
    title: 'Fetching Related Data (Nested Fields)',
    description: `One of GraphQL's superpowers: fetch related data in ONE request.

In REST, you'd need:
1. GET /products → get product
2. GET /categories/:id → get category
3. GET /inventory/:id → get inventory

In GraphQL, you get it all in one query!`,

    challenge: 'Fetch all products with their name, price, AND their category name.',

    example: `{
  products {
    name
    category {
      name
    }
  }
}`,

    starter: `{
  products {
    name
    price

  }
}`,

    validate: (data, query) => {
      return data.products &&
             data.products.length > 0 &&
             data.products[0].name &&
             data.products[0].price &&
             data.products[0].category &&
             data.products[0].category.name &&
             query.includes('category');
    },

    hint: 'Add a "category" field, and inside it, ask for the category\'s "name"',

    solution: `{
  products {
    name
    price
    category {
      name
    }
  }
}`,

    explanation: `Nested fields let you traverse relationships. Notice how "category" itself has fields!

This is crucial for ecommerce:
• Product → Variants → Inventory
• Order → Items → Products
• Customer → Orders → Items

All in one request. This reduces latency significantly compared to multiple REST calls.`
  },

  // Lesson 3: Query Arguments
  {
    title: 'Query Arguments (Filtering Data)',
    description: `You don't always want ALL products. Use arguments to filter!

Arguments are like parameters in a function. They let you:
• Get a specific product by ID
• Search for products
• Filter by category
• Paginate through thousands of SKUs`,

    challenge: 'Fetch ONLY the product with ID "1" and get its name, price, and SKU.',

    example: `{
  searchProducts(query: "laptop") {
    name
    price
  }
}`,

    starter: `{
  product(id: "1") {

  }
}`,

    validate: (data, query) => {
      return data.product &&
             data.product.name &&
             data.product.price &&
             data.product.sku &&
             query.includes('product(id:') &&
             query.includes('sku');
    },

    hint: 'Use product(id: "1") and ask for name, price, and sku fields',

    solution: `{
  product(id: "1") {
    name
    price
    sku
  }
}`,

    explanation: `Arguments are passed in parentheses: fieldName(argument: value)

For your 40k SKU migration:
• product(id: "...")  - Get one specific product
• searchProducts(query: "...")  - Search functionality
• productsByCategory(categoryId: "...")  - Filter by category

This is how you avoid loading all 40k SKUs at once!`
  },

  // Lesson 4: Multiple Queries
  {
    title: 'Multiple Queries in One Request',
    description: `GraphQL lets you ask for multiple things in a single request.

Imagine a product page that needs:
• Product details
• All categories (for navigation)
• Customer info (if logged in)

Instead of 3 REST calls, make ONE GraphQL request!`,

    challenge: 'In ONE query, fetch:\n1. All categories (just their names)\n2. The product with ID "2" (name and price)',

    example: `{
  products {
    name
  }
  categories {
    name
  }
}`,

    starter: `{
  categories {

  }
  product(id: "2") {

  }
}`,

    validate: (data, query) => {
      return data.categories &&
             data.categories.length > 0 &&
             data.categories[0].name &&
             data.product &&
             data.product.name &&
             data.product.price &&
             query.includes('categories') &&
             query.includes('product');
    },

    hint: 'Add two separate queries inside the same { }: categories and product',

    solution: `{
  categories {
    name
  }
  product(id: "2") {
    name
    price
  }
}`,

    explanation: `Multiple queries in one request = fewer network calls = faster page loads.

For ecommerce, this means:
• Product page: product + categories + recommendations
• Cart page: cart items + customer + shipping options
• Checkout: order + payment methods + addresses

All in ONE HTTP request instead of 5-10 REST calls.`
  },

  // Lesson 5: Variants and SKUs
  {
    title: 'Product Variants (The Ecommerce Challenge)',
    description: `THIS IS THE BIG ONE for your migration!

Most products have variants:
• T-shirt: Small/Blue, Medium/Red, Large/Black
• Laptop: 256GB, 512GB, 1TB
• Shoes: Size 8, 9, 10, 11

Each variant has its own:
• SKU (Stock Keeping Unit)
• Price (sometimes)
• Inventory level

With 40k SKUs, you need to handle variants efficiently!`,

    challenge: 'Fetch product with ID "3" and ALL its variants. For each variant, get:\n• name\n• sku\n• attributes (the size/color info)\n• inventory status',

    example: `{
  product(id: "1") {
    name
    variants {
      name
      sku
    }
  }
}`,

    starter: `{
  product(id: "3") {
    name
    variants {

    }
  }
}`,

    validate: (data, query) => {
      return data.product &&
             data.product.name &&
             data.product.variants &&
             data.product.variants.length > 0 &&
             data.product.variants[0].sku &&
             data.product.variants[0].attributes &&
             data.product.variants[0].inventory &&
             query.includes('variants') &&
             query.includes('attributes');
    },

    hint: 'Inside variants, ask for: name, sku, attributes (with name and value), and inventory (with inStock and quantity)',

    solution: `{
  product(id: "3") {
    name
    variants {
      name
      sku
      attributes {
        name
        value
      }
      inventory {
        inStock
        quantity
      }
    }
  }
}`,

    explanation: `Variants are the KEY to managing 40k+ SKUs!

Notice the structure:
• Product (the "parent" like "T-Shirt")
  • Variant 1 (Small/Blue) - SKU: CLO-TSHIRT-001-S-BLU
  • Variant 2 (Medium/Red) - SKU: CLO-TSHIRT-001-M-RED
  • Variant 3 (Large/Black) - SKU: CLO-TSHIRT-001-L-BLK

Each variant has:
• Its own SKU
• Attributes (size, color, material, etc.)
• Separate inventory

For your migration: you'll map legacy SKUs to variants. This query pattern is EXACTLY what you'll use in production!`
  },

  // Lesson 6: Complex Nested Query
  {
    title: 'Deep Nesting (Customer Orders)',
    description: `Let's combine everything! GraphQL really shines with complex, nested data.

A customer order involves:
• Customer info
• Order details (date, status, total)
• Order items (what they bought)
• Product details for each item
• Inventory status

In REST, this could be 5+ API calls. In GraphQL? One query.`,

    challenge: 'Fetch customer with ID "1" and get:\n• Their name and email\n• ALL their orders\n• For each order: status, total, and items\n• For each item: quantity and the product name',

    example: `{
  customer(id: "1") {
    name
    orders {
      status
    }
  }
}`,

    starter: `{
  customer(id: "1") {

  }
}`,

    validate: (data, query) => {
      return data.customer &&
             data.customer.name &&
             data.customer.email &&
             data.customer.orders &&
             data.customer.orders.length > 0 &&
             data.customer.orders[0].status &&
             data.customer.orders[0].total &&
             data.customer.orders[0].items &&
             data.customer.orders[0].items[0].quantity &&
             data.customer.orders[0].items[0].product &&
             data.customer.orders[0].items[0].product.name;
    },

    hint: 'Build it step by step: customer → orders → items → product. Each level needs { }',

    solution: `{
  customer(id: "1") {
    name
    email
    orders {
      status
      total
      items {
        quantity
        product {
          name
        }
      }
    }
  }
}`,

    explanation: `This is the power of GraphQL! One query gets:
• Customer info (1 level)
• All orders (2 levels deep)
• All items in each order (3 levels deep)
• Product details for each item (4 levels deep)

For a PM/TPO, this matters because:
• Fewer API calls = faster pages = better user experience
• Developers can get exactly what they need without begging backend to add endpoints
• Schema documents itself (try Apollo Studio/GraphiQL)

This is why companies migrate to GraphQL for complex ecommerce!`
  },

  // Lesson 7: Mutations
  {
    title: 'Mutations (Modifying Data)',
    description: `So far we've only READ data (queries). Now let's WRITE data!

Mutations are for:
• Creating orders
• Updating prices
• Adding products
• Managing inventory

Syntax is similar to queries, but uses the "mutation" keyword.`,

    challenge: 'Create a NEW order for customer "2" with:\n• One unit of product "5"\n• Two units of product "7"\n\nThen get back the order ID, total, and status.',

    example: `mutation {
  updateProductPrice(id: "1", price: 999.99) {
    id
    price
  }
}`,

    starter: `mutation {
  createOrder(
    customerId: "2"
    items: [
      { productId: "5", quantity: 1 }
      { productId: "7", quantity: 2 }
    ]
  ) {

  }
}`,

    validate: (data, query) => {
      return data.createOrder &&
             data.createOrder.id &&
             data.createOrder.total &&
             data.createOrder.status &&
             query.includes('mutation') &&
             query.includes('createOrder');
    },

    hint: 'Inside createOrder { }, ask for: id, total, status',

    solution: `mutation {
  createOrder(
    customerId: "2"
    items: [
      { productId: "5", quantity: 1 }
      { productId: "7", quantity: 2 }
    ]
  ) {
    id
    total
    status
  }
}`,

    explanation: `Mutations follow this pattern:

mutation {
  mutationName(arguments) {
    fields to return
  }
}

Important for your role:
• Mutations can return the modified data (no extra query needed!)
• Arguments use "Input Types" for complex data (like order items)
• Mutations should be atomic (all-or-nothing)

For ecommerce:
• createOrder - Creates the order AND returns confirmation
• updateInventory - Updates stock AND returns new levels
• addToCart - Adds item AND returns updated cart

This is faster than "POST then GET" in REST!`
  },

  // Lesson 8: Searching and Filtering
  {
    title: 'Search and Filter (Essential for 40k SKUs)',
    description: `With 40,000 SKUs, you CANNOT load everything at once!

You need:
• Search functionality
• Category filtering
• Pagination (coming in advanced lessons)
• Field-level filtering

Let's practice searching - critical for your migration.`,

    challenge: 'Search for products containing the word "laptop" in their name or description.\nGet: name, price, SKU, and inventory status.',

    example: `{
  productsByCategory(categoryId: "1") {
    name
    category {
      name
    }
  }
}`,

    starter: `{
  searchProducts(query: "laptop") {

  }
}`,

    validate: (data, query) => {
      return data.searchProducts &&
             data.searchProducts.length > 0 &&
             data.searchProducts[0].name &&
             data.searchProducts[0].price &&
             data.searchProducts[0].sku &&
             data.searchProducts[0].inventory &&
             query.includes('searchProducts') &&
             query.includes('inventory');
    },

    hint: 'Ask for: name, price, sku, and inventory with its fields (inStock, quantity)',

    solution: `{
  searchProducts(query: "laptop") {
    name
    price
    sku
    inventory {
      inStock
      quantity
      warehouse
    }
  }
}`,

    explanation: `Searching/filtering is CRITICAL for large catalogs.

For your 40k SKU migration, you'll need:
• searchProducts(query: "...") - Text search
• productsByCategory(categoryId: "...") - Category filter
• Later: price ranges, brands, attributes, etc.

Hot Chocolate (your C# framework) has built-in:
• Filtering ([UseFiltering])
• Sorting ([UseSorting])
• Pagination ([UsePaging])

These turn into GraphQL arguments automatically! Example:
products(where: { price: { gte: 10, lte: 100 } })

You'll work with developers to define these filters based on user needs.`
  },
];

module.exports = { lessons };
