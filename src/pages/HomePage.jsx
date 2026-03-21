import config from "../config/config";

function HomePage() {
  return (
    <main>
      <h1>NASA Explorer App</h1>
      <p>Base del proyecto con tema global</p>
      <p>Base URL: {config.nasa.baseUrl}</p>
      <p>API Key loaded: {config.nasa.apiKey ? "Yes" : "No"}</p>
    </main>
  );
}

export default HomePage;
