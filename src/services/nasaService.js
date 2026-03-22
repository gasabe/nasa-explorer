import config from "../config/config";

const APOD_STORAGE_KEY = "nasa_apod_data";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function getStoredApod() {
  const storedData = localStorage.getItem(APOD_STORAGE_KEY);

  if (!storedData) {
    return null;
  }

  try {
    return JSON.parse(storedData);
  } catch {
    localStorage.removeItem(APOD_STORAGE_KEY);
    return null;
  }
}

function saveApod(apodData) {
  localStorage.setItem(APOD_STORAGE_KEY, JSON.stringify(apodData));
}

export async function getApod() {
  const today = getTodayDate();
  const storedApod = getStoredApod();

  if (storedApod && storedApod.date === today) {
    return storedApod;
  }

  try {
    const response = await fetch(
      `${config.nasa.baseUrl}/planetary/apod?api_key=${config.nasa.apiKey}`
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener el contenido APOD");
    }

    const data = await response.json();
    saveApod(data);

    return data;
  } catch (error) {
    if (storedApod) {
      return storedApod;
    }

    throw error;
  }
}