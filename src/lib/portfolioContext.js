import {
  aboutCards,
  aiTools,
  careerObjective,
  certificates,
  education,
  experiences,
  heroStats,
  portfolioProjects,
  profile,
  skills,
  testimonialsList,
} from '../data/cvData';

function formatList(items) {
  return items.map((item) => `- ${item}`).join('\n');
}

/**
 * Compact portfolio knowledge base for the AI assistant (cvData source of truth).
 */
export function buildPortfolioContext() {
  const skillLines = skills.map((s) => `${s.name} (${s.level}%)`).join(', ');
  const aiToolLines = aiTools.map((t) => `${t.name} (${t.level}%) — ${t.category}: ${t.description}`).join('\n');

  const experienceBlocks = experiences.map((exp) => {
    const bullets = formatList(exp.bullets || []);
    return `### ${exp.name} @ ${exp.company} (${exp.year})\n${bullets}`;
  }).join('\n\n');

  const educationBlocks = education.map(
    (e) => `- ${e.degree} — ${e.school} (${e.period})`,
  ).join('\n');

  const certBlocks = certificates.map(
    (c) => `- ${c.name} (${c.year})${c.url ? ` — ${c.url}` : ''}`,
  ).join('\n');

  const projectBlocks = portfolioProjects.map((p) => {
    const parts = [
      `### ${p.name}`,
      `Role: ${p.role}`,
      `Timeline: ${p.timeline || 'N/A'}`,
      `Summary: ${p.description}`,
      p.challenge ? `Challenge: ${p.challenge}` : null,
      p.solution ? `Solution: ${p.solution}` : null,
      p.techStack?.length ? `Tech: ${p.techStack.join(', ')}` : null,
      p.highlights?.length ? `Highlights:\n${formatList(p.highlights)}` : null,
      p.projectLink ? `Live: ${p.projectLink}` : null,
      p.github ? `Code: ${p.github}` : null,
    ].filter(Boolean);
    return parts.join('\n');
  }).join('\n\n');

  const aboutBlocks = aboutCards.map(
    (card) => `### ${card.title}\n${card.description}\n${card.highlights ? formatList(card.highlights) : ''}`,
  ).join('\n\n');

  const testimonialBlocks = testimonialsList.map(
    (t) => `- ${t.name}${t.role ? `, ${t.role}` : ''}${t.company ? ` @ ${t.company}` : ''}: "${t.feedback}"`,
  ).join('\n');

  const heroStatsBlock = heroStats.map((s) => `- ${s.value} ${s.label}`).join('\n');

  return `
# ${profile.displayName} — Portfolio Context

## Profile
- Title: ${profile.tagline}
- Location: ${profile.location}
- Email: ${profile.email}
- Phone: ${profile.phone}
- LinkedIn: ${profile.linkedin}
- GitHub: ${profile.github}
- CV download: ${profile.cvDownloadUrl}

## Summary
${careerObjective}

## Hero highlights
${heroStatsBlock}

## Skills
${skillLines}

## AI Tools Proficiency
${aiToolLines}

## Work Experience
${experienceBlocks}

## Education
${educationBlocks}

## Certifications
${certBlocks}

## Expertise Areas
${aboutBlocks}

## Portfolio Projects
${projectBlocks}

## Client Testimonials
${testimonialBlocks}

## Site sections
home, about, work (portfolio), skills, testimonial, education, contact
`.trim();
}
