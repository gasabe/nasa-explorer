import config from "../config/config";

function HomePage() {
  return (
    <main>
      <h1>Home</h1>
      <p>Welcome to NASA Explorer App.</p>
      <p>Base URL: {config.nasa.baseUrl}</p>
      <p>API Key loaded: {config.nasa.apiKey ? "Yes" : "No"}</p>
    </main>
  );
}

export default HomePage;
