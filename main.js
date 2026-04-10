// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav scroll state
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile nav toggle
const toggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Film strip — drag to slide
const filmTrack = document.getElementById('filmTrack');
if (filmTrack) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  filmTrack.addEventListener('mousedown', e => {
    isDown = true;
    filmTrack.classList.add('is-dragging');
    startX = e.pageX - filmTrack.offsetLeft;
    scrollLeft = filmTrack.scrollLeft;
  });

  filmTrack.addEventListener('mouseleave', () => {
    isDown = false;
    filmTrack.classList.remove('is-dragging');
  });

  filmTrack.addEventListener('mouseup', () => {
    isDown = false;
    filmTrack.classList.remove('is-dragging');
  });

  filmTrack.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - filmTrack.offsetLeft;
    const walk = (x - startX) * 1.4;
    filmTrack.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  let touchStartX = 0;
  let touchScrollLeft = 0;

  filmTrack.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = filmTrack.scrollLeft;
  }, { passive: true });

  filmTrack.addEventListener('touchmove', e => {
    const x = e.touches[0].pageX;
    const walk = (touchStartX - x) * 1.4;
    filmTrack.scrollLeft = touchScrollLeft + walk;
  }, { passive: true });
}

// Scroll fade-in
const fadeEls = document.querySelectorAll('.series, .about__bio, .about__process, .timeline__item, .statement__quote, .contact__container');
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.08 }
);

fadeEls.forEach(el => observer.observe(el));
