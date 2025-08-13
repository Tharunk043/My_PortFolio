
'use client';

import { useState, useEffect, useRef } from 'react';

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [skillProgress, setSkillProgress] = useState<{[key: string]: number}>({});  
  const [statCounters, setStatCounters] = useState({ experience: 0, projects: 0, clients: 0, awards: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95, color: 'from-blue-400 to-blue-600', icon: 'ri-reactjs-line' },
        { name: 'JavaScript', level: 90, color: 'from-blue-500 to-blue-700', icon: 'ri-code-s-slash-line' },
        { name: 'Next.js', level: 88, color: 'from-gray-400 to-gray-600', icon: 'ri-nextjs-line' },
        { name: 'Tailwind CSS', level: 92, color: 'from-cyan-400 to-cyan-600', icon: 'ri-css3-line' }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'SpringBoot', level: 95, color: 'from-green-400 to-green-600', icon: 'ri-nodejs-line' },
        { name: 'Python', level: 85, color: 'from-yellow-400 to-yellow-600', icon: 'ri-file-code-line' },
        { name: 'Java', level: 90, color: 'from-blue-600 to-indigo-600', icon: 'ri-database-2-line' },
        { name: 'FastAPI', level: 80, color: 'from-pink-400 to-pink-600', icon: 'ri-git-repository-line' }
      ]
    },
    {
      title: 'Tools & Cloud',
      skills: [
        { name: 'Docker', level: 78, color: 'from-blue-400 to-blue-700', icon: 'ri-box-3-line' },
        { name: 'AWS', level: 82, color: 'from-orange-400 to-orange-600', icon: 'ri-cloud-line' },
        { name: 'Git', level: 90, color: 'from-red-400 to-red-600', icon: 'ri-git-branch-line' },
        { name: 'Figma', level: 85, color: 'from-purple-400 to-purple-600', icon: 'ri-artboard-line' }
      ]
    }
  ];

  const statsData = [
    { key: 'experience', icon: 'ri-award-line', number: 5, label: 'Years Experience', suffix: '+' },
    { key: 'projects', icon: 'ri-code-box-line', number: 50, label: 'Projects', suffix: '+' },
    { key: 'clients', icon: 'ri-team-line', number: 20, label: 'Happy Clients', suffix: '+' },
    { key: 'awards', icon: 'ri-trophy-line', number: 10, label: 'Awards', suffix: '+' }
  ];

  const animateCounter = (key: string, target: number) => {
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);

      setStatCounters(prev => ({ ...prev, [key]: current }));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setStatCounters(prev => ({ ...prev, [key]: target }));
      }
    };

    updateCounter();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Animate skill progress bars
          skillCategories.forEach(category => {
            category.skills.forEach((skill, index) => {
              setTimeout(() => {
                setSkillProgress(prev => ({
                  ...prev,
                  [skill.name]: skill.level
                }));
              }, index * 200);
            });
          });

          // Animate stat counters
          statsData.forEach((stat, index) => {
            setTimeout(() => {
              animateCounter(stat.key, stat.number);
            }, 1000 + (index * 300));
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-6 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Skills & Technologies
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Constantly learning and mastering new technologies to build better solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div 
                key={category.title}
                className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
                  isVisible ? 'animate-pulse' : ''
                }`}
                style={{ animationDelay: `${categoryIndex * 0.3}s` }}
              >
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  {category.title}
                </h3>
                
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skill.name} 
                      className="group"
                      style={{ animationDelay: `${(categoryIndex * 4 + skillIndex) * 0.2}s` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <i className={`${skill.icon} text-xl w-6 h-6 flex items-center justify-center`}></i>
                          <span className="text-white font-medium">{skill.name}</span>
                        </div>
                        <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                          {skillProgress[skill.name] || 0}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1500 ease-out relative`}
                          style={{ 
                            width: `${skillProgress[skill.name] || 0}%`,
                            transitionDelay: `${skillIndex * 0.2}s`
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statsData.map((stat, index) => (
              <div 
                key={index}
                className={`group cursor-pointer transition-all duration-500 hover:scale-110 ${
                  isVisible ? 'animate-pulse' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all duration-300">
                  <i className={`${stat.icon} text-2xl text-purple-400 w-8 h-8 flex items-center justify-center`}></i>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {statCounters[stat.key as keyof typeof statCounters]}{stat.suffix}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
