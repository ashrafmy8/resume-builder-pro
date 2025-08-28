import React from 'react';
import { Resume } from '@/types';
import { formatDate } from '@/utils';

interface TemplateProps {
  resume: Resume;
  className?: string;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ resume, className = '' }) => {
  const { personalInfo, summary, experience, education, skills } = resume;

  return (
    <div className={`bg-white shadow-lg ${className}`} style={{ minHeight: '11in', width: '8.5in' }}>
      <div className=\"flex\">
        {/* Sidebar */}
        <div className=\"w-1/3 bg-gradient-to-b from-purple-600 to-pink-600 text-white p-6\">
          {/* Profile */}
          <div className=\"text-center mb-8\">
            <div className=\"w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4\">
              <span className=\"text-3xl font-bold text-white\">
                {personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}
              </span>
            </div>
            <h1 className=\"text-2xl font-bold mb-2\">
              {personalInfo.firstName}
              <br />
              {personalInfo.lastName}
            </h1>
          </div>

          {/* Contact */}
          <section className=\"mb-6\">
            <h2 className=\"text-lg font-bold mb-3 border-b border-white border-opacity-30 pb-1\">
              CONTACT
            </h2>
            <div className=\"space-y-2 text-sm\">
              <p className=\"break-words\">{personalInfo.email}</p>
              <p>{personalInfo.phone}</p>
              {personalInfo.address && (
                <p className=\"text-xs\">{personalInfo.address}</p>
              )}
              {personalInfo.linkedIn && (
                <p className=\"text-xs break-words\">{personalInfo.linkedIn}</p>
              )}
              {personalInfo.portfolio && (
                <p className=\"text-xs break-words\">{personalInfo.portfolio}</p>
              )}
            </div>
          </section>

          {/* Skills */}
          {skills.length > 0 && (
            <section className=\"mb-6\">
              <h2 className=\"text-lg font-bold mb-3 border-b border-white border-opacity-30 pb-1\">
                SKILLS
              </h2>
              <div className=\"space-y-2\">
                {skills.map((skill, index) => (
                  <div key={index} className=\"text-sm\">
                    <div className=\"flex justify-between items-center mb-1\">
                      <span>{skill}</span>
                    </div>
                    <div className=\"w-full bg-white bg-opacity-20 rounded-full h-2\">
                      <div className=\"bg-white h-2 rounded-full\" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className=\"text-lg font-bold mb-3 border-b border-white border-opacity-30 pb-1\">
                EDUCATION
              </h2>
              <div className=\"space-y-3\">
                {education.map((edu) => (
                  <div key={edu.id} className=\"text-sm\">
                    <h3 className=\"font-semibold\">{edu.degree}</h3>
                    <p className=\"text-xs opacity-90\">{edu.institution}</p>
                    <p className=\"text-xs opacity-75\">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate || '')}
                    </p>
                    {edu.gpa && (
                      <p className=\"text-xs opacity-75\">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Main Content */}
        <div className=\"w-2/3 p-8\">
          {/* Summary */}
          {summary && (
            <section className=\"mb-8\">
              <h2 className=\"text-3xl font-bold text-gray-800 mb-4\">
                <span className=\"bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent\">
                  About Me
                </span>
              </h2>
              <p className=\"text-gray-700 leading-relaxed\">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className=\"text-3xl font-bold text-gray-800 mb-6\">
                <span className=\"bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent\">
                  Experience
                </span>
              </h2>
              <div className=\"space-y-6\">
                {experience.map((exp, index) => (
                  <div key={exp.id} className=\"relative\">
                    {/* Timeline */}
                    <div className=\"absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-600 to-pink-600 rounded\"></div>
                    <div className=\"pl-8\">
                      <div className=\"flex justify-between items-start mb-2\">
                        <div>
                          <h3 className=\"text-xl font-bold text-gray-800\">{exp.position}</h3>
                          <p className=\"text-lg text-purple-600 font-semibold\">{exp.company}</p>
                          {exp.location && (
                            <p className=\"text-gray-600 text-sm\">{exp.location}</p>
                          )}
                        </div>
                        <div className=\"bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium\">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                        </div>
                      </div>
                      {exp.description.length > 0 && (
                        <ul className=\"list-none text-gray-700 space-y-1 mt-3\">
                          {exp.description.map((item, descIndex) => (
                            <li key={descIndex} className=\"flex items-start\">
                              <span className=\"w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mt-2 mr-3 flex-shrink-0\"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};