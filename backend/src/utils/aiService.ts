import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AIService {
  private static instance: AIService;

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateBulletPoints(
    position: string,
    company: string,
    description?: string
  ): Promise<string[]> {
    try {
      const prompt = `Generate 3-5 professional bullet points for a resume experience section. 
      Position: ${position}
      Company: ${company}
      ${description ? `Additional context: ${description}` : ''}
      
      Requirements:
      - Start each bullet point with a strong action verb
      - Include quantifiable achievements when possible
      - Use industry-relevant keywords
      - Keep each point concise (1-2 lines max)
      - Focus on accomplishments and impact, not just responsibilities
      
      Return only the bullet points, one per line, starting with "•"`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content || '';
      const bulletPoints = content
        .split('\n')
        .filter(line => line.trim().startsWith('•'))
        .map(line => line.replace('•', '').trim())
        .filter(line => line.length > 0);

      return bulletPoints;
    } catch (error) {
      console.error('Error generating bullet points:', error);
      throw new Error('Failed to generate bullet points');
    }
  }

  async improveText(
    text: string,
    context: 'summary' | 'experience' | 'education' | 'skill'
  ): Promise<string> {
    try {
      const contextPrompts = {
        summary: 'Improve this professional summary for a resume. Make it compelling, concise, and highlight key value propositions:',
        experience: 'Improve this job experience description for a resume. Make it more impactful and achievement-focused:',
        education: 'Improve this education description for a resume. Make it more relevant and accomplishment-oriented:',
        skill: 'Improve this skill description for a resume. Make it more professional and specific:',
      };

      const prompt = `${contextPrompts[context]}

"${text}"

Requirements:
- Keep it professional and concise
- Use industry-appropriate language
- Focus on achievements and value
- Optimize for ATS (Applicant Tracking Systems)
- Return only the improved text, no additional commentary`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.6,
      });

      return response.choices[0]?.message?.content?.trim() || text;
    } catch (error) {
      console.error('Error improving text:', error);
      throw new Error('Failed to improve text');
    }
  }

  async generateSummary(
    firstName: string,
    lastName: string,
    position: string,
    experience: any[],
    skills: string[]
  ): Promise<string> {
    try {
      const experienceText = experience
        .slice(0, 3) // Use top 3 experiences
        .map(exp => `${exp.position} at ${exp.company}`)
        .join(', ');

      const skillsText = skills.slice(0, 8).join(', '); // Use top 8 skills

      const prompt = `Create a professional resume summary for:
      Name: ${firstName} ${lastName}
      Target Position: ${position}
      Experience: ${experienceText}
      Key Skills: ${skillsText}

      Requirements:
      - 2-3 sentences maximum
      - Highlight unique value proposition
      - Include relevant keywords for the target position
      - Professional tone
      - Quantify achievements when possible
      - Return only the summary text`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content?.trim() || '';
    } catch (error) {
      console.error('Error generating summary:', error);
      throw new Error('Failed to generate summary');
    }
  }

  async suggestSkills(position: string, currentSkills: string[] = []): Promise<string[]> {
    try {
      const prompt = `Suggest 5-8 relevant skills for a ${position} position that are not already in this list: ${currentSkills.join(', ')}

      Requirements:
      - Focus on industry-relevant technical and soft skills
      - Include both hard and soft skills
      - Make suggestions specific to the position
      - Return only the skill names, one per line
      - No additional text or explanation`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.6,
      });

      const content = response.choices[0]?.message?.content || '';
      const skills = content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !currentSkills.includes(line))
        .slice(0, 8);

      return skills;
    } catch (error) {
      console.error('Error suggesting skills:', error);
      throw new Error('Failed to suggest skills');
    }
  }

  async optimizeForATS(text: string, targetPosition: string): Promise<string> {
    try {
      const prompt = `Optimize this resume text for ATS (Applicant Tracking Systems) for a ${targetPosition} position:

"${text}"

Requirements:
- Include relevant keywords for the position
- Use standard formatting
- Avoid special characters and graphics
- Use common section headings
- Include industry-specific terms
- Maintain readability
- Return only the optimized text`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 250,
        temperature: 0.5,
      });

      return response.choices[0]?.message?.content?.trim() || text;
    } catch (error) {
      console.error('Error optimizing for ATS:', error);
      throw new Error('Failed to optimize for ATS');
    }
  }
}