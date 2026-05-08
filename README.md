# 🌍 Wanderlust AI - Intelligent Travel Planner

**Wanderlust AI** is a premium, AI-powered travel itinerary generator designed to turn "where should we go?" into a fully-planned adventure in seconds. Built for the Google Cloud Hackathon, it leverages the latest in Generative AI and Cloud infrastructure to provide a seamless, secure, and professional travel planning experience.

🚀 **Live Demo**: [https://hack2skills8may2026-saumitra.el.r.appspot.com](https://hack2skills8may2026-saumitra.el.r.appspot.com)

---

## ✨ Premium Features

- **🧠 AI Itinerary Engine**: Uses **Gemini 1.5 Flash** (via Vertex AI) to generate personalized, day-by-day travel plans based on destination, duration, budget, and interests.
- **🗺️ Interactive Map Integration**: Visualize your journey with **Google Maps JS API**, featuring custom markers for every recommended stop.
- **🔐 Multi-Factor Authentication**: Flexible login options including **Google Sign-In** and **Secure Email/Password** via Firebase Auth.
- **🛡️ Hardened Security**: Production-ready Express server equipped with **Helmet.js** (CSP, XSS protection) and **Rate Limiting** to prevent brute-force attacks.
- **📂 Persistent Trip Management**: Save, view, and organize your past itineraries with **Cloud Firestore**.
- **🧪 Comprehensive Testing**: Robust test suite with **Vitest**, covering AI logic, database services, and edge-case handling.

---

## 🛠️ Advanced Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Framer Motion (for premium animations)
- **AI/ML**: Vertex AI in Firebase (Gemini 1.5 Flash)
- **Database**: Google Cloud Firestore (Real-time NoSQL)
- **Identity**: Firebase Authentication (Identity Platform)
- **Security**: Helmet.js, Express Rate Limit
- **Hosting**: Google App Engine (Standard Environment)
- **Server**: Express.js (ES Modules, optimized for static assets)
- **Testing**: Vitest (Unit & Integration testing)

---

## 🧪 Quality Assurance

The project maintains high code standards through:
1. **Unit Testing**: Services like `GeminiService` and `FirestoreService` are fully tested with mocked dependencies.
2. **Error Boundaries**: Graceful handling of AI generation failures and network issues.
3. **Security Headers**: Strict Content Security Policy (CSP) to mitigate injection attacks.

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

## 📜 Problem Statement Alignment

Wanderlust AI directly addresses the challenge of modernizing travel planning by:
1. **Efficiency**: Reducing hours of research to 5 seconds of AI generation.
2. **Security & Scale**: Utilizing enterprise-grade security headers and Google App Engine's auto-scaling.
3. **Accessibility**: Providing multiple authentication paths to ensure all users can access the platform.

---

*Built with ❤️ for the Google Cloud Hackathon 2026.*
