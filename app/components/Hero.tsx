
'use client';

import { useState, useEffect } from 'react';
import TypingAnimation from './TypingAnimation';
import CodeBackground from './CodeBackground';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('hero')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
        });
      }
    };

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      return () => heroSection.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CodeBackground />

      {/* Enhanced gradient overlay with animated patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
      
      {/* Floating geometric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center px-6 max-w-7xl mx-auto w-full">
        {/* Left side - Content */}
        <div 
          className="transform transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        >
          <div className="mb-8">
    <div className="flex justify-center">
  <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6 hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
    Available for new opportunities
  </div>
</div>
	
          </div>

          {/* Personal Name Section with enhanced styling */}
          <div className="mb-6">
            <p className="text-gray-400 text-lg mb-2 hover:text-gray-300 transition-colors duration-300">Hello, I'm</p>
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-2 hover:from-blue-300 hover:via-purple-300 hover:to-cyan-300 transition-all duration-500">
              Tharun Velamakuru
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:w-32 hover:from-cyan-400 hover:to-pink-500 transition-all duration-500"></div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-600 transition-all duration-700">
              Full Stack
            </span>
            <br />
            <span className="text-white hover:text-gray-100 transition-colors duration-300">Developer</span>
          </h1>

          <div className="text-xl md:text-2xl text-gray-300 mb-8 h-8">
            <TypingAnimation />
          </div>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl leading-relaxed hover:text-gray-300 transition-colors duration-300">
            Passionate about creating exceptional digital experiences through clean code, 
            innovative solutions, and cutting-edge technologies. Specializing in modern web 
            development with a focus on performance and user experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-blue-500/25 whitespace-nowrap cursor-pointer hover:shadow-blue-500/50"
            >
              View My Work
              <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform w-5 h-5 inline-flex items-center justify-center"></i>
            </button>
            
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group border-2 border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:bg-blue-500/10 whitespace-nowrap cursor-pointer hover:shadow-lg hover:shadow-blue-500/20"
            >
              Get In Touch
              <i className="ri-mail-line ml-2 group-hover:scale-110 transition-transform w-5 h-5 inline-flex items-center justify-center"></i>
            </button>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-8">
            <a href="#" className="group p-3 bg-gray-800/50 hover:bg-blue-500/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25">
              <i className="ri-github-fill text-gray-400 group-hover:text-blue-400 w-5 h-5 flex items-center justify-center transition-colors duration-300"></i>
            </a>
            <a href="#" className="group p-3 bg-gray-800/50 hover:bg-blue-500/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25">
              <i className="ri-linkedin-fill text-gray-400 group-hover:text-blue-400 w-5 h-5 flex items-center justify-center transition-colors duration-300"></i>
            </a>
            <a href="#" className="group p-3 bg-gray-800/50 hover:bg-purple-500/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25">
              <i className="ri-twitter-fill text-gray-400 group-hover:text-purple-400 w-5 h-5 flex items-center justify-center transition-colors duration-300"></i>
            </a>
          </div>
        </div>

        {/* Right side - Photo with enhanced creative hover effects */}
        <div className="relative flex justify-center lg:justify-end">
          <div 
            className="relative transform transition-all duration-500"
            style={{
              transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px) ${isHovered ? 'scale(1.05)' : 'scale(1)'}`
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Enhanced floating geometric shapes with hover effects */}
            <div className={`absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg rotate-12 transition-all duration-500 ${isHovered ? 'animate-bounce scale-110 from-cyan-400/40 to-blue-500/40' : 'animate-pulse'}`}></div>
            <div className={`absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full transition-all duration-500 ${isHovered ? 'animate-spin scale-125 from-purple-400/40 to-pink-500/40' : 'animate-bounce'}`}></div>
            <div className={`absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rotate-45 transition-all duration-500 ${isHovered ? 'animate-pulse scale-110 from-blue-400/40 to-cyan-500/40' : 'animate-ping'}`}></div>
            <div className={`absolute top-1/4 -right-6 w-10 h-10 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-lg rotate-45 transition-all duration-500 ${isHovered ? 'animate-bounce scale-125 from-yellow-400/40 to-orange-500/40' : 'animate-pulse'}`}></div>
            
            {/* Multi-layered glowing ring effects */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 p-1 transition-all duration-700 ${isHovered ? 'animate-spin-fast from-cyan-400 via-blue-500 to-purple-600 p-2' : 'animate-spin-slow'}`}>
              <div className="w-full h-full bg-gray-900 rounded-full"></div>
            </div>
            
            {/* Secondary ring for depth */}
            <div className={`absolute inset-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-0.5 transition-all duration-500 ${isHovered ? 'from-green-400 via-cyan-500 to-blue-600 animate-spin-reverse' : 'opacity-50'}`}>
              <div className="w-full h-full bg-gray-900 rounded-full"></div>
            </div>
            
            {/* Photo container with enhanced hover effects */}
            <div className={`relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden border-4 shadow-2xl group transition-all duration-500 ${
              isHovered 
                ? 'border-cyan-400/80 shadow-cyan-500/50 shadow-3xl scale-105' 
                : 'border-white/10 hover:border-blue-400/50'
            }`}>
              {/* Enhanced gradient overlay with hover animation */}
              <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${
                isHovered 
                  ? 'from-cyan-900/40 via-blue-900/20 to-purple-900/40' 
                  : 'from-blue-900/30 via-transparent to-purple-900/30'
              }`}></div>
              
              {/* Shimmer effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform transition-all duration-1000 ${
                isHovered ? 'translate-x-full' : '-translate-x-full'
              }`}></div>
              
              {/* Placeholder for your photo with enhanced styling */}
{/* Photo section with actual image */}
<div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center transition-all duration-500 hover:from-gray-600 hover:to-gray-700">
  <div className="text-center">
    <img
      src="/tharun.png"
      alt="Tharun's Photo"
      className={`w-90 h-90 md:w-100 md:h-100 rounded-full object-cover shadow-2xl mx-auto transition-all duration-500 ${
        isHovered ? 'scale-105 ring-6 ring-cyan-400 ring-offset-0' : ''
      }`}
    />
  </div>
</div>




              
              {/* Enhanced animated border particles with color variations */}
              <div className={`absolute top-0 left-1/4 w-2 h-2 rounded-full transition-all duration-300 ${isHovered ? 'bg-cyan-300 animate-bounce scale-150' : 'bg-blue-400 animate-pulse'} opacity-60`}></div>
              <div className={`absolute top-1/4 right-0 w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHovered ? 'bg-purple-300 animate-bounce scale-150' : 'bg-purple-400 animate-pulse'} opacity-40`} style={{animationDelay: '1s'}}></div>
              <div className={`absolute bottom-1/4 left-0 w-2 h-2 rounded-full transition-all duration-300 ${isHovered ? 'bg-green-300 animate-bounce scale-150' : 'bg-cyan-400 animate-pulse'} opacity-50`} style={{animationDelay: '2s'}}></div>
              <div className={`absolute bottom-0 right-1/3 w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHovered ? 'bg-pink-300 animate-bounce scale-150' : 'bg-pink-400 animate-pulse'} opacity-60`} style={{animationDelay: '0.5s'}}></div>
            </div>
            
            {/* Enhanced floating code elements with hover effects */}
            <div className={`absolute -top-6 left-1/3 text-xs font-mono opacity-60 animate-float transition-all duration-500 ${isHovered ? 'text-cyan-300 scale-110' : 'text-blue-400'}`}>{'<Developer />'}</div>
            <div className={`absolute top-1/4 -right-12 text-xs font-mono opacity-60 animate-float transition-all duration-500 ${isHovered ? 'text-purple-300 scale-110' : 'text-purple-400'}`} style={{animationDelay: '1s'}}>{'{ coding: true }'}</div>
            <div className={`absolute bottom-1/3 -left-16 text-xs font-mono opacity-60 animate-float transition-all duration-500 ${isHovered ? 'text-green-300 scale-110' : 'text-cyan-400'}`} style={{animationDelay: '2s'}}>{'console.log("Hi!");'}</div>
            <div className={`absolute bottom-1/2 right-1/4 text-xs font-mono opacity-60 animate-float transition-all duration-500 ${isHovered ? 'text-yellow-300 scale-110' : 'text-green-400'}`} style={{animationDelay: '1.5s'}}>{'npm start'}</div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <div className="flex flex-col items-center space-y-2">
          <i className="ri-arrow-down-line text-2xl text-gray-400 hover:text-blue-400 w-8 h-8 flex items-center justify-center transition-colors duration-300"></i>
          <span className="text-xs text-gray-500 hover:text-gray-400 transition-colors duration-300">Scroll to explore</span>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-spin-fast {
          animation: spin-fast 3s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 8s linear infinite;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 50px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </section>
  );
}
