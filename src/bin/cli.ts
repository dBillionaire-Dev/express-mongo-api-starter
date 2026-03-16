#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";

const execAsync = promisify(exec);

const main = async () => {
    console.log(chalk.blue("Welcome to the NexDev API Project CLI!"));

    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "projectName",
            message: "Enter your new project name:",
            validate: (input) => /^[a-zA-Z0-9-_]+$/.test(input) || "Use only letters, numbers, - and _",
        }
    ]);

    const projectName = answers.projectName.trim();

    console.log(chalk.green(`Creating project: ${projectName}`));

    const repoURL = "https://github.com/dBillionaire-Dev/express-mongo-api";
    try {
        await execAsync(`git clone --depth=1 ${repoURL} ${projectName}`);
        console.log(chalk.green("API template created successfully!"));
    } catch (err) {
        console.error(chalk.red("Error creating template:"), err);
        process.exit(1);
    }

    try {
        await fs.rm(`${projectName}/.git`, { recursive: true, force: true });
    } catch (err) {
        console.error(chalk.red("Failed to remove git history"), err);
    }

    try {
        console.log(chalk.blue("Installing dependencies..."));
        await execAsync(`npm install`, { cwd: projectName });
        console.log(chalk.green("Dependencies installed!"));
    } catch (err) {
        console.error(chalk.red("Error installing dependencies:"), err);
        process.exit(1);
    }

    console.log(chalk.yellow(`All done! Your project ${projectName} is ready.`));
    console.log(`\nNext steps:\n`);
    console.log(`\t${chalk.green.bold("cd")} ${projectName}`);
    console.log(`\t${chalk.green.bold("npm run dev")}\n`);

    console.log(chalk.gray("(Happy coding!)"));
};

main();