#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const main = async () => {
    console.log(chalk.blue("Welcome to the Nex API Project CLI!"));

    // Project inquiry
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "projectName",
            message: "Enter your new project name:",
            validate: (input) => input ? true : "Project name cannot be empty"
        }
    ]);

    const { projectName } = answers;

    console.log(chalk.green(`Creating project: ${projectName}`));

    // Clone template repo
    const repoURL = "https://github.com/dBillionaire-Dev/express-mongo-api-starter.git";
    try {
        await execAsync(`git clone ${repoURL} ${projectName}`);
        console.log(chalk.green("API template created successfully!"));
    } catch (err) {
        console.error(chalk.red("Error creating template:"), err);
        process.exit(1);
    }

    // Remove .git
    await execAsync(`rm -rf ${projectName}/.git`);

    // Install dependencies
    try {
        console.log(chalk.blue("Installing dependencies..."));
        await execAsync(`cd ${projectName} && npm install`);
        console.log(chalk.green("Dependencies installed!"));
    } catch (err) {
        console.error(chalk.red("Error installing dependencies:"), err);
        process.exit(1);
    }

    console.log(chalk.yellow(`All done! Your project ${projectName} is ready.`));
    console.log(`\nNext steps:\n`);
    console.log(`\t${chalk.green.bold("cd")} ${projectName}`);
    console.log(`\t${chalk.green.bold("npm run dev")}\n`);

    console.log(chalk.gray(`(Happy coding!`));
};

main();