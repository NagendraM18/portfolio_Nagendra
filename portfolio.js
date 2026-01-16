// Professional Cursor System
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;
        let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;
        
        // Only initialize cursor for non-touch devices
        if (!isTouchDevice) {
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursorDot.style.left = mouseX + 'px';
                cursorDot.style.top = mouseY + 'px';
            });
            
            // Smooth animation for cursor outline
            function animateCursor() {
                // Professional easing for the outline
                let dx = mouseX - outlineX;
                let dy = mouseY - outlineY;
                
                outlineX += dx * 0.12;
                outlineY += dy * 0.12;
                
                cursorOutline.style.left = outlineX + 'px';
                cursorOutline.style.top = outlineY + 'px';
                
                requestAnimationFrame(animateCursor);
            }
            
            animateCursor();
            
            // Cursor hover effects - Professional elements only
            const hoverElements = document.querySelectorAll('a, button, .card, .nav-links a, .social-link, .toggle-icon, .cert-card, .btn');
            
            hoverElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    document.body.classList.add('cursor-hover');
                });
                
                element.addEventListener('mouseleave', () => {
                    document.body.classList.remove('cursor-hover');
                });
            });
            
            // Cursor click effect
            document.addEventListener('mousedown', () => {
                document.body.classList.add('cursor-click');
            });
            
            document.addEventListener('mouseup', () => {
                document.body.classList.remove('cursor-click');
            });
            
            // Hide cursor when leaving window
            document.addEventListener('mouseout', (e) => {
                if (e.relatedTarget === null) {
                    cursorDot.style.opacity = '0';
                    cursorOutline.style.opacity = '0';
                }
            });
            
            document.addEventListener('mouseover', () => {
                cursorDot.style.opacity = '1';
                cursorOutline.style.opacity = '0.7';
            });
        } else {
            // Hide cursor elements on touch devices
            cursorDot.style.display = 'none';
            cursorOutline.style.display = 'none';
        }
        
        // Interactive card details toggle
        function toggleDetails(card) {
            const details = card.querySelector('.card-details');
            const icon = card.querySelector('.toggle-icon');
            
            if (details.classList.contains('expanded')) {
                details.classList.remove('expanded');
                icon.classList.remove('expanded');
            } else {
                // Close all other expanded cards
                document.querySelectorAll('.card-details.expanded').forEach(el => {
                    el.classList.remove('expanded');
                    el.parentElement.querySelector('.toggle-icon').classList.remove('expanded');
                });
                
                details.classList.add('expanded');
                icon.classList.add('expanded');
                
                // Smooth scroll to ensure card is visible
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
        
        // Certification modal functions
        function openCertModal(certId) {
            const modal = document.getElementById(`${certId}-cert-modal`);
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }
        
        function closeCertModal() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }
        
        // Close modal when clicking outside content
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeCertModal();
                }
            });
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeCertModal();
            }
        });
        
        // Direct Email Function with Professional Templates
        function sendEmail(emailType) {
            const recipientEmail = "nagendradev2124@gmail.com";
            let subject = "";
            let body = "";
            
            // Professional email templates
            switch(emailType) {
                case 'job':
                    subject = "Job Opportunity Inquiry - Nagendra M Portfolio";
                    body = `Dear Nagendra,

I came across your portfolio and was impressed with your backend development expertise and academic achievements.

I would like to discuss potential employment opportunities that align with your skills in Java, Spring Boot, and MySQL.

[Please provide details about the position and your organization]

Looking forward to hearing from you.

Best regards,
[Your Name]
[Your Position/Company]
[Contact Information]`;
                    break;
                    
                case 'collaboration':
                    subject = "Project Collaboration Opportunity";
                    body = `Hello Nagendra,

I reviewed your portfolio and was particularly interested in your Student Management System project.

I have a project idea that could benefit from your backend development expertise in Spring Boot and MySQL.

[Brief description of the project or collaboration opportunity]

Would you be available for a discussion?

Sincerely,
[Your Name]
[Your Role/Organization]`;
                    break;
                    
                case 'general':
                default:
                    subject = "Inquiry Regarding Your Portfolio";
                    body = `Dear Nagendra,

I visited your portfolio website and have the following inquiry:

[Your message here]

Thank you for your time and consideration.

Regards,
[Your Name]`;
                    break;
            }
            
            // Create the mailto link with professional encoding
            const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Try to open the email client
            window.open(mailtoLink, '_blank');
            
            // Fallback for mobile devices or if popup blocked
            setTimeout(() => {
                const testWindow = window.open('', '_blank');
                if (!testWindow || testWindow.closed) {
                    showFallbackModal();
                } else {
                    testWindow.close();
                }
            }, 300);
        }
        
        // Fallback modal functions
        function showFallbackModal() {
            const fallbackModal = document.getElementById('fallbackModal');
            fallbackModal.style.display = 'block';
        }
        
        function closeFallbackModal() {
            const fallbackModal = document.getElementById('fallbackModal');
            fallbackModal.style.display = 'none';
            const copySuccess = document.getElementById('copySuccess');
            if (copySuccess) copySuccess.style.display = 'none';
        }
        
        function copyEmailToClipboard() {
            const email = "nagendradev2124@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                const copySuccess = document.getElementById('copySuccess');
                if (copySuccess) {
                    copySuccess.style.display = 'inline-block';
                    setTimeout(() => {
                        copySuccess.style.display = 'none';
                    }, 2000);
                }
            }).catch(err => {
                console.error('Failed to copy email: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            });
        }
        
        // Download resume function
        function downloadResume() {
            const resumeContent = `
                NAGENDRA M - BACKEND DEVELOPER
                
                CONTACT INFORMATION
                Phone: +91 7829731435
                Email: nagendradev2124@gmail.com
                Location: Bengaluru, Karnataka 560091
                LinkedIn: https://www.linkedin.com/in/nagendra-m-904a02284/
                GitHub: https://github.com/NagendraM18
                HackerRank: https://www.hackerrank.com/profile/nagendragowda21
                
                PROFESSIONAL SUMMARY
                Backend-focused BCA student with a strong academic record (CGPA 9.6) and proven leadership as President of the BCA Department Club. Recognized for exceptional problem-solving skills, event management, and technical expertise in Java, Spring Boot, and MySQL. Accomplished in competitive programming, debugging challenges, and quizzes at intercollege events.
                
                EDUCATION
                Bachelor of Computer Application
                Acharya Bengaluru B School (2023-2026)
                CGPA: 9.6
                
                Pre-University in Commerce
                BGS Pre University College (2021-2023)
                Percentage: 98% (State Rank 10)
                
                JOB SIMULATIONS
                Hewlett Packard Enterprise - Software Engineering (October 2025)
                - Built RESTful web service with Spring Boot
                - Implemented unit testing and JSON data handling
                
                Electronic Arts - Software Engineering (October 2025)
                - Proposed new features for EA Sports College Football
                - Created class diagrams and optimized codebase
                
                CAMPUS INVOLVEMENT
                President - BCA Department Club
                Acharya Bengaluru Business School (2025-2026)
                - Directed departmental programs including intercollegiate coding competitions
                - Facilitated collaboration among students for academic and technical events
                - Organized debugging competitions with 100+ participants
                
                CERTIFICATIONS
                - Electronic Arts Software Engineering Job Simulation (Forage, 2025)
                - Hewlett Packard Enterprise Software Engineering Job Simulation (Forage, 2025)
                - Java Certificate - HackerRank (2025)
                - Java Certificate - Great Learning (2024)
                
                PROJECTS
                Student Management System (Spring Boot + MySQL)
                - Web-based application for managing student records
                - Full CRUD functionality, deployed on Railway.app
                
                To Do List Web Application
                - Task management web app with Spring Boot and MySQL
                - Source code hosted on GitHub
                
                SKILLS
                Backend: Java, Spring Boot, MySQL, REST APIs, PHP, Python
                Frontend: HTML, CSS, JavaScript, Bootstrap
                Tools: VS Code, Postman, Git/GitHub, IntelliJ IDEA, MySQL Workbench
                
                ACHIEVEMENTS
                - Winner - Intercollege Quiz Competition (2025)
                - Winner - Intercollege Debugging Contest (2025)
                - State Rank 10 in +2 Examinations
            `;
            
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Nagendra_M_Backend_Developer_Resume.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Professional notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: var(--accent);
                color: var(--primary);
                padding: 1rem 1.5rem;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 1000;
                font-weight: 500;
                animation: slideIn 0.3s ease;
            `;
            notification.textContent = 'Resume downloaded successfully';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => document.body.removeChild(notification), 300);
            }, 3000);
        }
        
        // Professional Particle Background
        const canvas = document.getElementById('particles');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let particles = [];
        let animationId = null;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5; // Smaller particles
                this.speedX = Math.random() * 0.4 - 0.2; // Slower movement
                this.speedY = Math.random() * 0.4 - 0.2;
                this.color = `rgba(100, 255, 218, ${Math.random() * 0.3 + 0.1})`; // Subtler opacity
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Professional boundary checking
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function initParticles() {
            particles = [];
            // Professional particle density - not too dense
            const particlesCount = Math.min(Math.floor((canvas.width * canvas.height) / 20000), 80);
            
            for (let i = 0; i < particlesCount; i++) {
                particles.push(new Particle());
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Connect particles with lines - professional distance
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Professional connection distance and styling
                    if (distance < 70) { // Shorter connection distance
                        ctx.strokeStyle = `rgba(100, 255, 218, ${0.1 * (1 - distance/70)})`; // Subtler
                        ctx.lineWidth = 0.3; // Thinner lines
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            animationId = requestAnimationFrame(animateParticles);
        }
        
        // Handle window resize professionally
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                initParticles();
            }, 150);
        });
        
        // Initialize and animate particles
        initParticles();
        animateParticles();
        
        // Stop animation when tab is not visible to save resources
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animateParticles();
            }
        });
        
        // Professional Navbar scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.style.padding = '1rem 0';
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                
                // Hide/show navbar on scroll
                if (currentScroll > lastScroll && currentScroll > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.style.padding = '1.5rem 0';
                navbar.style.boxShadow = 'none';
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
        
        // Professional scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.card, .skill-category, .contact-item, .cert-card, .contact-method-card').forEach(el => {
            observer.observe(el);
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add CSS for slide animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);