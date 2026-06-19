/* =========================================================
   ASCEND GROWTH — SCRIPT
   Handles navigation, mobile menu, scroll reveal,
   FAQ accordion, and lead form submission.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- STICKY NAVBAR BACKGROUND ON SCROLL ---------- */
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  /* ---------- MOBILE MENU TOGGLE ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  // Close mobile menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });

  /* ---------- SCROLL REVEAL ANIMATIONS ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- FAQ ACCORDION ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other open FAQ items (accordion behavior)
      faqItems.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Open the clicked item if it wasn't already open
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- LEAD FORM SUBMISSION ---------- */
  const leadForm = document.getElementById('leadForm');
  const formSuccess = document.getElementById('formSuccess');

  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic client-side validation check (HTML5 required already covers most)
    if (!leadForm.checkValidity()) {
      leadForm.reportValidity();
      return;
    }

    // Collect form data (ready to be sent to a backend / API / email service)
    const formData = {
      name: document.getElementById('name').value.trim(),
      business: document.getElementById('business').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    // Placeholder for actual submission logic (e.g., fetch to API endpoint)
    console.log('Lead submitted:', formData);

    // Show success message and reset form
    formSuccess.classList.add('show');
    leadForm.reset();

    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 6000);
  });

  /* ---------- FOOTER YEAR ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
