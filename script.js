window.addEventListener('DOMContentLoaded', () => {
  // Skill percentage randomization
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(skillItem => {
      const skillLevel = skillItem.querySelector('.skill-level');
      const skillPercentage = skillItem.querySelector('.skill-percentage');
      if (skillLevel && skillPercentage) {
          const randomPercent = Math.floor(Math.random() * 26) + 75;
          skillLevel.style.width = randomPercent + '%';
          skillPercentage.textContent = randomPercent + '%';
      }
  });

  // Slideshow initialization
  const slidesContainer = document.querySelector('.slides-container');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    console.log('Found elements:', {
        slidesContainer,
        prevButton,
        nextButton
    });

    if (!slidesContainer || !prevButton || !nextButton) {
        console.error('Slideshow elements not found - check your HTML structure');
        return;
    }

    const projectsData = [
        {
            title: "Modern E-commerce Platform",
            description: "A full-featured e-commerce solution with product management, user authentication, shopping cart, and payment processing.",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
            tech: ["React", "Node.js", "MongoDB", "Stripe API"],
            demoLink: "#",
            sourceLink: "#"
        },
        {
            title: "Fitness Tracker Mobile App",
            description: "A cross-platform mobile application that helps users track workouts, set fitness goals, and monitor progress with detailed analytics.",
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            tech: ["React Native", "Firebase", "Redux", "Chart.js"],
            demoLink: "#",
            sourceLink: "#"
        },
        {
            title: "AI Image Recognition System",
            description: "A machine learning model that can identify and classify objects in images with high accuracy, deployed as a web service.",
            image: "https://images.unsplash.com/photo-1677442135136-760c813028c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1032&q=80",
            tech: ["Python", "TensorFlow", "Flask", "AWS"],
            demoLink: "#",
            sourceLink: "#"
        },
        {
            title: "Task Management Dashboard",
            description: "A collaborative task management tool with real-time updates, team assignments, and progress tracking features.",
            image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
            tech: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
            demoLink: "#",
            sourceLink: "#"
        }
    ];

    console.log('Projects data loaded:', projectsData.length, 'projects');

    let currentSlide = 0;
    let slideInterval;

    function createSlide(project, index) {
        console.log('Creating slide for:', project.title);
        const slide = document.createElement('div');
        slide.classList.add('slide');
        
        // Make first slide active by default
        if (index === 0) {
            slide.classList.add('active');
        }
        
        slide.innerHTML = `
            <div class="slide-content">
                <div class="slide-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="slide-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="slide-tech">
                        ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                    <div class="slide-links">
                        <a href="${project.demoLink}" class="btn secondary-btn" target="_blank" rel="noopener noreferrer">View Demo</a>
                        <a href="${project.sourceLink}" class="btn primary-btn" target="_blank" rel="noopener noreferrer">Source Code</a>
                    </div>
                </div>
            </div>
        `;

        return slide;
    }

    function showSlide(index) {
        console.log('Showing slide:', index);
        // Handle boundaries
        if (index < 0) {
            currentSlide = projectsData.length - 1;
        } else if (index >= projectsData.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }

        // Remove active class from all slides
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Add active class to current slide
        slides[currentSlide].classList.add('active');
        console.log(`Activated slide ${currentSlide}`);
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        console.log('Starting slide show interval');
        stopSlideShow(); // Clear any existing interval first
        slideInterval = setInterval(() => {
            nextSlide();
        }, 4000);
    }

    function stopSlideShow() {
        if (slideInterval) {
            console.log('Stopping slide show interval');
            clearInterval(slideInterval);
        }
    }

    function initSlideshow() {
        console.log('Initializing slideshow');
        
        // Clear any existing slides
        slidesContainer.innerHTML = '';
        
        // Create and add slides
        projectsData.forEach((project, index) => {
            const slide = createSlide(project, index);
            slidesContainer.appendChild(slide);
            console.log(`Added slide ${index + 1}: ${project.title}`);
        });

        // Show first slide and start slideshow
        showSlide(0);
        startSlideShow();

        // Add button event listeners (removing any existing ones first)
        nextButton.removeEventListener('click', nextSlide);
        prevButton.removeEventListener('click', prevSlide);
        
        nextButton.addEventListener('click', () => {
            console.log('Next button clicked');
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });

        prevButton.addEventListener('click', () => {
            console.log('Previous button clicked');
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });
        
        console.log('Slideshow initialization complete');
    }

    // Initialize the slideshow
    initSlideshow();

  // Project filtering functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0 && projectCards.length > 0) {
      filterButtons.forEach(button => {
          button.addEventListener('click', () => {
              // Remove active class from all buttons
              filterButtons.forEach(btn => btn.classList.remove('active'));
              
              // Add active class to clicked button
              button.classList.add('active');
              
              const filterValue = button.getAttribute('data-filter');
              
              // Filter projects
              projectCards.forEach(card => {
                  if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                      card.style.display = 'block';
                  } else {
                      card.style.display = 'none';
                  }
              });
          });
      });
  }

  // Mobile navigation handling
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (hamburgerIcon && mobileNav) {
      hamburgerIcon.addEventListener('click', () => {
          hamburgerIcon.classList.toggle('active');
          mobileNav.classList.toggle('active');
      });
      
      // Close mobile nav when a link is clicked
      const mobileNavLinks = mobileNav.querySelectorAll('a');
      mobileNavLinks.forEach(link => {
          link.addEventListener('click', () => {
              hamburgerIcon.classList.remove('active');
              mobileNav.classList.remove('active');
          });
      });
  }

  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          // Get form values
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const subject = document.getElementById('subject').value;
          const message = document.getElementById('message').value;
          
          // In a real application, you would send this data to a server
          // For this demo, we'll just log it and show a success message
          console.log({
              name,
              email,
              subject,
              message
          });
          
          // Show success message
          alert('Thank you for your message! I will get back to you soon.');
          
          // Reset form
          contactForm.reset();
      });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80, // Adjust for header height
                  behavior: 'smooth'
              });
          }
      });
  });

  // Typing effect for hero section (if exists)
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
          if (i < text.length) {
              heroTitle.textContent += text.charAt(i);
              i++;
              setTimeout(typeWriter, 100);
          }
      };
      
      // Start typing effect after a short delay
      setTimeout(typeWriter, 500);
  }

  // Animate skill bars on scroll (if they exist)
  const skillBars = document.querySelectorAll('.skill-progress');
  if (skillBars.length > 0) {
      const animateSkills = () => {
          skillBars.forEach(bar => {
              const percentage = bar.getAttribute('data-progress') + '%';
              bar.style.width = percentage;
          });
      };
      
      // Use Intersection Observer to trigger animation when skills section is visible
      const skillsSection = document.querySelector('.skills-section');
      if (skillsSection) {
          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      animateSkills();
                      observer.unobserve(entry.target);
                  }
              });
          }, { threshold: 0.2 });
          
          observer.observe(skillsSection);
      }
  }

  // Add scroll event listener to handle header style changes
  window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (header) {
          if (window.scrollY > 50) {
              header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
          } else {
              header.style.boxShadow = 'none';
          }
      }
  });

  // Initialize AOS (Animate On Scroll) if available
  if (typeof AOS !== 'undefined') {
      AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true
      });
  }

  // Staggered fade-in animation for hero-text children
  const heroText = document.querySelector('.hero-text');
  if (heroText) {
      const children = Array.from(heroText.children);
      children.forEach((child, index) => {
          child.style.opacity = '0';
          child.style.transform = 'translateY(20px)';
          child.style.transition = `opacity 0.6s ease ${index * 0.3}s, transform 0.6s ease ${index * 0.3}s`;
      });

      // Apply animation on page load
      children.forEach(child => {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
      });
  }
});