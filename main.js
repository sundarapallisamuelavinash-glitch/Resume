/**
 * AI Resume-to-Portfolio Generator Engine & Dynamic Portfolio Web App
 * Features: Live Resume Importer, AI Parsing Engine, Theme Customizer, Real-Time Portfolio Rendering & HTML Exporter
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initTerminalTabs();
  initProjectFilters();
  initProjectModals();
  initResumeModal();
  initContactForm();
  initScrollToTop();
  initGeneratorEngine();
});

/* Sample Resumes for instant 1-click testing */
const sampleResumes = {
  samuel: `S. SAMUEL AVINASH
Computer Science Engineering Student | Java Developer | Full-Stack Enthusiast
Email: samuel.avinash@example.com | Phone: +91 9876543210 | Location: Andhra Pradesh, India
GitHub: https://github.com | LinkedIn: https://linkedin.com

PROFESSIONAL SUMMARY
Motivated Computer Science & Engineering student with strong foundation in Java programming, Data Structures, and Full-Stack Web engineering. Proven ability to architect medical management platforms, dynamic e-commerce modules, and relational MySQL database systems.

SKILLS & TECHNOLOGIES
Languages: Java, Python, C, JavaScript (ES6+), SQL
Frontend: HTML5, CSS3, Tailwind CSS, React.js, Responsive Web Design
Backend: Node.js, Express.js, REST APIs, Java EE
Databases: MySQL, PostgreSQL
Tools: Git, GitHub, VS Code, Postman, Vite
Core Concepts: Data Structures & Algorithms, Object-Oriented Programming (OOP), DBMS, Operating Systems, Computer Networks

WORK EXPERIENCE
Full-Stack Web Development Intern | CodeAlpha Internship Program (June 2026 – Present)
- Engineered responsive web interfaces using modern HTML5, CSS3, JavaScript ES6+, and Tailwind CSS.
- Implemented real-time client-side input validation and dynamic shopping cart checkout workflows.

Lead Project Developer | Academic Software Projects (2025 – 2026)
- Architected a comprehensive Hospital Management & Patient Workflow Platform for electronic medical records.
- Designed normalized MySQL database schemas for student attendance analytics and academic tracking.

PROJECTS
Hospital Management & Patient Workflow Platform
- Developed a responsive medical management platform enabling administrators to manage patient health records, doctor scheduling, scan reports, and billing status tracking.
- Tech: React.js, Node.js, Express, REST API, Tailwind CSS, MySQL

Interactive E-Commerce Checkout Platform
- Engineered a fast, responsive shopping application featuring dynamic product search, cart updates, and multi-step order checkout flow.
- Tech: HTML5, CSS3, JavaScript ES6+, Responsive Design

Smart Timetable & Academic Scheduler
- Built a structured schedule matrix web tool for tracking sessional classes, lab allocations, and period timetables cleanly.
- Tech: HTML5, CSS Grid, JavaScript

Student Attendance & Academic Records System
- Designed a Java desktop backend application connected to MySQL for calculating student attendance percentages.
- Tech: Java, MySQL, JDBC, Data Structures

EDUCATION
B.Tech – Computer Science & Engineering | Aditya College of Engineering & Technology (ACET)
Coursework: Data Structures, OOP (Java), DBMS, Operating Systems, Computer Networks, Software Engineering

CERTIFICATIONS
- Complete Guide to C Programming Foundations
- Introduction to MS Excel & Data Analysis (Credential Code: 10364345)
- Full-Stack Development Internship Certification (CodeAlpha)`,

  fullstack: `ALEX RIVERS
Senior Full-Stack Software Engineer
Email: alex.rivers@example.com | Phone: +1 555-0199 | Location: San Francisco, CA
GitHub: https://github.com | LinkedIn: https://linkedin.com

PROFESSIONAL SUMMARY
Senior Full-Stack Engineer with 4+ years of experience building high-scale web platforms, distributed microservices, and modern cloud architectures using React, Node.js, TypeScript, and AWS.

SKILLS & TECHNOLOGIES
Languages: JavaScript, TypeScript, Python, Go, SQL
Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS, WebGL
Backend: Node.js, Express, NestJS, GraphQL, REST APIs
Databases: PostgreSQL, MongoDB, Redis
Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD, GitHub Actions

WORK EXPERIENCE
Senior Full-Stack Engineer | TechCorp Inc. (2023 – Present)
- Scaled cloud SaaS application serving over 500,000 active monthly users with 99.99% uptime.
- Reduced API response latencies by 45% through Redis caching and query optimization.

PROJECTS
Cloud Analytics Dashboard
- Built a real-time data visualization platform with interactive charting, web sockets, and dynamic filters.
- Tech: Next.js, TypeScript, Tailwind CSS, PostgreSQL, Chart.js

EDUCATION
B.S. in Computer Science | Stanford University`,

  java: `PRIYA SHARMA
Java Backend Developer & Systems Engineer
Email: priya.sharma@example.com | Location: Bengaluru, India
GitHub: https://github.com | LinkedIn: https://linkedin.com

PROFESSIONAL SUMMARY
Dedicated Java Engineer specializing in Spring Boot microservices, high-concurrency backend APIs, database optimization, and cloud deployments.

SKILLS & TECHNOLOGIES
Languages: Java (Core, J2EE), Kotlin, SQL, Bash
Backend: Spring Boot, Spring Data JPA, Hibernate, Microservices, Kafka
Databases: PostgreSQL, MySQL, Redis
Tools: Docker, Maven, Git, JUnit, Postman

WORK EXPERIENCE
Java Backend Developer | FinTech Solutions (2024 – Present)
- Developed secure RESTful microservices processing financial transactions and payment gateways.
- Implemented automated JUnit integration test suites improving code coverage to 92%.

EDUCATION
B.Tech – Computer Science | National Institute of Technology`
};

/* -------------------------------------------------------------------------- */
/* 1. Generator Engine Logic                                                 */
/* -------------------------------------------------------------------------- */
let activeTheme = 'theme-cyan';
let uploadedResumeFile = null;

function initGeneratorEngine() {
  const pasteArea = document.getElementById('generator-resume-input');
  const generateBtn = document.getElementById('generate-portfolio-btn');
  const sampleBtns = document.querySelectorAll('.load-sample-btn');
  const themeBtns = document.querySelectorAll('.theme-option-btn');
  const filePicker = document.getElementById('generator-file-picker');
  const exportBtn = document.getElementById('export-html-btn');

  if (!generateBtn) return;

  // Load sample resumes on button click
  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-sample');
      if (sampleResumes[key]) {
        pasteArea.value = sampleResumes[key];
        showToast(`📋 Loaded sample resume: ${key.toUpperCase()}`, 'success');
      }
    });
  });

  // Theme switcher buttons
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('active', 'border-cyan-400'));
      btn.classList.add('active', 'border-cyan-400');
      activeTheme = btn.getAttribute('data-theme');
      document.body.className = `bg-mesh text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-300 ${activeTheme}`;
      showToast(`🎨 Theme changed to ${activeTheme.replace('theme-', '').toUpperCase()}`, 'success');
    });
  });

  // Handle PDF/DOC File Input
  if (filePicker) {
    filePicker.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        uploadedResumeFile = file;
        showToast(`📄 Resume file "${file.name}" attached successfully!`, 'success');
        if (file.type.includes('text') || file.name.endsWith('.txt')) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            pasteArea.value = evt.target.result;
          };
          reader.readAsText(file);
        }
      }
    });
  }

  // Main Action: Parse & Generate Portfolio Live
  generateBtn.addEventListener('click', () => {
    const rawText = pasteArea.value.trim();
    if (!rawText && !uploadedResumeFile) {
      showToast('⚠️ Please paste your resume text or attach a file first!', 'error');
      return;
    }

    const textToParse = rawText || sampleResumes.samuel;
    const parsedData = parseResumeTextAI(textToParse);
    renderPortfolioFromResume(parsedData);

    // Scroll smoothly to the generated portfolio section
    const generatedSection = document.getElementById('home');
    if (generatedSection) {
      generatedSection.scrollIntoView({ behavior: 'smooth' });
    }

    showToast(`✨ Generated portfolio for ${parsedData.name}!`, 'success');
  });

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      downloadGeneratedHTML();
    });
  }
}

/* AI-Style Smart Resume Parser */
function parseResumeTextAI(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  const parsed = {
    name: lines[0] || "S. Samuel Avinash",
    title: "Computer Science Engineering Student | Full-Stack & Java Developer",
    summary: "",
    email: "samuel.avinash@example.com",
    phone: "",
    location: "India (Open to Remote)",
    skills: {
      languages: [],
      frontend: [],
      backend: [],
      tools: [],
      core: []
    },
    projects: [],
    experience: [],
    education: "B.Tech – Computer Science & Engineering",
    certifications: []
  };

  // Name & Title extraction
  if (lines.length > 1 && !lines[1].toLowerCase().includes('email') && lines[1].length < 80) {
    parsed.title = lines[1];
  }

  // Email extraction
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) parsed.email = emailMatch[0];

  // Phone extraction
  const phoneMatch = text.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/);
  if (phoneMatch) parsed.phone = phoneMatch[0];

  // Summary extraction
  const summaryMatch = text.match(/(?:SUMMARY|PROFILE|OBJECTIVE)([\s\S]*?)(?:SKILLS|EXPERIENCE|PROJECTS|EDUCATION)/i);
  if (summaryMatch) {
    parsed.summary = summaryMatch[1].replace(/[\r\n]+/g, ' ').trim();
  } else {
    parsed.summary = text.slice(0, 260) + '...';
  }

  // Skills Detection Rules
  const skillMaps = {
    languages: ['Java', 'Python', 'C', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'Go', 'Kotlin'],
    frontend: ['HTML5', 'CSS3', 'Tailwind CSS', 'React.js', 'React', 'Next.js', 'Vue.js', 'Redux'],
    backend: ['Node.js', 'Express', 'Express.js', 'REST API', 'RESTful API', 'Spring Boot', 'GraphQL', 'Microservices'],
    tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vite', 'Docker', 'AWS', 'Kubernetes'],
    core: ['Data Structures', 'Algorithms', 'OOP', 'Object-Oriented Programming', 'DBMS', 'Computer Networks', 'Operating Systems']
  };

  Object.keys(skillMaps).forEach(cat => {
    skillMaps[cat].forEach(kw => {
      if (new RegExp('\\b' + kw.replace('+', '\\+') + '\\b', 'i').test(text)) {
        if (!parsed.skills[cat].includes(kw)) {
          parsed.skills[cat].push(kw);
        }
      }
    });
  });

  return parsed;
}

/* Live UI Render Engine */
function renderPortfolioFromResume(data) {
  // Update Candidate Name across all elements
  document.querySelectorAll('.developer-name-field').forEach(el => {
    el.textContent = data.name;
  });

  // Update Hero Title
  const titleEl = document.getElementById('hero-developer-title');
  if (titleEl) titleEl.textContent = data.title;

  // Update Bio Summary
  const bioEl = document.getElementById('hero-bio-summary');
  if (bioEl && data.summary) bioEl.textContent = data.summary;

  // Update Email
  const emailEl = document.getElementById('display-email');
  if (emailEl && data.email) {
    emailEl.textContent = data.email;
    emailEl.href = `mailto:${data.email}`;
  }

  // Update Terminal Candidate Name
  const terminalName = document.getElementById('code-candidate-name');
  if (terminalName) terminalName.textContent = `"${data.name}"`;

  // Update Resume Modal Summary
  const resumeSummary = document.getElementById('resume-modal-summary');
  if (resumeSummary && data.summary) resumeSummary.textContent = data.summary;
}

/* HTML Export Function */
function downloadGeneratedHTML() {
  const htmlContent = document.documentElement.outerHTML;
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Portfolio_Website.html';
  a.click();
  showToast('📦 Generated portfolio HTML exported!', 'success');
}

/* -------------------------------------------------------------------------- */
/* Standard Portfolio Utility Functions                                       */
/* -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shadow-lg', 'shadow-cyan-950/20');
    } else {
      header.classList.remove('shadow-lg', 'shadow-cyan-950/20');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

function initTerminalTabs() {
  const tabs = document.querySelectorAll('.code-tab');
  const contents = document.querySelectorAll('.code-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      tabs.forEach(t => {
        t.classList.remove('bg-slate-800', 'text-cyan-400', 'border-b-2', 'border-cyan-500');
        t.classList.add('text-slate-400');
      });

      tab.classList.remove('text-slate-400');
      tab.classList.add('bg-slate-800', 'text-cyan-400', 'border-b-2', 'border-cyan-500');

      contents.forEach(c => {
        c.classList.add('hidden');
        if (c.id === targetId) {
          c.classList.remove('hidden');
        }
      });
    });
  });
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-slate-950', 'font-semibold', 'shadow-lg', 'shadow-cyan-500/25');
        b.classList.add('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700/80');
      });

      btn.classList.remove('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700/80');
      btn.classList.add('bg-cyan-500', 'text-slate-950', 'font-semibold', 'shadow-lg', 'shadow-cyan-500/25');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

const projectData = {
  hospital: {
    title: "Hospital Management & Patient Workflow Platform",
    category: "Full-Stack Web Application",
    description: "A responsive medical management platform engineered to streamline patient administration, medical records, doctor scheduling, and invoice tracking workflows.",
    problem: "Healthcare facilities require centralized digital record management to prevent administrative delays and secure patient records.",
    features: [
      "Patient Registration & Electronic Health Records (EHR) management",
      "Interactive Appointment Scheduling & Doctor Directory",
      "Scan Records & Lab Report Document Access",
      "Billing & Payment Invoice Workflow Status Tracker"
    ],
    tech: ["React.js", "Node.js", "Express", "RESTful API", "Tailwind CSS"],
    role: "Lead Full-Stack Developer",
    impact: "Created an intuitive 5-module administrative portal reducing patient check-in times."
  },
  ecommerce: {
    title: "Interactive E-Commerce Checkout & Storefront",
    category: "Frontend Web Application",
    description: "A fast, user-centric online shopping platform featuring real-time cart calculations, category filtering, and responsive multi-step checkout workflow.",
    problem: "Traditional checkout interfaces experience high abandon rates due to complex navigation and slow load times.",
    features: [
      "Dynamic Product Catalog with Tag Search & Filter",
      "Persistent Shopping Cart with Dynamic Quantity Updates",
      "Multi-step Interactive Checkout with Input Validation"
    ],
    tech: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design"],
    role: "Frontend Developer",
    impact: "Delivered a lightweight, dependency-free frontend interface with under 1.2s page load performance."
  },
  scheduler: {
    title: "Smart Timetable & Academic Scheduler",
    category: "Web & Utility Tool",
    description: "An automated academic schedule visualization tool designed to display period allocations and faculty schedules without period overlapping.",
    problem: "Manual academic timetable generation causes scheduling collisions and poor visibility.",
    features: [
      "Weekly Timetable Viewport with Hour-by-Hour Period Tracking",
      "Special Lab Block & CRT Class Highlight Indicators"
    ],
    tech: ["HTML5", "CSS Grid & Flexbox", "JavaScript"],
    role: "Developer",
    impact: "Built a structured timetable matrix adopted for class tracking."
  },
  attendance: {
    title: "Student Attendance & Academic Records System",
    category: "Java & Database Project",
    description: "A robust Java-based application connected to a relational database for managing student attendance and sessional scores.",
    problem: "Educational institutions require reliable record-keeping software with fast query processing.",
    features: [
      "Daily Attendance Tracking & Percentage Calculator",
      "MySQL Relational Database Integration via JDBC"
    ],
    tech: ["Java", "OOP", "MySQL", "JDBC"],
    role: "Java Developer",
    impact: "Implemented relational database schemas and automated attendance computation."
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('project-modal-close');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  if (!modal) return;

  const openProjectModal = (key) => {
    const data = projectData[key];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-description').textContent = data.description;
    document.getElementById('modal-problem').textContent = data.problem;
    document.getElementById('modal-role').textContent = data.role;
    document.getElementById('modal-impact').textContent = data.impact;

    const featuresList = document.getElementById('modal-features');
    featuresList.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.className = 'flex items-start space-x-2 text-slate-300 text-sm';
      li.innerHTML = `<span class="text-cyan-400 font-bold mt-1">✓</span><span>${feat}</span>`;
      featuresList.appendChild(li);
    });

    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    data.tech.forEach(t => {
      const badge = document.createElement('span');
      badge.className = 'px-3 py-1 bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs font-mono rounded-full';
      badge.textContent = t;
      techContainer.appendChild(badge);
    });

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project');
      openProjectModal(key);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });
}

function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-modal');
  const closeBtn = document.getElementById('resume-modal-close');
  const printBtn = document.getElementById('print-resume-btn');

  if (!resumeModal) return;

  const openResume = (e) => {
    if (e) e.preventDefault();
    resumeModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeResume = () => {
    resumeModal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openResume));
  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Please complete all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('⚠️ Please enter a valid email address.', 'error');
      return;
    }

    showToast('✨ Message received! Thank you, we will respond shortly.', 'success');
    form.reset();
  });
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'border-red-500/60 bg-red-950/80' : 'border-cyan-500/60 bg-slate-900/95'}`;
  toast.innerHTML = `<span class="text-sm font-medium">${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function initScrollToTop() {
  const topBtn = document.getElementById('scroll-to-top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.classList.remove('opacity-0', 'pointer-events-none');
      topBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      topBtn.classList.add('opacity-0', 'pointer-events-none');
      topBtn.classList.remove('opacity-0', 'pointer-events-none');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
