// Sticky nav border once the page leaves the top
const nav = document.querySelector('[data-nav]');
const sentinel = document.querySelector('[data-nav-sentinel]');
if (nav && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
        nav.classList.toggle('is-scrolled', !entry.isIntersecting);
    }).observe(sentinel);
}

// Scroll reveal, staggered within each parent
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const groups = new Map();
    reveals.forEach(el => {
        const siblings = groups.get(el.parentElement) || 0;
        el.style.setProperty('--d', `${Math.min(siblings, 5) * 70}ms`);
        groups.set(el.parentElement, siblings + 1);
    });
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
} else {
    reveals.forEach(el => el.classList.add('is-in'));
}

// Newsletter signup (front-end only until a mailing service is connected)
const form = document.querySelector('[data-signup]');
if (form) {
    const input = form.querySelector('input[type="email"]');
    const error = form.querySelector('.field__error');
    const success = form.querySelector('.form__success');
    const field = form.querySelector('.field');

    const showError = message => {
        error.textContent = message;
        error.hidden = false;
        input.setAttribute('aria-invalid', 'true');
    };

    input.addEventListener('input', () => {
        error.hidden = true;
        input.removeAttribute('aria-invalid');
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        const value = input.value.trim();
        if (!value) return showError('Please enter your email address.');
        if (!input.checkValidity()) return showError('That email address doesn\'t look right. Check it and try again.');
        field.hidden = true;
        success.hidden = false;
    });
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
