
'use client';

import { useState, useEffect, useRef } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ projects: 0, experience: 0, technologies: 0, satisfaction: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const achievements = [
    { key: 'projects', number: 50, label: "Projects Completed", icon: "ri-code-s-slash-line", suffix: "+" },
    { key: 'experience', number: 5, label: "Years Experience", icon: "ri-time-line", suffix: "+" },
    { key: 'technologies', number: 30, label: "Technologies Mastered", icon: "ri-stack-line", suffix: "+" },
    { key: 'satisfaction', number: 100, label: "Client Satisfaction", icon: "ri-heart-fill", suffix: "%" }
  ];

  const animateCounter = (key: string, target: number) => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);

      setCounters(prev => ({ ...prev, [key]: current }));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCounters(prev => ({ ...prev, [key]: target }));
      }
    };

    updateCounter();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Start counter animations with slight delays
          achievements.forEach((achievement, index) => {
            setTimeout(() => {
              animateCounter(achievement.key, achievement.number);
            }, index * 200);
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
    <section id="about" ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              About Me
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Passionate developer with a love for creating innovative solutions and beautiful user experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                Hi, I'm a Full Stack Developer 👋
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                With over 5 years of experience in web development, I specialize in creating 
                scalable, user-friendly applications using modern technologies. My journey 
                started with a curiosity about how websites work, and it has evolved into a 
                passion for crafting exceptional digital experiences.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                I believe in writing clean, maintainable code and staying up-to-date with the 
                latest industry trends. When I'm not coding, you can find me contributing to 
                open-source projects, learning new technologies, or sharing knowledge with the 
                developer community.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
                  <i className="ri-map-pin-line text-blue-400 w-4 h-4 flex items-center justify-center"></i>
                  <span className="text-sm text-gray-300">Kadapa,Andhra Pradesh</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
                  <i className="ri-mail-line text-green-400 w-4 h-4 flex items-center justify-center"></i>
                  <span className="text-sm text-gray-300">Open to opportunities</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20software%20developer%20working%20at%20modern%20computer%20setup%20with%20multiple%20monitors%2C%20coding%20environment%2C%20clean%20minimalist%20office%20space%2C%20natural%20lighting%2C%20contemporary%20design%2C%20tech%20workspace%20aesthetic%2C%20focused%20programmer&width=500&height=600&seq=dev-portrait&orientation=portrait"
                  alt="Developer workspace"
                  className="w-full h-80 object-cover object-top rounded-lg mb-6"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className={`text-center p-4 bg-gray-700/50 rounded-lg transition-all duration-500 hover:bg-gray-700 hover:scale-105 cursor-pointer ${
                        isVisible ? 'animate-pulse' : ''
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <i className={`${achievement.icon} text-2xl text-blue-400 mb-2 w-8 h-8 flex items-center justify-center mx-auto`}></i>
                      <div className="text-2xl font-bold text-white">
                        {counters[achievement.key as keyof typeof counters]}{achievement.suffix}
                      </div>
                      <div className="text-xs text-gray-400">{achievement.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
