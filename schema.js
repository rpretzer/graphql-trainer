const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    category: Category
    variants: [ProductVariant!]!
    inventory: Inventory
    images: [String!]!
    sku: String!
  }

  type ProductVariant {
    id: ID!
    productId: ID!
    name: String!
    sku: String!
    price: Float!
    attributes: [VariantAttribute!]!
    inventory: Inventory
  }

  type VariantAttribute {
    name: String!
    value: String!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }

  type Inventory {
    inStock: Boolean!
    quantity: Int!
    warehouse: String
  }

  type Customer {
    id: ID!
    email: String!
    name: String!
    orders: [Order!]!
  }

  type Order {
    id: ID!
    customerId: ID!
    items: [OrderItem!]!
    total: Float!
    status: OrderStatus!
    createdAt: String!
  }

  type OrderItem {
    productId: ID!
    product: Product
    quantity: Int!
    price: Float!
  }

  enum OrderStatus {
    PENDING
    PROCESSING
    SHIPPED
    DELIVERED
    CANCELLED
  }

  type Query {
    # Get all products
    products: [Product!]!

    # Get a single product by ID
    product(id: ID!): Product

    # Search products by name
    searchProducts(query: String!): [Product!]!

    # Get products by category
    productsByCategory(categoryId: ID!): [Product!]!

    # Get all categories
    categories: [Category!]!

    # Get a single category
    category(id: ID!): Category

    # Get customer by ID
    customer(id: ID!): Customer

    # Get order by ID
    order(id: ID!): Order
  }

  type Mutation {
    # Add a new product
    addProduct(
      name: String!
      description: String
      price: Float!
      categoryId: ID!
      sku: String!
    ): Product!

    # Update product price
    updateProductPrice(id: ID!, price: Float!): Product!

    # Create an order
    createOrder(
      customerId: ID!
      items: [OrderItemInput!]!
    ): Order!
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }
`;

module.exports = { typeDefs };
