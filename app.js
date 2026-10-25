const config = {
  backendUrl: "http://localhost:3000",
  defaultConsoleUrl: "https://example.com/vnc.html"
};

const isoInput = document.getElementById("isoFile");
const fileName = document.getElementById("fileName");
const uploadBtn = document.getElementById("uploadBtn");
const uploadStatus = document.getElementById("uploadStatus");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const vmState = document.getElementById("vmState");
const isoInfo = document.getElementById("isoInfo");
const vmFrame = document.getElementById("vmFrame");
const refreshBtn = document.getElementById("refreshBtn");
const fullBtn = document.getElementById("fullBtn");

let currentIso = "";
let isRunning = false;

isoInput.addEventListener("change", () => {
  const selected = isoInput.files && isoInput.files[0];
  if (!selected) {
    fileName.textContent = "Choisir un fichier ISO";
    return;
  }

  fileName.textContent = selected.name;
  currentIso = selected.name;
  isoInfo.textContent = selected.name;
});

uploadBtn.addEventListener("click", async () => {
  const selected = isoInput.files && isoInput.files[0];

  if (!selected) {
    uploadStatus.textContent = "Sélectionne d’abord un fichier .iso.";
    uploadStatus.className = "status error-text";
    return;
  }

  const formData = new FormData();
  formData.append("iso", selected);

  try {
    uploadStatus.textContent = "Téléchargement en cours…";
    uploadStatus.className = "status muted";

    const response = await fetch(`${config.backendUrl}/upload-iso`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Erreur serveur au moment du téléversement.");
    }

    const data = await response.json();
    currentIso = data.file || selected.name;
    isoInfo.textContent = currentIso;
    uploadStatus.textContent = `ISO uploadée : ${currentIso}`;
    uploadStatus.className = "status success-text";
  } catch (error) {
    uploadStatus.textContent = "Mode démo: fichier local accepté, backend non connecté.";
    uploadStatus.className = "status muted";
    currentIso = selected.name;
    isoInfo.textContent = selected.name;
    console.error(error);
  }
});

startBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`${config.backendUrl}/start-vm`, {
      method: "POST"
    });

    if (!response.ok) {
      throw new Error("Le backend n’est pas disponible");
    }

    isRunning = true;
    vmState.textContent = "Démarrée";
    vmFrame.src = config.defaultConsoleUrl;
  } catch (error) {
    isRunning = true;
    vmState.textContent = "Démarrée (mode démo)";
    vmFrame.src = config.defaultConsoleUrl;
    console.warn("Backend absent, console demo activée.");
  }
});

stopBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`${config.backendUrl}/stop-vm`, {
      method: "POST"
    });

    if (!response.ok) {
      throw new Error("Le backend n’est pas disponible");
    }

    isRunning = false;
    vmState.textContent = "Arrêtée";
    vmFrame.src = "about:blank";
  } catch (error) {
    isRunning = false;
    vmState.textContent = "Arrêtée";
    vmFrame.src = "about:blank";
    console.warn("Aucune VM active, mode local arrêté.");
  }
});

refreshBtn.addEventListener("click", () => {
  if (isRunning) {
    vmFrame.src = config.defaultConsoleUrl;
  }
});

fullBtn.addEventListener("click", () => {
  if (vmFrame.requestFullscreen) {
    vmFrame.requestFullscreen();
  }
});

vmFrame.src = "about:blank";
