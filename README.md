[README.md](https://github.com/user-attachments/files/23145145/README.md)
# 🎬 MoodMate: Emotion-Driven Personalized Movie Recommendation System

## 🧠 Project Overview
**MoodMate** is an AI-powered movie recommendation system that uses **sentiment analysis** to provide **real-time, personalized movie suggestions** that align with users' moods.  
By analyzing the sentiment of users’ text inputs or chats, MoodMate recommends movies that match or improve their emotional state.

---

## 🚀 Features
- 💬 **Sentiment Analysis** – Detects the user’s mood from text input.  
- 🎬 **Smart Movie Recommendations** – Suggests movies that reflect or uplift the current mood.  
- 🤖 **Chatbot Interaction** – Allows users to chat naturally to receive mood-based suggestions.    
- 🧑‍🤝‍🧑 **User Profiles** – Includes favorites, friends list, watch history, and liked actors.  

---

## 🧩 Technologies Used
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Python (Flask Framework)  
- **Machine Learning:** PyTorch, LightFM (Hybrid Recommendation System)  
- **APIs:** TMDb API (movie data)  
- **Database:** MySQL  

---

## ⚙️ How It Works
1. The user logs in and chats with MoodMate.  
2. The system performs **sentiment analysis** on the text to detect the user’s mood (positive, negative, or neutral).  
3. The **recommendation engine** suggests movies based on the detected sentiment.  
4. The user can save or explore movie options that fit their mood.  

---

## 📊 AI Model Pipeline
- 🧠 **Sentiment Analysis Model:** NLP-based classifier trained to detect user sentiment.  
- 🎯 **Recommendation Engine:** Hybrid model using **LightFM** for collaborative + content-based filtering.  

---

## 📁 Project Structure
MoodMate/
│
├── static/ # CSS, JS, and images
├── templates/ # HTML pages (home, profile, chatbot, etc.)
├── models/ # Sentiment analysis and recommendation scripts
├── data/ # Movie metadata and datasets
├── app.py # Flask backend
├── requirements.txt # Dependencies
└── README.md # Project documentation
