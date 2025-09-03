# Task Management API Server

A production-ready Node.js Express MongoDB server with JWT authentication for task management applications.

## Features

- **Authentication**: JWT-based auth with secure HTTP-only cookies
- **Task Management**: Complete CRUD operations for tasks
- **Security**: Helmet, CORS, rate limiting, input validation
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Comprehensive input validation and sanitization
- **Error Handling**: Global error handling with detailed responses

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PATCH /api/auth/update-password` - Update password

### Tasks
- `GET /api/tasks` - Get all user tasks (with filtering, sorting, pagination)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

## Environment Variables

Create a `.env` file with:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
COOKIE_SECRET=your-super-secret-cookie-key
CLIENT_URL=http://localhost:3000
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env` file

3. Start MongoDB service

4. Run the development server:
```bash
npm run dev
```

5. For production:
```bash
npm start
```

## Deployment

The server is ready for deployment on platforms like Vercel, Heroku, or any Node.js hosting service. Make sure to:

1. Set environment variables in your hosting platform
2. Use a cloud MongoDB service (MongoDB Atlas recommended)
3. Update `CLIENT_URL` to your frontend domain
4. Set `NODE_ENV=production`

## Security Features

- Password hashing with bcrypt
- JWT tokens stored in HTTP-only cookies
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- CORS protection
- Helmet security headers
- Environment-based configuration