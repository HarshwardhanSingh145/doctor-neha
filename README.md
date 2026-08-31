# Dr. Neha Sharma — Premium Clinic Website

A minimal, modern, and luxury doctor clinic website for **Dr. Neha Sharma** in **Makrana, Rajasthan (PIN: 341505)**.

---

## ✨ Features

- **Cinematic Pinned Hero (GSAP ScrollTrigger)**:
  - Phase 1: Giant `DR. NEHA SHARMA` background typography layered with 3D depth behind the doctor's portrait.
  - Phase 2: Smooth scale/dissolve transition into the clinic philosophy: *"Professional Care with a Personal Approach"*.
  - Phase 3 & 4: Doctor portrait glides to the left side as the right-side profile and clinic appointment card seamlessly slides in.
- **Interactive 3D DNA Canvas (`src/dna.js`)**:
  - Continuous 60fps mathematical double-helix simulation.
  - 3D perspective depth, glowing node spheres, gradient hydrogen bond rungs, and scroll-velocity responsive acceleration.
- **Minimalist Medical Sections**:
  - **About Section**: Patient-centered healthcare philosophy in Makrana.
  - **Consultation & Services**: Structured clinical offerings (*Primary Health Consultation*, *Clinical Diagnosis & Review*, *Follow-up Care*, *Preventative Guidance*).
  - **Clinic & Location**: Detailed information for the Makrana practice with interactive visual map styling and consultation timings.
  - **Appointment Booking Modal**: Interactive booking form with date/time pickers and instant confirmation feedback.
- **100% Mobile & Desktop Responsive**:
  - Fully touch-friendly and fluid across mobile, tablet, and desktop viewports.

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser or run a local static server:

```bash
# Using Python
python3 -m http.server 3000

# Or using Node.js / npx
npx serve .
```

Visit `http://localhost:3000/` in your browser.

---

## 📁 Project Structure

```
├── assets/
│   └── doctor_portrait.png   # Transparent cutout portrait
├── src/
│   ├── dna.js                # 3D Canvas double-helix animation engine
│   ├── main.js               # GSAP ScrollTrigger timeline & modal logic
│   └── style.css             # Vanilla CSS luxury medical design system
├── index.html                # Semantic HTML5 layout
├── .gitignore
└── README.md
```

---

## 📜 License

Private Practice Website • Dr. Neha Sharma Clinic, Makrana, Rajasthan.
