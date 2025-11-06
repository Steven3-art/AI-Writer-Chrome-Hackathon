# 🧠 AI Writer Chrome: Multi-Platform Content Generator

**Tagline:** Optimize your WhatsApp, LinkedIn, and Twitter posts with AI in a single click.

## ✨ Core Project Features

**AI Writer Chrome** is a browser extension designed for content creators who want to harness the power of local AI to instantly generate relevant and stylised social media posts.

* **🌐 Multi-Platform Targeting:** Generates posts optimized for LinkedIn, Twitter/X, WhatsApp, Facebook, and Instagram, adapting the tone and style to the platform's format.
* **🖼️ Content Flexibility (Critical Update):** Allows the user to choose between generating a **Text-Only Post** or a **Media-Accompanying Post (Image/Video)**. This ensures the generated text includes a relevant visual Call-to-Action (e.g., "See the image below").
* **🎨 Custom Tone and Length:** Tailor the post style (Professional, Humorous, Inspiring) and desired length to match your campaign needs.

## 🛡️ Resilience and Architecture (Key Hackathon Highlights)

The project was developed with a strong focus on user reliability, regardless of local API availability.

1.  **Intelligent Failover (Fallback Mode):** If the `window.ai` API (Gemini Nano) is not available on the user's machine (due to hardware requirements, storage space, or Origin Trial limitations), the extension **automatically and immediately** switches to an **Advanced Simulation Mode**.
2.  **Guaranteed Experience:** This fallback mechanism ensures that the tool is usable by all users for the demo and the Hackathon evaluation, guaranteeing a seamless experience without interruption.

## ⚙️ Installation and Usage

1.  **Download:** Clone this repository to your local machine.
2.  **Load in Chrome:** Navigate to `chrome://extensions`, enable **Developer Mode**, then click **Load unpacked** and select the folder containing this project.
3.  **Usage:** Open a social media platform (e.g., WhatsApp Web), click the extension icon, fill out the form (Subject, Platform, **Media Option?**), and click Generate. The AI content will be inserted directly into the input field.
