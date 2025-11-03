'use client'

import React, { useState, useRef } from 'react';
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
  PaintBucket,
  EyeOff,
  Globe
} from 'lucide-react';
import Image from 'next/image';

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

interface Project {
  id: string;
  name: string;
  link: string;
  startDate: string;
  endDate: string;
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
  const resumeRef = useRef<HTMLDivElement>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedColor, setSelectedColor] = useState('purple');
  const [showDownload, setShowDownload] = useState(false);
  
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
  // Projects
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: '',
      link: '',
      startDate: '',
      endDate: '',
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

  const addProject = () => {
    setProjects([...projects, {
      id: Date.now().toString(),
      name: '',
      link: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(pro => pro.id !== id));
  };


  const updateExperience = (
  id: string,
  field: keyof Experience,
  value: string | boolean
) => {
  setExperiences(experiences.map(exp =>
    exp.id === id ? { ...exp, [field]: value } : exp
  ));
};

  const updateProject = (
  id: string,
  field: keyof Project,
  value: string | boolean
) => {
  setProjects(projects.map(exp =>
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

    const getColorStyles = () => {
    const colorMap: Record<string, {primary: string, light: string, text: string}> = {
      purple: { primary: '#9333ea', light: '#f3e8ff', text: '#581c87' },
      blue: { primary: '#2563eb', light: '#dbeafe', text: '#1e3a8a' },
      green: { primary: '#16a34a', light: '#dcfce7', text: '#14532d' },
      teal: { primary: '#0d9488', light: '#ccfbf1', text: '#134e4a' },
      red: {primary: 'red', light: 'red', text: 'red'},
      orange: {primary: 'orange', light: 'orange', text: 'orange'},
      indigo: {primary: 'indigo', light: 'indigo', text: 'indigo'},
      pink: {primary: 'pink', light: 'pink', text: 'pink'},
      black: {primary: 'black', light: 'black', text: 'black'},
    };
    return colorMap[selectedColor] || colorMap.purple;
  };

   const handleDownloadPDF = async () => {
    try {
      const printContent = resumeRef.current?.innerHTML;
      if (!printContent) return;

      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      const colors = getColorStyles();

      printWindow.document.write(`
        <!DOCTYPE html>
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
        <head>
          <meta charset="utf-8">
          <title>${personalInfo.firstName} ${personalInfo.lastName} - Resume</title>
          <style>
            body {
              font-family: Calibri, Arial, sans-serif;
              line-height: 1.6;
              color: #1f2937;
              margin: 40px;
            }
            h1 { 
              font-size: 32pt; 
              font-weight: bold;
              margin-bottom: 8pt;
              color: #111827;
              text-align: center;
            }
            h2 { 
              font-size: 18pt; 
              font-weight: bold;
              margin-top: 20pt; 
              margin-bottom: 10pt; 
              padding-bottom: 6pt;
              color: ${colors.primary};
              border-bottom: 2pt solid ${colors.primary};
            }
            h3 { 
              font-size: 14pt; 
              font-weight: bold;
              margin-bottom: 4pt;
              color: #111827;
            }
            p { 
              margin: 4pt 0;
              font-size: 11pt;
              color: #374151;
            }
            .contact-info {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              text-align: center;
              font-size: 10pt;
              padding-bottom: 12pt;
            }
            .creative {
              background-color: ${colors.primary};
              border-radius: 20px;
              padding-bottom: 4px;
              color: white;
            }
            .creative-color {
              color: white;
            }
            .section {
              margin-bottom: 16pt;
            }
            .item {
              margin-bottom: 12pt;
            }
            .item-header {
              display: table;
              width: 100%;
              margin-bottom: 4pt;
            }
            .item-title {
              display: table-cell;
              font-weight: bold;
              color: #111827;
            }
            .item-date {
              display: table-cell;
              text-align: right;
              font-size: 10pt;
              color: #4b5563;
            }
            .company, .institution {
              color: ${colors.primary};
              font-weight: 600;
              margin-bottom: 6pt;
            }
            .description {
              color: #374151;
              line-height: 1.5;
            }
            .skill-tag {
              display: inline-block;
              padding: 4pt 10pt;
              margin: 2pt;
              background-color: ${colors.light};
              color: ${colors.text};
              border-radius: 12pt;
              font-size: 10pt;
              font-weight: 500;
            }
            .accent {
              color: ${colors.primary};
            }
            .icon svg {
              width: 14px;
              height: 14px;
              vertical-align: middle;
              margin-right: 6px;
              margin-left: 6px;
              fill: ${colors.primary};
            }
          </style>
        </head>
        <body>
        <div class="${currentTemplate.id}">
          <h1 class="${currentTemplate.id}-color">${personalInfo.firstName} ${personalInfo.lastName}</h1>
          <div class="contact-info">
            ${personalInfo.email ? `<span class='icon'><svg data-name="1-Email" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height='12' weight='12'><path d="M29 4H3a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.72 2L16 14.77 3.72 6zM30 25a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.23l13.42 9.58a1 1 0 0 0 1.16 0L30 7.23z"/></svg>${personalInfo.email}</span>` : ''}
            ${personalInfo.email && personalInfo.phone ? ' | ' : ''}
            ${personalInfo.phone ? `<span class='icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height='12' weight='12'><path d="M23 17.11a5.92 5.92 0 0 0-4.63-3.95 1.5 1.5 0 0 0-1.51.66l-1.26 1.81a.53.53 0 0 1-.61.2 13.25 13.25 0 0 1-3.6-2.14 13 13 0 0 1-2.94-3.52.5.5 0 0 1 .17-.69l1.63-1.09a1.52 1.52 0 0 0 .61-1.71 10.13 10.13 0 0 0-1.38-2.89 10.36 10.36 0 0 0-2.2-2.33A1.53 1.53 0 0 0 6 1.19a7.31 7.31 0 0 0-1.13.43A7.64 7.64 0 0 0 1.2 6.1a1.48 1.48 0 0 0 0 .93 24.63 24.63 0 0 0 6.53 10.41A24.76 24.76 0 0 0 17.12 23a1.41 1.41 0 0 0 .45.07 1.59 1.59 0 0 0 .48-.07 7.64 7.64 0 0 0 4.47-3.66A6.21 6.21 0 0 0 23 18a1.46 1.46 0 0 0 0-.89zm-1.33 1.74A6.61 6.61 0 0 1 17.73 22a.54.54 0 0 1-.31 0 23.61 23.61 0 0 1-9-5.29 23.74 23.74 0 0 1-6.27-10 .47.47 0 0 1 0-.31 6.59 6.59 0 0 1 3.14-3.88 5 5 0 0 1 1-.36h.1a.5.5 0 0 1 .32.11 9.4 9.4 0 0 1 2 2.09A9.07 9.07 0 0 1 9.9 7a.52.52 0 0 1-.21.6L8.06 8.64a1.54 1.54 0 0 0-.47 2 14.09 14.09 0 0 0 7 6.09 1.51 1.51 0 0 0 1.81-.58l1.21-1.81a.51.51 0 0 1 .51-.23A4.94 4.94 0 0 1 22 17.44a.58.58 0 0 1 0 .29 5.35 5.35 0 0 1-.38 1.12z"/></svg>${personalInfo.phone}</span>` : ''}
            ${(personalInfo.email || personalInfo.phone) && personalInfo.location ? ' | ' : ''}
            ${personalInfo.location ? `<span class='icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs></defs><g id="location"><path class="cls-1" d="m24.1 6-.1-.1A9.12 9.12 0 0 0 16 2a9.12 9.12 0 0 0-8 3.9l-.1.1C3.85 11.42 6.48 21.35 14 29.16a2.75 2.75 0 0 0 4 0C25.52 21.35 28.15 11.42 24.1 6zm-7.56 21.77a.76.76 0 0 1-1.08 0c-7.82-8.09-8.9-16.62-6-20.53l.11-.15A7.16 7.16 0 0 1 16 4a7.16 7.16 0 0 1 6.39 3.09l.11.15c2.94 3.91 1.86 12.44-6 20.53z"/><path class="cls-1" d="M16 7a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"/></g></svg>${personalInfo.location}</span>` : ''}
            ${(personalInfo.email || personalInfo.location) && personalInfo.linkedin ? ' | ' : ''}
            ${personalInfo.linkedin ? `<span class='icon'><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24" height='12' weight='12' id="linkedin">
             <path d="M3 6.002c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm0-5c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2zM5.5 24.002h-5a.5.5 0 0 1-.5-.5v-15a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5zm-4.5-1h4v-14H1v14zM23.5 24.002h-5a.5.5 0 0 1-.5-.5v-9c0-1.135-.473-1.987-1.299-2.336-.853-.362-1.894-.14-2.701.556v10.78a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-15a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .484.375c1.604-1.154 4.276-1.796 6.413-1.064 1.613.553 3.546 2.073 3.603 6.183v10.007a.5.5 0 0 1-.5.499zm-4.5-1h4v-9.5c-.038-2.785-1.051-4.601-2.927-5.243-2.33-.798-5.266.407-6.183 1.555a.501.501 0 0 1-.89-.312v-.5H9v14h4v-10.5a.5.5 0 0 1 .151-.358c1.118-1.086 2.667-1.436 3.939-.899 1.214.514 1.91 1.701 1.909 3.257v8.5z"></path>
              </svg>${personalInfo.linkedin}</span>` : ''}
            ${personalInfo.website ? ` | <span class='icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm11.84 12.11h-.07A19.62 19.62 0 0 1 24 15.79a19.27 19.27 0 0 0-2.88-10.63 12 12 0 0 1 6.72 8.95zM10 16c0-5.82 2.2-10.83 5-11.81V17a26 26 0 0 1-5-.64V16zm5 3v8.84c-2.4-.85-4.37-4.65-4.87-9.41A28.57 28.57 0 0 0 15 19zm2 8.84V19a28.57 28.57 0 0 0 4.87-.57c-.5 4.73-2.47 8.57-4.87 9.38zM17 17V4.19c2.8 1 5 6 5 11.81v.33a26 26 0 0 1-5 .67zM10.88 5.16A19.27 19.27 0 0 0 8 15.79a19.62 19.62 0 0 1-3.78-1.65h-.07a12 12 0 0 1 6.73-8.98zM4 16.28a22.26 22.26 0 0 0 4.07 1.61 18.36 18.36 0 0 0 2.8 9A12 12 0 0 1 4 16.28zm17.12 10.56a18.36 18.36 0 0 0 2.8-8.95A22.26 22.26 0 0 0 28 16.28a12 12 0 0 1-6.88 10.56z"/></svg>${personalInfo.website}</span>` : ''}
          </div>
          </div>
          
          ${sections.find(s => s.title === 'Summary')?.content ? `
            <div class="section">
              <h2>Professional Summary</h2>
              <p class="description">${sections.find(s => s.title === 'Summary')?.content}</p>
            </div>
          ` : ''}
          
          ${experiences.some(e => e.company && e.position) ? `
            <div class="section">
              <h2>Work Experience</h2>
              ${experiences.filter(e => e.company && e.position).map(exp => `
                <div class="item">
                  <div class="item-header">
                    <span class="item-title">${exp.position}</span>
                    <span class="item-date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                  </div>
                  <p class="company">${exp.company}</p>
                  ${exp.description ? `<p class="description">${exp.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${projects.some(p => p.name) ? `
            <div class="section">
              <h2>Projects</h2>
              ${projects.filter(p => p.name).map(proj => `
                <div class="item">
                  <h3>${proj.name}</h3>
                  ${proj.link ? `<p class="accent">${proj.link}</p>` : ''}
                  ${proj.description ? `<p class="description">${proj.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${education.some(e => e.institution && e.degree) ? `
            <div class="section">
              <h2>Education</h2>
              ${education.filter(e => e.institution && e.degree).map(edu => `
                <div class="item">
                  <div class="item-header">
                    <span class="item-title">${edu.degree} in ${edu.field}</span>
                    <span class="item-date">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
                  </div>
                  <p class="institution">${edu.institution}</p>
                  ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${skills.some(s => s.name) ? `
            <div class="section">
              <h2>Skills</h2>
              <div>
                ${skills.filter(s => s.name).map(s => `<span class="skill-tag">${s.name} (${s.level})</span>`).join(' ')}
              </div>
            </div>
          ` : ''}
        </body>
      </html>
    `);

      printWindow.document.close();
      printWindow.focus();
      
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };


    const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

    const handleDownloadDOCX = () => {
    const colors = getColorStyles();
    
    const htmlContent = `
      <!DOCTYPE html>
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
        <head>
          <meta charset="utf-8">
          <title>${personalInfo.firstName} ${personalInfo.lastName} - Resume</title>
          <style>
            body {
              font-family: Calibri, Arial, sans-serif;
              line-height: 1.6;
              color: #1f2937;
              margin: 40px;
            }
            h1 { 
              font-size: 32pt; 
              font-weight: bold;
              margin-bottom: 8pt;
              color: #111827;
              text-align: center;
            }
            h2 { 
              font-size: 18pt; 
              font-weight: bold;
              margin-top: 20pt; 
              margin-bottom: 10pt; 
              padding-bottom: 6pt;
              color: ${colors.primary};
              border-bottom: 2pt solid ${colors.primary};
            }
            h3 { 
              font-size: 14pt; 
              font-weight: bold;
              margin-bottom: 4pt;
              color: #111827;
            }
            p { 
              margin: 4pt 0;
              font-size: 11pt;
              color: #374151;
            }
            .contact-info {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              text-align: center;
              font-size: 10pt;
              padding-bottom: 12pt;
            }
            .creative {
              background-color: ${colors.primary};
              border-radius: 20px;
              padding-bottom: 4px;
              color: white;
            }
            .creative-color {
              color: white;
            }
            .section {
              margin-bottom: 16pt;
            }
            .item {
              margin-bottom: 12pt;
            }
            .item-header {
              display: table;
              width: 100%;
              margin-bottom: 4pt;
            }
            .item-title {
              display: table-cell;
              font-weight: bold;
              color: #111827;
            }
            .item-date {
              display: table-cell;
              text-align: right;
              font-size: 10pt;
              color: #4b5563;
            }
            .company, .institution {
              color: ${colors.primary};
              font-weight: 600;
              margin-bottom: 6pt;
            }
            .description {
              color: #374151;
              line-height: 1.5;
            }
            .skill-tag {
              display: inline-block;
              padding: 4pt 10pt;
              margin: 2pt;
              background-color: ${colors.light};
              color: ${colors.text};
              border-radius: 12pt;
              font-size: 10pt;
              font-weight: 500;
            }
            .accent {
              color: ${colors.primary};
            }
            .icon svg {
              width: 14px;
              height: 14px;
              vertical-align: middle;
              margin-right: 6px;
              margin-left: 6px;
              fill: ${colors.primary};
            }
          </style>
        </head>
        <body>
        <div class="${currentTemplate.id}">
          <h1 class="${currentTemplate.id}-color">${personalInfo.firstName} ${personalInfo.lastName}</h1>
          <div class="contact-info">
            ${personalInfo.email ? `<span class='icon'><svg data-name="1-Email" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height='12' weight='12'><path d="M29 4H3a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.72 2L16 14.77 3.72 6zM30 25a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.23l13.42 9.58a1 1 0 0 0 1.16 0L30 7.23z"/></svg>${personalInfo.email}</span>` : ''}
            ${personalInfo.email && personalInfo.phone ? ' | ' : ''}
            ${personalInfo.phone ? `<span class='icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height='12' weight='12'><path d="M23 17.11a5.92 5.92 0 0 0-4.63-3.95 1.5 1.5 0 0 0-1.51.66l-1.26 1.81a.53.53 0 0 1-.61.2 13.25 13.25 0 0 1-3.6-2.14 13 13 0 0 1-2.94-3.52.5.5 0 0 1 .17-.69l1.63-1.09a1.52 1.52 0 0 0 .61-1.71 10.13 10.13 0 0 0-1.38-2.89 10.36 10.36 0 0 0-2.2-2.33A1.53 1.53 0 0 0 6 1.19a7.31 7.31 0 0 0-1.13.43A7.64 7.64 0 0 0 1.2 6.1a1.48 1.48 0 0 0 0 .93 24.63 24.63 0 0 0 6.53 10.41A24.76 24.76 0 0 0 17.12 23a1.41 1.41 0 0 0 .45.07 1.59 1.59 0 0 0 .48-.07 7.64 7.64 0 0 0 4.47-3.66A6.21 6.21 0 0 0 23 18a1.46 1.46 0 0 0 0-.89zm-1.33 1.74A6.61 6.61 0 0 1 17.73 22a.54.54 0 0 1-.31 0 23.61 23.61 0 0 1-9-5.29 23.74 23.74 0 0 1-6.27-10 .47.47 0 0 1 0-.31 6.59 6.59 0 0 1 3.14-3.88 5 5 0 0 1 1-.36h.1a.5.5 0 0 1 .32.11 9.4 9.4 0 0 1 2 2.09A9.07 9.07 0 0 1 9.9 7a.52.52 0 0 1-.21.6L8.06 8.64a1.54 1.54 0 0 0-.47 2 14.09 14.09 0 0 0 7 6.09 1.51 1.51 0 0 0 1.81-.58l1.21-1.81a.51.51 0 0 1 .51-.23A4.94 4.94 0 0 1 22 17.44a.58.58 0 0 1 0 .29 5.35 5.35 0 0 1-.38 1.12z"/></svg>${personalInfo.phone}</span>` : ''}
            ${(personalInfo.email || personalInfo.phone) && personalInfo.location ? ' | ' : ''}
            ${personalInfo.location ? `<span class='icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs></defs><g id="location"><path class="cls-1" d="m24.1 6-.1-.1A9.12 9.12 0 0 0 16 2a9.12 9.12 0 0 0-8 3.9l-.1.1C3.85 11.42 6.48 21.35 14 29.16a2.75 2.75 0 0 0 4 0C25.52 21.35 28.15 11.42 24.1 6zm-7.56 21.77a.76.76 0 0 1-1.08 0c-7.82-8.09-8.9-16.62-6-20.53l.11-.15A7.16 7.16 0 0 1 16 4a7.16 7.16 0 0 1 6.39 3.09l.11.15c2.94 3.91 1.86 12.44-6 20.53z"/><path class="cls-1" d="M16 7a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"/></g></svg>${personalInfo.location}</span>` : ''}
            ${(personalInfo.email || personalInfo.location) && personalInfo.linkedin ? ' | ' : ''}
            ${personalInfo.linkedin ? `<span class='icon'><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24" height='12' weight='12' id="linkedin">
             <path d="M3 6.002c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm0-5c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2zM5.5 24.002h-5a.5.5 0 0 1-.5-.5v-15a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5zm-4.5-1h4v-14H1v14zM23.5 24.002h-5a.5.5 0 0 1-.5-.5v-9c0-1.135-.473-1.987-1.299-2.336-.853-.362-1.894-.14-2.701.556v10.78a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-15a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .484.375c1.604-1.154 4.276-1.796 6.413-1.064 1.613.553 3.546 2.073 3.603 6.183v10.007a.5.5 0 0 1-.5.499zm-4.5-1h4v-9.5c-.038-2.785-1.051-4.601-2.927-5.243-2.33-.798-5.266.407-6.183 1.555a.501.501 0 0 1-.89-.312v-.5H9v14h4v-10.5a.5.5 0 0 1 .151-.358c1.118-1.086 2.667-1.436 3.939-.899 1.214.514 1.91 1.701 1.909 3.257v8.5z"></path>
              </svg>${personalInfo.linkedin}</span>` : ''}
            ${personalInfo.website ? ` | <span class='icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm11.84 12.11h-.07A19.62 19.62 0 0 1 24 15.79a19.27 19.27 0 0 0-2.88-10.63 12 12 0 0 1 6.72 8.95zM10 16c0-5.82 2.2-10.83 5-11.81V17a26 26 0 0 1-5-.64V16zm5 3v8.84c-2.4-.85-4.37-4.65-4.87-9.41A28.57 28.57 0 0 0 15 19zm2 8.84V19a28.57 28.57 0 0 0 4.87-.57c-.5 4.73-2.47 8.57-4.87 9.38zM17 17V4.19c2.8 1 5 6 5 11.81v.33a26 26 0 0 1-5 .67zM10.88 5.16A19.27 19.27 0 0 0 8 15.79a19.62 19.62 0 0 1-3.78-1.65h-.07a12 12 0 0 1 6.73-8.98zM4 16.28a22.26 22.26 0 0 0 4.07 1.61 18.36 18.36 0 0 0 2.8 9A12 12 0 0 1 4 16.28zm17.12 10.56a18.36 18.36 0 0 0 2.8-8.95A22.26 22.26 0 0 0 28 16.28a12 12 0 0 1-6.88 10.56z"/></svg>${personalInfo.website}</span>` : ''}
          </div>
          </div>
          
          ${sections.find(s => s.title === 'Summary')?.content ? `
            <div class="section">
              <h2>Professional Summary</h2>
              <p class="description">${sections.find(s => s.title === 'Summary')?.content}</p>
            </div>
          ` : ''}
          
          ${experiences.some(e => e.company && e.position) ? `
            <div class="section">
              <h2>Work Experience</h2>
              ${experiences.filter(e => e.company && e.position).map(exp => `
                <div class="item">
                  <div class="item-header">
                    <span class="item-title">${exp.position}</span>
                    <span class="item-date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                  </div>
                  <p class="company">${exp.company}</p>
                  ${exp.description ? `<p class="description">${exp.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${projects.some(p => p.name) ? `
            <div class="section">
              <h2>Projects</h2>
              ${projects.filter(p => p.name).map(proj => `
                <div class="item">
                  <h3>${proj.name}</h3>
                  ${proj.link ? `<p class="accent">${proj.link}</p>` : ''}
                  ${proj.description ? `<p class="description">${proj.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${education.some(e => e.institution && e.degree) ? `
            <div class="section">
              <h2>Education</h2>
              ${education.filter(e => e.institution && e.degree).map(edu => `
                <div class="item">
                  <div class="item-header">
                    <span class="item-title">${edu.degree} in ${edu.field}</span>
                    <span class="item-date">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
                  </div>
                  <p class="institution">${edu.institution}</p>
                  ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${skills.some(s => s.name) ? `
            <div class="section">
              <h2>Skills</h2>
              <div>
                ${skills.filter(s => s.name).map(s => `<span class="skill-tag">${s.name} (${s.level})</span>`).join(' ')}
              </div>
            </div>
          ` : ''}
        </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personalInfo.firstName}_${personalInfo.lastName}_Resume.doc`;
    link.click();
    URL.revokeObjectURL(url);
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className={`flex items-center cursor-pointer`}
              onClick={() => router.push('/')}
            >
             <Image
              src="/hooblrlogo.png"
              alt="logo"
              width={120}
              height={50}
              className="w-20 h-auto sm:w-28 md:w-32 lg:w-[120px]"
            />
            </div>
            
            <div className="flex relative items-center space-x-4">
              {/* Template Selector */}
              <div className="relative hidden lg:block">
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
              <div className="relative hidden lg:block">
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
                className="lg:flex items-center space-x-2 hidden text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50"
              >
                {previewMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                <span className="font-medium">{previewMode ? 'Edit Mode' : 'Preview'}</span>
              </button>
              <button
                onClick={()=> setShowDownload(true)}
                className="flex items-center space-x-2 bg-[#8A38EE] text-white lg:px-4 px-2 py-2 rounded-lg transition-all duration-300 font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              {showDownload && (
                <div className='w-60 h-28 flex flex-col gap-1 p-1 border rounded-lg bg-white absolute right-0 top-12'>
                  <button onClick={()=> {handleDownloadPDF(),setShowDownload(false)}} className='h-[50%] p-1 flex border rounded-lg bg-white hover:bg-zinc-300'>
                    <p className='bg-red-600 flex justify-center items-center px-[6px] rounded-lg text-white'>PDF</p>
                    <p className='flex justify-center items-center ms-3'>Download in PDF</p>
                  </button>
                  <button onClick={()=> {handleDownloadDOCX(),setShowDownload(false)}} className='h-[50%] p-1 flex border rounded-lg bg-white hover:bg-zinc-300'>
                    <p className='bg-blue-600 flex justify-center items-center px-1 rounded-lg text-white'>DOC</p>
                    <p className='flex justify-center items-center ms-3'>Download in DOC</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div onClick={()=> setShowDownload(false)} className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="lg:text-4xl text-3xl font-bold text-gray-900 mb-4">Resume Builder</h1>
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
                      ? 'border-[#8A38EE] bg-zinc-100'
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
                        <PaintBucket className="w-4 h-4 text-white" />
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
                      ? 'border-[#8A38EE] bg-zinc-100'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  <div className={`w-12 h-12 ${color.primary} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                    <PaintBucket className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{color.name}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Panel */}
            {!previewMode && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#8A38EE] p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Editor</h2>
                
                {/* Personal Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-[#8A38EE]" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={personalInfo.firstName}
                        onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={personalInfo.lastName}
                        onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                        placeholder="john.doe@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                        placeholder="Washington, DC"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                      <input
                        type="url"
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <input
                        type="url"
                        value={personalInfo.website}
                        onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                        placeholder="johndoe.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-[#8A38EE]" />
                    Professional Summary
                  </h3>
                  <textarea
                    value={sections.find(s => s.title === 'Summary')?.content || ''}
                    onChange={(e) => updateSection(sections.find(s => s.title === 'Summary')?.id || '1', 'content', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                    placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
                  />
                </div>

                {/* Work Experience */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-[#8A38EE]" />
                      Work Experience
                    </h3>
                    <button
                      onClick={addExperience}
                      className="flex items-center space-x-2 bg-[#8A38EE] text-white px-3 py-1 rounded-lg transition-colors text-sm"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                            disabled={exp.current}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                              className="rounded border-gray-300 text-[#8A38EE] focus:ring-[#8A38EE]"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                            placeholder="Describe your responsibilities and achievements..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>


                {/* Projects */}

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-[#8A38EE]" />
                      Projects
                    </h3>
                    <button
                      onClick={addProject}
                      className="flex items-center space-x-2 bg-[#8A38EE] text-white px-3 py-1 rounded-lg transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Project</span>
                    </button>
                  </div>
                  
                  {projects.map((pro, index) => (
                    <div key={pro.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium text-gray-900">Project {index + 1}</h4>
                        {projects.length > 1 && (
                          <button
                            onClick={() => removeProject(pro.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            value={pro.name}
                            onChange={(e) => updateProject(pro.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                            placeholder="Project Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Link</label>
                          <input
                            type="text"
                            value={pro.link}
                            onChange={(e) => updateProject(pro.id, 'link', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="https://project.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                          <input
                            type="month"
                            value={pro.startDate}
                            onChange={(e) => updateProject(pro.id, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                          <input
                            type="month"
                            value={pro.endDate}
                            onChange={(e) => updateProject(pro.id, 'endDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={pro.description}
                            onChange={(e) => updateProject(pro.id, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                            placeholder="Describe your project"
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
                      <GraduationCap className="w-5 h-5 mr-2 text-[#8A38EE]" />
                      Education
                    </h3>
                    <button
                      onClick={addEducation}
                      className="flex items-center space-x-2 bg-[#8A38EE] text-white px-3 py-1 rounded-lg transition-colors text-sm"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                            placeholder="University Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                            placeholder="Bachelor's"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                          <input
                            type="text"
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                            placeholder="Computer Science"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                            placeholder="3.8"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                          <input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                          <input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE] focus:border-transparent"
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
                      <Award className="w-5 h-5 mr-2 text-[#8A38EE]" />
                      Skills
                    </h3>
                    <button
                      onClick={addSkill}
                      className="flex items-center space-x-2 bg-[#8A38EE] text-white px-3 py-1 rounded-lg transition-colors text-sm"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8A38EE]444 focus:border-transparent"
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
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#8A38EE] p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Preview</h2>
              
              <div ref={resumeRef} className={
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
                      {personalInfo.website && (
                        <div className="flex items-center">
                          <Globe className={`w-4 h-4 mr-1 ${
                            currentTemplate.id === 'creative' ? 'text-white' : currentColor.accent
                          }`} />
                          <span>{personalInfo.website}</span>
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

                {projects.some(pro => pro.name) && (
                  <div className={currentTemplate.sectionStyle}>
                    <h2 className={`text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2 ${
                      currentTemplate.accentColor === 'dynamic' ? currentColor.accent : currentTemplate.accentColor
                    }`}>Projects</h2>
                    {projects.filter(pro => pro.name).map((pro) => (
                      <div key={pro.id} className="mb-4">
                        <div className="flex justify-between items-start">
                          <h3 className={`${
                          currentTemplate.accentColor === 'dynamic' ? currentColor.accent : currentTemplate.accentColor
                        } font-semibold`}>{pro.name}</h3>
                          <span className="text-sm text-gray-600">
                            {pro.startDate && new Date(pro.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                            {pro.endDate && new Date(pro.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <p className={`text-sm mb-2`}>{pro.link}</p>
                        {pro.description && (
                          <p className="text-gray-700 text-sm leading-relaxed">{pro.description}</p>
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