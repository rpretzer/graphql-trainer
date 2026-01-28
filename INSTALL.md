# GraphQL Trainer - Installation Guide

## Quick Install (Copy & Paste)

### For most users:
```bash
curl -fsSL https://raw.githubusercontent.com/rpretzer/graphql-trainer/main/install.sh | bash
cd ~/graphql-trainer
npm start
```

That's it! 🚀

---

## Manual Installation

### Step 1: Clone
```bash
git clone https://github.com/rpretzer/graphql-trainer.git
cd graphql-trainer
```

### Step 2: Install
```bash
npm install
```

### Step 3: Run
```bash
npm start
```

---

## What You Get

✅ Interactive CLI GraphQL trainer
✅ 8 progressive lessons
✅ Real GraphQL server with ecommerce data
✅ Inline query editing (no external editor)
✅ Instant feedback and hints
✅ Playground mode for experimentation

---

## Requirements

- **Node.js** v14+ ([download](https://nodejs.org/))
- **npm** (included with Node.js)
- **git** ([download](https://git-scm.com/))

Check if you have them:
```bash
node --version
npm --version
git --version
```

---

## Troubleshooting

### "command not found: node"
Install Node.js from https://nodejs.org/

### "command not found: git"
Install git from https://git-scm.com/

### Port 4000 already in use
```bash
lsof -ti:4000 | xargs kill -9
```

---

## Repository

GitHub: https://github.com/rpretzer/graphql-trainer

---

## Share This

**Quick install command:**
```bash
curl -fsSL https://raw.githubusercontent.com/rpretzer/graphql-trainer/main/install.sh | bash
```

**Share the repo:**
https://github.com/rpretzer/graphql-trainer

---

Happy learning! 🎓
