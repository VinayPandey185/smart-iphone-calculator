📱 iPhone Calculator – Premium (Flask + JS)
<p align="center"> <img src="https://img.shields.io/badge/Python-3.x-blue" /> 
<img src="https://img.shields.io/badge/Flask-Framework-black" />
 <img src="https://img.shields.io/badge/License-MIT-green" />
 <img src="https://img.shields.io/github/stars/VinayPandey185/smart-iphone-calculator?style=social" /> 
 <img src="https://img.shields.io/github/forks/VinayPandey185/smart-iphone-calculator?style=social" />
 <img src="https://img.shields.io/github/last-commit/VinayPandey185/smart-iphone-calculator" /> </p>

A beautiful iPhone-style calculator with scientific mode, sound, vibration, history, theme switching, and Flask backend APIs.

⭐ Features

📱 iPhone-style UI (rounded buttons, ripple animation)

🌗 Light / Dark Mode with LocalStorage

🔊 Click sound feedback

📳 Vibration feedback

🧮 Scientific mode:
sin, cos, tan, log, ln, abs, cbr, factorial, power, random

➕ Standard calculator: + − × ÷

🔗 Flask backend APIs

📝 History panel with clear option


📂 Project Structure
flaskProject/
│── app.py
│── templates/
│    └── index.html
│── static/
│    ├── style.css
│    └── script.js
│── README.md
│── LICENSE
└── .gitignore

⚙️ Installation
git clone YOUR_REPO_URL
cd flaskProject

python -m venv venv
venv\Scripts\activate     # Windows

pip install flask
python app.py

Open in browser:

Run at → http://127.0.0.1:5000

🧠 API Routes
Operation	URL Example
Add	/add/5/3
Subtract	/sub/10/4
Multiply	/mul/7/8
Divide	/div/20/4
Square	/squ/6
Cube	/cube/3
Sine	/sin/30
Cosine	/cos/60
Tangent	/tan/45
Log10	/log/100
Ln	/ln/20
Abs	/abs/-9
Cube root	/cbr/27
Factorial	/fact/5
Power	/pow/5/3
Random (0–n)	/rand/50

🛠 Technologies Used

🐍 Python Flask

🖥 HTML5

🎨 CSS3 (iOS-inspired UI)

⚡ JavaScript

💾 LocalStorage

✨ About

Developer: Vinay Pandey
(Passionate about building modern UI experiences with Python + Flask.)