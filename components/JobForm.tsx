// components/JobForm.tsx
'use client';

import { useEffect } from 'react';
// import { useUser } from '@/context/UserContext';
import { 
  XMarkIcon, 
//   PlusIcon, 
//   MinusIcon,
  EyeIcon,
//   DocumentCheckIcon 
} from '@heroicons/react/24/outline';

interface Job {
  _id?: string;
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
  job?: Job | null | undefined;
//   onSave: (job: Job) => void;
  onCancel: () => void;
  className?: string;
}

// interface FormErrors {
//   [key: string]: string;
// }

const JobForm: React.FC<JobFormProps> = ({ 
  job, 
//   onSave, 
  onCancel, 
  className = '' 
}) => {
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [currentStep, setCurrentStep] = useState(1);
// //   const [previewMode, setPreviewMode] = useState(false);

//   const [formData, setFormData] = useState<Job>({
//     title: '',
//     description: '',
//     requirements: '',
//     responsibilities: '',
//     location: '',
//     type: 'Full-time',
//     category: '',
//     department: '',
//     salary: {
//       min: 0,
//       max: 0,
//       currency: 'USD',
//       period: 'yearly'
//     },
//     benefits: [],
//     skills: [],
//     experience: 'Entry-level',
//     education: 'bachelor',
//     status: 'draft',
//     isRemote: false,
//     isGovernment: false,
//     applicationDeadline: '',
//     tags: [],
//     featured: false,
//     urgent: false
//   });

//   // Form configuration
//   const jobTypes = [
//     'Full-time', 
//     'Part-time', 
//     'Contract', 
//     'Temporary', 
//     'Internship'
//   ];

//   const experienceLevels = [
//     'Entry-level', 
//     'Mid-level', 
//     'Senior-level', 
//     'Executive'
//   ];

//   const educationLevels = [
//     { value: 'high-school', label: 'High School' },
//     { value: 'associate', label: 'Associate Degree' },
//     { value: 'bachelor', label: "Bachelor's Degree" },
//     { value: 'master', label: "Master's Degree" },
//     { value: 'phd', label: 'PhD' }
//   ];

//   const currencies = ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD'];
//   const salaryPeriods = ['hourly', 'monthly', 'yearly'];

//   const jobCategories = [
//     'Software Development',
//     'Data Science',
//     'Product Management',
//     'Design (UI/UX)',
//     'Marketing',
//     'Sales',
//     'Customer Support',
//     'Human Resources',
//     'Finance',
//     'Operations',
//     'Engineering',
//     'Healthcare',
//     'Education',
//     'Legal',
//     'Other'
//   ];

//   const commonBenefits = [
//     'Health Insurance',
//     'Dental Insurance',
//     'Vision Insurance',
//     '401k/Retirement Plan',
//     'Flexible Hours',
//     'Remote Work',
//     'Paid Time Off',
//     'Professional Development',
//     'Stock Options',
//     'Gym Membership',
//     'Free Meals',
//     'Transportation Allowance',
//     'Life Insurance',
//     'Maternity/Paternity Leave'
//   ];

//   const formSteps = [
//     { id: 1, name: 'Basic Info', fields: ['title', 'department', 'category', 'type', 'location'] },
//     { id: 2, name: 'Job Details', fields: ['description', 'responsibilities', 'requirements'] },
//     { id: 3, name: 'Qualifications', fields: ['experience', 'education', 'skills'] },
//     { id: 4, name: 'Compensation', fields: ['salary', 'benefits'] },
//     { id: 5, name: 'Settings', fields: ['status', 'applicationDeadline', 'tags', 'featured', 'urgent'] }
//   ];

  useEffect(() => {
    if (job) {
    //   setFormData({
    //     ...job,
    //     applicationDeadline: job.applicationDeadline 
    //       ? new Date(job.applicationDeadline).toISOString().split('T')[0]
    //       : ''
    //   });
    }
  }, [job]);

  // Validation functions
//   const validateStep = (step: number): boolean => {
//     const newErrors: FormErrors = {};
//     const stepFields = formSteps[step - 1].fields;

//     stepFields.forEach(field => {
//       switch (field) {
//         case 'title':
//           if (!formData.title.trim()) {
//             newErrors.title = 'Job title is required';
//           } else if (formData.title.length < 3) {
//             newErrors.title = 'Job title must be at least 3 characters';
//           }
//           break;
//         case 'department':
//           if (!formData.department.trim()) {
//             newErrors.department = 'Department is required';
//           }
//           break;
//         case 'category':
//           if (!formData.category.trim()) {
//             newErrors.category = 'Category is required';
//           }
//           break;
//         case 'location':
//           if (!formData.location.trim()) {
//             newErrors.location = 'Location is required';
//           }
//           break;
//         case 'description':
//           if (!formData.description.trim()) {
//             newErrors.description = 'Job description is required';
//           } else if (formData.description.length < 50) {
//             newErrors.description = 'Job description should be at least 50 characters';
//           }
//           break;
//         case 'responsibilities':
//           if (!formData.responsibilities.trim()) {
//             newErrors.responsibilities = 'Responsibilities are required';
//           }
//           break;
//         case 'requirements':
//           if (!formData.requirements.trim()) {
//             newErrors.requirements = 'Requirements are required';
//           }
//           break;
//         case 'salary':
//           if (formData.salary.min <= 0) {
//             newErrors.salaryMin = 'Minimum salary must be greater than 0';
//           }
//           if (formData.salary.max <= 0) {
//             newErrors.salaryMax = 'Maximum salary must be greater than 0';
//           }
//           if (formData.salary.min >= formData.salary.max) {
//             newErrors.salaryRange = 'Maximum salary must be greater than minimum salary';
//           }
//           break;
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
    
//     if (type === 'checkbox') {
//       const checked = (e.target as HTMLInputElement).checked;
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else if (name.startsWith('salary.')) {
//       const salaryField = name.split('.')[1];
//       setFormData(prev => ({
//         ...prev,
//         salary: { 
//           ...prev.salary, 
//           [salaryField]: type === 'number' ? Number(value) : value 
//         }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleArrayAdd = (field: 'benefits' | 'skills' | 'tags', value: string) => {
//     if (value.trim() && !formData[field].includes(value.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         [field]: [...prev[field], value.trim()]
//       }));
//     }
//   };

//   const handleArrayRemove = (field: 'benefits' | 'skills' | 'tags', index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index)
//     }));
//   };

//   const handleNext = () => {
//     if (validateStep(currentStep)) {
//       if (currentStep < formSteps.length) {
//         setCurrentStep(prev => prev + 1);
//       }
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep(prev => prev - 1);
//     }
//   };

//   const handleSubmit = async (isDraft: boolean = false) => {
//     setLoading(true);
//     setMessage('');

//     // Validate all steps for final submission
//     if (!isDraft) {
//       let allValid = true;
//       for (let i = 1; i <= formSteps.length; i++) {
//         if (!validateStep(i)) {
//           allValid = false;
//           setCurrentStep(i);
//           break;
//         }
//       }
//       if (!allValid) {
//         // setLoading(false);
//         return;
//       }
//     }

//     try {
//       const submitData = {
//         ...formData,
//         status: isDraft ? 'draft' : formData.status,
//         applicationDeadline: formData.applicationDeadline || undefined
//       };

//       const url = job?._id 
//         ? `/api/company/jobs/${job._id}`
//         : '/api/company/jobs';
      
//       const method = job?._id ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(submitData),
//       });

//       if (response.ok) {
//         const savedJob = await response.json();
//         // setMessage(`Job ${job?._id ? 'updated' : 'created'} successfully!`);
//         setTimeout(() => {
//         //   onSave(savedJob);
//         }, 1000);
//       } else {
//         const errorData = await response.json();
//         // setMessage(errorData.message || `Failed to ${job?._id ? 'update' : 'create'} job`);
//       }
//     } catch (error) {
//     //   setMessage(`An error occurred while ${job?._id ? 'updating' : 'creating'} job`);
//     } finally {
//     //   setLoading(false);
//     }
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Job Title *
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.title ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="e.g., Senior Frontend Developer"
//               />
//               {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Department *
//                 </label>
//                 <input
//                   type="text"
//                   name="department"
//                   value={formData.department}
//                   onChange={handleInputChange}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                     errors.department ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                   placeholder="e.g., Engineering"
//                 />
//                 {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category *
//                 </label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                     errors.category ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                 >
//                   <option value="">Select a category</option>
//                   {jobCategories.map(category => (
//                     <option key={category} value={category}>{category}</option>
//                   ))}
//                 </select>
//                 {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Employment Type *
//                 </label>
//                 <select
//                   name="type"
//                   value={formData.type}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {jobTypes.map(type => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Location *
//                 </label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                   className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                     errors.location ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                   placeholder="e.g., New York, NY"
//                 />
//                 {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
//               </div>
//             </div>

//             <div className="flex gap-6">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="isRemote"
//                   checked={formData.isRemote}
//                   onChange={handleInputChange}
//                   className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">Remote Work Available</span>
//               </label>
              
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="isGovernment"
//                   checked={formData.isGovernment}
//                   onChange={handleInputChange}
//                   className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">Government Position</span>
//               </label>
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-lg font-medium text-gray-900">Job Details</h3>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Job Description *
//               </label>
//               <textarea
//                 name="description"
//                 rows={6}
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.description ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="Describe the role, company culture, and what makes this opportunity unique..."
//               />
//               <div className="flex justify-between items-center mt-1">
//                 {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
//                 <p className="text-xs text-gray-500 ml-auto">
//                   {formData.description.length} characters
//                 </p>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Key Responsibilities *
//               </label>
//               <textarea
//                 name="responsibilities"
//                 rows={5}
//                 value={formData.responsibilities}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.responsibilities ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="• Lead development of new features&#10;• Collaborate with cross-functional teams&#10;• Mentor junior developers"
//               />
//               {errors.responsibilities && <p className="mt-1 text-sm text-red-600">{errors.responsibilities}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Requirements *
//               </label>
//               <textarea
//                 name="requirements"
//                 rows={5}
//                 value={formData.requirements}
//                 onChange={handleInputChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.requirements ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="• Bachelor's degree in Computer Science or related field&#10;• 5+ years of experience with React&#10;• Strong understanding of JavaScript/TypeScript"
//               />
//               {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-lg font-medium text-gray-900">Qualifications & Skills</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Experience Level *
//                 </label>
//                 <select
//                   name="experience"
//                   value={formData.experience}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {experienceLevels.map(level => (
//                     <option key={level} value={level}>{level}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Education Level *
//                 </label>
//                 <select
//                   name="education"
//                   value={formData.education}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {educationLevels.map(level => (
//                     <option key={level.value} value={level.value}>{level.label}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Required Skills
//               </label>
//               {/* <SkillsInput
//                 skills={formData.skills}
//                 onAdd={(skill) => handleArrayAdd('skills', skill)}
//                 onRemove={(index) => handleArrayRemove('skills', index)}
//               /> */}
//             </div>
//           </div>
//         );

//       case 4:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-lg font-medium text-gray-900">Compensation & Benefits</h3>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-4">
//                 Salary Range *
//               </label>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Minimum
//                   </label>
//                   <input
//                     type="number"
//                     name="salary.min"
//                     value={formData.salary.min || ''}
//                     onChange={handleInputChange}
//                     className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                       errors.salaryMin ? 'border-red-300' : 'border-gray-300'
//                     }`}
//                     placeholder="50000"
//                     min="0"
//                   />
//                   {errors.salaryMin && <p className="mt-1 text-xs text-red-600">{errors.salaryMin}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Maximum
//                   </label>
//                   <input
//                     type="number"
//                     name="salary.max"
//                     value={formData.salary.max || ''}
//                     onChange={handleInputChange}
//                     className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                       errors.salaryMax ? 'border-red-300' : 'border-gray-300'
//                     }`}
//                     placeholder="80000"
//                     min="0"
//                   />
//                   {errors.salaryMax && <p className="mt-1 text-xs text-red-600">{errors.salaryMax}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Currency
//                   </label>
//                   <select
//                     name="salary.currency"
//                     value={formData.salary.currency}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     {currencies.map(currency => (
//                       <option key={currency} value={currency}>{currency}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                     Period
//                   </label>
//                   <select
//                     name="salary.period"
//                     value={formData.salary.period}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     {salaryPeriods.map(period => (
//                       <option key={period} value={period}>
//                         {period.charAt(0).toUpperCase() + period.slice(1)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               {errors.salaryRange && <p className="mt-2 text-sm text-red-600">{errors.salaryRange}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Benefits
//               </label>
//               {/* <BenefitsSelector
//                 selectedBenefits={formData.benefits}
//                 availableBenefits={commonBenefits}
//                 onAdd={(benefit) => handleArrayAdd('benefits', benefit)}
//                 onRemove={(index) => handleArrayRemove('benefits', index)}
//               /> */}
//             </div>
//           </div>
//         );

//       case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-lg font-medium text-gray-900">Additional Settings</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Status
//                 </label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="draft">Draft</option>
//                   <option value="active">Active</option>
//                   <option value="paused">Paused</option>
//                   <option value="closed">Closed</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Application Deadline
//                 </label>
//                 <input
//                   type="date"
//                   name="applicationDeadline"
//                   value={formData.applicationDeadline}
//                   onChange={handleInputChange}
//                   min={new Date().toISOString().split('T')[0]}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Tags
//               </label>
//               {/* <TagsInput
//                 tags={formData.tags}
//                 onAdd={(tag) => handleArrayAdd('tags', tag)}
//                 onRemove={(index) => handleArrayRemove('tags', index)}
//               /> */}
//             </div>

//             <div className="space-y-4">
//               <h4 className="text-sm font-medium text-gray-900">Job Promotion</h4>
              
//               <div className="flex gap-6">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="featured"
//                     checked={formData.featured}
//                     onChange={handleInputChange}
//                     className="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200"
//                   />
//                   <span className="ml-2 text-sm text-gray-700">
//                     Featured Job
//                     <span className="block text-xs text-gray-500">Higher visibility in search results</span>
//                   </span>
//                 </label>
                
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="urgent"
//                     checked={formData.urgent}
//                     onChange={handleInputChange}
//                     className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200"
//                   />
//                   <span className="ml-2 text-sm text-gray-700">
//                     Urgent Hiring
//                     <span className="block text-xs text-gray-500">Mark as urgent position</span>
//                   </span>
//                 </label>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   if (previewMode) {
//     return <JobPreview job={formData} onEdit={() => setPreviewMode(false)} onSave={() => handleSubmit()} />;
//   }

  return (
    <div className={`max-w-4xl mx-auto bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {job?._id ? 'Edit Job' : 'Create New Job'}
          </h1>
          {/* <p className="text-gray-600">
            Step {currentStep} of {formSteps.length}: {formSteps[currentStep - 1].name}
          </p> */}
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            // onClick={() => setPreviewMode(true)}
            className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <EyeIcon className="w-5 h-5 mr-2" />
            Preview
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobForm;

      {/* Progress Bar */}
      {/* <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center">
          {formSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                currentStep > */}
