/* Cookie consent, and the footer year.
 *
 * Google Tag Manager is NOT in the page markup any more. It is injected here,
 * and only after the visitor accepts. A banner that records a choice while the
 * tags fire on load regardless is worse than no banner at all: it claims a
 * compliance you do not have.
 *
 * Pages that should load GTM carry data-gtm="GTM-XXXXXXX" on <body>.
 * Choice is stored in localStorage and remembered for a year.
 */
(function () {
    'use strict';

    var KEY = 'mbm-cookie-consent';
    var MAX_AGE_DAYS = 365;

    function readChoice() {
        try {
            var raw = localStorage.getItem(KEY);
            if (!raw) return null;
            var saved = JSON.parse(raw);
            var ageDays = (Date.now() - saved.at) / 86400000;
            if (ageDays > MAX_AGE_DAYS) return null;   // re-ask after a year
            return saved.choice;
        } catch (e) {
            return null;   // private mode, or storage blocked
        }
    }

    function saveChoice(choice) {
        try {
            localStorage.setItem(KEY, JSON.stringify({ choice: choice, at: Date.now() }));
        } catch (e) { /* nothing we can do, and nothing that should break the page */ }
    }

    function loadGTM() {
        var id = document.body.getAttribute('data-gtm');
        if (!id || window.mbmGtmLoaded) return;
        window.mbmGtmLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(id);
        document.head.appendChild(script);
    }

    function showBanner() {
        var wrap = document.createElement('div');
        wrap.className = 'cookie-banner';
        wrap.setAttribute('role', 'dialog');
        wrap.setAttribute('aria-label', 'Cookie choice');
        wrap.innerHTML =
            '<p>We use cookies to understand how the site is used. ' +
            'You can decline and the site works exactly the same. ' +
            '<a href="privacy.html">Privacy policy</a></p>' +
            '<div class="cookie-banner-actions">' +
            '<button type="button" class="cookie-btn cookie-btn-accept">Accept</button>' +
            '<button type="button" class="cookie-btn cookie-btn-reject">Decline</button>' +
            '</div>';
        document.body.appendChild(wrap);

        wrap.querySelector('.cookie-btn-accept').addEventListener('click', function () {
            saveChoice('accepted');
            wrap.remove();
            loadGTM();
        });
        wrap.querySelector('.cookie-btn-reject').addEventListener('click', function () {
            saveChoice('rejected');
            wrap.remove();
        });
    }

    function setFooterYear() {
        var year = String(new Date().getFullYear());
        document.querySelectorAll('footer p').forEach(function (p) {
            p.innerHTML = p.innerHTML.replace(/(©|&copy;)\s*20\d{2}/i, '&copy; ' + year);
        });
    }

    function init() {
        setFooterYear();
        var choice = readChoice();
        if (choice === 'accepted') { loadGTM(); return; }
        if (choice === 'rejected') { return; }
        showBanner();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
