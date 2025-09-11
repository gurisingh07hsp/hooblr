# Backend Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/hooblr
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start MongoDB**
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud service)
   - Make sure MongoDB is running on port 27017

4. **Run Tests**
   ```bash
   npm run test:server
   ```

5. **Start the Server**
   ```bash
   # Development (with auto-restart)
   npm run dev:server
   
   # Production
   npm run server
   ```

## API Testing

Once the server is running, you can test the API endpoints:

### Test Authentication
```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "role": "user",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Jobs API
```bash
# Get all jobs
curl http://localhost:5000/api/jobs

# Get job categories
curl http://localhost:5000/api/jobs/categories

# Search jobs
curl "http://localhost:5000/api/jobs/search?q=software&location=San%20Francisco"
```

### Test Blog API
```bash
# Get all blog posts
curl http://localhost:5000/api/blog

# Get blog categories
curl http://localhost:5000/api/blog/categories
```

## Sample Data

The test script creates sample data including:
- Test user (test@example.com / password123)
- Test company (company@example.com / password123)
- Sample job posting
- Sample blog post

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running
- Check if the connection string is correct
- For local MongoDB: `mongodb://localhost:27017/hooblr`
- For MongoDB Atlas: Use the connection string from your cluster

### Port Already in Use
- Change the PORT in your .env file
- Or kill the process using the port: `lsof -ti:5000 | xargs kill -9`

### JWT Issues
- Make sure JWT_SECRET is set in your .env file
- Use a strong, unique secret in production

## Production Deployment

1. **Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your-production-mongodb-uri
   JWT_SECRET=your-very-secure-jwt-secret
   FRONTEND_URL=https://your-frontend-domain.com
   ```

2. **Security Considerations**
   - Use HTTPS in production
   - Set up proper CORS configuration
   - Use environment variables for all secrets
   - Set up monitoring and logging

3. **Database**
   - Use MongoDB Atlas or a managed MongoDB service
   - Set up database backups
   - Configure proper indexes for performance

4. **Process Management**
   - Use PM2: `npm install -g pm2`
   - Start with: `pm2 start server/index.js --name hooblr-api`
   - Monitor with: `pm2 monit`

## API Documentation

Complete API documentation is available in `server/README.md`

## Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify your environment variables
3. Ensure MongoDB is running and accessible
4. Check the API documentation for correct endpoint usage 