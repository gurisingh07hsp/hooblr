// components/JobForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface Job {
  _id?: string;
  company?: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  location: string;
  type: string;
  category: string;
  department: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: string;
  };
  benefits: string[];
  skills: string[];
  experience: string;
  education: string;
  status: string;
  isRemote: boolean;
  isGovernment: boolean;
  applicationDeadline?: string;
  tags: string[];
  featured: boolean;
  urgent: boolean;
}

interface JobFormProps {
  job?: Job | null;
  onSave: (job: Job) => void;
  onCancel: () => void;
  className?: string;
}

type SkillsInputProps = {
  skills: string[];
  onAdd: (skill: string) => void;
  onRemove: (index: number) => void;
};

type BenefitsProps = {
  selectedBenefits: string[];
  availableBenefits: string[];
  onAdd: (benefit: string) => void;
  onRemove: (index: number) => void;
}

type InputProps = {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (index: number) => void;
}

const JobForm: React.FC<JobFormProps> = ({ job, onSave, onCancel, className = '' }) => {
  const { user } = useUser();
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState<Job>({
    // _id: '',
    company: '',
    title: '',
    description: '',
    requirements: '',
    responsibilities: '',
    location: '',
    type: 'Full-time',
    category: '',
    department: '',
    salary: { min: 0, max: 0, currency: 'USD', period: 'yearly' },
    benefits: [],
    skills: [],
    experience: 'Entry-level',
    education: 'bachelor',
    status: 'draft',
    isRemote: false,
    isGovernment: false,
    applicationDeadline: '',
    tags: [],
    featured: false,
    urgent: false
  });

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];
  const experienceLevels = ['Entry-level', 'Mid-level', 'Senior-level', 'Executive'];
  const educationLevels = [
    { value: 'high-school', label: 'High School' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: "Bachelor's Degree" },
    { value: 'master', label: "Master's Degree" },
    { value: 'phd', label: 'PhD' }
  ];
  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD'];
  const salaryPeriods = ['hourly', 'monthly', 'yearly'];
  const jobCategories = [
    'Software Development', 'Data Science', 'Product Management', 'Design (UI/UX)',
    'Marketing', 'Sales', 'Customer Support', 'Human Resources', 'Finance',
    'Operations', 'Engineering', 'Healthcare', 'Education', 'Legal', 'Other'
  ];
  const commonBenefits = [
    'Health Insurance', 'Dental Insurance', 'Vision Insurance', '401k/Retirement Plan',
    'Flexible Hours', 'Remote Work', 'Paid Time Off', 'Professional Development',
    'Stock Options', 'Gym Membership', 'Free Meals', 'Transportation Allowance'
  ];

  const formSteps = [
    { id: 1, name: 'Basic Info', fields: ['company','title', 'department', 'category', 'type', 'location'] },
    { id: 2, name: 'Job Details', fields: ['description', 'responsibilities', 'requirements'] },
    { id: 3, name: 'Qualifications', fields: ['experience', 'education', 'skills'] },
    { id: 4, name: 'Compensation', fields: ['salary', 'benefits'] },
    { id: 5, name: 'Settings', fields: ['status', 'applicationDeadline', 'tags', 'featured', 'urgent'] }
  ];

  useEffect(() => {
    if (job) {
      setFormData({
        ...job,
        applicationDeadline: job.applicationDeadline 
          ? new Date(job.applicationDeadline).toISOString().split('T')[0]
          : ''
      });
    }
  }, [job]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    const stepFields = formSteps[step - 1].fields;

    stepFields.forEach(field => {
      switch (field) {
        case 'company':
          if(!formData.company?.trim()) newErrors.company = 'Company is required';
          break;
        case 'title':
          if (!formData.title.trim()) newErrors.title = 'Job title is required';
          else if (formData.title.length < 3) newErrors.title = 'Job title must be at least 3 characters';
          break;
        case 'department':
          if (!formData.department.trim()) newErrors.department = 'Department is required';
          break;
        case 'category':
          if (!formData.category.trim()) newErrors.category = 'Category is required';
          break;
        case 'location':
          if (!formData.location.trim()) newErrors.location = 'Location is required';
          break;
        case 'description':
          if (!formData.description.trim()) newErrors.description = 'Job description is required';
          else if (formData.description.length < 50) newErrors.description = 'Job description should be at least 50 characters';
          break;
        case 'responsibilities':
          if (!formData.responsibilities.trim()) newErrors.responsibilities = 'Responsibilities are required';
          break;
        case 'requirements':
          if (!formData.requirements.trim()) newErrors.requirements = 'Requirements are required';
          break;
        case 'salary':
          if (formData.salary.min <= 0) newErrors.salaryMin = 'Minimum salary must be greater than 0';
          if (formData.salary.max <= 0) newErrors.salaryMax = 'Maximum salary must be greater than 0';
          if (formData.salary.min >= formData.salary.max) newErrors.salaryRange = 'Maximum salary must be greater than minimum salary';
          break;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.startsWith('salary.')) {
      const salaryField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        salary: { ...prev.salary, [salaryField]: type === 'number' ? Number(value) : value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayAdd = (field: 'benefits' | 'skills' | 'tags', value: string) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  const handleArrayRemove = (field: 'benefits' | 'skills' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < formSteps.length) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    // setLoading(true);
    // setMessage('');
    setErrors({});

    if (!isDraft) {
      let allValid = true;
      let firstInvalidStep = 1;
      
      for (let i = 1; i <= formSteps.length; i++) {
        if (!validateStep(i)) {
          allValid = false;
          if (firstInvalidStep === 1) {
            firstInvalidStep = i;
          }
        }
      }
      
      if (!allValid) {
        setCurrentStep(firstInvalidStep);
        // setMessage('Please fix the errors in the form before publishing.');
        // setLoading(false);
        return;
      }
    }

    
      const submitData = {
        ...formData,
        status: isDraft ? 'draft' : formData.status,
        applicationDeadline: formData.applicationDeadline || undefined
      };

        console.log("submit Data : ", submitData);
      // const url = job?._id ? `/api/company/jobs/${job._id}` : '/api/company/jobs';
      // const method = job?._id ? 'PUT' : 'POST';

      if(!job?._id){
        try{
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/`, submitData, {withCredentials: true});

          if (response.status == 200) {
            // setMessage(response.data.message);
            setTimeout(() => {
              // onSave(response.data.job);
            }, 1500);
          } else {
            const errorData = response.data
            // setMessage(errorData.message || `Failed to ${job?._id ? 'update' : 'create'} job`);
            if (errorData.errors) {
              setErrors(errorData.errors);
            }
          }
        } catch (error) {
            console.error('Error submitting job:', error);
            // setMessage(`An error occurred while creating the job. Please try again.`);
        } finally {
          // setLoading(false);
        }
      }
      else{
          try{
          const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/${job._id}`, submitData, {withCredentials: true});

          if (response.status == 200) {
            // setMessage(response.data.message);
            setTimeout(() => {
              // onSave(response.data.job);
            }, 1500);
          } else {
            const errorData = response.data
            // setMessage(errorData.message || `Failed to update job`);
            if (errorData.errors) {
              setErrors(errorData.errors);
            }
          }
        } catch (error) {
            console.error('Error submitting job:', error);
            // setMessage(`An error occurred while creating the job. Please try again.`);
        } finally {
          // setLoading(false);
        }
      } 
  };

  const getCompletionPercentage = () => {
    const requiredFields = [
      'title', 'department', 'category', 'location', 'description', 
      'responsibilities', 'requirements', 'salary.min', 'salary.max'
    ];
    
    let completed = 0;
    requiredFields.forEach(field => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (formData[parent as keyof Job] && (formData[parent as keyof Job] as any)[child]) {
          completed++;
        }
      } else if (formData[field as keyof Job]) {
        completed++;
      }
    });
    
    return Math.round((completed / requiredFields.length) * 100);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Company*
              </label>
              <select
                value={formData.company}
                name='company'
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.company ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option>Select Company</option>
                {user?.companies?.map((company)=>(
                  <option key={company._id} value={company._id}>{company.name}</option>
                ))}
              </select>
              {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., Senior Frontend Developer"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.department ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Engineering"
                />
                {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {jobCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.location ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., New York, NY"
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
              </div>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isRemote"
                  checked={formData.isRemote}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Remote Work Available</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isGovernment"
                  checked={formData.isGovernment}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Government Position</span>
              </label>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Job Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
              <textarea
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe the role, company culture, and what makes this opportunity unique..."
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                <p className="text-xs text-gray-500 ml-auto">{formData.description.length} characters</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Responsibilities *</label>
              <textarea
                name="responsibilities"
                rows={5}
                value={formData.responsibilities}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.responsibilities ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="• Lead development of new features&#10;• Collaborate with cross-functional teams&#10;• Mentor junior developers"
              />
              {errors.responsibilities && <p className="mt-1 text-sm text-red-600">{errors.responsibilities}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requirements *</label>
              <textarea
                name="requirements"
                rows={5}
                value={formData.requirements}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.requirements ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="• Bachelor's degree in Computer Science or related field&#10;• 5+ years of experience with React&#10;• Strong understanding of JavaScript/TypeScript"
              />
              {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Qualifications & Skills</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education Level *</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {educationLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
              <SkillsInput
                skills={formData.skills}
                onAdd={(skill) => handleArrayAdd('skills', skill)}
                onRemove={(index) => handleArrayRemove('skills', index)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Compensation & Benefits</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Salary Range *</label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Minimum</label>
                  <input
                    type="number"
                    name="salary.min"
                    value={formData.salary.min || ''}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.salaryMin ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="50000"
                    min="0"
                  />
                  {errors.salaryMin && <p className="mt-1 text-xs text-red-600">{errors.salaryMin}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Maximum</label>
                  <input
                    type="number"
                    name="salary.max"
                    value={formData.salary.max || ''}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.salaryMax ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="80000"
                    min="0"
                  />
                  {errors.salaryMax && <p className="mt-1 text-xs text-red-600">{errors.salaryMax}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Currency</label>
                  <select
                    name="salary.currency"
                    value={formData.salary.currency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Period</label>
                  <select
                    name="salary.period"
                    value={formData.salary.period}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {salaryPeriods.map(period => (
                      <option key={period} value={period}>
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {errors.salaryRange && <p className="mt-2 text-sm text-red-600">{errors.salaryRange}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
              <BenefitsSelector
                selectedBenefits={formData.benefits}
                availableBenefits={commonBenefits}
                onAdd={(benefit) => handleArrayAdd('benefits', benefit)}
                onRemove={(index) => handleArrayRemove('benefits', index)}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Additional Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">Leave empty for ongoing recruitment</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <TagsInput
                tags={formData.tags}
                onAdd={(tag) => handleArrayAdd('tags', tag)}
                onRemove={(index) => handleArrayRemove('tags', index)}
              />
            </div>

            {/* <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900">Job Promotion</h4>
              
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-purple-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Featured Job
                    <span className="block text-xs text-gray-500">Higher visibility in search results</span>
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="urgent"
                    checked={formData.urgent}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-red-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Urgent Hiring
                    <span className="block text-xs text-gray-500">Mark as urgent position</span>
                  </span>
                </label>
              </div>
            </div> */}
          </div>
        );

      default:
        return null;
    }
  };

  const SkillsInput = ({
  skills,
  onAdd,
  onRemove,
}: SkillsInputProps) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
          placeholder="Add a skill"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-gray-200 rounded-full flex items-center gap-1"
          >
            {skill}
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

const BenefitsSelector = ({
  selectedBenefits,
  availableBenefits,
  onAdd,
  onRemove,
}: BenefitsProps) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {availableBenefits.map((benefit) => (
          <button
            key={benefit}
            type="button"
            onClick={() => onAdd(benefit)}
            className={`px-2 py-1 rounded-lg border ${
              selectedBenefits.includes(benefit)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100'
            }`}
          >
            {benefit}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedBenefits.map((benefit, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-green-100 rounded-full flex items-center gap-1"
          >
            {benefit}
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

const TagsInput = ({
  tags,
  onAdd,
  onRemove,
}: InputProps) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
          placeholder="Add a tag"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-gray-200 rounded-full flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

const JobPreview = ({
  job,
  onEdit,
  onSave,
}: {
  job: any;
  onEdit: () => void;
  onSave: () => void;
}) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.description}</p>
      <p className="mt-2">
        <strong>Location:</strong> {job.location}{' '}
        {job.isRemote && '(Remote available)'}
      </p>
      <p className="mt-2">
        <strong>Salary:</strong> {job.salary.min} - {job.salary.max}{' '}
        {job.salary.currency} ({job.salary.period})
      </p>
      <p className="mt-2">
        <strong>Skills:</strong> {job.skills.join(', ')}
      </p>
      <div className="flex gap-3 mt-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Edit
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

 if (previewMode) {
    return <JobPreview job={formData} onEdit={() => setPreviewMode(false)} onSave={() => handleSubmit()} />;
  }


  return (
    <div className={`max-w-4xl mx-auto bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {job?._id ? 'Edit Job' : 'Create New Job'}
              </h1>
              <p className="text-gray-600">
                Step {currentStep} of {formSteps.length}: {formSteps[currentStep - 1].name}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
              </div>
              <span className="text-sm text-gray-500">{getCompletionPercentage()}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* <button
            type="button"
            onClick={() => setPreviewMode(true)}
            className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <EyeIcon className="w-5 h-5 mr-2" />
            Preview
          </button> */}
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
  <div className="flex items-center">
    {formSteps.map((step, index) => (
      <div key={step.id} className="flex items-center">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
            currentStep === step.id
              ? 'bg-blue-500 text-white'
              : index < currentStep - 1
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {step.id}
        </div>
        {index < formSteps.length - 1 && (
          <div className="lg:w-16 w-4 h-1 bg-gray-300 mx-2">
            <div
              className={`h-1 ${
                index < currentStep - 1 ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          </div>
        )}
      </div>
    ))}
  </div>
</div>
 <div className='px-4 py-8'>
  {renderStepContent()}
  <button onClick={handlePrevious} className='border mt-4 px-4 py-1 rounded-lg'>Prev</button>
  {currentStep == 5 ? (
    <button onClick={()=>handleSubmit()} className='ms-2 bg-green-600 px-4 py-1 rounded-lg text-white'>Submit</button>
  ) : (
    <button onClick={handleNext} className='ms-2 bg-blue-600 px-4 py-1 rounded-lg text-white'>Next</button>
  )}
  </div>

</div> 
  )}
  export default JobForm