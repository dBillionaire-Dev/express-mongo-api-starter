# create-express-mongo-api

A CLI tool that quickly scaffolds a **Node.js + Express + MongoDB + TypeScript API starter project**.

This tool clones a production-ready backend template and installs all dependencies automatically so you can start building immediately.

---

## Features

* Express.js REST API structure
* MongoDB with Mongoose
* TypeScript support
* Authentication boilerplate
* Error handling middleware
* Organized folder structure
* Ready-to-run development setup
* Clean scalable architecture

---

## Installation

You do not need to install the CLI globally.

Run directly using **npx**:

```
npx create-express-mongo-api my-app
```

This will:

1. Clone the API starter template
2. Remove the template git history
3. Install dependencies
4. Prepare the project for development

---

## Usage

Run the CLI:

```
npx create-express-mongo-api
```

Example:

```
npx create-express-mongo-api 
```

You will get the prompt asking "Enter your new project name:"
Type in your desired project name. Example:

```
Enter your new project name: my-api
```

---

## After Project Creation

Navigate into the project folder:

```
cd my-api
```

Start the development server:

```
npm run dev
```

---

## Project Structure

```
src
 ├── bin
 │   └── cli.ts
 │
 ├── controllers
 │   ├── auth.controller.ts
 │   └── user.controller.ts
 │
 ├── controllers
 │   ├── auth.controller.ts
 │   └── user.controller.ts
 │
 ├── middlewares
 │   ├── auth.middleware.ts
 │   └── error.middleware.ts
 │
 ├── models
 │   └── user.model.ts
 │
 ├── routes
 │   ├── auth.route.ts
 │   └── user.route.ts
 │
 ├── utils
 │   ├── api.response.ts
 │   ├── jwt.ts
 │   └── password.hash.ts
 │
 └── index.ts
```

---

## Environment Variables

Create a `.env` file using the provided example:

```
cp .env.example .env
```

Then configure your environment variables.

---

## Development

Start development mode:

```
npm run dev
```

Build the project:

```
npm run build
```

Run production build:

```
npm start
```

---

## Requirements

* Node.js 18+
* npm
* Git

---

## Technologies Used

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication

---

## Contributing

Contributions are welcome. Feel free to open issues or submit pull requests.

---

## License

MIT License

---

## Author

Developed by **NexDev**
