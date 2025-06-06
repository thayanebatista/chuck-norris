# Chuck Norris Jokes Search

A modern web application for searching and displaying Chuck Norris jokes, developed with Vue 3, TypeScript, and Vite.

## 🛠️ Technologies

- **Vue 3**: Progressive JavaScript framework for building user interfaces.
- **Pinia**: Simple and intuitive state management.
- **TypeScript**: Static typing for increased security and scalability.
- **Vite**: Modern and ultra-fast build tool.
- **SCSS**: CSS preprocessor for more powerful and organized styles.
- **Vitest**: Fast and modern unit testing framework.
- **Vue Test Utils**: Utility library for Vue component testing.

## 🚀 Main Features

- **Joke Search**:
  - Searches for jokes in the Chuck Norris API.
  - Displays results in cards.
- **"I'm Feeling Lucky" Feature**:
  - Searches and displays a random joke when clicking the button.
- **Term Highlighting**:
  - The searched term is highlighted in the search results.
- **Responsive Design**:
  - Interface adaptable to different screen sizes.
- **Accessibility**:
  - Support for screen readers, keyboard navigation, and other WCAG (Web Content Accessibility Guidelines) guidelines.

## 📂 Project Structure

The main project structure is organized as follows:

```
chuck-norris/
├── src/
│   ├── api/
│   │   ├── api.service.ts
│   │   └── chuckNorris.service.ts
│   ├── assets/
│   ├── components/
│   │   ├── ErrorMessage.vue
│   │   ├── FeelingLuckyButton.vue
│   │   ├── Header.vue
│   │   ├── HighlightedText.vue
│   │   ├── JokeCard.vue
│   │   ├── LoadingSpinner.vue
│   │   ├── MdiIcon.vue
│   │   ├── NoResultsCard.vue
│   │   ├── SearchInput.vue
│   │   └── WesternButton.vue
│   ├── composables/
│   │   └── useTextHighlight.ts
│   ├── interfaces/
│   ├── pages/
│   │   └── Home.vue
│   ├── store/
│   │   └── chuckNorrisStore.ts
│   ├── utils/
│   ├── App.vue
│   └── main.ts
├── tests/
└── vite.config.ts
```

### Main Components

- **`Header.vue`**: Navigation bar located at the top of the application.
- **`SearchInput.vue`**: Search component for looking up jokes.
- **`FeelingLuckyButton.vue`**: Button to search for a random joke.
- **`JokeCard.vue`**: Card to display a Chuck Norris joke.
- **`NoResultsCard.vue`**: Component displayed when the search returns no results.
- **`ErrorMessage.vue`**: Component to display error messages clearly.
- **`LoadingSpinner.vue`**: Loading indicator for visual feedback during requests.
- **`WesternButton.vue`**: Reusable styled button.
- **`HighlightedText.vue`**: Component that highlights specific text, used for the search term.
- **`MdiIcon.vue`**: Component for rendering icons.

### State Management

- **Pinia**: The `chuckNorrisStore` manages the application state, including the joke list, search term, loading states, and errors.

## 📦 Installation and Configuration

1. Clone the repository:

   ```bash
   git clone [REPOSITORY_URL]
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the `.env` file:
   ```bash
   cp .env.example .env
   ```
   _Note: The `.env.example` file may not exist. If that's the case, you can skip this step._

## 🚀 Running the Project

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 🧪 Testing

The project uses **Vitest** and **Vue Test Utils** for unit and component testing.

To run the tests:

```bash
npm run test
```

To check test coverage:

```bash
npm run test:coverage
```

## 🤝 Contributing

1. Fork the project.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m '[TAG]: message'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📝 License

This project is under the MIT license. See the `LICENSE` file for more details.
