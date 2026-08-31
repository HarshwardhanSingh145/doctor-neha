# Dr. Neha Sharma — Premium Medical Clinic Website

> **Location:** Makrana, Rajasthan, India (PIN: 341505)  
> **Aesthetic:** Minimal • Medical • Editorial • Scientific • High-End

A high-end private doctor clinic website for **Dr. Neha Sharma** featuring a full-screen pinned storytelling hero with GSAP ScrollTrigger, real-time 3D Canvas DNA double-helix simulation, transparent portrait layering, and a responsive appointment booking system.

---

## 🌟 Key Features

- **Cinematic Pinned Hero Storytelling**:
  - **Phase 1**: Giant editorial `DR. NEHA SHARMA` background typography layered behind the doctor portrait with sub-label `DOCTOR • MAKARANA`.
  - **Phase 2**: Smooth scrub transition fading giant lettering into philosophy message: `PROFESSIONAL CARE WITH A PERSONAL APPROACH`.
  - **Phase 3 & 4**: Doctor portrait gracefully glides to the left side while revealing the Makrana Clinic profile card and direct consultation CTA.
- **Interactive 3D DNA Canvas (`src/dna.js`)**:
  - High-performance HTML5 Canvas double-helix rendering 3D depth-projected glowing nodes, hydrogen bond rungs, ambient wave breathing, and scroll-velocity acceleration.
- **Transparent Doctor Portrait (`assets/doctor_portrait.png`)**:
  - Cleanly isolated portrait with smooth alpha edges interweaving with 3D depth.
- **Mobile-First Responsive Design**:
  - Tailored `gsap.matchMedia()` animation rules for mobile and desktop screens.
  - Safe-area support, dynamic viewport height (`100dvh`), and iOS zoom prevention (`font-size: 16px` inputs).
- **Appointment Booking System**:
  - Frictionless booking modal with time slot selector, reason for visit, and instant confirmation feedback.
- **Editorial Clinical Content**:
  - About Dr. Neha Sharma & Practice Philosophy.
  - Clinical services & consultation breakdown (*Primary Care*, *Diagnostic Review*, *Follow-up Care*, *Preventative Guidance*).
  - Makrana Clinic location card with consultation hours and Rajasthan visual map.

---

## 🚀 Getting Started

No build step required — built with modern Vanilla JavaScript, CSS, and HTML5.

### Run Locally
```bash
# Using Python
python3 -m http.server 3000

# OR using Node / NPX
npx serve . -p 3000
```
Open **`http://localhost:3000`** in your browser.

---

## 📁 Project Structure

```
├── index.html                  # Semantic HTML5 layout & metadata
├── assets/
│   └── doctor_portrait.png     # Transparent doctor portrait layer
├── src/
│   ├── style.css               # Complete CSS design system & responsive rules
│   ├── dna.js                  # 3D Canvas DNA simulation engine
│   └── main.js                 # GSAP ScrollTrigger timeline & modal logic
├── README.md                   # Project documentation
└── .gitignore                  # Git ignore rules
```

---

## 📄 License & Attribution
All rights reserved © Dr. Neha Sharma Clinic, Makrana, Rajasthan, India.
