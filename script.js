// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submissions with MailerLite integration
const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiN2NkYWYwN2IwNWRiOWQ1ZDNlM2VkNmUzNzVjY2NkM2FjNzBlMjA5ZWVmMDNmMDFjOTkxOTdjOGM5NzA0YjIyOTFiMzM3OTEyODEzOGM0ZWIiLCJpYXQiOjE3NTA1MTgyOTUuNTM0MzQsIm5iZiI6MTc1MDUxODI5NS41MzQzNDIsImV4cCI6NDkwNjE5MTg5NS41Mjk0NzgsInN1YiI6IjE2MTExNTkiLCJzY29wZXMiOltdfQ.i9ajFaFT6XyhggBCSdF9B8vdnDapgVjtF3mDENJCZzYnBKeNss2au7Awryc6CFUa6gk9n81YtiRWtQlI1bqHgXu17AMl_5cs7v5wYTnTnKhJvmKGqjXsa273v_YCGqZbvMSw5vXygT4liK_BboykTaBwG1BVthB_5Xo5AVgYquUorRu9NXDSvMPNVypHu28KfIM-B6JAuyN43KMy6KbwrOxctrrhmUC9CPpAyJHOleF1Jf0A7m6afFAcT-35vN6BuQhB-ZdgNlljTUTv5jv-ADmnGl62sRQJq6W0lK4pEF6DH-Zq5LooMlpp0GB0jC9W1wKQAMtVD1svry6pIz68sIyGIb7SXsefVCuLOb3AYWhsofrYw72lWzLWfmVKpiOTklDLMsmL1P0nRphNzV5z2JfDlZK2ac8Ii4sAC335ilRms7U0_ZJeV58rbKdSAyvjUICFBMQs8tN6oPiF4mItnY-I7GOPDwj8pt6JS1TrMu9JxpDel-ty7gFALp0W77wHGKluIZnBH8EyzaXwPxsXzIn1WRRgTfM4AnllFNteogibJgooHdXo67czrDKk0NnM2TO7ug1cOM4b5g6KsAn3wgvZ3g5XDA65JU7daD69Vf5oBOMWnBwLjhu3O4eX_Mf1EvDcEjC7o5i4tPbRJsPpcZq3vJBLWEI-1YlHwhkzmUw';
const MAILERLITE_GROUP_ID = '157829220558440358';

// Hero form submission (only runs if heroForm exists)
const heroForm = document.getElementById('heroForm');
if (heroForm) {
    heroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('heroName').value;
        const email = document.getElementById('heroEmail').value;
        
        try {
            const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${MAILERLITE_API_KEY}`
                },
                body: JSON.stringify({
                    email: email,
                    fields: {
                        name: name
                    },
                    groups: [MAILERLITE_GROUP_ID]
                })
            });
            
            if (response.ok) {
                alert('Thanks for subscribing to Mad Musings!');
                heroForm.reset();
            } else {
                throw new Error('Subscription failed');
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again or contact us directly.');
        }
    });
}

// Footer form submission (only runs if footerForm exists)
const footerForm = document.getElementById('footerForm');
if (footerForm) {
    footerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('footerName').value;
        const email = document.getElementById('footerEmail').value;
        
        try {
            const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${MAILERLITE_API_KEY}`
                },
                body: JSON.stringify({
                    email: email,
                    fields: {
                        name: name
                    },
                    groups: [MAILERLITE_GROUP_ID]
                })
            });
            
            if (response.ok) {
                alert('Thanks for subscribing!');
                footerForm.reset();
            } else {
                throw new Error('Subscription failed');
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again or contact us directly.');
        }
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});