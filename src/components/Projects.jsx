import React from 'react';
import portfolioVideo from './public/videos/your-video-file-name.mp4';
import './Projects.css';

const myProjects = [
  {
    id: 1,
    title: "Essence creations e-commerce website",
    description: "A fast, responsive shopping application featuring clean state management and search filtering.",
    tags: ["React", "CSS Grid"],
    videoUrl: "https://raw.githubusercontent.com/nwadikeekene4-lab/New-project-1/main/public/videos/video1.mp4",
    githubLink: "https://github.com/nwadikeekene4-lab/New-project-1"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="portfolio-section">
      <div className="section-container">
        
        <header className="section-header">
          <h2>Featured Projects</h2>
        </header>
        
        <div className="projects-grid">
          {myProjects.map((project) => (
            <article key={project.id} className="project-card">
              
              <div className="video-wrapper">
                <video 
                  src={project.videoUrl} 
                  controls 
                  playsInline 
                  preload="metadata"
                  className="project-video"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag-badge">{tag}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-github"
                  >
                    GitHub
                  </a>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
