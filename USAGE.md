# Usage Guide

## Starting the Trainer

```bash
npm start
```

## Writing Queries

The trainer now supports **inline query editing**! No external editors needed.

### How it works:

1. When prompted for a query, type directly in your terminal
2. Type each line of your GraphQL query
3. Press **Enter on an empty line** to submit

### Example:

```
✏️  Write your GraphQL query below:
(Press Enter on an empty line to submit)

Example/Starter:
  {
    products {

    }
  }

Type your query (or copy/paste):
› {
› products {
› name
› price
› }
› }
› ← Press Enter here to submit
```

**Note**: The starter is shown as a reference. Type your actual query, then press Enter on an empty line to submit.

## Tips

- **See your query as you type** - it stays visible with the lesson
- **Keep context** - lesson description and challenges remain on screen
- **Easy editing** - just type naturally, line by line
- **Multi-line friendly** - GraphQL's natural structure works perfectly
- **Copy/Paste support** - You can paste multi-line queries from examples or documentation
- **Starter templates** - Each lesson shows an example to guide you

## Navigation

- Use arrow keys to select menu options
- Type queries line by line
- Press Enter on empty line to submit queries
- Follow the prompts for hints and solutions

## Keyboard Shortcuts

- **Ctrl+C** - Exit the trainer at any time
- **Enter (empty line)** - Submit your query
- **Arrow keys** - Navigate menus

## Example Session

```
📚 Lesson 1: Your First GraphQL Query

Challenge: Fetch ALL products, but only their names and prices.

✏️  Write your GraphQL query below:
(Press Enter on an empty line to submit)

  {
    products {
      name
      price
    }
  }
  ← Press Enter

✅ Perfect! You got it!
```

Enjoy learning GraphQL! 🚀
