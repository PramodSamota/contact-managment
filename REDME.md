# Contact Management Web Application

A full-stack MERN application for managing contacts with a modern, responsive UI built with React, Vite, and Tailwind CSS.

## 🚀 Features

- ✅ Create, Read, and Delete contacts
- ✅ Real-time form validation
- ✅ Responsive design with Tailwind CSS
- ✅ Search and sort functionality
- ✅ Toast notifications
- ✅ Clean, production-ready code structure
- ✅ Error handling and loading states
- ✅ RESTful API design
- ✅ MongoDB database with Mongoose ODM

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM library
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
contact-management-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ContactList.jsx
│   │   │   ├── ContactItem.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── Loader.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── hooks/
│   │   │   ├── useContacts.js
│   │   │   └── useToast.js
│   │   ├── utils/
│   │   │   └── validation.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   └── Contact.js
│   │   ├── controllers/
│   │   │   └── contactController.js
│   │   ├── routes/
│   │   │   └── contactRoutes.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── validator.js
│   │   ├── utils/
│   │   │   └── asyncHandler.js
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🔧 Installation

### 1. Clone or Create Project Directory

```bash
mkdir contact-management-app
cd contact-management-app
```

### 2. Backend Setup

```bash
# Create backend directory
mkdir backend
cd backend

# Initialize package.json
npm init -y

# Install dependencies
npm install express mongoose dotenv cors

# Install dev dependencies
npm install -D nodemon

# Create folder structure
mkdir -p src/config src/models src/controllers src/routes src/middleware src/utils
```

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/contact_management
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Update `backend/package.json`:

```json
{
  "name": "contact-management-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

### 3. Frontend Setup

```bash
# Navigate back to root
cd ..

# Create frontend with Vite
npm create vite@latest frontend -- --template react
cd frontend

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install additional packages
npm install axios lucide-react
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Create `frontend/tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
    },
  },
  plugins: [],
};
```

### 4. MongoDB Setup

#### Option A: Local MongoDB

```bash
# Start MongoDB service
mongod

# Or on macOS with Homebrew
brew services start mongodb-community
```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env`

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Server will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Application will open at `http://localhost:5173`

## 📚 API Endpoints

### Contacts

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/api/contacts`     | Get all contacts   |
| GET    | `/api/contacts/:id` | Get single contact |
| POST   | `/api/contacts`     | Create new contact |
| PUT    | `/api/contacts/:id` | Update contact     |
| DELETE | `/api/contacts/:id` | Delete contact     |

### Request/Response Examples

#### Create Contact

```bash
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Hello, I'd like to connect!"
}
```

Response:

```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "_id": "65abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "Hello, I'd like to connect!",
    "createdAt": "2024-01-08T10:30:00.000Z",
    "updatedAt": "2024-01-08T10:30:00.000Z"
  }
}
```

## 🎨 Key Features Explained

### Frontend

#### Form Validation

- Real-time validation with error messages
- Required fields: Name, Email, Phone
- Email format validation
- Phone number format validation
- Submit button disabled when form is invalid

#### State Management

- Custom hooks for contacts and toasts
- useState for local component state
- No external state management needed

#### UI/UX Features

- Responsive design (mobile, tablet, desktop)
- Search functionality
- Sort by date (newest/oldest)
- Toast notifications for success/error
- Loading states
- Smooth animations

### Backend

#### Architecture

- MVC pattern (Model-View-Controller)
- Separation of concerns
- Middleware for validation and error handling
- Async error handling wrapper
- RESTful API design

#### Database

- Mongoose schemas with validation
- Indexed fields for performance
- Timestamps for created/updated dates
- Virtual fields

#### Error Handling

- Global error handler
- Validation errors
- Database errors
- Custom error messages

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Create Contact**

   - Fill all required fields
   - Try submitting with empty fields
   - Try invalid email format
   - Try invalid phone format

2. **View Contacts**

   - Check if contacts display correctly
   - Verify date formatting

3. **Search Contacts**

   - Search by name
   - Search by email
   - Search by phone

4. **Sort Contacts**

   - Toggle between newest/oldest

5. **Delete Contact**
   - Confirm deletion dialog
   - Verify contact is removed

## 🔒 Security Considerations

- Input validation on both client and server
- CORS configuration
- Environment variables for sensitive data
- MongoDB injection prevention with Mongoose
- Error messages don't expose system details

## 🚀 Production Deployment

### Backend (Node.js)

1. **Environment Variables**

   ```env
   PORT=5000
   MONGODB_URI=your_production_mongodb_uri
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-domain.com
   ```

2. **Hosting Options**
   - Heroku
   - Railway
   - Render
   - AWS EC2
   - DigitalOcean

### Frontend (React)

1. **Build**

   ```bash
   cd frontend
   npm run build
   ```

2. **Hosting Options**
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

### Database

- MongoDB Atlas (recommended for production)
- Self-hosted MongoDB

## 📝 Environment Variables Reference

### Backend `.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/contact_management
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## 🛠️ Development Tools

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- MongoDB for VS Code

## 📖 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

## 🤝 Contributing

This is an interview task project, but suggestions and improvements are welcome!

## 📄 License

MIT

## 👨‍💻 Author

## Pramod Samota

Created as an interview task for Web Developer position

---

**Built with ❤️ using MERN Stack**
