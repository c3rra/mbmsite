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

/* MailerLite signup forms.
 *
 * No API key here, and there must never be one again: this file is public,
 * served from a public repo, so anything in it is readable by anyone.
 *
 * How it works instead. The forms post natively to MailerLite's public form
 * endpoint, which needs no credentials. The response lands in a hidden iframe
 * so the visitor never leaves the page, and the iframe's load event tells us
 * MailerLite answered. We cannot read that response (different origin), so
 * success here means "submitted and answered", not "definitely subscribed".
 * MailerLite emails a confirmation either way.
 *
 * The markup on the six pages carrying these forms is untouched. Everything
 * MailerLite needs — the action, its field names, its hidden fields — is
 * applied here, which keeps all six pages consistent by construction.
 */
const ML_FORM_ACTION = 'https://assets.mailerlite.com/jsonp/1598170/forms/196973630175839968/subscribe';
const ML_FRAME_NAME = 'ml-signup-frame';

function mlEnsureFrame() {
    let frame = document.getElementById(ML_FRAME_NAME);
    if (!frame) {
        frame = document.createElement('iframe');
        frame.id = ML_FRAME_NAME;
        frame.name = ML_FRAME_NAME;
        frame.setAttribute('aria-hidden', 'true');
        frame.setAttribute('tabindex', '-1');
        frame.style.cssText = 'position:absolute;width:0;height:0;border:0;left:-9999px;';
        document.body.appendChild(frame);
    }
    return frame;
}

function mlWireForm(formId, nameId, emailId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const nameInput = document.getElementById(nameId);
    const emailInput = document.getElementById(emailId);
    if (!nameInput || !emailInput) return;

    // MailerLite expects these exact field names.
    nameInput.name = 'fields[name]';
    emailInput.name = 'fields[email]';

    form.action = ML_FORM_ACTION;
    form.method = 'post';
    form.target = ML_FRAME_NAME;
    form.setAttribute('novalidate', '');

    [['ml-submit', '1'], ['anticsrf', 'true']].forEach(([key, value]) => {
        const hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = key;
        hidden.value = value;
        form.appendChild(hidden);
    });

    const message = document.createElement('p');
    message.className = 'form-message';
    message.setAttribute('role', 'status');
    message.setAttribute('aria-live', 'polite');
    message.hidden = true;
    form.insertAdjacentElement('afterend', message);

    const button = form.querySelector('button[type="submit"]');
    const buttonLabel = button ? button.innerHTML : '';
    let pending = false;

    const frame = mlEnsureFrame();
    frame.addEventListener('load', () => {
        if (!pending) return;   // ignore the iframe's own initial load
        pending = false;
        form.reset();
        if (button) { button.disabled = false; button.innerHTML = buttonLabel; }
        message.hidden = false;
        message.classList.remove('is-error');
        message.textContent = "You're in. Check your inbox to confirm.";
    });

    form.addEventListener('submit', (e) => {
        // Validate ourselves, since novalidate is set to stop the browser
        // blocking submission before we can show our own message.
        if (!form.checkValidity()) {
            e.preventDefault();
            message.hidden = false;
            message.classList.add('is-error');
            message.textContent = 'Please add your name and a valid email address.';
            return;
        }
        pending = true;
        message.hidden = true;
        if (button) { button.disabled = true; button.innerHTML = 'Joining…'; }
        // No preventDefault: the form posts natively into the hidden iframe.
    });
}

mlWireForm('heroForm', 'heroName', 'heroEmail');
mlWireForm('footerForm', 'footerName', 'footerEmail');

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


// FAQ Toggle Function
function toggleFaq(element) {
    // Get the answer div (next sibling)
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.faq-icon');

    // Close all other FAQ items
    const allAnswers = document.querySelectorAll('.faq-answer');
    const allIcons = document.querySelectorAll('.faq-icon');

    allAnswers.forEach(ans => {
        if (ans !== answer) {
            ans.classList.remove('active');
        }
    });

    allIcons.forEach(ic => {
        if (ic !== icon) {
            ic.classList.remove('active');
            ic.textContent = '+';
        }
    });

    // Toggle current FAQ item
    if (answer.classList.contains('active')) {
        answer.classList.remove('active');
        icon.classList.remove('active');
        icon.textContent = '+';
    } else {
        answer.classList.add('active');
        icon.classList.add('active');
        icon.textContent = '−';
    }
}