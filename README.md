# Mustafa Muhammed Gaber — Award-Winning Developer Portfolio

An elite, high-performance Single Page Application (SPA) portfolio built for **Mustafa Muhammed Gaber** — AI Engineer, Creative Frontend Developer, and Robotics Enthusiast.

---

## ⚡ Tech Stack & Architecture

- **Core**: React 18 initialized with [Vite](https://vitejs.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
  - Interactive neural network particle field & dynamic AI core mesh responding to cursor physics
  - Automatic rendering suspension (`frameloop="never"`) when scrolled off-screen to preserve rock-solid 60 FPS
- **Animation Engine**: [GSAP](https://gsap.com/) + ScrollTrigger + Timelines (Parallax, letter reveals, scroll-drawing paths)
- **Smooth Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis) synchronized with GSAP ticker
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom cyber/dark theme (`#050507`), glassmorphic panels, and glowing neon accents
- **Audio Synthesizer**: Native Web Audio API procedural cyber SFX (zero external audio dependencies)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Sections & Features

1. **Hero Section (`Hero.jsx` & `Hero3D.jsx`)**:
   - Oversized cinematic typography: `MUSTAFA . GABER`
   - Real-time rotating terminal glitch subtitle cycling through engineering roles
   - Interactive 3D neural node constellation and glowing polyhedron core
   - Live availability telemetry badge and quick CTAs

2. **About & Academic Telemetry (`About.jsx`)**:
   - Official portrait with GSAP ScrollTrigger parallax offset and cyber framing
   - Helwan International Tech University (HITU) AI Major highlights
   - WE Applied Technology School 92% Distinction & Pearson UK Credential
   - Four core engineering pillars (AI, Creative Frontend, Robotics, Competitions)

3. **MEMO — Voice AI Assistant Showcase (`MemoFeature.jsx`)**:
   - Flagship spotlight of **MEMO Voice AI Assistant**
   - Engineered by team **Hybrid Minds** (Faculty of Technology — AI Program, HITU)
   - Interactive custom cyber video player featuring `memo-video.mp4`
   - Simulated live audio stream waveform visualizer & intent classification architecture

4. **Projects Grid (`Projects.jsx`)**:
   - Direct integration of GitHub repositories from [@mustafa-006](https://github.com/mustafa-006)
   - High-fidelity generated dark cyber previews for:
     - **Travel-Hub**: Real-time social tourism platform (Node.js, Express, MySQL, WebSockets)
     - **Pizza ML Predictor**: Multivariate linear regression delivery time forecasting
     - **Scikit-Learn ML Suite**: 10+ machine learning algorithms and clustering pipelines
     - **Cyberware E-Commerce Front-End**: High-performance React reactive storefront
     - **Laravel CRUD Enterprise Engine**: Production-grade MVC architecture
     - **Node.js Data Management API**: Modular REST API with MySQL relational schema
   - Category filtering and direct repository links

5. **Competency Matrix (`Skills.jsx`)**:
   - Interactive categorized tabs: *AI & Data Science*, *Web & Creative UI*, *Languages & Systems*
   - Proficiency meters, descriptive capability notes, and ecosystem badges

6. **Chronicles & Milestones (`Timeline.jsx`)**:
   - Vertical interactive timeline featuring:
     - **NASA Space Apps Cairo (2025)**
     - **ATC 10 Mobile Apps Dev (2025)**
     - **HITU AI Program & Team Hybrid Minds (Current)**
     - **ISEF 2023 — International Science & Engineering Fair**
     - **Alabakera Schools Season 14 (عباقرة المدارس)**
     - **WE Applied Technology School (92% Distinction)**
     - **Pearson UK Notification of Performance**
   - Glowing SVG beam that draws itself dynamically on scroll

7. **Transmission & Coordinates (`Contact.jsx`)**:
   - Oversized clickable email (`mustafawe879@gmail.com`) and phone (`+20 1201707796`)
   - Instant copy-to-clipboard buttons with toast feedback
   - Interactive message dispatch interface connected to mail client
   - Magnetic hover links for GitHub and LinkedIn

---

## 🛠️ Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Production Build**:
   ```bash
   npm run build
   ```
   The optimized production bundle is generated in `dist/`.

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```
