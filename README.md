# Resume Builder

A full-stack web application for creating, customizing, and downloading professional resumes. Users can select from multiple templates, choose color palettes, upload profile and project photos, and download their resume as a PDF.

---

## 🚀 Live Demo
- **Frontend:** [https://resume-builder-project-f3yn.vercel.app/](https://resume-builder-project-f3yn.vercel.app/)

- **Backend API:** [https://resume-builder-project-5m45.onrender.com](https://resume-builder-project-5m45.onrender.com)

---

## Features
- User authentication (sign up, login)
- Create, edit, and delete resumes
- Multiple professional resume templates
- Customizable color palettes
- Upload profile and project photos
- Live resume preview
- Download resume as PDF
- Responsive, modern UI

---

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios, jsPDF, html2canvas
- **Backend:** Node.js, Express, MongoDB, Mongoose, Multer, JWT, CORS

---

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../Frontend/Resume-Builder
npm install
```
Create a `.env` file in the `Frontend/Resume-Builder` folder:
```
VITE_API_URL=http://localhost:5000
```
Start the frontend dev server:
```bash
npm run dev
```

---

## Production Deployment

- **Frontend:** Build with `npm run build` and deploy the `dist` folder to Vercel, Netlify, or your static host.
- **Backend:** Deploy to a VPS, Render, Railway, or similar. Use PM2 or a process manager for production.
- **Uploads:**
  - On VPS: `/uploads` folder must be writable and persistent.
  - On Heroku/Vercel: Use AWS S3 or similar for file uploads (see backend code for integration).
- **Environment Variables:** Set all `.env` variables in your production environment.
- **CORS:** Ensure `CLIENT_URL` in backend `.env` matches your deployed frontend URL.

---

## API Endpoints (Backend)
- `POST /api/auth/signup` — Register
- `POST /api/auth/login` — Login
- `GET /api/resume/:id` — Get resume by ID
- `POST /api/resume/` — Create resume
- `PUT /api/resume/:id` — Update resume
- `DELETE /api/resume/:id` — Delete resume
- `PUT /api/resume/upload-images/:id` — Upload profile/project images

---

## Contribution Guidelines
1. Fork the repo and create your branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -am 'Add new feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Create a new Pull Request

---

## License
This project is licensed under the MIT License.
