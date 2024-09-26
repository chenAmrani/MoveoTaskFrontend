
# Live Code With Tom

This project is a real-time collaborative coding platform designed for a JavaScript lecturer and students to write, highlight, and test code blocks together in real-time.

## Features

- **Real-time collaboration** using `socket.io-client`.
- **Syntax highlighting** using `react-syntax-highlighter` and `highlight.js`.
- **Responsive design** with `bootstrap` and `react-bootstrap`.
- **Code preview and linting** using `eslint`.
  
## Prerequisites

Before you begin, ensure you have installed:

- Node.js (>= 14.x)
- npm (comes with Node.js) or Yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository.git
   ```

2. Navigate to the project directory:

   ```bash
   cd client
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Running the Project

### Development Mode

To start the project in development mode with Vite:

```bash
npm run dev
```

This will launch the app locally, and you can view it in your browser at `http://localhost:3000`.

### Production Mode

To build the project for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

- `src/`: Contains the source code of the project.
- `public/`: Contains static files like `index.html`.
- `tsconfig.json`: Configuration for TypeScript compilation.
- `.eslintrc.cjs`: Linting rules for the project.

## Technologies Used

- **React** for building the user interface.
- **Vite** as the development environment and bundler.
- **TypeScript** for static type checking.
- **Socket.io-client** for real-time communication.
- **Bootstrap/React-Bootstrap** for responsive UI components.
- **React-Syntax-Highlighter** and **highlight.js** for syntax highlighting in code blocks.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build.
- `npm run lint`: Runs ESLint for linting TypeScript and JavaScript files.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
