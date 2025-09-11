const mongoose = require('mongoose');
const User = require('./models/User');
const Job = require('./models/Job');
const BlogPost = require('./models/BlogPost');

// Test database connection
async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hooblr', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

// Test models
async function testModels() {
  try {
    console.log('\n🧪 Testing Models...');
    
    // Test User model
    const userCount = await User.countDocuments();
    console.log(`✅ User model: ${userCount} users found`);
    
    // Test Job model
    const jobCount = await Job.countDocuments();
    console.log(`✅ Job model: ${jobCount} jobs found`);
    
    // Test BlogPost model
    const blogCount = await BlogPost.countDocuments();
    console.log(`✅ BlogPost model: ${blogCount} blog posts found`);
    
  } catch (error) {
    console.error('❌ Model test failed:', error);
  }
}

// Test sample data creation
async function createSampleData() {
  try {
    console.log('\n📝 Creating sample data...');
    
    // Check if sample data already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('✅ Sample data already exists');
      return;
    }
    
    // Create sample user
    const sampleUser = new User({
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        location: 'New York, NY',
        bio: 'Experienced software developer',
        skills: ['JavaScript', 'React', 'Node.js'],
        experience: '5+ years',
        education: 'Bachelor'
      },
      isVerified: true,
      isActive: true
    });
    
    await sampleUser.save();
    console.log('✅ Sample user created');
    
    // Create sample company
    const sampleCompany = new User({
      email: 'company@example.com',
      password: 'password123',
      role: 'company',
      company: {
        name: 'Tech Corp',
        size: '51-200',
        industry: 'technology',
        website: 'https://techcorp.com',
        description: 'Leading technology company',
        location: 'San Francisco, CA'
      },
      isVerified: true,
      isActive: true
    });
    
    await sampleCompany.save();
    console.log('✅ Sample company created');
    
    // Create sample job
    const sampleJob = new Job({
      title: 'Senior Software Engineer',
      company: sampleCompany._id,
      description: 'We are looking for a senior software engineer...',
      requirements: '5+ years of experience with JavaScript, React, Node.js',
      responsibilities: 'Develop and maintain web applications...',
      location: 'San Francisco, CA',
      type: 'full-time',
      category: 'technology',
      department: 'Engineering',
      salary: {
        min: 120000,
        max: 180000,
        currency: 'USD',
        period: 'yearly'
      },
      benefits: ['Health insurance', '401k', 'Remote work'],
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      experience: 'senior',
      education: 'bachelor',
      status: 'active',
      isRemote: true,
      isGovernment: false,
      featured: true
    });
    
    await sampleJob.save();
    console.log('✅ Sample job created');
    
    // Create sample blog post
    const sampleBlogPost = new BlogPost({
      title: 'How to Ace Your Job Interview',
      slug: 'how-to-ace-your-job-interview',
      author: sampleUser._id,
      content: 'Job interviews can be nerve-wracking...',
      excerpt: 'Learn the best strategies to prepare for and succeed in job interviews.',
      category: 'Interview Tips',
      tags: ['interview', 'career', 'tips'],
      featuredImage: 'https://example.com/image.jpg',
      status: 'published',
      publishedAt: new Date(),
      featured: true,
      readTime: 5
    });
    
    await sampleBlogPost.save();
    console.log('✅ Sample blog post created');
    
    console.log('✅ All sample data created successfully');
    
  } catch (error) {
    console.error('❌ Sample data creation failed:', error);
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting backend tests...\n');
  
  await testConnection();
  await testModels();
  await createSampleData();
  
  console.log('\n✅ All tests completed successfully!');
  console.log('\n📋 Backend is ready to use!');
  console.log('🌐 API will be available at: http://localhost:5000');
  console.log('📚 Check server/README.md for API documentation');
  
  // Close database connection
  await mongoose.connection.close();
  process.exit(0);
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('❌ Test failed:', error);
    process.exit(1);
  });
}

module.exports = { runTests }; 