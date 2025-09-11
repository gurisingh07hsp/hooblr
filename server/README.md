# Hooblr Backend API

This is the backend API for the Hooblr job board platform, built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Registration, login, profile management for users and companies
- **Job Management**: CRUD operations for job postings with advanced filtering
- **Blog System**: Content management for blog posts with comments
- **Admin Panel**: Comprehensive admin dashboard with analytics
- **Security**: Rate limiting, CORS, helmet, input validation

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/hooblr

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start MongoDB**:
   Make sure MongoDB is running on your system or use a cloud instance.

## Running the Server

### Development
```bash
npm run dev:server
```

### Production
```bash
npm run server
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### Jobs
- `GET /api/jobs` - Get all jobs with filters
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job (Company/Admin only)
- `PUT /api/jobs/:id` - Update job (Owner/Admin only)
- `DELETE /api/jobs/:id` - Delete job (Owner/Admin only)
- `POST /api/jobs/:id/apply` - Apply for job (User only)
- `GET /api/jobs/my-applications` - Get user's applications
- `GET /api/jobs/my-jobs` - Get company's posted jobs

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `GET /api/companies/:id/jobs` - Get company's jobs

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get blog post by slug
- `POST /api/blog` - Create blog post (Admin only)
- `PUT /api/blog/:id` - Update blog post (Admin only)
- `DELETE /api/blog/:id` - Delete blog post (Admin only)
- `POST /api/blog/:id/comment` - Add comment to blog post
- `GET /api/blog/categories` - Get blog categories

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/upload-avatar` - Upload avatar
- `POST /api/users/upload-resume` - Upload resume (User only)
- `GET /api/users/:id` - Get user by ID (public profile)
- `GET /api/users/stats` - Get user statistics

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard stats
- `GET /api/admin/users` - Get all users (admin view)
- `PUT /api/admin/users/:id/status` - Update user status
- `GET /api/admin/jobs` - Get all jobs (admin view)
- `PUT /api/admin/jobs/:id/status` - Update job status
- `GET /api/admin/blog` - Get all blog posts (admin view)
- `PUT /api/admin/blog/:id/status` - Update blog post status
- `GET /api/admin/analytics` - Get analytics data

## Database Models

### User Model
- Email, password, role (user/company/admin)
- Profile information (for users)
- Company information (for companies)
- Verification and activity status
- Preferences and settings

### Job Model
- Title, description, requirements, responsibilities
- Location, type, category, department
- Salary range and benefits
- Experience and education requirements
- Status and application tracking
- Views and analytics

### BlogPost Model
- Title, content, excerpt, slug
- Author, category, tags
- Featured image and SEO metadata
- Status (draft/published/archived)
- Views, likes, comments
- Publication tracking

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Authorization**: Different access levels for users, companies, and admins
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: Prevents abuse with express-rate-limit
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet**: Security headers with helmet middleware
- **Password Hashing**: Bcrypt for secure password storage

## Error Handling

The API includes comprehensive error handling:
- Validation errors with detailed messages
- Authentication and authorization errors
- Database operation errors
- Custom error responses for different scenarios

## Development

### File Structure
```
server/
├── index.js              # Main server file
├── middleware/
│   └── auth.js          # Authentication middleware
├── models/
│   ├── User.js          # User model
│   ├── Job.js           # Job model
│   └── BlogPost.js      # Blog post model
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── jobs.js          # Job management routes
│   ├── companies.js     # Company routes
│   ├── blog.js          # Blog routes
│   ├── users.js         # User management routes
│   └── admin.js         # Admin panel routes
└── README.md            # This file
```

### Adding New Features

1. **Create Model**: Add new model in `models/` directory
2. **Create Routes**: Add new route file in `routes/` directory
3. **Update Server**: Register new routes in `index.js`
4. **Add Validation**: Include proper validation using express-validator
5. **Add Authorization**: Use appropriate middleware for access control

## Production Deployment

1. **Environment Variables**: Set proper production values
2. **Database**: Use production MongoDB instance
3. **Security**: Change JWT secret and other sensitive values
4. **Monitoring**: Add logging and monitoring
5. **SSL**: Configure HTTPS
6. **PM2**: Use PM2 for process management

## Testing

The API can be tested using tools like:
- Postman
- Insomnia
- curl commands
- Frontend application

## Support

For issues or questions, please refer to the main project documentation or create an issue in the repository. 