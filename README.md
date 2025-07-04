# 📝 Mini Product Feedback Board

A simplified version of tools like Canny or Upvoty, where users can submit feedback, upvote others' suggestions, and view updates by status. Admins can manage feedback statuses for transparency and tracking.

---

## 📌 Project Details

This full-stack web application allows:

- ✅ Users to submit product feedback or feature requests  
- ✅ Users to upvote existing feedback  
- ✅ Everyone to view feedback by status (Open, Planned, In Progress, Done)  
- ✅ Admins to change status of feedback (status control)  
- ✅ Optional comment thread per feedback  
- ✅ Login functionality for users (mock auth with localStorage)

Live Links:  
🔹 Frontend: [Netlify Deployment](https://elegant-dango-a46668.netlify.app)  
🔹 Backend: [Render Deployment](https://mini-product-feedback-board.onrender.com)

---

## ✨ Features

### 🧑‍💻 User Features:
- Submit new feedback with title, description, and category
- View all feedback with filters (status/category) and sort options
- Upvote suggestions (once per user/session)
- Comment on feedback
- Responsive design (Tailwind CSS)

### 🛠️ Admin Features:
- Toggle feedback status directly from card
- Status options: `Open`, `Planned`, `In Progress`, `Done`
- Admin login to enable status control

---

## 🧰 Tech Stack

### 💻 Frontend:
- React.js
- React Router DOM
- Tailwind CSS
- Axios for API calls
- LocalStorage for mock login state

### 🌐 Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS & dotenv configuration

### ☁️ Deployment:
- Frontend: Netlify
- Backend: Render

---

## 🧪 Local Setup

### 🖥️ Clone the repo
```bash
git clone https://github.com/swethannadhurai/mini-product-feedback-board.git
cd mini-product-feedback-board
