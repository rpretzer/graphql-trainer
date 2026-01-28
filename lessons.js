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

This is powerful for performance with 40k+ SKUs - you don't load unnecessary data.`,

    learnMore: `Apollo Docs - Queries and Fields:
https://www.apollographql.com/docs/react/data/queries/

GraphQL.org - Queries and Mutations:
https://graphql.org/learn/queries/`
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

All in one request. This reduces latency significantly compared to multiple REST calls.`,

    learnMore: `Apollo Docs - Nested Queries:
https://www.apollographql.com/docs/react/data/queries/#querying-nested-objects

GraphQL.org - Nested Fields:
https://graphql.org/learn/queries/#fields`
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

This is how you avoid loading all 40k SKUs at once!`,

    learnMore: `Apollo Docs - Query Arguments:
https://www.apollographql.com/docs/react/data/queries/#providing-options

GraphQL.org - Arguments:
https://graphql.org/learn/queries/#arguments`
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

All in ONE HTTP request instead of 5-10 REST calls.`,

    learnMore: `Apollo Docs - Multiple Queries:
https://www.apollographql.com/docs/react/data/queries/#executing-multiple-queries

GraphQL.org - Multiple Root Fields:
https://graphql.org/learn/queries/#multiple-fields-in-queries`
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

For your migration: you'll map legacy SKUs to variants. This query pattern is EXACTLY what you'll use in production!`,

    learnMore: `Apollo Docs - Nested Objects and Lists:
https://www.apollographql.com/docs/react/data/queries/#nested-objects

GraphQL Best Practices - Lists and Non-Null:
https://graphql.org/learn/best-practices/#lists-and-non-null`
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

This is why companies migrate to GraphQL for complex ecommerce!`,

    learnMore: `Apollo Docs - Complex Nested Queries:
https://www.apollographql.com/docs/react/data/queries/

GraphQL.org - Query Structure:
https://graphql.org/learn/queries/#query-and-mutation-types`
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

This is faster than "POST then GET" in REST!`,

    learnMore: `Apollo Docs - Mutations:
https://www.apollographql.com/docs/react/data/mutations/

GraphQL.org - Mutations:
https://graphql.org/learn/queries/#mutations`
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

You'll work with developers to define these filters based on user needs.`,

    learnMore: `Apollo Docs - Filtering and Sorting:
https://www.apollographql.com/docs/react/data/queries/

Hot Chocolate Docs - Filtering:
https://chillicream.com/docs/hotchocolate/v13/fetching-data/filtering

Hot Chocolate Docs - Sorting:
https://chillicream.com/docs/hotchocolate/v13/fetching-data/sorting`
  },

  // Lesson 9: Aliases
  {
    title: 'Aliases (Querying Same Field Multiple Times)',
    description: `What if you need to get the same field with different arguments?

For example: Get laptops AND shoes in one query. You can't write:
{
  productsByCategory(categoryId: "1") { ... }
  productsByCategory(categoryId: "4") { ... }  ← ERROR!
}

GraphQL needs UNIQUE field names. Solution: Use aliases!`,

    challenge: 'Fetch products from category "1" (Electronics) AND category "4" (Sports).\nUse aliases "electronics" and "sports" to distinguish them.\nFor each, get: name and price.',

    example: `{
  laptop: product(id: "1") {
    name
    price
  }
  mouse: product(id: "2") {
    name
    price
  }
}`,

    starter: `{
  electronics: productsByCategory(categoryId: "1") {

  }
  sports: productsByCategory(categoryId: "4") {

  }
}`,

    validate: (data, query) => {
      return data.electronics &&
             data.sports &&
             data.electronics.length > 0 &&
             data.sports.length > 0 &&
             data.electronics[0].name &&
             data.sports[0].name &&
             query.includes('electronics:') &&
             query.includes('sports:');
    },

    hint: 'Use "aliasName: fieldName(arguments)" syntax. Ask for name and price in both.',

    solution: `{
  electronics: productsByCategory(categoryId: "1") {
    name
    price
  }
  sports: productsByCategory(categoryId: "4") {
    name
    price
  }
}`,

    explanation: `Aliases let you query the same field multiple times with different arguments.

Syntax: aliasName: fieldName(arguments)

Real-world use cases:
• Compare products: laptop vs desktop specs
• Multiple searches: "shoes" vs "boots" results
• Different filters: lowPrice vs highPrice products
• A/B testing: experimentA vs experimentB data

For 40k SKUs: Query multiple categories simultaneously for category pages!`,

    learnMore: `Apollo Docs - Aliases:
https://www.apollographql.com/docs/react/data/queries/#using-aliases

GraphQL.org - Aliases:
https://graphql.org/learn/queries/#aliases`
  },

  // Lesson 10: Fragments
  {
    title: 'Fragments (Reusable Field Sets)',
    description: `Tired of typing the same fields over and over?

Fragments are like "copy-paste" for field selections. Define a set of fields once, reuse everywhere!

Think of them as templates or shortcuts for commonly used field combinations.`,

    challenge: 'Create a fragment called "ProductBasics" with: name, price, sku.\nThen use it to fetch products from categories "1" and "2" with aliases.',

    example: `fragment ProductInfo on Product {
  name
  price
}

{
  products {
    ...ProductInfo
    category {
      name
    }
  }
}`,

    starter: `fragment ProductBasics on Product {

}

{
  electronics: productsByCategory(categoryId: "1") {

  }
  clothing: productsByCategory(categoryId: "2") {

  }
}`,

    validate: (data, query) => {
      return query.includes('fragment') &&
             query.includes('ProductBasics') &&
             query.includes('...ProductBasics') &&
             data.electronics &&
             data.clothing &&
             data.electronics[0].name &&
             data.electronics[0].price &&
             data.electronics[0].sku;
    },

    hint: 'Define "fragment ProductBasics on Product { name price sku }" then use "...ProductBasics" in both queries.',

    solution: `fragment ProductBasics on Product {
  name
  price
  sku
}

{
  electronics: productsByCategory(categoryId: "1") {
    ...ProductBasics
  }
  clothing: productsByCategory(categoryId: "2") {
    ...ProductBasics
  }
}`,

    explanation: `Fragments are reusable field sets. Syntax:

fragment FragmentName on TypeName {
  field1
  field2
}

Then use with: ...FragmentName

Benefits:
• DRY (Don't Repeat Yourself) - define once, use everywhere
• Consistency - same fields across all uses
• Maintainability - update one place, changes everywhere
• Performance - GraphQL optimizes fragment usage

For ecommerce: Define fragments for product cards, order summaries, customer info!`,

    learnMore: `Apollo Docs - Fragments:
https://www.apollographql.com/docs/react/data/fragments/

GraphQL.org - Fragments:
https://graphql.org/learn/queries/#fragments`
  },

  // Lesson 11: Variables
  {
    title: 'Variables (Dynamic Queries)',
    description: `Hard-coding values like "1" or "laptop" in queries isn't practical.

In real apps, you need DYNAMIC queries based on:
• User input (search terms)
• URL parameters (product IDs)
• App state (filters, sorting)

Variables let you parameterize queries like function parameters!`,

    challenge: 'Write a query with a variable called $productId.\nUse it to fetch a product and get: name, price, and category name.',

    example: `query GetProduct($id: ID!) {
  product(id: $id) {
    name
    price
  }
}

// Variables (sent separately):
{
  "id": "1"
}`,

    starter: `query GetProduct($productId: ID!) {
  product(id: $productId) {

  }
}`,

    validate: (data, query) => {
      return query.includes('$productId') &&
             query.includes('ID!') &&
             data.product &&
             data.product.name &&
             data.product.price &&
             data.product.category;
    },

    hint: 'Inside product query, ask for: name, price, and category { name }',

    solution: `query GetProduct($productId: ID!) {
  product(id: $productId) {
    name
    price
    category {
      name
    }
  }
}

// To use: pass variables separately:
// { "productId": "1" }`,

    explanation: `Variables parameterize queries. Syntax:

query QueryName($varName: Type!) {
  field(argument: $varName) {
    ...
  }
}

Types:
• ID! - Required ID
• String - Optional string
• Int! - Required integer
• [String!]! - Required array of required strings

Why use variables?
• Security - prevent injection attacks
• Caching - same query, different variables = cache-friendly
• Reusability - one query, many values
• Type safety - GraphQL validates variable types

In production: ALL user input should use variables, never string interpolation!`,

    learnMore: `Apollo Docs - Variables:
https://www.apollographql.com/docs/react/data/queries/#using-variables

GraphQL.org - Variables:
https://graphql.org/learn/queries/#variables`
  },

  // Lesson 12: Directives
  {
    title: 'Directives (Conditional Fields)',
    description: `Sometimes you want fields ONLY in certain conditions.

Examples:
• Show prices only if user is logged in
• Include detailed data only on detail pages
• Fetch extra fields only for premium users

Directives: @include and @skip let you conditionally include fields!`,

    challenge: 'Fetch all products with name and price.\nUse @include directive with a $showDetails variable to conditionally include description and images.',

    example: `query Products($showSKU: Boolean!) {
  products {
    name
    price
    sku @include(if: $showSKU)
  }
}

// Variables:
{ "showSKU": true }`,

    starter: `query Products($showDetails: Boolean!) {
  products {
    name
    price

  }
}`,

    validate: (data, query) => {
      return query.includes('@include') &&
             query.includes('$showDetails') &&
             query.includes('Boolean!') &&
             data.products &&
             data.products[0].name &&
             data.products[0].price;
    },

    hint: 'Add "description @include(if: $showDetails)" and "images @include(if: $showDetails)"',

    solution: `query Products($showDetails: Boolean!) {
  products {
    name
    price
    description @include(if: $showDetails)
    images @include(if: $showDetails)
  }
}

// Variables:
// { "showDetails": true }`,

    explanation: `Directives modify query execution:

@include(if: $variable) - Include field if true
@skip(if: $variable) - Skip field if true

Use cases:
• Mobile vs Desktop - fewer fields on mobile
• List vs Detail - basic info in lists, full data in detail view
• Permissions - admin fields only for admins
• Performance - skip expensive fields when not needed

For 40k SKUs:
• Skip variants on list pages (performance!)
• Include full data only on product detail pages
• Conditional inventory checks based on user location

This optimizes query performance and reduces over-fetching!`,

    learnMore: `Apollo Docs - Directives:
https://www.apollographql.com/docs/react/data/directives/

GraphQL.org - Directives:
https://graphql.org/learn/queries/#directives`
  },

  // Lesson 13: Inline Fragments and Interfaces
  {
    title: 'Inline Fragments (Handling Different Types)',
    description: `Sometimes a field can return DIFFERENT types.

Example: A search result might return:
• Products
• Categories
• Blog posts

Each type has different fields. How do you query them?

Inline fragments let you query type-specific fields!`,

    challenge: 'This is an advanced concept. For now, fetch products and use an inline fragment to get category-specific fields.\nGet: id, name, and if it has a category, get the category\'s products count.',

    example: `{
  products {
    id
    name
    ... on Product {
      price
      sku
    }
  }
}`,

    starter: `{
  products {
    id
    name
    category {
      id
      name
    }
  }
}`,

    validate: (data, query) => {
      return data.products &&
             data.products[0].id &&
             data.products[0].name &&
             data.products[0].category;
    },

    hint: 'Just fetch products with: id, name, and category { id name }. The inline fragment concept is shown in the explanation.',

    solution: `{
  products {
    id
    name
    category {
      id
      name
    }
  }
}`,

    explanation: `Inline fragments query type-specific fields:

... on TypeName {
  typeSpecificField
}

Real-world example - Search results:
{
  search(query: "laptop") {
    ... on Product {
      price
      sku
    }
    ... on Category {
      productCount
    }
    ... on BlogPost {
      author
      publishDate
    }
  }
}

Why this matters:
• Polymorphic data - different types, one query
• Interfaces - shared fields across types
• Unions - combine unrelated types

For ecommerce: Search results, recommendation engines, content feeds!`,

    learnMore: `Apollo Docs - Inline Fragments:
https://www.apollographql.com/docs/react/data/fragments/#inline-fragments

GraphQL.org - Inline Fragments:
https://graphql.org/learn/queries/#inline-fragments

GraphQL.org - Interfaces:
https://graphql.org/learn/schema/#interfaces`
  },

  // Lesson 14: Pagination Basics
  {
    title: 'Pagination (Handling Large Data Sets)',
    description: `You CANNOT load 40,000 SKUs at once! Your app will crash.

Pagination loads data in chunks:
• Page 1: Products 1-20
• Page 2: Products 21-40
• etc.

Two common patterns:
1. Offset-based: page=1, page=2 (like traditional pagination)
2. Cursor-based: after="cursor" (more robust)

Let's start with the basics!`,

    challenge: 'Fetch only the FIRST 3 products.\nGet: id, name, and price.',

    example: `{
  products {
    name
    price
  }
}

// In real apps with pagination support:
// products(first: 10, after: "cursor") { ... }`,

    starter: `{
  products {

  }
}`,

    validate: (data, query) => {
      return data.products &&
             data.products.length > 0 &&
             data.products[0].id &&
             data.products[0].name &&
             data.products[0].price;
    },

    hint: 'For this exercise, just fetch products with id, name, and price. Actual pagination requires server support.',

    solution: `{
  products {
    id
    name
    price
  }
}

// Note: True pagination requires server-side support.
// Hot Chocolate example:
// products(first: 20) { ... }
// products(first: 20, after: "cursor") { ... }`,

    explanation: `Pagination is CRITICAL for large datasets!

Common patterns:

1. Limit/Offset (simpler):
products(limit: 20, offset: 40)

2. Cursor-based (better):
products(first: 20, after: "cursor")

Hot Chocolate (your framework) uses cursor-based:
• first/last: number of items
• after/before: cursor for position
• Automatic cursor generation
• Built-in with [UsePaging]

For 40k SKUs:
• Load 20-50 items per page
• Use cursors for infinite scroll
• Show total count sparingly (expensive!)
• Consider search/filtering before pagination

Cursor pagination prevents:
• Duplicate items
• Missing items
• Works with real-time data changes`,

    learnMore: `Apollo Docs - Pagination:
https://www.apollographql.com/docs/react/pagination/overview/

GraphQL.org - Pagination Best Practices:
https://graphql.org/learn/pagination/

Hot Chocolate Docs - Pagination:
https://chillicream.com/docs/hotchocolate/v13/fetching-data/pagination`
  },

  // Lesson 15: Best Practices and Next Steps
  {
    title: 'Best Practices and Performance',
    description: `You've learned the fundamentals! Now let's talk about production-ready GraphQL.

Key concepts for your 40k SKU migration:
• N+1 Query Problem
• DataLoader pattern
• Query cost analysis
• Schema design principles
• Error handling

Let's practice a real-world scenario!`,

    challenge: 'Fetch the first 5 products with their category names and inventory status.\nThis demonstrates a query that could have N+1 issues if not optimized with DataLoader!',

    example: `{
  products {
    name
    price
    category {
      name
    }
    inventory {
      inStock
      quantity
    }
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
             data.products[0].category &&
             data.products[0].inventory &&
             query.includes('category') &&
             query.includes('inventory');
    },

    hint: 'Ask for: name, price, category { name }, inventory { inStock quantity }',

    solution: `{
  products {
    name
    price
    category {
      name
    }
    inventory {
      inStock
      quantity
    }
  }
}`,

    explanation: `🎓 CONGRATULATIONS! You've completed the GraphQL Trainer!

KEY TAKEAWAYS:

1. N+1 Problem:
Without DataLoader, this query makes:
• 1 query for products
• N queries for each product's category
• N queries for each product's inventory
Total: 1 + 2N queries!

With DataLoader: 1 + 2 queries (batched!)

2. Schema Design:
• Think in graphs, not tables
• Nullable vs Non-null carefully
• Pagination from day one
• Versioning through evolution, not breaking changes

3. Performance:
• Use fragments to avoid over-fetching
• Implement query depth limits
• Add query cost analysis
• Monitor slow queries

4. For Your Migration:
• Map legacy SKUs to GraphQL variants
• Design schema with growth in mind
• Use Hot Chocolate's built-in features ([UseFiltering], [UsePaging])
• Test with realistic data volumes
• Plan for eventual consistency

YOU'RE READY! As a TPO/PM, you can now:
✓ Review GraphQL PRs
✓ Make schema design decisions
✓ Understand performance trade-offs
✓ Communicate with dev team effectively
✓ Rock your interview!`,

    learnMore: `Apollo Docs - Performance Best Practices:
https://www.apollographql.com/docs/apollo-server/performance/apq/

GraphQL Best Practices:
https://graphql.org/learn/best-practices/

Hot Chocolate - Performance:
https://chillicream.com/docs/hotchocolate/v13/performance/

DataLoader Pattern:
https://github.com/graphql/dataloader

GraphQL Schema Design:
https://www.apollographql.com/docs/apollo-server/schema/schema/

Continue Learning:
• Apollo GraphQL Tutorials: https://www.apollographql.com/tutorials/
• GraphQL Official Docs: https://graphql.org/learn/
• Hot Chocolate Documentation: https://chillicream.com/docs/hotchocolate/
• How to GraphQL: https://www.howtographql.com/`
  },
];

module.exports = { lessons };
