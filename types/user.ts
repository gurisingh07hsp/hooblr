export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  role: 'user' | 'company' | 'admin';
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
  company?: {
    name?: string;
    size?: '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
    industry?: string;
    website?: string;
    description?: string;
    logo?: string;
    location?: string;
  };
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
export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  role: 'user' | 'company' | 'admin';
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
  company?: {
    name?: string;
    size?: '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
    industry?: string;
    website?: string;
    description?: string;
    logo?: string;
    location?: string;
  };
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

// Common status type helper


