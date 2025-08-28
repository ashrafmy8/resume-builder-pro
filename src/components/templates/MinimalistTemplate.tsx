import React from 'react';
import { Resume } from '@/types';
import { formatDate } from '@/utils';

interface TemplateProps {
  resume: Resume;
  className?: string;
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ resume, className = '' }) => {
  const { personalInfo, summary, experience, education, skills } = resume;

  return (
    <div className={`bg-white shadow-lg ${className}`} style={{ minHeight: '11in', width: '8.5in' }}>
      <div className=\"p-12\">
        {/* Header */}
        <header className=\"text-center mb-12\">
          <h1 className=\"text-5xl font-light text-gray-900 mb-4 tracking-wide\">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className=\"flex justify-center space-x-6 text-gray-600 text-sm\">
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            {personalInfo.address && <span>{personalInfo.address}</span>}
          </div>
          {personalInfo.linkedIn && (
            <p className=\"text-gray-600 text-sm mt-2\">{personalInfo.linkedIn}</p>
          )}
        </header>

        {/* Summary */}
        {summary && (
          <section className=\"mb-12\">
            <p className=\"text-gray-700 leading-relaxed text-center max-w-4xl mx-auto\">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className=\"mb-12\">
            <h2 className=\"text-2xl font-light text-gray-900 mb-8 text-center tracking-wide\">
              Experience
            </h2>
            <div className=\"space-y-10\">
              {experience.map((exp) => (
                <div key={exp.id} className=\"text-center\">
                  <h3 className=\"text-xl font-medium text-gray-900 mb-1\">{exp.position}</h3>
                  <p className=\"text-gray-600 mb-2\">
                    {exp.company} • {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                  </p>
                  {exp.location && (
                    <p className=\"text-gray-500 text-sm mb-4\">{exp.location}</p>
                  )}
                  {exp.description.length > 0 && (
                    <div className=\"max-w-3xl mx-auto\">
                      {exp.description.map((item, index) => (
                        <p key={index} className=\"text-gray-700 leading-relaxed mb-2 text-sm\">
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className=\"mb-12\">
            <h2 className=\"text-2xl font-light text-gray-900 mb-8 text-center tracking-wide\">
              Education
            </h2>
            <div className=\"space-y-6\">
              {education.map((edu) => (
                <div key={edu.id} className=\"text-center\">
                  <h3 className=\"text-lg font-medium text-gray-900\">{edu.degree}</h3>
                  <p className=\"text-gray-600\">
                    {edu.institution} • {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate || '')}
                  </p>
                  {edu.field && (
                    <p className=\"text-gray-500 text-sm\">{edu.field}</p>
                  )}
                  {edu.gpa && (
                    <p className=\"text-gray-500 text-sm\">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className=\"text-2xl font-light text-gray-900 mb-8 text-center tracking-wide\">
              Skills
            </h2>
            <div className=\"text-center\">
              <p className=\"text-gray-700 leading-relaxed\">
                {skills.join(' • ')}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};