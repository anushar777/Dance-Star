# 💃 Dance Star: AI-Powered Choreography Comparison Tool

**Dance Star** is an intelligent web-based platform that helps users compare their dance performance to a reference choreography. By analyzing movement timing, texture, and facial expressions, the tool delivers personalized feedback and improvement suggestions — all through an accessible interface designed for creativity and ease of use.

---

## 🎯 Features

- 🔍 **Pose & Expression Detection** using MediaPipe across >95% of video frames
- 🎵 **Beat Synchronization** to align movements with music using Librosa
- 🧠 **Movement Texture Analysis** classifies sharp vs. smooth transitions
- 😐 **Facial Expression Matching** tracks emotional delivery throughout the performance
- 📊 **Real-Time Feedback** with similarity score, timestamped suggestions, and ratings
- 🌐 **Responsive Web UI** built in React with accessibility-first design

---

## 🛠️ Tech Stack

| Layer      | Tools                                       |
|------------|---------------------------------------------|
| Frontend   | React · HTML · CSS                          |
| Backend    | Flask · Python                              |
| ML/AI      | MediaPipe · OpenCV · Librosa · Scikit-learn |
| Deployment | GitHub Pages (Frontend) · Render (Backend)  |

---

## 🚧 Project Status

This repository is actively under development and currently includes:
- [x] Basic layout and styling of the React frontend
- [x] Placeholder UI components for choreography input
- [ ] Pose and expression detection module integration
- [ ] Feedback scoring engine
- [ ] Side-by-side video player with overlay visualization

---

## 🔗 Getting Started

### Prerequisites
- Python 3.10+
- Node.js and npm
- Git and GitHub CLI (optional but recommended)

### Setup
```bash
# Backend
cd backend/
pip install -r requirements.txt
python app.py

# Frontend
cd frontend/
npm install
npm start
