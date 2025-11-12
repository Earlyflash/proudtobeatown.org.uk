// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            const targetPosition = target.offsetTop;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Handle hash links from other pages (e.g., index.html#reasons)
window.addEventListener('load', () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const targetPosition = target.offsetTop;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.about-card, .reason-card, .section-header, .hashtag, .campaign-text').forEach((el, index) => {
    el.classList.add('fade-in-up');
    el.classList.add(`stagger-${Math.min(index + 1, 6)}`);
    observer.observe(el);
});

// Observe about cards with stagger
document.querySelectorAll('.about-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Observe reason cards with stagger
document.querySelectorAll('.reason-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Parallax effect for hero blobs with rotation
const blobs = document.querySelectorAll('.gradient-blob');
if (blobs.length > 0) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.5;
            const rotation = scrolled * 0.1;
            blob.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.1}px) rotate(${rotation}deg)`;
        });
    });
}

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return Math.floor(num).toLocaleString() + '+';
}

function formatCurrency(num) {
    return '£' + Math.floor(num).toLocaleString();
}

// Observe stats and animate when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/[^0-9]/g, ''));
            if (number) {
                entry.target.textContent = '0';
                animateCounter(entry.target, number);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Add pulse animation to cards on hover
document.querySelectorAll('.about-card, .reason-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'glow 2s ease-in-out infinite';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
});

// Smooth reveal for section headers
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section-header h2').forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
    headerObserver.observe(header);
});

// Faster animation for section subtitles
document.querySelectorAll('.section-header .section-subtitle').forEach(subtitle => {
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(20px)';
    subtitle.style.transition = 'opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s';
    const subtitleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    subtitleObserver.observe(subtitle);
});

// Add floating animation to feature icons
document.querySelectorAll('.feature').forEach((feature, index) => {
    feature.style.animationDelay = `${index * 0.1}s`;
});

// Animate cost counters
function animateCostCounter(element, target, duration = 2000, delay = 0) {
    setTimeout(() => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatCurrency(target);
                clearInterval(timer);
            } else {
                element.textContent = formatCurrency(current);
            }
        }, 16);
    }, delay);
}

// Observe cost section and animate counters
const costsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('costs-animated')) {
            entry.target.classList.add('costs-animated');
            
            // Animate individual cost amounts with staggered delays
            const costAmounts = entry.target.querySelectorAll('.cost-amount');
            costAmounts.forEach((amount, index) => {
                const target = parseInt(amount.getAttribute('data-target'));
                animateCostCounter(amount, target, 2000, index * 200);
            });
            
            // Animate total after all individual costs
            const totalNumber = entry.target.querySelector('.total-number');
            if (totalNumber) {
                const totalTarget = parseInt(totalNumber.getAttribute('data-target'));
                animateCostCounter(totalNumber, totalTarget, 2500, costAmounts.length * 200 + 300);
            }
        }
    });
}, { threshold: 0.3 });

const costsSection = document.querySelector('.costs-section');
if (costsSection) {
    costsObserver.observe(costsSection);
}

// Animate criteria list items one by one
const criteriaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('criteria-animated')) {
            entry.target.classList.add('criteria-animated');
            const criteriaItems = entry.target.querySelectorAll('.criteria-item');
            criteriaItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200);
            });
        }
    });
}, { threshold: 0.3 });

// Find the reason card containing the criteria list
const allReasonCards = document.querySelectorAll('.reason-card');
allReasonCards.forEach(card => {
    if (card.querySelector('.criteria-list')) {
        criteriaObserver.observe(card);
    }
});

