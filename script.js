// Custom Cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Change cursor style when hovering clickable elements
const clickableElements = document.querySelectorAll('a, button, .btn, .filter-btn, .service-btn, .btn-submit, ' +
  '.project-links a, .social-link,  .footer .social-link, .theme-toggle, .theme-toggle, .dot, .bar-menu, input, ' +
  'textarea, .side-nav-links a, .side-nav-links i, ' +
  '.panel-footer .social-links a' +  '#assistantBtn, #sendMessage, .ai-assistant button, .ai-assistant input' );
clickableElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-hover');
  });
});

// Typing Effect
const roles = [
  "Python Developer.",
  "Android Developer.", 
  "AI Enthusiast.",
  "Sales Strategist."
];

let i = 0;
let j = 0;
let isDeleting = false;
const typingEl = document.getElementById("typing");

function typeEffect() {
  if (!typingEl) return;

  const current = roles[i];
  
  typingEl.textContent = isDeleting
    ? current.substring(0, j--)
    : current.substring(0, j++);

  if (!isDeleting && j === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % roles.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}

// Combined scroll reveal function for better performance
function revealOnScroll() {
  const elements = document.querySelectorAll('.skill-category, .skill-badges li, .project-card, .service-card');
  
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('reveal');
    }
  });
}

// Theme toggle with saved preference
function initTheme() {
  const savedMode = localStorage.getItem("mode");
  if (savedMode === "light") {
    document.body.classList.add("light-mode");
  }
}

// Project filter functionality
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  
  // Set first filter as active by default
  if (filterBtns.length > 0) {
    filterBtns[0].classList.add("active");
  }
  
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      
      // Update active filter button
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Filter project cards
      projectCards.forEach(card => {
        const match = category === "all" || card.dataset.category === category;
        card.style.display = match ? "flex" : "none";
      });
    });
  });
}

// Side navigation functionality
function initSideNav() {
  const barMenu = document.getElementById("barMenu");
  const sidePanel = document.getElementById("sidePanel");
  const sideNavLinks = document.querySelectorAll(".side-panel a");
  
  if (!barMenu || !sidePanel) return;
  
  // Toggle side panel
 barMenu.addEventListener("click", () => {
    sidePanel.classList.toggle("active");
  });
  
  // Close panel when a link is clicked
  sideNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      sidePanel.classList.remove("active");
    });
  });
  
  
  // Close panel when clicking outside
  document.addEventListener("click", (e) => {
    if (
      sidePanel.classList.contains("active") &&
      !sidePanel.contains(e.target) &&
      !barMenu.contains(e.target)
    ) {
      sidePanel.classList.remove("active");
    }
  });
}

// Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  
  if (!themeToggle) return;
  
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem(
      "mode",
      document.body.classList.contains("light-mode") ? "light" : "dark"
    );
  });
}

// Add initSearch to your DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initThemeToggle();
  initProjectFilters();
  initSideNav();
  initAIAssistant();
  initFAQ();
  initScrollToTop();
  initSearch(); // Add this line
  typeEffect();
  revealOnScroll();
  initCameraFun();
});


// Optimized scroll event with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(revealOnScroll, 10);
});

// Initial reveal on load
window.addEventListener('load', revealOnScroll);

// loading....
 let percent = 0;
  const percentageText = document.getElementById("load-percentage");
  const barFill = document.getElementById("bar-fill");
  const preloader = document.getElementById("preloader");

  const loadingInterval = setInterval(() => {
    if (percent < 100) {
      percent++;
      percentageText.innerText = `${percent}%`;
      barFill.style.width = `${percent}%`;
    } else {
      clearInterval(loadingInterval);
    }
  }, 15); // 15 * 100 = 1500ms = 1.5 sec

//the window load event listener:
window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      document.documentElement.classList.add('loaded');
      window.scrollTo(0, 0);
    }, 600);
  }, 2500);
});

// Scroll to top on initial load
window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

  // AI Assistant Functionality
function initAIAssistant() {
  const assistantBtn = document.getElementById('assistantBtn');
  const aiAssistant = document.getElementById('aiAssistant');
  const closeAssistant = document.getElementById('closeAssistant');
  const chatContainer = document.getElementById('chatContainer');
  const userInput = document.getElementById('userInput');
  const sendMessage = document.getElementById('sendMessage');
  
  // Toggle assistant visibility
  assistantBtn.addEventListener('click', () => {
    aiAssistant.classList.toggle('active');
  });
  
  closeAssistant.addEventListener('click', () => {
    aiAssistant.classList.remove('active');
  });
  
  // Handle sending messages
  function sendUserMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    userInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process message and get response (simulated for now)
    setTimeout(() => {
      removeTypingIndicator();
      const response = getAIResponse(message);
      addMessageToChat(response, 'assistant');
    }, 1000);
  }
  
  // Send message on button click or Enter key
  sendMessage.addEventListener('click', sendUserMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendUserMessage();
    }
  });
  
  // Add message to chat container
  function addMessageToChat(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = sender === 'assistant' ? 
      '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${message}</p>`;
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  
  // Show typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'assistant-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'typing-content';
    contentDiv.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    
    typingDiv.appendChild(avatarDiv);
    typingDiv.appendChild(contentDiv);
    
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  
  // Remove typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  // Get AI response (simulated - replace with actual API call)
  function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Sample responses based on common questions
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      return "Hello! I'm here to help you learn more about Priyangshu's skills and projects. What would you like to know?";
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
      return "Priyangshu has expertise in Python, Android development (Kotlin), AI/ML, and web technologies. Check out the Skills section for a complete list!";
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
      return "Priyangshu has worked on several projects including a Smart File Organizer (Python) and TaskMate (Android app). You can see all projects in the Projects section.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('hire')) {
      return "You can contact Priyangshu via email at itz_Anshu@gmail.com or phone at +91 6291049347. The Contact section has a form you can use as well.";
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('year')) {
      return "Priyangshu has 2+ years of experience in software development with a focus on Python and Android technologies.";
    } else if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
      return "Priyangshu offers Android App Development, ML Research Assistance, and Marketing Funnel Automation services. Pricing starts at $500. Check the Services section for details.";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return "Pricing varies based on the project. Android apps start at $500, and AI solutions start at $800. Contact for a detailed quote!";
    } else if (lowerMessage.includes('education') || lowerMessage.includes('degree')) {
    return "Priyangshu holds a Bachelor's degree in Electronics and Communication from JIS College Of Engineering.";
    } else if (lowerMessage.includes('github') || lowerMessage.includes('code')) {
    return "You can check out Priyangshu's projects on GitHub: (https://github.com/username)";
    } else if (lowerMessage.includes('hire') || lowerMessage.includes('available')) {
    return "Yes! Priyangshu is available for freelance work. Send a message via the Contact section.";
    } else if (lowerMessage.includes('about') || lowerMessage.includes('background')) {
    return "Priyangshu is a Python & Android developer with 2+ years of experience in AI and automation. He loves building scalable apps and solving real-world problems with code.";
    } else if (lowerMessage.includes('open source') || lowerMessage.includes('contributions')) {
    return "Priyangshu actively contributes to open-source projects. Check GitHub for collaborations!";
    } else if (lowerMessage.includes('hobby') || lowerMessage.includes('passion')) {
    return "When not coding, Priyangshu enjoys hiking, photography, and reading sci-fi novels!";
    } else if (lowerMessage.includes('review') || lowerMessage.includes('feedback')) {
    return "Client testimonials are available on the About section. Happy to share references!";
    } else if (lowerMessage.includes('leetcode') || lowerMessage.includes('dsa')) {
    return "Priyangshu regularly solves problems on LeetCode (Top 15% Python). Ask for profile links!";
    } else if (lowerMessage.includes('startup ideas') || lowerMessage.includes('funding')) {
    return "Build an MVP first. Y Combinator and AngelList are top funding platforms.";
    } else if (lowerMessage.includes('AI replace coders') || lowerMessage.includes('AI takes jobs')) {
    return "AI aids coders but won’t replace them. No-code tools (e.g., Bubble) are rising for simple apps.";
    } else if (lowerMessage.includes('love') || lowerMessage.includes('baby') || lowerMessage.includes('Love')) {
    return "Love you too darling!♥️ Wanna know something about Priyangshu?";
    } else if (lowerMessage.includes('blog') || lowerMessage.includes('article') || lowerMessage.includes('write')) {
  return "Priyangshu regularly writes technical blogs about Python, Android development, and AI. You can find all the articles in the Blog section of the portfolio.";
    } else {
      return "I'm still learning! Try asking about skills, projects, or contact info. 😊";
    }
  }
  
  // Initialize with welcome message if chat is empty
  if (chatContainer.children.length === 0) {
    addMessageToChat("Hi there! I'm your AI assistant. How can I help you with Priyangshu's portfolio?", 'assistant');
  }
}

// FAQ Toggle Functionality
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      faqItem.classList.toggle('active');
    });
  });
}

// Scroll to Top Button Functionality
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (!scrollToTopBtn) return;
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  // Scroll to top when clicked
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Floating elements animation enhancement
document.addEventListener('DOMContentLoaded', () => {
  const floatingContainer = document.querySelector('.floating-animation-ui');
  
  // Create additional floating elements dynamically
  for (let i = 0; i < 10; i++) {
    const element = document.createElement('div');
    element.classList.add('floating-element', `fe${i+7}`);
    
    // Random properties
    const size = Math.random() * 100 + 50;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 20;
    
    // Apply styles
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.top = `${posY}%`;
    element.style.left = `${posX}%`;
    element.style.animationDuration = `${duration}s`;
    element.style.animationDelay = `${delay}s`;
    
    floatingContainer.appendChild(element);
  }
  
  // Make elements respond to mouse movement with increased speed
  document.addEventListener('mousemove', (e) => {
    const elements = document.querySelectorAll('.floating-element');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    elements.forEach((el, index) => {
      const speed = 0.15 + (index * 0.01); // Increased base speed from 0.05 to 0.15
      const x = (mouseX - 0.5) * 100 * speed;
      const y = (mouseY - 0.5) * 100 * speed;
      
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
});

// Mobile viewport height fix (for mobile browsers)
function setViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initialize on load and resize
window.addEventListener('load', setViewportHeight);
window.addEventListener('resize', setViewportHeight);

// Close side panel when clicking outside (mobile friendly)
document.addEventListener('click', (e) => {
  const sidePanel = document.getElementById('sidePanel');
  const barMenu = document.getElementById('barMenu');
  
  if (sidePanel.classList.contains('active') && 
      !sidePanel.contains(e.target) && 
      !barMenu.contains(e.target)) {
    sidePanel.classList.remove('active');
  }
});

// Prevent zoom on input focus for mobile devices
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      window.scrollTo(0, 0);
      document.body.style.zoom = "1.0";
    });
  });
});

// Search Functionality
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchResults = document.getElementById('searchResults');

  // Define searchable content
  const searchContent = [
    {
      title: "About Me",
      content: "Hi, I'm Priyangshu — a passionate developer who thrives on building technology that solves real-world problems.",
      section: "about",
      icon: "fas fa-user"
    },
    {
      title: "Python Skills",
      content: "Python development skills including scripting and machine learning.",
      section: "skills",
      icon: "fab fa-python"
    },
    {
      title: "Android Development",
      content: "Android app development using Kotlin and Firebase.",
      section: "skills",
      icon: "fab fa-android"
    },
    {
      title: "AI/ML Expertise",
      content: "Machine learning and artificial intelligence skills including TensorFlow and PyTorch.",
      section: "skills",
      icon: "fas fa-brain"
    },
    {
      title: "Smart File Organizer",
      content: "Automatically organizes files based on type using Python (Pathlib) and OS libraries.",
      section: "portfolio",
      icon: "fas fa-project-diagram"
    },
    {
      title: "ScheMate",
      content: "Android scheduling app with custom reminders, made using Kotlin & Firebase.",
      section: "portfolio",
      icon: "fab fa-android"
    },
    {
      title: "WineQual",
      content: "The Wine Quality Predictor is an elegant, interactive web application.",
      section: "portfolio",
      icon: "fas fa-robot"
    },
    {
      title: "Android App Development Service",
      content: "Designing and developing robust and visually appealing Android applications using Kotlin and Firebase.",
      section: "services",
      icon: "fas fa-mobile-alt"
    },
    {
      title: "ML Research Assistance",
      content: "Support in exploring models, building ML workflows, and experimenting with real-world datasets and algorithms.",
      section: "services",
      icon: "fas fa-brain"
    },
    {
      title: "Marketing Funnel Automation",
      content: "Strategic automation of customer journeys, lead capture, and conversion tools to enhance digital product monetization.",
      section: "services",
      icon: "fas fa-chart-line"
    },
    {
      title: "Contact Information",
      content: "Get in touch via email or phone for project inquiries.",
      section: "contact",
      icon: "fas fa-envelope"
    }
  ];

  function performSearch(query) {
    if (!query.trim()) {
      searchResults.style.display = 'none';
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = searchContent.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.content.toLowerCase().includes(lowerQuery)
    );

    displayResults(results);
  }

  function displayResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="no-results">No results found</div>';
    } else {
      results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
          <h4><i class="${result.icon}"></i> ${result.title}</h4>
          <p>${result.content}</p>
        `;
        
        resultItem.addEventListener('click', () => {
          document.querySelector(`#${result.section}`).scrollIntoView({
            behavior: 'smooth'
          });
          searchResults.style.display = 'none';
        });
        
        searchResults.appendChild(resultItem);
      });
    }
    
    searchResults.style.display = 'block';
  }

  // Event listeners
  searchInput.addEventListener('input', () => performSearch(searchInput.value));
  
  searchButton.addEventListener('click', () => {
    performSearch(searchInput.value);
    searchInput.focus();
  });

  document.addEventListener('click', (e) => {
    if (!searchBar.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });

  // Close results when clicking outside
  const searchBar = document.querySelector('.search-bar');
  document.addEventListener('click', (e) => {
    if (!searchBar.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });

  // Also close when scrolling
  window.addEventListener('scroll', () => {
    searchResults.style.display = 'none';
  });
}

// Add this to your script.js file
function initCameraFun() {
  const cameraBtn = document.getElementById('cameraFunBtn');
  const cameraModal = document.getElementById('cameraModal');
  const closeCamera = document.getElementById('closeCamera');
  const video = document.getElementById('cameraVideo');
  const canvas = document.getElementById('cameraCanvas');
  const captureBtn = document.getElementById('captureBtn');
  const retakeBtn = document.getElementById('retakeBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const photoPreview = document.getElementById('photoPreview');
  const previewImg = document.getElementById('previewImg');
  
  let stream = null;
  
  // Open camera modal
  cameraBtn.addEventListener('click', async () => {
    cameraModal.classList.add('active');
    try {
      stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 } 
        }, 
        audio: false 
      });
      video.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please check permissions.");
      cameraModal.classList.remove('active');
    }
  });
  
  // Close camera modal
  closeCamera.addEventListener('click', () => {
    cameraModal.classList.remove('active');
    stopCamera();
    resetCameraUI();
  });
  
  // Capture photo
  captureBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/png');
    previewImg.src = dataUrl;
    
    // Show preview and hide video
    video.style.display = 'none';
    photoPreview.style.display = 'block';
    captureBtn.style.display = 'none';
    retakeBtn.style.display = 'inline-flex';
    downloadBtn.style.display = 'inline-flex';
    
    // Stop camera stream
    stopCamera();
  });
  
  // Retake photo
  retakeBtn.addEventListener('click', async () => {
    resetCameraUI();
    try {
      stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 } 
        }, 
        audio: false 
      });
      video.srcObject = stream;
      video.style.display = 'block';
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  });
  
  // Download photo
  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `fun-photo-${new Date().getTime()}.png`;
    link.href = previewImg.src;
    link.click();
  });
  
  // Stop camera stream
  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
    }
  }
  
  // Reset camera UI
  function resetCameraUI() {
    video.style.display = 'block';
    photoPreview.style.display = 'none';
    captureBtn.style.display = 'inline-flex';
    retakeBtn.style.display = 'none';
    downloadBtn.style.display = 'none';
  }
  
  // Close modal when clicking outside
  cameraModal.addEventListener('click', (e) => {
    if (e.target === cameraModal) {
      cameraModal.classList.remove('active');
      stopCamera();
      resetCameraUI();
    }
  });
}
