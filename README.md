# GraphQL Ecommerce Trainer 🚀

An interactive CLI tool to learn GraphQL hands-on with real ecommerce scenarios. Perfect for Technical Product Owners, Project Managers, and developers preparing for GraphQL migrations.

## 🎯 What You'll Learn

- **GraphQL Basics**: Queries, fields, and arguments
- **Nested Data**: Fetching related data in one request
- **Ecommerce Patterns**: Products, variants, SKUs, inventory
- **Complex Queries**: Multi-level nesting, customer orders
- **Mutations**: Creating and modifying data
- **Search & Filtering**: Essential for large catalogs (40k+ SKUs)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- git
- Basic understanding of APIs (REST knowledge helpful but not required)

## 🚀 Quick Start

### Option 1: One-Line Install (Recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/rpretzer/graphql-trainer/main/install.sh | bash
```

This will clone the repo to `~/graphql-trainer`, install dependencies, and you're ready to go!

### Option 2: Manual Install

```bash
# Clone the repository
git clone https://github.com/rpretzer/graphql-trainer.git
cd graphql-trainer

# Install dependencies
npm install

# Start the trainer
npm start
```

### Option 3: Custom Install Directory

```bash
# Download and run install script with custom directory
curl -fsSL https://raw.githubusercontent.com/rpretzer/graphql-trainer/main/install.sh | bash -s /path/to/your/directory
```

## 🎮 How It Works

1. **Interactive Lessons**: Progressive lessons that build on each other
2. **Hands-On Challenges**: Write real GraphQL queries to solve problems
3. **Inline Editing**: Write queries directly in the terminal - no external editor needed!
4. **Instant Feedback**: Get immediate validation and hints
5. **Playground Mode**: Experiment freely with the GraphQL server
6. **Real Schema**: Practice with a realistic ecommerce schema

### Writing Queries

- Type your query line by line in the terminal
- Press **Enter on an empty line** to submit
- Your query stays visible with the lesson context
- No switching to external editors!

## 📚 Lessons Overview

1. **Your First GraphQL Query** - Learn the basics of querying
2. **Nested Fields** - Fetch related data in one request
3. **Query Arguments** - Filter and search for specific data
4. **Multiple Queries** - Combine multiple requests
5. **Product Variants** - Handle SKUs and variants (critical for ecommerce!)
6. **Deep Nesting** - Complex queries with customer orders
7. **Mutations** - Create and modify data
8. **Search & Filtering** - Essential for large catalogs

## 🏪 Ecommerce Schema

The trainer includes a realistic ecommerce schema with:

- **Products**: Name, price, SKU, description, images
- **Variants**: Product variations (size, color, storage, etc.)
- **Categories**: Product organization
- **Inventory**: Stock levels, warehouse locations
- **Customers**: User accounts
- **Orders**: Purchase history with line items

## 🎯 Perfect For

- **Technical Product Owners/PMs** preparing for GraphQL migrations
- **Developers** new to GraphQL
- **Anyone** working on ecommerce platforms
- **Interview Prep** for GraphQL-based companies (Hot Chocolate, Apollo, etc.)

## 💡 Pro Tips

1. **Use the Playground**: Test queries freely before lessons
2. **Read Error Messages**: GraphQL gives helpful error messages
3. **Start Simple**: Master basics before complex queries
4. **Think in Fields**: Only ask for what you need
5. **Browser Access**: Open http://localhost:4000 in your browser for GraphQL Playground

## 🔥 Hot Chocolate Connection

If you're preparing for a role using Hot Chocolate (.NET/C#):
- GraphQL concepts are 100% the same
- Query syntax is identical
- This trainer teaches universal GraphQL knowledge
- Hot Chocolate specifics (decorators, filters) come after you understand core GraphQL

## 📖 Additional Resources

- [GraphQL Official Docs](https://graphql.org/learn/)
- [Hot Chocolate Documentation](https://chillicream.com/docs/hotchocolate)
- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server/)

## 🐛 Troubleshooting

**Port Already in Use?**
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill -9
```

**Dependencies Error?**
```bash
npm install
```

## 🎓 After This Trainer

Once you complete these lessons, you'll be ready to:
- Review GraphQL PRs confidently
- Make informed schema design decisions
- Understand performance implications (N+1 queries, batching)
- Discuss technical trade-offs with your dev team
- Prep for Technical Product Owner interviews

## 📝 License

ISC

---

**Ready to learn GraphQL?** Run `npm start` to begin! 🚀
