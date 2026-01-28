#!/usr/bin/env node
const inquirer = require('inquirer');
const chalk = require('chalk');
const readline = require('readline');
const { startServer } = require('./server');
const { lessons } = require('./lessons');

let currentLesson = 0;
let serverUrl = '';

// Helper function for multi-line input
async function getMultilineInput(starter = '') {
  return new Promise((resolve) => {
    const lines = [];

    console.log(chalk.cyan('\n✏️  Write your GraphQL query below:'));
    console.log(chalk.gray('(Press Enter on an empty line to submit)\n'));

    // Show starter if provided as a reference
    if (starter) {
      console.log(chalk.gray('Example/Starter:'));
      starter.split('\n').forEach(line => console.log(chalk.gray('  ' + line)));
      console.log('');
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.yellow('› ')
    });

    console.log(chalk.yellow('Type your query (or copy/paste):'));
    rl.prompt();

    rl.on('line', (line) => {
      if (line.trim() === '' && lines.length > 0) {
        // Empty line submitted with content - finish
        rl.close();
        resolve(lines.join('\n'));
      } else if (line.trim() !== '') {
        lines.push(line);
        rl.prompt();
      } else {
        // Empty line with no content yet - just continue
        rl.prompt();
      }
    });

    rl.on('close', () => {
      if (lines.length === 0) {
        // User closed without typing anything - use starter if available
        resolve(starter || '');
      }
    });
  });
}

async function main() {
  console.clear();
  console.log(chalk.bold.cyan('\n🚀 GraphQL Ecommerce Trainer\n'));
  console.log(chalk.gray('Learn GraphQL hands-on with real ecommerce scenarios\n'));

  // Start GraphQL server
  console.log(chalk.yellow('Starting GraphQL server...'));
  serverUrl = await startServer();
  console.log(chalk.green(`✓ Server running at ${serverUrl}\n`));

  await showMenu();
}

async function showMenu() {
  const choices = [
    { name: `📚 Start Learning (Lesson ${currentLesson + 1}/${lessons.length})`, value: 'learn' },
    { name: '📖 View All Lessons', value: 'list' },
    { name: '🎮 Playground Mode (Free Exploration)', value: 'playground' },
    { name: '❓ About GraphQL', value: 'about' },
    { name: '🚪 Exit', value: 'exit' }
  ];

  const { action } = await inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices
  }]);

  switch (action) {
    case 'learn':
      await startLesson();
      break;
    case 'list':
      await listLessons();
      break;
    case 'playground':
      await playground();
      break;
    case 'about':
      await showAbout();
      break;
    case 'exit':
      console.log(chalk.cyan('\n👋 Happy GraphQL learning!\n'));
      process.exit(0);
  }
}

async function startLesson() {
  if (currentLesson >= lessons.length) {
    console.log(chalk.green('\n🎉 Congratulations! You\'ve completed all lessons!\n'));
    currentLesson = 0; // Reset for replay
    await pressEnterToContinue();
    await showMenu();
    return;
  }

  const lesson = lessons[currentLesson];
  console.clear();
  console.log(chalk.bold.cyan(`\n📚 Lesson ${currentLesson + 1}: ${lesson.title}\n`));
  console.log(chalk.white(lesson.description));
  console.log('\n' + chalk.gray('─'.repeat(60)) + '\n');

  // Show example if provided
  if (lesson.example) {
    console.log(chalk.yellow('Example:'));
    console.log(chalk.gray(lesson.example));
    console.log('\n' + chalk.gray('─'.repeat(60)) + '\n');
  }

  // Show the challenge
  console.log(chalk.bold('Challenge:'));
  console.log(chalk.white(lesson.challenge));
  console.log('\n' + chalk.gray('Server URL: ') + chalk.cyan(serverUrl));
  console.log(chalk.gray('You can test your queries at: ') + chalk.cyan(serverUrl) + '\n');

  const query = await getMultilineInput(lesson.starter || '');

  await validateQuery(query, lesson);
}

async function validateQuery(query, lesson) {
  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const result = await response.json();

    if (result.errors) {
      console.log(chalk.red('\n❌ Query Error:\n'));
      result.errors.forEach(err => {
        console.log(chalk.red(`  ${err.message}`));
      });
      await retryOrContinue(query, lesson);
      return;
    }

    // Check if solution meets criteria
    const isCorrect = lesson.validate(result.data, query);

    if (isCorrect) {
      console.log(chalk.green('\n✅ Perfect! You got it!\n'));
      console.log(chalk.gray('Result:'));
      console.log(chalk.white(JSON.stringify(result.data, null, 2)));

      if (lesson.explanation) {
        console.log('\n' + chalk.yellow('💡 Key Concept:'));
        console.log(chalk.white(lesson.explanation));
      }

      currentLesson++;
      await pressEnterToContinue();
      await showMenu();
    } else {
      console.log(chalk.yellow('\n⚠️  Not quite right.\n'));
      console.log(chalk.white(lesson.hint));
      console.log(chalk.gray('\nYour result:'));
      console.log(chalk.white(JSON.stringify(result.data, null, 2)));
      await retryOrContinue(query, lesson);
    }
  } catch (error) {
    console.log(chalk.red('\n❌ Error: ') + error.message);
    await retryOrContinue(query, lesson);
  }
}

async function retryOrContinue(previousQuery, lesson) {
  const { action } = await inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      { name: '🔄 Try Again', value: 'retry' },
      { name: '💡 Show Solution', value: 'solution' },
      { name: '⏭️  Skip to Next Lesson', value: 'skip' },
      { name: '🏠 Back to Menu', value: 'menu' }
    ]
  }]);

  switch (action) {
    case 'retry':
      const query = await getMultilineInput(previousQuery);
      await validateQuery(query, lesson);
      break;
    case 'solution':
      console.log(chalk.cyan('\n📝 Solution:\n'));
      console.log(chalk.white(lesson.solution));
      console.log('\n' + chalk.yellow('💡 Explanation:'));
      console.log(chalk.white(lesson.explanation));
      currentLesson++;
      await pressEnterToContinue();
      await showMenu();
      break;
    case 'skip':
      currentLesson++;
      await showMenu();
      break;
    case 'menu':
      await showMenu();
      break;
  }
}

async function listLessons() {
  console.clear();
  console.log(chalk.bold.cyan('\n📖 All Lessons\n'));

  lessons.forEach((lesson, index) => {
    const status = index < currentLesson ? chalk.green('✓') :
                   index === currentLesson ? chalk.yellow('→') : chalk.gray('○');
    console.log(`${status} ${chalk.white(`Lesson ${index + 1}: ${lesson.title}`)}`);
    console.log(chalk.gray(`   ${lesson.description.substring(0, 80)}...`));
    console.log();
  });

  await pressEnterToContinue();
  await showMenu();
}

async function playground() {
  console.clear();
  console.log(chalk.bold.cyan('\n🎮 Playground Mode\n'));
  console.log(chalk.white('Free exploration! Try any GraphQL query you want.\n'));
  console.log(chalk.gray('Server URL: ') + chalk.cyan(serverUrl));
  console.log(chalk.gray('Tip: You can also test queries at ') + chalk.cyan(serverUrl) + '\n');

  const query = await getMultilineInput('{\n  products {\n    id\n    name\n    price\n  }\n}');

  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const result = await response.json();

    if (result.errors) {
      console.log(chalk.red('\n❌ Query Error:\n'));
      result.errors.forEach(err => {
        console.log(chalk.red(`  ${err.message}`));
      });
    } else {
      console.log(chalk.green('\n✅ Success!\n'));
      console.log(chalk.white(JSON.stringify(result.data, null, 2)));
    }
  } catch (error) {
    console.log(chalk.red('\n❌ Error: ') + error.message);
  }

  const { again } = await inquirer.prompt([{
    type: 'confirm',
    name: 'again',
    message: 'Try another query?',
    default: true
  }]);

  if (again) {
    await playground();
  } else {
    await showMenu();
  }
}

async function showAbout() {
  console.clear();
  console.log(chalk.bold.cyan('\n❓ About GraphQL\n'));
  console.log(chalk.white('GraphQL is a query language for APIs that gives clients the power to ask'));
  console.log(chalk.white('for exactly what they need and nothing more.\n'));

  console.log(chalk.yellow('Key Concepts:\n'));
  console.log(chalk.white('• Query: Read data (like GET in REST)'));
  console.log(chalk.white('• Mutation: Modify data (like POST/PUT/DELETE in REST)'));
  console.log(chalk.white('• Schema: Defines the types and operations available'));
  console.log(chalk.white('• Fields: The specific data you want to retrieve'));
  console.log(chalk.white('• Arguments: Parameters to filter or modify requests\n'));

  console.log(chalk.yellow('Why GraphQL for Ecommerce?\n'));
  console.log(chalk.white('• Fetch products with variants and SKUs in one request'));
  console.log(chalk.white('• Avoid over-fetching (only get the fields you need)'));
  console.log(chalk.white('• Strong typing prevents errors'));
  console.log(chalk.white('• Perfect for complex data like 40k+ SKUs\n'));

  await pressEnterToContinue();
  await showMenu();
}

async function pressEnterToContinue() {
  await inquirer.prompt([{
    type: 'input',
    name: 'continue',
    message: 'Press Enter to continue...'
  }]);
}

// Start the trainer
main().catch(console.error);
