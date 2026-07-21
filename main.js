// Year
document.getElementById('y').textContent = new Date().getFullYear();

// Theme: respect saved choice, else system preference
const root = document.body, themeBtn = document.getElementById('themeBtn');
const setTheme = (dark) => {
  root.classList.toggle('dark', dark);
  themeBtn.textContent = dark ? '☀️' : '🌙';
};
const saved = localStorage.getItem('theme');
setTheme(saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
themeBtn.addEventListener('click', () => {
  const dark = !root.classList.contains('dark');
  setTheme(dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});

// Résumé: print the page itself (expand collapsed details first)
document.getElementById('printBtn').addEventListener('click', () => {
  document.querySelectorAll('details.more').forEach(d => d.open = true);
  window.print();
});

// Mobile nav
const navToggle = document.getElementById('navToggle'), navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll-spy
const links = Array.from(document.querySelectorAll('.navlink'));
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const spy = () => {
  const y = window.scrollY + 120; let idx = -1;
  sections.forEach((s, i) => { if (s.offsetTop <= y) idx = i; });
  links.forEach((a, i) => a.classList.toggle('active', i === idx));
};
document.addEventListener('scroll', spy, { passive: true }); spy();
