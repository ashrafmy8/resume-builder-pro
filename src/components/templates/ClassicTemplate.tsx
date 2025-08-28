import React from 'react';
import { Resume } from '@/types';
import { formatDate } from '@/utils';

interface TemplateProps {
  resume: Resume;
  className?: string;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ resume, className = '' }) => {
  const { personalInfo, summary, experience, education, skills } = resume;

  return (
    <div className={`bg-white shadow-lg ${className}`} style={{ minHeight: '11in', width: '8.5in' }}>
      <div className=\"p-8\">
        {/* Header Section */}
        <header className=\"text-center border-b-2 border-gray-800 pb-6 mb-6\">
          <h1 className=\"text-4xl font-bold text-gray-800 mb-4\">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className=\"flex justify-center space-x-8 text-gray-600\">
            <span>{personalInfo.email}</span>
            <span>•</span>
            <span>{personalInfo.phone}</span>
            {personalInfo.address && (
              <>
                <span>•</span>
                <span>{personalInfo.address}</span>
              </>
            )}
          </div>
          {personalInfo.linkedIn && (
            <p className=\"text-gray-600 mt-2\">{personalInfo.linkedIn}</p>
          )}
        </header>

        {/* Summary Section */}
        {summary && (
          <section className=\"mb-8\">
            <h2 className=\"text-2xl font-bold text-gray-800 mb-3 uppercase tracking-wide\">
              Professional Summary
            </h2>
            <hr className=\"border-gray-300 mb-4\" />
            <p className=\"text-gray-700 leading-relaxed text-justify\">{summary}</p>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className=\"mb-8\">
            <h2 className=\"text-2xl font-bold text-gray-800 mb-3 uppercase tracking-wide\">
              Professional Experience
            </h2>
            <hr className=\"border-gray-300 mb-4\" />
            <div className=\"space-y-6\">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className=\"flex justify-between items-baseline mb-2\">
                    <div>
                      <h3 className=\"text-xl font-bold text-gray-800\">{exp.position}</h3>
                      <p className=\"text-lg text-gray-700\">{exp.company}</p>
                      {exp.location && (
                        <p className=\"text-gray-600 italic\">{exp.location}</p>
                      )}
                    </div>
                    <div className=\"text-right\">
                      <p className=\"text-gray-600 font-medium\">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                      </p>
                    </div>
                  </div>
                  {exp.description.length > 0 && (
                    <ul className=\"list-disc list-inside text-gray-700 space-y-1 ml-4\">
                      {exp.description.map((item, index) => (
                        <li key={index} className=\"leading-relaxed\">{item}</li>
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
          <section className=\"mb-8\">
            <h2 className=\"text-2xl font-bold text-gray-800 mb-3 uppercase tracking-wide\">
              Education
            </h2>
            <hr className=\"border-gray-300 mb-4\" />
            <div className=\"space-y-4\">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className=\"flex justify-between items-baseline\">
                    <div>
                      <h3 className=\"text-lg font-bold text-gray-800\">{edu.degree}</h3>
                      <p className=\"text-gray-700\">{edu.institution}</p>
                      {edu.field && (
                        <p className=\"text-gray-600 italic\">{edu.field}</p>
                      )}
                      {edu.gpa && (
                        <p className=\"text-gray-600\">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <div className=\"text-right\">
                      <p className=\"text-gray-600 font-medium\">
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
          <section className=\"mb-8\">
            <h2 className=\"text-2xl font-bold text-gray-800 mb-3 uppercase tracking-wide\">
              Core Competencies
            </h2>
            <hr className=\"border-gray-300 mb-4\" />
            <div className=\"grid grid-cols-3 gap-x-4 gap-y-2\">
              {skills.map((skill, index) => (
                <div key={index} className=\"text-gray-700\">
                  • {skill}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};