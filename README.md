# 🌍 Wanderlust AI - Intelligent Travel Planner

**Wanderlust AI** is a premium, AI-powered travel itinerary generator designed to turn "where should we go?" into a fully-planned adventure in seconds. Built for the Google Cloud Hackathon, it leverages the latest in Generative AI and Cloud infrastructure to provide a seamless travel planning experience.

🚀 **Live Demo**: [https://hack2skills8may2026-saumitra.el.r.appspot.com](https://hack2skills8may2026-saumitra.el.r.appspot.com)

---

## ✨ Key Features

- **🧠 AI Itinerary Engine**: Uses **Gemini 1.5 Flash** (via Vertex AI) to generate personalized, day-by-day travel plans based on destination, duration, budget, and interests.
- **🗺️ Interactive Map Integration**: Visualize your journey with **Google Maps JS API**, featuring custom markers for every recommended stop.
- **🔐 Secure Authentication**: One-tap login with **Google Sign-In** via Firebase Auth.
- **📂 Trip Management**: Save, view, and organize your past itineraries with **Cloud Firestore**.
- **📱 Premium Responsive Design**: A modern, dark-themed UI built with React and custom CSS for a state-of-the-art user experience.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **AI/ML**: Vertex AI in Firebase (Gemini 1.5 Flash)
- **Database**: Google Cloud Firestore
- **Identity**: Firebase Authentication (Identity Platform)
- **Hosting**: Google App Engine (Standard Environment)
- **Server**: Express.js (optimized for static asset delivery)
- **Testing**: Vitest

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saumitra-rawat/hack2skills8may2026-saumitra.git
   cd hack2skills8may2026-saumitra
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root and add your keys (see `.env.example`):
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_GOOGLE_MAPS_API_KEY=your_key
   ...
   ```

4. **Run the app**:
   ```bash
   npm run dev
   ```

---

## ☁️ Deployment

This project is configured for **Google App Engine**. To deploy your own version:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy via GCloud SDK**:
   ```bash
   gcloud app deploy
   ```

---

## 📜 Problem Statement Alignment

Wanderlust AI directly addresses the challenge of modernizing travel planning by:
1. **Efficiency**: Reducing hours of research to 5 seconds of AI generation.
2. **Integration**: Unifying AI logic, Map visualization, and Cloud storage into a single cohesive unit.
3. **Scalability**: Utilizing Google App Engine's auto-scaling capabilities to handle global traffic.

---

*Built with ❤️ for the Google Cloud Hackathon 2026.*
