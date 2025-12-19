# 🖐️ HathSayBaat

### Indian Sign Language to Text & Speech Translator

HathSayBaat is an **offline, real-time Indian Sign Language (ISL) to Text and Speech Translator** created to make everyday communication easier for deaf and hard-of-hearing individuals. The idea behind this project is simple: **enable people to communicate naturally using hand gestures**, without depending on the internet, expensive hardware, or complex setup.

The system uses a normal webcam to capture hand gestures and converts them into readable text and clear speech using computer vision and deep learning techniques.

---

## 🌟 What HathSayBaat Can Do

* 🎥 Recognizes ISL hand gestures in real time using a webcam
* 🧠 Uses a trained deep learning model for accurate gesture prediction
* 📝 Converts gestures into readable text instantly
* 🔊 Speaks the recognized text using text-to-speech
* 🌐 Supports multilingual output (English & Hindi)
* 📞 Includes a video call feature with live ISL translation
* 🔐 Secure login and user authentication
* 💻 Works completely offline, ensuring user privacy

---

## 🛠️ Technologies Used

**Frontend**

* HTML
* CSS
* JavaScript

**Backend**

* Python
* Flask
* Flask-Login
* Flask-SQLAlchemy

**Computer Vision & AI**

* OpenCV
* MediaPipe
* CVZone
* TensorFlow
* Keras

**Database**

* SQLite

---

## 🧩 How the System Works (Simple Explanation)

1. The webcam captures live video of hand gestures
2. OpenCV processes the video frames
3. MediaPipe detects and tracks hand landmarks
4. The gesture image is preprocessed for consistency
5. A trained deep learning model predicts the gesture
6. The recognized gesture is converted into text
7. Text is optionally translated into another language
8. Text-to-speech generates audio output

All of this happens **locally on the user’s device**, without sending data anywhere.

---

## 📂 Project Structure

```
HathSayBaat/
│
├── app.py
├── keras_model.h5
├── labels.txt
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
│
├── static/
│   ├── css/
│   ├── js/
│   └── uploads/
│
├── templates/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── model.html
│   ├── video_call.html
│   └── languages.html
│
├── instance/
└── HandSignDetection/
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Dik-sha08/HathSayBaat-Indian-Sign-Language-to-Text-Speech-Translator.git
cd HathSayBaat-Indian-Sign-Language-to-Text-Speech-Translator
```

### 2️⃣ Create and Activate Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate   # Windows
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Run the Application

```bash
python app.py
```

Then open your browser and visit:

```
http://127.0.0.1:5000
```

---

## 🧠 About the ML Model

* CNN-based gesture recognition model
* Trained using TensorFlow and Keras
* Input: Hand gesture images
* Output: ISL gesture labels

> If the model file size exceeds GitHub limits, it can be hosted externally and loaded locally.

---

## 🔐 Privacy & Security

* No internet required
* No cloud storage
* No external APIs
* Webcam data processed locally
* User data is not stored unnecessarily

This makes HathSayBaat suitable for **education, healthcare, and personal use**.

---

## 🔮 Future Improvements

* Support for more ISL gestures and vocabulary
* Better sentence-level grammar handling
* Mobile and desktop application versions
* Emotion-aware gesture recognition
* Support for more Indian languages

---

## 👩‍💻 Developed By

**Diksha Joshi**
MCA Student
Birla Institute of Applied Sciences


---

## 📜 License

This project is developed for **academic and learning purposes**.

---

✨ *HathSayBaat is a small step towards making communication more inclusive, accessible, and human-friendly using AI.*

---

