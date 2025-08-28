import React from 'react';
import { Resume } from '@/types';
import { formatDate } from '@/utils';

interface TemplateProps {
  resume: Resume;
  className?: string;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ resume, className = '' }) => {
  const { personalInfo, summary, experience, education, skills } = resume;

  return (
    <div className={`bg-white shadow-lg ${className}`} style={{ minHeight: '11in', width: '8.5in' }}>
      <div className=\"p-8\">
        {/* Header */}
        <header className=\"mb-8\">
          <div className=\"bg-gray-900 text-white p-6 -m-8 mb-8\">
            <h1 className=\"text-4xl font-bold mb-2\">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className=\"grid grid-cols-2 gap-8 text-gray-300\">
              <div>
                <p className=\"mb-1\">{personalInfo.email}</p>
                <p className=\"mb-1\">{personalInfo.phone}</p>
              </div>
              <div>
                {personalInfo.address && <p className=\"mb-1\">{personalInfo.address}</p>}
                {personalInfo.linkedIn && <p className=\"mb-1\">{personalInfo.linkedIn}</p>}
              </div>
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        {summary && (
          <section className=\"mb-8\">
            <h2 className=\"text-2xl font-bold text-gray-900 mb-4 border-b-4 border-gray-900 pb-2\">
              EXECUTIVE SUMMARY
            </h2>
            <p className=\"text-gray-700 leading-relaxed text-lg\">{summary}</p>
          </section>
        )}

        {/* Professional Experience */}
        {experience.length > 0 && (
          <section className=\"mb-8\">
            <h2 className=\"text-2xl font-bold text-gray-900 mb-4 border-b-4 border-gray-900 pb-2\">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className=\"space-y-6\">
              {experience.map((exp) => (
                <div key={exp.id} className=\"bg-gray-50 p-6 rounded-lg\">
                  <div className=\"flex justify-between items-start mb-3\">
                    <div>
                      <h3 className=\"text-xl font-bold text-gray-900\">{exp.position}</h3>
                      <p className=\"text-lg font-semibold text-gray-700\">{exp.company}</p>
                      {exp.location && (
                        <p className=\"text-gray-600\">{exp.location}</p>
                      )}
                    </div>
                    <div className=\"text-right\">
                      <p className=\"text-gray-700 font-medium\">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                      </p>
                    </div>
                  </div>
                  {exp.description.length > 0 && (
                    <div className=\"mt-4\">
                      <h4 className=\"font-semibold text-gray-800 mb-2\">Key Achievements:</h4>
                      <ul className=\"space-y-2\">
                        {exp.description.map((item, index) => (
                          <li key={index} className=\"flex items-start\">
                            <span className=\"w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0\"></span>
                            <span className=\"text-gray-700 leading-relaxed\">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Qualifications */}
        {education.length > 0 && (
          <section className=\"mb-8\">
            <h2 className=\"text-2xl font-bold text-gray-900 mb-4 border-b-4 border-gray-900 pb-2\">
              EDUCATION & QUALIFICATIONS
            </h2>
            <div className=\"grid grid-cols-1 gap-4\">
              {education.map((edu) => (
                <div key={edu.id} className=\"bg-gray-50 p-4 rounded-lg\">
                  <div className=\"flex justify-between items-start\">
                    <div>
                      <h3 className=\"text-lg font-bold text-gray-900\">{edu.degree}</h3>
                      <p className=\"text-gray-700 font-medium\">{edu.institution}</p>
                      {edu.field && (
                        <p className=\"text-gray-600\">{edu.field}</p>
                      )}
                      {edu.gpa && (
                        <p className=\"text-gray-600\">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <div className=\"text-right\">
                      <p className=\"text-gray-700\">
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate || '')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Core Competencies */}
        {skills.length > 0 && (
          <section>
            <h2 className=\"text-2xl font-bold text-gray-900 mb-4 border-b-4 border-gray-900 pb-2\">
              CORE COMPETENCIES
            </h2>
            <div className=\"bg-gray-50 p-6 rounded-lg\">
              <div className=\"grid grid-cols-2 gap-4\">
                {skills.map((skill, index) => (
                  <div key={index} className=\"flex items-center\">
                    <div className=\"w-3 h-3 bg-gray-900 rounded-full mr-3\"></div>
                    <span className=\"text-gray-700 font-medium\">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};