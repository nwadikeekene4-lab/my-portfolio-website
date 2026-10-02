import React, { useState } from 'react';
import './Projects.css';

const myProjects = [
  {
    id: 1,
    title: "Essence creations e-commerce website",
    description: "A robust e-commerce platform built for efficient sales and order management. It includes a comprehensive admin dashboard for back-office control and automatically generates downloadable receipts for customers upon purchase.",
    tags: ["React", "CSS Grid", "Node.js", "Express"],
    videoUrl: "./videos/video1.mp4",
    images: [
      "./images/checkout page.jpg",
      "./images/Homepage.jpg",
      "./images/pastry page.jpg",
      "./images/training school page.jpg",
      "./images/payment confirmation.jpg",
      "./images/landing page.jpg"
    ],
    githubLink: "https://github.com/nwadikeekene4-lab/New-project-1"
  },

  {
    id: 2,
    title: "Parenting Blog Platform",
    description: "A full-stack parenting platform designed to give parents a place to discover helpful content, read real-life parenting stories, and share their own experiences. It includes user authentication, a personal dashboard, story submission and review workflows, admin controls, media uploads, and a responsive interface.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Cloudinary",
      "Resend"
    ],
    images: [],
    githubLink: "https://github.com/nwadikeekene4-lab/parentingblog",
    liveLink: "https://parentingblog-76yt.vercel.app/"
  }
];

export default function Projects() {
  // Global modal state lifted out of the card to prevent card re-renders
  const [modalImage, setModalImage] = useState(null);

  return (
    <section id="projects" className="portfolio-section">
      <div className="section-container">

        {/* SIMPLE & SECURE CONTEXT PARAGRAPH INTEGRATION */}
        <div className="portfolio-intro-context">
          <p>
            I am a Frontend Developer with full-stack website development experience, dedicated to
            designing <strong>simple, secure, and good websites</strong>. Whether you need tailored
            digital solutions for <strong>e-commerce, blogs, or schools</strong>, I build clean systems
            using web technologies such as <strong>React, JavaScript, HTML, and CSS</strong> to
            ensure fluid performance across all screens.
          </p>
        </div>

        <header className="section-header">
          <h2>Featured Projects</h2>
        </header>

        <div className="projects-grid">
          {myProjects.map((project) => (
            <StableProjectCard
              key={project.id}
              project={project}
              onOpenModal={(imgUrl) => setModalImage(imgUrl)}
            />
          ))}
        </div>

      </div>

      {/* FIXED: Modal sits outside the grid entirely to stop card layout shifts */}
      {modalImage && (
        <div className="modal-overlay" onClick={() => setModalImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setModalImage(null)}
            >
              &times;
            </button>

            <img
              src={modalImage}
              alt="Expanded presentation view"
              className="modal-image"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function StableProjectCard({ project, onOpenModal }) {
  const [mediaMode, setMediaMode] = useState('image');
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const hasImages = project.images && project.images.length > 0;
  const hasVideo = Boolean(project.videoUrl);

  // If a project has no images but has a video,
  // automatically display the video.
  React.useEffect(() => {
    if (!hasImages && hasVideo) {
      setMediaMode('video');
    }
  }, [hasImages, hasVideo]);

  return (
    <article className="project-card">

      <div className="media-container">

        {/* Only show tabs that the project actually has */}
        {(hasImages || hasVideo) && (
          <div className="media-tabs">

            {hasImages && (
              <button
                type="button"
                className={`tab-btn ${mediaMode === 'image' ? 'active' : ''}`}
                onClick={() => setMediaMode('image')}
              >
                📷 Photos ({project.images.length})
              </button>
            )}

            {hasVideo && (
              <button
                type="button"
                className={`tab-btn ${mediaMode === 'video' ? 'active' : ''}`}
                onClick={() => setMediaMode('video')}
              >
                🎥 Video Demo
              </button>
            )}

          </div>
        )}

        <div className="media-frame">

          {mediaMode === 'image' && hasImages ? (
            <img
              key={project.images[activeImgIndex]}
              src={project.images[activeImgIndex]}
              alt={`${project.title} screenshot ${activeImgIndex + 1}`}
              className="project-media-element clickable-image"
              onClick={() =>
                onOpenModal(project.images[activeImgIndex])
              }
              title="Click to expand view"
              loading="eager"
            />
          ) : mediaMode === 'video' && hasVideo ? (
            <video
              src={project.videoUrl}
              controls
              playsInline
              preload="metadata"
              className="project-media-element"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div
              className="project-media-element"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '30px',
                minHeight: '250px'
              }}
            >
              <h3 style={{ marginBottom: '10px' }}>
                Parenting Blog Platform
              </h3>

              <p style={{ marginBottom: '20px' }}>
                Explore the live parenting platform and see the project
                in action.
              </p>

              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-github"
                >
                  Visit Live Website
                </a>
              )}
            </div>
          )}

        </div>

        {/* Image thumbnails only appear when images actually exist */}
        {mediaMode === 'image' && hasImages && project.images.length > 1 && (
          <div className="thumbnail-track">

            {project.images.map((img, idx) => (
              <button
                key={img}
                type="button"
                className={`thumbnail-btn ${
                  activeImgIndex === idx ? 'selected' : ''
                }`}
                onClick={() => setActiveImgIndex(idx)}
              >
                <img
                  src={img}
                  alt={`${project.title} thumbnail ${idx + 1}`}
                  loading="lazy"
                />
              </button>
            ))}

          </div>
        )}

      </div>

      <div className="project-info">

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag-badge">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-links">

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github"
            >
              GitHub
            </a>
          )}

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github"
            >
              Live Website
            </a>
          )}

        </div>

      </div>

    </article>
  );
    }
