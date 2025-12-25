let isRecording = false;
let recordedSteps = [];

// 1. Listen for messages from the Popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  if (message.action === "start") {
    isRecording = true;
    recordedSteps = []; // Reset steps
    console.log("🎥 Clueso Recorder STARTED");
    alert("Recording Started! Click around to create steps.");
  } 
  
  if (message.action === "stop") {
    isRecording = false;
    console.log("🛑 Recording STOPPED. Processing...");
    
    // Ask the user for a title
    const guideTitle = prompt("Enter a title for this Guide:", "My New Guide");

    if (guideTitle) {
      saveGuideToBackend(guideTitle, recordedSteps);
    } else {
      alert("Guide discarded (no title provided).");
    }
  }
});

// 2. Listen for CLICKS on the page
document.addEventListener("click", (event) => {
  if (!isRecording) return;

  const element = event.target;
  
  // Create a clean step object
  const step = {
    order: recordedSteps.length + 1,
    element: element.tagName,
    action: "CLICK",
    content: `User clicked on ${element.innerText.slice(0, 30) || element.tagName}`,
    imageUrl: "" // We will add screenshot logic later!
  };

  console.log("✅ Click captured:", step);
  recordedSteps.push(step);
}, true);


// 3. The Function to Send Data to Backend
async function saveGuideToBackend(title, steps) {
  try {
    const response = await fetch("http://localhost:5000/api/guides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: `Created automatically via Extension with ${steps.length} steps.`,
        steps: steps
      })
    });

    const data = await response.json();

    if (data.success) {
      alert("🎉 Guide Saved Successfully! Check your Dashboard.");
    } else {
      alert("❌ Failed to save: " + data.error);
    }

  } catch (error) {
    console.error("Network Error:", error);
    alert("❌ Error connecting to Backend. Is it running?");
  }
}