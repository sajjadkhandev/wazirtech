import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Github, Linkedin, Twitter, ArrowRight, ShieldCheck, Code2 } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Sajjad Wazir',
      role: 'Founder & Chief Technology Officer',
      bio: 'Visionary full-stack architect specializing in distributed cloud systems, modern React frontends, and enterprise scalable infrastructure.',
      image: '/sajjad-wazir.jpg',
      skills: ['System Architecture', 'Node.js', 'React', 'MongoDB Atlas', 'DevOps'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Sophia Lindqvist',
      role: 'Lead Frontend Engineer',
      bio: 'UI/UX enthusiast and frontend specialist focused on React performance, micro-interactions, responsive ergonomics, and design systems.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      skills: ['React 18', 'Tailwind CSS', 'Next.js', 'Vite', 'Figma'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Tariq Al-Mansoor',
      role: 'Principal Backend & Database Architect',
      bio: 'Database optimization expert with deep mastery over MongoDB aggregation pipelines, RESTful microservices, and high-availability clusters.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      skills: ['Express.js', 'MongoDB', 'Redis', 'Docker', 'REST API'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Amara Chen',
      role: 'Head of Product Design (UI/UX)',
      bio: 'Crafting intuitive, accessible user journeys and high-fidelity prototypes that drive customer conversion and brand distinction.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      skills: ['User Research', 'Design Systems', 'Figma', 'Prototyping', 'WCAG AA'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Viktor Petrov',
      role: 'Senior Cloud & DevOps Engineer',
      bio: 'Automation specialist building resilient CI/CD pipelines, container orchestration, SSL security, and zero-downtime deployments.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      skills: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Nginx'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Maya Rodriguez',
      role: 'Quality Assurance & Security Lead',
      bio: 'Ensuring every release passes rigorous penetration tests, regression checks, and performance benchmarks before reaching production.',
      image: 'https://images.unsplash.com/photo-1534751516642-a171edd2521d?auto=format&fit=crop&w=400&q=80',
      skills: ['Security Audits', 'Cypress', 'Jest', 'API Testing', 'Load Testing'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    }
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>The Minds Behind WazirTech</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Meet Our Engineering Leadership
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            A battle-tested team of architects, developers, and designers united by a passion for technical excellence and client success.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-2xl p-7 border border-slate-800 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-700 group-hover:border-brand-500 transition-colors shrink-0"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-brand-300">{member.role}</p>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {member.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-slate-400 text-xs">
                <span>WazirTech Core</span>
                <div className="flex items-center gap-2">
                  <a href={member.social.github} className="hover:text-white transition-colors" aria-label="GitHub">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href={member.social.linkedin} className="hover:text-white transition-colors" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={member.social.twitter} className="hover:text-white transition-colors" aria-label="Twitter">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Work with us banner */}
        <div className="glass-panel p-10 rounded-3xl border border-slate-800 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Want to Collaborate with Our Senior Engineers?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8">
            Whether you need a dedicated development squad or a technical audit, our team is equipped to deliver.
          </p>
          <Link
            to="/request-project"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-glow transition-all"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Team;
