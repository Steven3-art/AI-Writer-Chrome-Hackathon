# AI-Writer-Chrome-Hackathon
An AI-powered Chrome Extension leveraging Gemini Nano for multi-platform social media content generation
#  AI Writer – Chrome AI Content Generator

**AI Writer Chrome** is an innovative Manifest V3 browser extension designed to integrate the power of Generative AI directly into your social media workflow. It acts as a writing copilot, allowing content creators and marketers to instantly generate, adapt, and correct content for multiple platforms without ever leaving the page.

## Core Features

* **Multi-Platform Adaptation:** Automatically adjusts post length, tone, and format for **LinkedIn, Twitter/X, Facebook, Instagram,** and **WhatsApp**.
* **On-Device AI Focus:** Leverages the **Chrome Prompt API (Gemini Nano)** for fast, private, and local content generation (currently demonstrated via an intelligent simulation mode due to API constraints).
* **Integrated Quality Assurance:** Includes a **Proofreader API** function to ensure generated content is grammatically flawless.
* **Seamless Injection:** Injects a "🧠 AI Writer" button directly into text fields for rapid content insertion.

##  Installation & Testing (Developer Mode)

Since this is a Hackathon project and not yet published on the Chrome Web Store, you must load the extension manually in Developer Mode.

### Prerequisites

1.  Google Chrome (Canary or Dev version recommended).
2.  Your local copy of the `ai-writer-chrome` folder.

### Steps to Install

1.  **Open Chrome Extensions:** In your browser, navigate to `chrome://extensions`.
2.  **Enable Developer Mode:** Toggle the **"Developer mode"** switch on (usually in the upper-right corner).
3.  **Load Unpacked Extension:** Click the **"Load unpacked"** button that appears.
4.  **Select Project Folder:** Select the root folder of your project (`ai-writer-chrome`).

The **AI Writer Chrome** icon (🧠) will now appear in your browser toolbar.

## 🎬 How to Use the Demo

The extension is running in a **Smart Simulation Mode** (due to unresolved Gemini Nano initialization constraints) that convincingly demonstrates its full capabilities.

1.  **Select Target:** Navigate to WhatsApp Web (or LinkedIn/X).
2.  **Activate AI:** Click the **"AI Writer"** button injected next to the text field.
3.  **Open Popup:** Click the **AI Writer Chrome icon** in your toolbar.
4.  **Define Inputs:** Select **Platform**, **Tone**, and enter a **Topic** (e.g., "New product launch").
5.  **Generate:** Click **"Générer le Post IA"**.

The simulated post will be instantly inserted into the text field, showing correct formatting for the chosen platform and tone, and confirming that the Proofreader check has passed.

##  Built With

* **Architecture:** Chrome Extension Manifest V3
* **Languages:** JavaScript (ES6+), HTML5, CSS3
* **Core APIs (Targeted):** Chrome Prompt API, Chrome Proofreader API, `chrome.storage`
* **Advanced Techniques:** DOM Manipulation, `MutationObserver`, ClipboardEvent Simulation (for reliable text insertion)

---




