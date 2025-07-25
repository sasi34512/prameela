// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-active');
            navToggle.classList.toggle('nav-toggle-active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            navMenu.classList.remove('nav-menu-active');
            navToggle.classList.remove('nav-toggle-active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animated counters for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 2000; // Animation duration

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / (speed / 16); // 60fps

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            // Only animate if element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    }

    // Animate skill bars
    function animateSkillBars() {
        const skillFills = document.querySelectorAll('.skill-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = width + '%';
                    }, 200);
                    observer.unobserve(entry.target);
                }
            });
        });

        skillFills.forEach(fill => {
            observer.observe(fill);
        });
    }

    // Scroll animations
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.timeline-item, .skill-category, .contact-card, .experience-card');
        
        elements.forEach(element => {
            element.classList.add('animate-on-scroll');
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // Parallax effect for hero section
    function initParallax() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 0.3;
                element.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }

    // Form handling
    function initFormHandling() {
        const form = document.querySelector('.form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const formInputs = form.querySelectorAll('.form-input');
                
                // Simple validation
                let isValid = true;
                formInputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = '#EF4444';
                    } else {
                        input.style.borderColor = '#E2E8F0';
                    }
                });
                
                if (isValid) {
                    // Show success message
                    const submitBtn = form.querySelector('.btn');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#10B981';
                    
                    // Reset form
                    setTimeout(() => {
                        form.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                    }, 2000);
                }
            });
        }
    }

    // Typing effect for hero title
    function initTypingEffect() {
        const titleElement = document.querySelector('.title-line');
        const text = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Initialize all functions
    animateCounters();
    animateSkillBars();
    initScrollAnimations();
    initParallax();
    initFormHandling();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Active navigation highlight
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add bounce effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to contact cards
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(16, 185, 129, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #10B981;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);