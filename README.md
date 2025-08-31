# BLOSSOM TECHNICAL TEST

This project is the deliverable for the **Frontend Developer** technical test at Blossom.

## Technologies

- **Frontend:** React, TailwindCSS, React Router, react-responsive, Zustand
- **Data / GraphQL:** GraphQL, Apollo Client
- **Development & Testing:** TypeScript, React Testing Library, GraphQL Codegen, Vitest, ESLint, Mock Service Worker (MSW)

## Installation

1. Clone the repository:

```bash
  git clone https://github.com/santiagosagu/blossom-technical-test.git
```

2. Install dependencies:

```bash
  npm install
```

3. Start the application:

```bash
  npm run dev
```

## Configuration

No additional configuration or .env setup is required to simplify the project review process.

## Usage / Features

The project implements the requirements outlined in the provided guide:

- **Character View:** Following the provided design, displaying fields such as image, name, status, species, and gender.
- **Responsive Design:** Ensures a smooth and usable experience on multiple screen sizes.
- **Sorting:** Button to sort characters alphabetically (A-Z or Z-A).
- **Character Details:** Selecting a character in the sidebar shows a detail view using React Router.
- **Comments Section:** Additional section allows adding comments on characters.

**Additional Implemented Requirements:**

- **TypeScript & GraphQL Codegen** for type-safe development.
- **Soft-delete:** Deleted characters are stored in localStorage using Zustand.
- **Comprehensive Testing:** Most of the app is covered with tests using Vitest and React Testing Library.

## Running Tests

Run tests:

```bash
  npm run test
```

Generate coverage report:

```bash
  npm run coverage
```

## Additional Scripts

Generates TypeScript types for GraphQL queries.

```bash
    npm run codegen
```
