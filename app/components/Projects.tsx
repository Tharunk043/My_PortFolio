'use client';

import { useState, useEffect, useRef } from 'react';

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'AI-Powered Facial Recognition Attendance System',
      description: 'Designed and implemented an AI-driven attendance system utilizing OpenCV and Haar Cascade Classifier for real-time face detection and recognition. Integrated with a Spring Boot backend and HTML/CSS/JavaScript frontend to enable automated, high-accuracy attendance logging, with features for secure data storage, scalable record management, and seamless user interface experience.',
      image: '/facial.png',
      technologies: ['Python', 'OpenCV', 'Spring Boot', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/Tharunk043/Facial-Based-Attendance-System-Back-End',
      live: '#',
      category: 'AI/ML'
    },
    {
      title: 'Medical Shop Automation System',
      description: 'Designed and implemented an AI-driven attendance system utilizing OpenCV and Haar Cascade Classifier for real-time face detection and recognition. Integrated with a Spring Boot backend and ReactJS frontend to enable automated, high-accuracy attendance logging, with features for secure data storage, scalable record management, and seamless user interface experience.',
      image: '/msa.png',
      technologies: ['JSP', 'Servlets', 'MySQL', 'HTML', 'CSS'],
      github: 'https://github.com/Tharunk043/Medical-Shop-Automation',
      live: '#',
      category: 'Full Stack'
    },
    {
      title: 'Social Media Platform Backend',
      description: 'Developed a real-time messaging application leveraging Java WebSockets for persistent bidirectional communication and Abstract Window Toolkit (AWT) for a responsive, event-driven desktop interface. Features include instant message delivery, multiple concurrent user support, and a lightweight UI, ensuring efficient performance and seamless communication.',
      image: '/chat.png',
      technologies: ['Java', 'AWT', 'Java Swing', 'Websocket & Servelets'],
      github: 'https://github.com/Tharunk043/ChatAppJava',
      live: '#',
      category: 'Full Stack'
    },
{
  title: 'Cloud Data Management REST API',
  description: 'Developed a scalable REST API using FastAPI to manage and store application data in the cloud, featuring CRUD operations, authentication, and secure data access.',
  image: '/fastapi.png',
  technologies: ['Python', 'FastAPI', 'MongoDB Atlas', 'Docker', 'Swagger UI'],
  github: 'https://github.com/Tharunk043/fastapi-env',
  live: '#',
  category: 'Backend Development'
},
{
  title: 'Smart Calculator App',
  description: 'Built a feature-rich calculator application using Kotlin for Android, supporting basic and advanced mathematical operations with a clean, user-friendly interface.',
  image: '/calc.avif',
  technologies: ['Kotlin', 'Android Studio', 'XML'],
  github: 'https://github.com/Tharunk043/BasicCaluculatorApp',
  live: '#',
  category: 'Mobile Development'
}
,
{
  title: 'Portfolio Mobile Application',
  description: 'Developed a dynamic and responsive portfolio app using Kotlin for Android, showcasing projects, skills, and contact details with an intuitive UI and smooth navigation.',
  image: '/portfolio.png',
  technologies: ['Kotlin', 'Android Studio', 'XML', 'SQLite'],
  github: 'https://github.com/Tharunk043/Portfolio',
  live: '#',
  category: 'Mobile Development'
},

  ];

  const categories = ['All', 'Full Stack', 'AI/ML','Backend Development', 'Mobile Development'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Showcasing my work in AI/ML, Full Stack Development, and Data Engineering
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 cursor-pointer ${
                  isVisible ? 'animate-pulse' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative h-48 overflow-hidden">
                      <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                  <div
                    className={`absolute inset-0 bg-black/50 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
                      hoveredProject === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <a
                      href={project.github}
                      className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                    >
                      <i className="ri-github-line text-xl text-white w-6 h-6 flex items-center justify-center"></i>
                    </a>
                    <a
                      href={project.live}
                      className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                    >
                      <i className="ri-external-link-line text-xl text-white w-6 h-6 flex items-center justify-center"></i>
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full hover:bg-gray-600 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-green-500/25 whitespace-nowrap cursor-pointer group">
              View All Projects
              <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform w-5 h-5 inline-flex items-center justify-center"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
