// Menu mobile
const burger = document.querySelector('.burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

// Lien actif selon la section visible
const links = [...nav.querySelectorAll('a:not(.nav-cta)')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
links.forEach(l => {
  const s = document.querySelector(l.getAttribute('href'));
  if (s) observer.observe(s);
});

// Année du pied de page
document.getElementById('year').textContent = new Date().getFullYear();

// Progression de lecture + avion + annonce
const bar = document.querySelector('.progress-bar');
const plane = document.querySelector('.plane');
const ads = [...document.querySelectorAll('.ad')];
let currentAd = 0;
ads.forEach(a => a.querySelector('.ad-close').addEventListener('click', () => {
  a.remove();
  currentAd++;
  updateProgress();
}));

function updateProgress() {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  const p = max > 0 ? h.scrollTop / max : 0;
  bar.style.transform = `scaleX(${p})`;
  plane.style.left = `calc((100% - 28px) * ${p})`;
  plane.classList.toggle('takeoff', p > 0.97);
  ads.forEach((a, i) => a.classList.toggle('show', i === currentAd && p > 0.2 && p < 0.9));
}
addEventListener('scroll', updateProgress, { passive: true });
addEventListener('resize', updateProgress);
updateProgress();
