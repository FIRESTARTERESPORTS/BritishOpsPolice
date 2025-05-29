// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validate form data
        if (!validateForm(formData)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Show success message
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Form Validation
function validateForm(data) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate name
    if (!data.name.trim()) {
        showNotification('Please enter your name', 'error');
        isValid = false;
    }
    
    // Validate email
    if (!data.email.trim() || !emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        isValid = false;
    }
    
    // Validate subject
    if (!data.subject.trim()) {
        showNotification('Please enter a subject', 'error');
        isValid = false;
    }
    
    // Validate message
    if (!data.message.trim()) {
        showNotification('Please enter your message', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

// Add styles for scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .scroll-to-top:hover {
        background-color: var(--secondary-color);
        transform: translateY(-2px);
    }
    
    .scroll-to-top.show {
        display: flex;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1001;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        background-color: var(--success-color);
    }
    
    .notification.error {
        background-color: var(--error-color);
    }
    
    .notification.info {
        background-color: var(--primary-color);
    }
    
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .burger.toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .burger.toggle .line2 {
        opacity: 0;
    }
    
    .burger.toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Emergency Banner
const emergencyBanner = document.querySelector('.emergency-banner');
if (emergencyBanner) {
    // Add click event to emergency numbers
    const emergencyLinks = emergencyBanner.querySelectorAll('a');
    emergencyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const number = link.getAttribute('href').replace('tel:', '');
            if (confirm(`Are you sure you want to call ${number}?`)) {
                window.location.href = link.getAttribute('href');
            }
        });
    });
}

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    if (img.complete) {
        img.classList.add('loaded');
    }
});

// Server Status Check
function checkServerStatus() {
    const statusIndicator = document.querySelector('.server-status');
    const statusText = document.querySelector('.status-text');
    
    // Simulate server status check (replace with actual FiveM server status check)
    const isOnline = true; // This should be replaced with actual server status check
    
    if (isOnline) {
        statusIndicator.style.backgroundColor = 'var(--success-color)';
        statusText.textContent = 'Server Online';
    } else {
        statusIndicator.style.backgroundColor = 'var(--error-color)';
        statusText.textContent = 'Server Offline';
    }
}

// Copy Server IP
function copyServerIP() {
    const serverIP = 'fivem://connect/your-server-ip'; // Replace with actual server IP
    navigator.clipboard.writeText(serverIP).then(() => {
        showNotification('Server IP copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy server IP', 'error');
    });
}

// Discord Widget
function loadDiscordWidget() {
    const discordWidget = document.querySelector('.discord-widget');
    if (discordWidget) {
        // Add Discord widget iframe or custom widget here
        discordWidget.innerHTML = `
            <iframe src="https://discord.com/widget?id=YOUR_DISCORD_ID&theme=dark" 
                    width="100%" 
                    height="300" 
                    allowtransparency="true" 
                    frameborder="0">
            </iframe>
        `;
    }
}

// Game Features Animation
function initGameFeatures() {
    const features = document.querySelectorAll('.game-feature');
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.1}s`;
        feature.classList.add('fade-in');
    });
}

// Join Force Form Validation
function validateJoinForm(form) {
    const requiredFields = ['name', 'age', 'discord', 'experience'];
    let isValid = true;

    requiredFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            showNotification(`Please fill in the ${field} field`, 'error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Initialize FiveM specific features
document.addEventListener('DOMContentLoaded', () => {
    // ... existing initialization code ...

    // Initialize FiveM features
    checkServerStatus();
    loadDiscordWidget();
    initGameFeatures();

    // Add event listeners for FiveM specific elements
    const copyIPButton = document.querySelector('.copy-ip');
    if (copyIPButton) {
        copyIPButton.addEventListener('click', copyServerIP);
    }

    const joinForm = document.querySelector('#join-form');
    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateJoinForm(joinForm)) {
                // Handle form submission
                showNotification('Application submitted successfully!', 'success');
                joinForm.reset();
            }
        });
    }
});

// Add these styles to the existing styles
const additionalStyles = `
    .fade-in {
        animation: fadeIn 0.5s ease-in forwards;
        opacity: 0;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .error {
        border-color: var(--error-color) !important;
    }

    .success {
        border-color: var(--success-color) !important;
    }
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 