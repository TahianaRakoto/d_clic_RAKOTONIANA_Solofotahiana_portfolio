/* Simple interactions: mobile menu, scroll reveal, skill bars, form validation, back-to-top */
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.background = 'rgba(10,10,10,0.9)';
      nav.style.padding = '12px';
      nav.style.position = 'absolute';
      nav.style.right = '16px';
      nav.style.top = '64px';
      nav.style.borderRadius = '10px';
    });
  }

  // Scroll reveal using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const obsOptions = { threshold: 0.12 };
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, obsOptions);
  reveals.forEach(r => revealObserver.observe(r));

  // Skill bars animation when visible
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target.querySelector('span') || entry.target;
        const level = entry.target.getAttribute('data-level') || 60;
        el.style.width = level + '%';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(sb => skillObserver.observe(sb));

  // Contact form validation (simple)
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const prenom = document.getElementById('prenom').value.trim();
      const nom = document.getElementById('nom').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!prenom || !nom || !email || !message) {
        formMessage.textContent = 'Veuillez remplir tous les champs obligatoires.';
        formMessage.style.color = '#ffb3b3';
        return;
      }
      // very basic email check
      const emailRe = /\S+@\S+\.\S+/;
      if (!emailRe.test(email)) {
        formMessage.textContent = 'Veuillez entrer une adresse email valide.';
        formMessage.style.color = '#ffb3b3';
        return;
      }
      // simulate sending
      formMessage.style.color = '';
      formMessage.textContent = 'Envoi...';
      setTimeout(() => {
        formMessage.textContent = 'Merci ! Votre message a été envoyé.';
        contactForm.reset();
      }, 900);
    });
  }

  
  // Back-to-top smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Accessibility: focus visible outline
  document.body.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') document.documentElement.classList.add('show-focus');
  });
});
