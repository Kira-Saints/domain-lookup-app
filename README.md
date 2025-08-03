# 🔍 Domain Lookup App

A simple and visually appealing web app that allows users to search for WHOIS domain registration information using the WhoisXML API.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Preview](#preview)
- [Notes](#notes)

---

## ✨ Features

- Validate and lookup any valid domain (e.g., `example.com`)
- Displays domain status, creation/expiration dates, registrar info
- Shows registrant contact information (if available)
- Includes animated background and clean Tailwind-styled UI
- Responsive design for desktop and mobile
- Error handling for invalid domains and failed requests

---

## 🧰 Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **API:** WhoisXML API (https://www.whoisxmlapi.com/)
- **Bundler:** Parcel

---

## 🗂️ Project Structure

```
domain-lookup-app/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   ├── src/
│       ├── App.js
│       ├── index.css
│       ├── index.js
├── backend/
│   ├── server.js
│   ├── .env
├── .gitignore
├── README.md
```

---

## ⚙️ Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/Kira-Saints/domain-lookup-app.git
cd domain-lookup-app
```

2. **Install dependencies**

- Backend:
```bash
cd backend
npm install
```

- Frontend:
```bash
cd frontend
npm install
```

3. **Setup environment variables**

Create a `.env` file in the `server/` directory:

```bash
WHOIS_API_KEY=at_huzCphF4yAnCrxNCiwvObMN3OxBWS
```

4. **Run the app**

- Start the backend (port 5000):

```bash
cd backend
npm run dev
```

- Start the frontend (port 3000 by default):

```bash
cd frontend
npm start
```

5. **Visit the app**

Open your browser and go to: [http://localhost:3000](http://localhost:3000)

---

## 🖼️ Preview

![App Preview](./domain-lookup-app-preview.png)

---

## 📝 Notes

- Ensure CORS is properly handled if deploying frontend and backend separately.
- This project is for educational/demonstration purposes.
- Domain lookup results depend on the WHOIS API and may vary based on domain privacy.

---

© 2025 Kira Saints. All rights reserved.
