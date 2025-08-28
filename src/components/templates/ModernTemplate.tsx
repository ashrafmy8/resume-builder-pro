import React from 'react';
import { Resume } from '@/types';
import { formatDate } from '@/utils';

interface TemplateProps {
  resume: Resume;
  className?: string;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ resume, className = '' }) => {
  const { personalInfo, summary, experience, education, skills } = resume;

  return (
    <div className={`bg-white shadow-lg ${className}`} style={{ minHeight: '11in', width: '8.5in' }}>
      {/* Header Section */}
      <div className=\"bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8\">
        <h1 className=\"text-4xl font-bold mb-2\">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100\">
          <div>
            <p className=\"flex items-center mb-1\">
              <span className=\"mr-2\">📧</span>
              {personalInfo.email}
            </p>
            <p className=\"flex items-center mb-1\">
              <span className=\"mr-2\">📱</span>
              {personalInfo.phone}
            </p>
          </div>
          <div>
            {personalInfo.address && (
              <p className=\"flex items-center mb-1\">
                <span className=\"mr-2\">📍</span>
                {personalInfo.address}
              </p>
            )}
            {personalInfo.linkedIn && (
              <p className=\"flex items-center mb-1\">
                <span className=\"mr-2\">💼</span>
                {personalInfo.linkedIn}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className=\"p-8\">
        {/* Summary Section */}
        {summary && (
          <section className=\"mb-6\">
            <h2 className=\"text-2xl font-bold text-gray-800 mb-3 border-b-2 border-blue-600 pb-1\">
              Professional Summary
            </h2>
            <p className=\"text-gray-700 leading-relaxed\">{summary}</p>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className=\"mb-6\">
            <h2 className=\"text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-1\">
              Professional Experience
            </h2>
            <div className=\"space-y-4\">
              {experience.map((exp) => (
                <div key={exp.id} className=\"border-l-4 border-blue-200 pl-4\">
                  <div className=\"flex justify-between items-start mb-2\">
                    <div>
                      <h3 className=\"text-lg font-semibold text-gray-800\">{exp.position}</h3>
                      <p className=\"text-blue-600 font-medium\">{exp.company}</p>
                      {exp.location && (
                        <p className=\"text-gray-600 text-sm\">{exp.location}</p>
                      )}
                    </div>
                    <div className=\"text-right text-sm text-gray-600\">
                      <p>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                      </p>
                    </div>
                  </div>
                  {exp.description.length > 0 && (
                    <ul className=\"list-disc list-inside text-gray-700 space-y-1\">
                      {exp.description.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className=\"mb-6\">
            <h2 className=\"text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-1\">
              Education
            </h2>
            <div className=\"space-y-3\">
              {education.map((edu) => (
                <div key={edu.id} className=\"border-l-4 border-blue-200 pl-4\">
                  <div className=\"flex justify-between items-start\">
                    <div>
                      <h3 className=\"text-lg font-semibold text-gray-800\">{edu.degree}</h3>
                      <p className=\"text-blue-600 font-medium\">{edu.institution}</p>
                      {edu.field && (
                        <p className=\"text-gray-600 text-sm\">{edu.field}</p>
                      )}
                      {edu.gpa && (
                        <p className=\"text-gray-600 text-sm\">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <div className=\"text-right text-sm text-gray-600\">
                      <p>
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate || '')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section className=\"mb-6\">
            <h2 className=\"text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-1\">
              Skills
            </h2>
            <div className=\"flex flex-wrap gap-2\">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className=\"inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium\"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};