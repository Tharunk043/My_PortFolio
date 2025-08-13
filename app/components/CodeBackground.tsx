'use client';

import { useEffect, useState } from 'react';

export default function CodeBackground() {
  const [codeLines, setCodeLines] = useState<string[]>([]);

  const codeSnippets = [
    "const developer = { name: 'Tharun', skills: ['React', 'FastAPI', 'SpringBoot'] };",
    "function createAwesomeApp() { return 'Amazing Portfolio'; }",
    "const skills = technologies.map(tech => mastery[tech]);",
    "if (passion + dedication === success) { return 'Dream Job'; }",
    "const projects = await fetchFromGitHub('awesome-repos');",
    "export default function Innovation() { return <Future />; }",
    "const experience = years * projects * learning;",
    "class Developer extends Human { constructor() { super('creative'); } }",
    "const cleanCode = (messy) => messy.refactor().optimize().test();",
    "import { creativity } from 'imagination'; export { solutions };",
    "const debugging = problems => problems.solve().celebrate();",
    "async function buildDreams() { while(true) { await code(); } }",
    "const teamwork = collaboration + communication + respect;",
    "function innovate() { return ideas.filter(idea => idea.impact > 0); }",
    "const perfectCode = iterations.reduce((code, feedback) => improve(code));"
  ];

  useEffect(() => {
    const generateCodeLines = () => {
      const lines = [];
      for (let i = 0; i < 15; i++) {
        lines.push(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
      }
      setCodeLines(lines);
    };

    generateCodeLines();
    const interval = setInterval(generateCodeLines, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80"></div>
      
      <div className="relative h-full">
        {codeLines.map((line, index) => (
          <div
            key={index}
            className="absolute text-xs md:text-sm font-mono text-green-400 whitespace-nowrap animate-pulse"
            style={{
              top: `${(index * 8) % 100}%`,
              left: `${(index * 15) % 90}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: '3s'
            }}
          >
            <span className="text-gray-500">{String(index + 1).padStart(2, '0')} | </span>
            <span className="text-blue-400">const</span>
            <span className="text-gray-300"> </span>
            <span className="text-yellow-400">{line.split(' ').slice(1).join(' ')}</span>
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
    </div>
  );
}