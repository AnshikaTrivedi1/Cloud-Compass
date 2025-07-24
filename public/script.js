// App State
let currentProvider = null;
let currentServices = [];

// DOM Elements
const providersSection = document.querySelector('.providers-section');
const servicesSection = document.getElementById('services-section');
const servicesTitle = document.getElementById('services-title');
const servicesGrid = document.getElementById('services-grid');
const backBtn = document.getElementById('back-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeModal = document.getElementById('close-modal');
const loadingSpinner = document.getElementById('loading-spinner');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Add click listeners to provider cards
    const providerCards = document.querySelectorAll('.provider-card');
    providerCards.forEach(card => {
        card.addEventListener('click', () => {
            const provider = card.dataset.provider;
            loadServices(provider);
        });
    });

    // Back button
    backBtn.addEventListener('click', () => {
        showProvidersSection();
    });

    // Modal close handlers
    closeModal.addEventListener('click', closeServiceModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeServiceModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeServiceModal();
        }
    });
}

async function loadServices(provider) {
    currentProvider = provider;
    showLoadingSpinner();
    
    try {
        const response = await fetch(`/api/services/${provider}`);
        const data = await response.json();
        
        if (response.ok) {
            currentServices = data.services;
            displayServices(provider, data);
            showServicesSection();
        } else {
            throw new Error(data.error || 'Failed to load services');
        }
    } catch (error) {
        console.error('Error loading services:', error);
        alert('Failed to load services. Please try again.');
    } finally {
        hideLoadingSpinner();
    }
}

function displayServices(provider, data) {
    // Update title
    const providerNames = {
        'aws': 'Amazon Web Services',
        'gcp': 'Google Cloud Platform',
        'azure': 'Microsoft Azure'
    };
    
    servicesTitle.textContent = `${providerNames[provider]} Services`;
    
    // Clear existing services
    servicesGrid.innerHTML = '';
    
    // Create service cards
    data.services.forEach((service, index) => {
        const serviceCard = createServiceCard(service, index);
        servicesGrid.appendChild(serviceCard);
    });
}

function createServiceCard(service, index) {
    const card = document.createElement('div');
    card.className = 'service-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="service-header">
            <img src="${service.icon}" alt="${service.name} Icon" class="service-icon">
            <h3 class="service-name">${service.name}</h3>
        </div>
        <p class="service-description">${service.shortDescription}</p>
        <span class="service-category">${service.category}</span>
    `;
    
    card.addEventListener('click', () => {
        showServiceModal(service);
    });
    
    return card;
}

function showServiceModal(service) {
    modalTitle.textContent = service.name;
    modalBody.innerHTML = createServiceModalContent(service);
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function createServiceModalContent(service) {
    return `
        <div class="service-overview">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <img src="${service.icon}" alt="${service.name} Icon" style="width: 60px; height: 60px;">
                <div>
                    <h4 style="margin-bottom: 0.5rem;">${service.name}</h4>
                    <span class="service-category">${service.category}</span>
                </div>
            </div>
            <h4>Overview</h4>
            <p>${service.description}</p>
        </div>
        
        <div class="usage-steps">
            <h4>How to Use This Service</h4>
            <ol class="steps-list">
                ${service.usageSteps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        
        <div class="real-world-examples">
            <h4>Real-World Use Cases</h4>
            <div class="examples-grid">
                ${service.realWorldExamples.map(example => `
                    <div class="example-card">
                        <h5>${example.title}</h5>
                        <p>${example.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        ${service.architecture ? `
            <div class="architecture-section" style="margin-top: 2rem;">
                <h4>Architecture Overview</h4>
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px; text-align: center;">
                    <p style="color: #666; margin-bottom: 1rem;">${service.architecture.description}</p>
                    <div style="background: white; padding: 2rem; border-radius: 8px; border: 2px dashed #dee2e6;">
                        <i class="fas fa-sitemap" style="font-size: 3rem; color: #6c757d; margin-bottom: 1rem;"></i>
                        <p style="color: #6c757d; font-style: italic;">Architecture diagram would be displayed here</p>
                        <small style="color: #6c757d;">Components: ${service.architecture.components.join(', ')}</small>
                    </div>
                </div>
            </div>
        ` : ''}
    `;
}

function closeServiceModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showServicesSection() {
    providersSection.style.display = 'none';
    servicesSection.style.display = 'block';
    servicesSection.scrollIntoView({ behavior: 'smooth' });
}

function showProvidersSection() {
    servicesSection.style.display = 'none';
    providersSection.style.display = 'block';
    providersSection.scrollIntoView({ behavior: 'smooth' });
}

function showLoadingSpinner() {
    loadingSpinner.classList.add('active');
}

function hideLoadingSpinner() {
    loadingSpinner.classList.remove('active');
}

// Smooth scrolling for better UX
function smoothScroll(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate provider cards on hover
    const providerCards = document.querySelectorAll('.provider-card');
    providerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.explore-btn, .back-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.height, rect.width);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .explore-btn, .back-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
