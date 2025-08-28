import React from 'react';
import { Resume } from '@/types';
import { formatDate } from '@/utils';

interface TemplateProps {
  resume: Resume;
  className?: string;
}

export const TechnicalTemplate: React.FC<TemplateProps> = ({ resume, className = '' }) => {
  const { personalInfo, summary, experience, education, skills, projects } = resume;

  // Categorize skills for better display
  const categorizeSkills = (skillsList: string[]) => {
    const categories = {
      languages: [] as string[],
      frameworks: [] as string[],
      tools: [] as string[],
      other: [] as string[]
    };

    const languageKeywords = ['javascript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'typescript'];
    const frameworkKeywords = ['react', 'angular', 'vue', 'node', 'express', 'django', 'flask', 'spring', 'laravel', 'rails'];
    const toolKeywords = ['git', 'docker', 'kubernetes', 'aws', 'azure', 'jenkins', 'webpack', 'babel', 'elasticsearch'];

    skillsList.forEach(skill => {
      const lowerSkill = skill.toLowerCase();
      if (languageKeywords.some(keyword => lowerSkill.includes(keyword))) {
        categories.languages.push(skill);
      } else if (frameworkKeywords.some(keyword => lowerSkill.includes(keyword))) {
        categories.frameworks.push(skill);
      } else if (toolKeywords.some(keyword => lowerSkill.includes(keyword))) {
        categories.tools.push(skill);
      } else {
        categories.other.push(skill);
      }
    });

    return categories;
  };

  const skillCategories = categorizeSkills(skills);

  return (
    <div className={`bg-white shadow-lg ${className}`} style={{ minHeight: '11in', width: '8.5in' }}>
      <div className=\"flex\">
        {/* Sidebar */}
        <div className=\"w-1/3 bg-gray-900 text-white p-6\">
          {/* Contact Info */}
          <div className=\"mb-8\">
            <h1 className=\"text-2xl font-bold mb-4\">
              {personalInfo.firstName}
              <br />
              {personalInfo.lastName}
            </h1>
            <div className=\"space-y-2 text-sm\">
              <p>📧 {personalInfo.email}</p>
              <p>📱 {personalInfo.phone}</p>
              {personalInfo.address && <p>📍 {personalInfo.address}</p>}
              {personalInfo.linkedIn && <p>💼 {personalInfo.linkedIn}</p>}
              {personalInfo.github && <p>🔗 {personalInfo.github}</p>}
              {personalInfo.portfolio && <p>🌐 {personalInfo.portfolio}</p>}
            </div>
          </div>

          {/* Technical Skills */}
          {skills.length > 0 && (
            <section className=\"mb-8\">
              <h2 className=\"text-lg font-bold mb-4 border-b border-gray-600 pb-2\">
                TECHNICAL SKILLS
              </h2>
              
              {skillCategories.languages.length > 0 && (
                <div className=\"mb-4\">
                  <h3 className=\"text-sm font-semibold text-green-400 mb-2\">Languages</h3>
                  <div className=\"space-y-1\">
                    {skillCategories.languages.map((skill, index) => (
                      <div key={index} className=\"text-xs bg-gray-800 px-2 py-1 rounded\">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skillCategories.frameworks.length > 0 && (
                <div className=\"mb-4\">
                  <h3 className=\"text-sm font-semibold text-blue-400 mb-2\">Frameworks</h3>
                  <div className=\"space-y-1\">
                    {skillCategories.frameworks.map((skill, index) => (
                      <div key={index} className=\"text-xs bg-gray-800 px-2 py-1 rounded\">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skillCategories.tools.length > 0 && (
                <div className=\"mb-4\">
                  <h3 className=\"text-sm font-semibold text-yellow-400 mb-2\">Tools & Platforms</h3>
                  <div className=\"space-y-1\">
                    {skillCategories.tools.map((skill, index) => (
                      <div key={index} className=\"text-xs bg-gray-800 px-2 py-1 rounded\">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skillCategories.other.length > 0 && (
                <div>
                  <h3 className=\"text-sm font-semibold text-purple-400 mb-2\">Other</h3>
                  <div className=\"space-y-1\">
                    {skillCategories.other.map((skill, index) => (
                      <div key={index} className=\"text-xs bg-gray-800 px-2 py-1 rounded\">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className=\"mb-8\">
              <h2 className=\"text-lg font-bold mb-4 border-b border-gray-600 pb-2\">
                EDUCATION
              </h2>
              <div className=\"space-y-3\">
                {education.map((edu) => (
                  <div key={edu.id} className=\"text-sm\">
                    <h3 className=\"font-semibold text-green-400\">{edu.degree}</h3>
                    <p className=\"text-xs\">{edu.institution}</p>
                    <p className=\"text-xs text-gray-400\">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate || '')}
                    </p>
                    {edu.gpa && <p className=\"text-xs text-gray-400\">GPA: {edu.gpa}</p>}
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
              <h2 className=\"text-2xl font-bold text-gray-900 mb-4 border-b-2 border-green-500 pb-2\">
                TECHNICAL PROFILE
              </h2>
              <p className=\"text-gray-700 leading-relaxed\">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className=\"mb-8\">
              <h2 className=\"text-2xl font-bold text-gray-900 mb-4 border-b-2 border-green-500 pb-2\">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className=\"space-y-6\">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className=\"flex justify-between items-start mb-2\">
                      <div>
                        <h3 className=\"text-lg font-bold text-gray-900\">{exp.position}</h3>
                        <p className=\"text-blue-600 font-semibold\">{exp.company}</p>
                        {exp.location && <p className=\"text-gray-600 text-sm\">{exp.location}</p>}
                      </div>
                      <div className=\"bg-gray-100 px-3 py-1 rounded text-sm text-gray-700\">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                      </div>
                    </div>
                    {exp.description.length > 0 && (
                      <div className=\"bg-gray-50 p-4 rounded-lg\">
                        <ul className=\"space-y-2\">
                          {exp.description.map((item, index) => (
                            <li key={index} className=\"flex items-start\">
                              <span className=\"text-green-500 mr-2 mt-1\">▶</span>
                              <span className=\"text-gray-700 text-sm\">{item}</span>
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

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className=\"text-2xl font-bold text-gray-900 mb-4 border-b-2 border-green-500 pb-2\">
                NOTABLE PROJECTS
              </h2>
              <div className=\"space-y-4\">
                {projects.map((project) => (
                  <div key={project.id} className=\"bg-gray-50 p-4 rounded-lg\">
                    <div className=\"flex justify-between items-start mb-2\">
                      <h3 className=\"text-lg font-bold text-gray-900\">{project.name}</h3>
                      <div className=\"flex space-x-2\">
                        {project.url && (
                          <a href={project.url} className=\"text-blue-600 text-sm hover:underline\">
                            🔗 Live
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} className=\"text-gray-700 text-sm hover:underline\">
                            📁 Code
                          </a>
                        )}
                      </div>
                    </div>
                    <p className=\"text-gray-700 text-sm mb-3\">{project.description}</p>
                    <div className=\"flex flex-wrap gap-1\">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className=\"bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs\">
                          {tech}
                        </span>
                      ))}
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