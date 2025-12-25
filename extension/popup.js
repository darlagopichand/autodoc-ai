// 1. When the popup opens, check if we are already recording
document.addEventListener("DOMContentLoaded", async () => {
  const data = await chrome.storage.local.get("isRecording");
  
  if (data.isRecording) {
    showStopUI(); // If yes, show the Stop button
  }
});

// 2. Start Button Logic
document.getElementById("startBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Send signal to content.js
  chrome.tabs.sendMessage(tab.id, { action: "start" });

  // Save "Recording" state to memory
  await chrome.storage.local.set({ isRecording: true });
  
  showStopUI();
});

// 3. Stop Button Logic
document.getElementById("stopBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Send signal to content.js
  chrome.tabs.sendMessage(tab.id, { action: "stop" });

  // Clear "Recording" state from memory
  await chrome.storage.local.set({ isRecording: false });

  showStartUI();
});

// --- Helper Functions to Swap Buttons ---
function showStopUI() {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("stopBtn").style.display = "block";
  document.querySelector(".status").innerText = "🔴 Recording...";
}

function showStartUI() {
  document.getElementById("startBtn").style.display = "block";
  document.getElementById("stopBtn").style.display = "none";
  document.querySelector(".status").innerText = "✅ Saved!";
}