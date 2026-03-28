import AppRouter from "./router/AppRouter";
import { useTheme } from "./hooks/useTheme";

function App() {
  useTheme();
  return (
    <main className="app">
      <AppRouter />
    </main>
  );
}

export default App;