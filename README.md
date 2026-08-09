# 🤖 AI Cover Letter Generator

An AI-powered SaaS application that generates personalized, professional cover letters based on a candidate's information, target job role, company, skills, and job description.

The project demonstrates a practical AI Engineering workflow including frontend state management, backend API architecture, prompt engineering, secure API integration, and AI-generated content.

## 🚀 Live Demo

**Live Application:** [Add your Vercel URL here]

## 📌 Overview

The AI Cover Letter Generator allows users to enter their professional information and generate a tailored cover letter for a specific job opportunity.

The application is designed in multiple phases:

* **Phase 1 — MVP:** Local/simulated cover-letter generation
* **Phase 2 — AI Integration:** Gemini API-powered generation
* **Phase 3 — Resume Personalization:** Resume upload and contextual generation

The project follows a frontend-backend architecture to keep sensitive API credentials secure.

## ✨ Features

### Phase 1 — Base MVP

* Candidate name input
* Job role input
* Target company input
* Key skills input
* Job description input
* React state management
* Local cover-letter generation
* Generated cover-letter preview
* Copy-to-clipboard functionality

### Phase 2 — AI Engineering

* Google Gemini API integration
* Dynamic prompt generation
* Candidate information injected into prompts
* AI-generated personalized cover letters
* Loading state during AI generation
* Secure API-key management using environment variables
* Backend API architecture using Express.js

### Phase 3 — Advanced Features

* Resume PDF upload
* Resume text extraction
* Context-aware AI generation
* Personalized output based on resume content
* Markdown-to-HTML rendering

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │     React Frontend  │
                    │                     │
                    │  Candidate Details  │
                    │  Job Description    │
                    │  Skills             │
                    └──────────┬──────────┘
                               │
                               │ HTTP Request
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │                     │
                    │      Routes         │
                    │         ↓           │
                    │    Controllers      │
                    │         ↓           │
                    │      Services       │
                    └──────────┬──────────┘
                               │
                               │ Secure API Request
                               ▼
                    ┌─────────────────────┐
                    │    Google Gemini    │
                    │       API           │
                    └──────────┬──────────┘
                               │
                               │ Generated Content
                               ▼
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │                     │
                    │ Generated Letter    │
                    │ Copy to Clipboard   │
                    └─────────────────────┘
```

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* REST API

### AI

* Google Gemini API
* Prompt Engineering

### Additional Tools

* Git
* GitHub
* Vercel
* Postman
* Environment Variables

## 📂 Project Structure

```text
AI-Cover-Letter-Generator/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   │   └── coverLetterController.js
│   ├── routes/
│   │   └── coverLetterRoutes.js
│   ├── services/
│   │   └── geminiService.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## 🔐 Environment Variables

The Gemini API key is stored securely using environment variables and is **never exposed in the frontend or committed to GitHub**.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Make sure `.env` is included in `.gitignore`:

```gitignore
.env
node_modules/
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd AI-Cover-Letter-Generator
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend` directory:

```env
GEMINI_API_KEY=your_api_key
```

### 5. Start the backend

```bash
npm run dev
```

### 6. Start the frontend

In a separate terminal:

```bash
cd frontend
npm run dev
```

The frontend and backend can then communicate through the configured API endpoint.

## 🔄 Application Flow

1. User enters candidate information.
2. User provides the target job role and company.
3. User enters relevant skills and job description.
4. Frontend captures the information using React state.
5. Data is sent to the Express backend.
6. Backend constructs a structured AI prompt.
7. Gemini processes the prompt.
8. Generated cover letter is returned to the frontend.
9. User can review and copy the generated letter.

## 🧠 Prompt Engineering

The application dynamically constructs prompts using the user's input.

The prompt can include:

* Candidate information
* Target company
* Job role
* Technical and soft skills
* Job description
* Resume information

This allows the generated cover letter to be more relevant to the specific job instead of using a generic template.

## 🔒 Security Considerations

API credentials are handled exclusively on the backend.

The application follows these principles:

* API keys are stored in `.env`
* `.env` is excluded from Git
* API keys are never hardcoded in frontend code
* API requests to Gemini are handled server-side
* Sensitive credentials are not exposed to the browser

> **Important:** Never commit your Gemini/OpenAI API key to a public GitHub repository.

## 📈 Future Improvements

* User authentication
* Saved cover letters
* Cover-letter history
* Multiple writing styles
* Resume-to-job matching
* ATS keyword optimization
* PDF export
* Multiple AI model support
* Rate limiting
* Usage analytics
* Database integration

## 🎯 Project Objective

The primary objective of this project is to demonstrate how a traditional SaaS application can integrate Large Language Models into its backend architecture to provide dynamic, personalized content generation.

It focuses on practical AI Engineering concepts including:

* LLM API integration
* Prompt engineering
* Backend architecture
* Secure credential management
* State management
* Asynchronous AI workflows
* Document processing
* AI-powered personalization

## 👨‍💻 Author

**Priyanshu Roushan**

Computer Science & Engineering Student

---

⭐ If you find this project useful, consider giving the repository a star.
