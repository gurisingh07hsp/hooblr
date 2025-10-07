export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  profile?: {
    name?: string;
    phone?: string;
    location?: string;
    bio?: string;
    skills?: string[];
    experience?: string;
    education?: string;
    resume?: string;
    avatar?: string;
  };
  companies?: Company[];
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  preferences?: {
    jobAlerts: boolean;
    emailNotifications: boolean;
  };
  savedJobs?: string[]; // Array of Job IDs
  jobAlerts?: {
    keywords?: string;
    location?: string;
    category?: string;
    type?: 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
    frequency?: 'daily' | 'weekly' | 'monthly';
    isActive?: boolean;
    createdAt?: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Company {
  _id: string;
  name: string;
  companyemail: string;
  companyowner: string;
  size: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+";
  industry: string;
  website?: string;
  description?: string;
  logo?: string;
  location?: string;
}

export interface Job {
  _id: string;
  title: string;
  company: {logo: string, name: string};
  location: string;
  type: string;
  salary: {min: string, max: string, currency: string, period: string};
  description: string;
  requirements: string[];
  benefits: string[];
  posted: string;
  category: string;
  urgent?: boolean;
  featured?: boolean;
  companyLogo?: string;
  rating?: number;
  experience: string;
  education: string;
  applications: [];
  createdAt: Date;
}

export interface User {
  _id: string;
  email: string;
  role: "user" | "company" | "admin";
  profile?: {
    name: string;
    phone?: string;
    location?: string;
    bio?: string;
    skills?: string[];
    experience?: string;
    education?: string;
    resume?: string;
    avatar?: string;
  };
  company?: Company;
  savedJobs: string[],
}

// Common status type helper


