'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import { 
  Shield, 
  Plus, 
  Trash2, 
  Download, 
  Eye,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Linkedin,
  FileText,
  EyeOff
} from 'lucide-react';

interface ResumeSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'list' | 'experience' | 'education' | 'skills';
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  className: string;
  headerStyle: string;
  sectionStyle: string;
  accentColor: string;
}

export default function ResumeBuilderPage() {
  const router = useRouter();
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedColor, setSelectedColor] = useState('purple');
  
  // Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: ''
  });

  // Experience
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ]);

  // Education
  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }
  ]);

  // Skills
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: '', level: 'intermediate' }
  ]);

  // Additional Sections
  const [sections, setSections] = useState<ResumeSection[]>([
    { id: '1', title: 'Summary', content: '', type: 'text' }
  ]);

  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  // const updateExperience = (id: string, field: keyof Experience, value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   setExperiences(experiences.map(exp => 
  //     exp.id === id ? { ...exp, [field]: value } : exp
  //   ));
  // };

  const updateExperience = (
  id: string,
  field: keyof Experience,
  value: string | boolean
) => {
  setExperiences(experiences.map(exp =>
    exp.id === id ? { ...exp, [field]: value } : exp
  ));
};

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  // const updateEducation = (id: string, field: keyof Education, value: any) => {
  //   setEducation(education.map(edu => 
  //     edu.id === id ? { ...edu, [field]: value } : edu
  //   ));
  // };

  const updateEducation = (
  id: string,
  field: keyof Education,
  value: string | boolean
) => {
  setEducation(education.map(edu =>
    edu.id === id ? { ...edu, [field]: value } : edu
  ));
};

  const addSkill = () => {
    setSkills([...skills, { id: Date.now().toString(), name: '', level: 'intermediate' }]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  // const updateSkill = (id: string, field: keyof Skill, value: any) => {
  //   setSkills(skills.map(skill => 
  //     skill.id === id ? { ...skill, [field]: value } : skill
  //   ));
  // };
  // const updateSection = (id: string, field: keyof ResumeSection, value: any) => {
  //   setSections(prevSections => 
  //     prevSections.map(section => 
  //       section.id === id ? { ...section, [field]: value } : section
  //     )
  //   );
  // };


const updateSkill = <K extends keyof Skill>(id: string, field: K, value: Skill[K]) => {
  setSkills(skills.map(skill =>
    skill.id === id ? { ...skill, [field]: value } : skill
  ));
};

const updateSection = <K extends keyof ResumeSection>(id: string, field: K, value: ResumeSection[K]) => {
  setSections(prevSections =>
    prevSections.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    )
  );
};


  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert('Resume download feature would be implemented here');
  };

  // Resume Templates
  const templates: ResumeTemplate[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional design with subtle gradients',
      preview: 'Modern',
      className: 'bg-white border border-gray-200 rounded-lg p-8 shadow-sm',
      headerStyle: 'text-center mb-8',
      sectionStyle: 'mb-6',
      accentColor: 'dynamic'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional layout with strong typography',
      preview: 'Classic',
      className: 'bg-white border-2 border-gray-300 rounded-lg p-8',
      headerStyle: 'border-b-2 border-gray-300 pb-4 mb-6',
      sectionStyle: 'mb-8',
      accentColor: 'dynamic'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and clean with lots of white space',
      preview: 'Minimal',
      className: 'bg-white p-8',
      headerStyle: 'mb-8',
      sectionStyle: 'mb-6',
      accentColor: 'text-gray-800'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold colors and modern layout for creative fields',
      preview: 'Creative',
      className: 'dynamic',
      headerStyle: 'text-center mb-8 text-white p-6 rounded-lg -m-8 mb-6 dynamic',
      sectionStyle: 'mb-6',
      accentColor: 'dynamic'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Sophisticated design for senior positions',
      preview: 'Executive',
      className: 'bg-white border border-gray-400 rounded-lg p-8 shadow-md',
      headerStyle: 'border-b border-gray-400 pb-4 mb-6',
      sectionStyle: 'mb-8',
      accentColor: 'text-gray-800'
    }
  ];

  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0];

  // Color Options
  const colorOptions = [
    { id: 'purple', name: 'Purple', primary: 'bg-purple-500', accent: 'text-purple-600', bg: 'bg-purple-100', text: 'text-purple-800' },
    { id: 'blue', name: 'Blue', primary: 'bg-blue-500', accent: 'text-blue-600', bg: 'bg-blue-100', text: 'text-blue-800' },
    { id: 'green', name: 'Green', primary: 'bg-green-500', accent: 'text-green-600', bg: 'bg-green-100', text: 'text-green-800' },
    { id: 'red', name: 'Red', primary: 'bg-red-500', accent: 'text-red-600', bg: 'bg-red-100', text: 'text-red-800' },
    { id: 'orange', name: 'Orange', primary: 'bg-orange-500', accent: 'text-orange-600', bg: 'bg-orange-100', text: 'text-orange-800' },
    { id: 'teal', name: 'Teal', primary: 'bg-teal-500', accent: 'text-teal-600', bg: 'bg-teal-100', text: 'text-teal-800' },
    { id: 'indigo', name: 'Indigo', primary: 'bg-indigo-500', accent: 'text-indigo-600', bg: 'bg-indigo-100', text: 'text-indigo-800' },
    { id: 'pink', name: 'Pink', primary: 'bg-pink-500', accent: 'text-pink-600', bg: 'bg-pink-100', text: 'text-pink-800' },
    { id: 'black', name: 'Black', primary: 'bg-gray-800', accent: 'text-gray-800', bg: 'bg-gray-100', text: 'text-gray-800' }
  ];

  const currentColor = colorOptions.find(c => c.id === selectedColor) || colorOptions[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-purple-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => router.push('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Hooblr</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Template Selector */}
              <div className="relative">
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name} Template
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Color Selector */}
              <div className="relative">
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {colorOptions.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.name} Color
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50"
              >
                {previewMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                <span className="font-medium">{previewMode ? 'Edit Mode' : 'Preview'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Builder</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create a professional resume that stands out to employers. Our builder helps you craft the perfect resume for government and private sector jobs.
            </p>
          </div>

          {/* Template Preview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`cursor-pointer rounded-lg p-4 border-2 transition-all duration-300 ${
                    selectedTemplate === template.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  <div className={
                    template.id === 'creative' 
                      ? `bg-white border border-${currentColor.id === 'black' ? 'gray' : currentColor.id}-200 rounded-xl p-8 shadow-lg h-32 flex items-center justify-center mb-3`
                      : `${template.className} h-32 flex items-center justify-center mb-3`
                  }>
                    <div className="text-center">
                      <div className={`w-8 h-8 ${currentColor.primary} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-xs font-medium text-gray-600">{template.name}</div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{template.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{template.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Color Preview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Color</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
              {colorOptions.map((color) => (
                <div
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`cursor-pointer rounded-lg p-4 border-2 transition-all duration-300 text-center ${
                    selectedColor === color.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  <div className={`w-12 h-12 ${color.primary} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{color.name}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Panel */}
            {!previewMode && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Editor</h2>
                
                {/* Personal Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-purple-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={personalInfo.firstName}
                        onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={personalInfo.lastName}
                        onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="john.doe@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Washington, DC"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                      <input
                        type="url"
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <input
                        type="url"
                        value={personalInfo.website}
                        onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="johndoe.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-purple-600" />
                    Professional Summary
                  </h3>
                  <textarea
                    value={sections.find(s => s.title === 'Summary')?.content || ''}
                    onChange={(e) => updateSection(sections.find(s => s.title === 'Summary')?.id || '1', 'content', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
                  />
                </div>

                {/* Work Experience */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                      Work Experience
                    </h3>
                    <button
                      onClick={addExperience}
                      className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Experience</span>
                    </button>
                  </div>
                  
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
                        {experiences.length > 1 && (
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Company Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Job Title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            disabled={exp.current}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Currently working here</span>
                          </label>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Describe your responsibilities and achievements..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                      Education
                    </h3>
                    <button
                      onClick={addEducation}
                      className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Education</span>
                    </button>
                  </div>
                  
                  {education.map((edu, index) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                        {education.length > 1 && (
                          <button
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="University Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Bachelor's"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                          <input
                            type="text"
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Computer Science"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="3.8"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                          <input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                          <input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-purple-600" />
                      Skills
                    </h3>
                    <button
                      onClick={addSkill}
                      className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Skill</span>
                    </button>
                  </div>
                  
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-4 mb-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Skill name"
                        />
                      </div>
                     <select
  value={skill.level}
  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
    updateSkill(skill.id, "level", e.target.value as Skill["level"])
  }
>
  <option value="beginner">Beginner</option>
  <option value="intermediate">Intermediate</option>
  <option value="advanced">Advanced</option>
  <option value="expert">Expert</option>
</select>
                      {skills.length > 1 && (
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preview Panel */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Preview</h2>
              
              <div className={
                currentTemplate.id === 'creative' 
                  ? `bg-white border border-${currentColor.id === 'black' ? 'gray' : currentColor.id}-200 rounded-xl p-8 shadow-lg`
                  : currentTemplate.className
              }>
                {/* Header */}
                                  <div className={
                    currentTemplate.id === 'creative'
                      ? `text-center mb-8 ${currentColor.primary} text-white p-6 rounded-lg -m-8 mb-6`
                      : currentTemplate.headerStyle
                  }>
                    <h1 className={`text-3xl font-bold mb-2 ${
                      currentTemplate.id === 'creative' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {personalInfo.firstName} {personalInfo.lastName}
                    </h1>
                    <div className={`flex flex-wrap justify-center items-center space-x-4 text-sm ${
                      currentTemplate.id === 'creative' ? 'text-white' : 'text-gray-600'
                    }`}>
                      {personalInfo.email && (
                        <div className="flex items-center">
                          <Mail className={`w-4 h-4 mr-1 ${
                            currentTemplate.id === 'creative' ? 'text-white' : currentColor.accent
                          }`} />
                          <span>{personalInfo.email}</span>
                        </div>
                      )}
                      {personalInfo.phone && (
                        <div className="flex items-center">
                          <Phone className={`w-4 h-4 mr-1 ${
                            currentTemplate.id === 'creative' ? 'text-white' : currentColor.accent
                          }`} />
                          <span>{personalInfo.phone}</span>
                        </div>
                      )}
                      {personalInfo.location && (
                        <div className="flex items-center">
                          <MapPin className={`w-4 h-4 mr-1 ${
                            currentTemplate.id === 'creative' ? 'text-white' : currentColor.accent
                          }`} />
                          <span>{personalInfo.location}</span>
                        </div>
                      )}
                      {personalInfo.linkedin && (
                        <div className="flex items-center">
                          <Linkedin className={`w-4 h-4 mr-1 ${
                            currentTemplate.id === 'creative' ? 'text-white' : currentColor.accent
                          }`} />
                          <span>{personalInfo.linkedin}</span>
                        </div>
                      )}
                    </div>
                  </div>

                {/* Summary */}
                {sections.find(s => s.title === 'Summary')?.content && (
                  <div className={currentTemplate.sectionStyle}>
                    <h2 className={`text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 ${
                      currentTemplate.accentColor === 'dynamic' ? currentColor.accent : currentTemplate.accentColor
                    }`}>Professional Summary</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {sections.find(s => s.title === 'Summary')?.content}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {experiences.some(exp => exp.company && exp.position) && (
                  <div className={currentTemplate.sectionStyle}>
                    <h2 className={`text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 ${
                      currentTemplate.accentColor === 'dynamic' ? currentColor.accent : currentTemplate.accentColor
                    }`}>Work Experience</h2>
                    {experiences.filter(exp => exp.company && exp.position).map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                          <span className="text-sm text-gray-600">
                            {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                            {exp.current ? ' Present' : (exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                          </span>
                        </div>
                        <p className={`${
                          currentTemplate.accentColor === 'dynamic' ? currentColor.accent : currentTemplate.accentColor
                        } font-medium mb-2`}>{exp.company}</p>
                        {exp.description && (
                          <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {education.some(edu => edu.institution && edu.degree) && (
                  <div className={currentTemplate.sectionStyle}>
                    <h2 className={`text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 ${
                      currentTemplate.accentColor === 'dynamic' ? currentColor.accent : currentTemplate.accentColor
                    }`}>Education</h2>
                    {education.filter(edu => edu.institution && edu.degree).map((edu) => (
                      <div key={edu.id} className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                          <span className="text-sm text-gray-600">
                            {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                            {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <p className={`${
                          currentTemplate.accentColor === 'dynamic' ? currentColor.accent : currentTemplate.accentColor
                        } font-medium mb-2`}>{edu.institution}</p>
                        {edu.gpa && <p className="text-gray-700 text-sm">GPA: {edu.gpa}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {skills.some(skill => skill.name) && (
                  <div className={currentTemplate.sectionStyle}>
                    <h2 className={`text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 ${
                      currentTemplate.accentColor === 'dynamic' ? currentColor.accent : currentTemplate.accentColor
                    }`}>Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.filter(skill => skill.name).map((skill) => (
                        <span
                          key={skill.id}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            currentTemplate.accentColor === 'dynamic' 
                              ? `${currentColor.bg} ${currentColor.text}`
                              : currentTemplate.id === 'creative' 
                              ? 'bg-purple-100 text-purple-800' 
                              : currentTemplate.id === 'classic'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {skill.name} ({skill.level})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 