# AutoDoc AI 📚

**AutoDoc AI** is an automated documentation tool that converts browser interactions into step-by-step guides. It bridges the gap between manual work and documentation by recording user clicks and generating clean, organized manuals instantly.

## 🚀 Features

- **Chrome Extension Recorder:** Tracks DOM interactions (clicks, inputs) in real-time.
- **Automated Step Generation:** Converts raw events into human-readable steps (e.g., "User clicked on Search Button").
- **Centralized Dashboard:** A React-based library to view, manage, and share generated guides.
- **Full-Stack Architecture:** REST API communication between the browser extension, Node.js backend, and React frontend.

## 🛠️ Tech Stack

- **Frontend:** React.js, Lucide Icons, CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Extension:** Chrome Manifest V3 API, JavaScript (DOM Manipulation)

## 📸 How It Works

1. **Record:** Activate the extension and perform tasks on any website.
2. **Process:** The system captures the target elements and action types.
3. **Generate:** A structured guide is saved to the database.
4. **View:** Access the step-by-step manual in the dashboard.

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone [https://github.com/darlagopichand/autodoc-ai.git](https://github.com/darlagopichand/autodoc-ai.git)
cd autodoc-ai
```
