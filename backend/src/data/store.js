// Simple in-memory store for demo purposes

const companies = [
  { _id: 'comp1', name: 'City Police Department', location: 'New York, NY', description: 'Serving and protecting.' },
  { _id: 'comp2', name: 'Federal Bureau of Investigation', location: 'Washington, DC', description: 'Federal agency.' }
];

const jobs = [
  {
    _id: '1',
    title: 'Police Officer',
    company: companies[0],
    description: 'Maintain law and order; respond to emergencies.',
    requirements: 'HS diploma, academy training, fitness',
    responsibilities: 'Patrol, respond, investigate, report',
    location: 'New York, NY',
    type: 'full-time',
    category: 'law-enforcement',
    department: 'Law Enforcement',
    salary: { min: 65000, max: 85000, currency: 'USD', period: 'yearly' },
    benefits: ['Health Insurance', 'Pension', 'Job Security'],
    skills: ['Law Enforcement', 'Communication', 'Fitness'],
    experience: 'entry',
    education: 'high-school',
    status: 'active',
    isRemote: false,
    isGovernment: true,
    featured: true,
    urgent: true,
    views: 25,
    applications: [],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'FBI Special Agent',
    company: companies[1],
    description: 'Investigate federal crimes and protect national security.',
    requirements: "Bachelor's, fitness, clearance",
    responsibilities: 'Investigate, collect evidence, collaborate',
    location: 'Washington, DC',
    type: 'full-time',
    category: 'law-enforcement',
    department: 'Federal Investigations',
    salary: { min: 85000, max: 120000, currency: 'USD', period: 'yearly' },
    benefits: ['Federal Benefits', 'Pension', 'Travel'],
    skills: ['Investigation', 'Analysis', 'Firearms'],
    experience: 'mid',
    education: 'bachelor',
    status: 'active',
    isRemote: false,
    isGovernment: true,
    featured: true,
    urgent: false,
    views: 14,
    applications: [],
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const blog = [
  { _id: 'b1', title: 'Interview Tips', excerpt: 'Prepare smart.', content: '...', status: 'published', views: 50, createdAt: new Date().toISOString() },
  { _id: 'b2', title: 'Top Government Jobs', excerpt: 'Trending roles', content: '...', status: 'published', views: 30, createdAt: new Date().toISOString() }
];

const users = [
  { _id: 'u1', email: 'demo@example.com', role: 'user', profile: { firstName: 'Demo', lastName: 'User' }, createdAt: new Date().toISOString() }
];

module.exports = { companies, jobs, blog, users };


