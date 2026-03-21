import HomePage from "./pages/HomePage";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="app">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Cambiar tema"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <HomePage />
    </main>
  );
}

export default App;