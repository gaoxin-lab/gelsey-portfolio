/* ============ 滚动揭示动画 ============ */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

/* ============ 移动端菜单 ============ */
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

/* ============ 导航高亮 ============ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');
const topbar = document.getElementById('topbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  // 滚动时隐藏/显示导航
  if (y > lastScroll && y > 300) topbar.style.transform = 'translateY(-100%)';
  else topbar.style.transform = 'translateY(0)';
  lastScroll = y;
  // 当前区块高亮
  let cur = '';
  sections.forEach(s => {
    if (y >= s.offsetTop - 120) cur = s.id;
  });
  navLinks.forEach(a => {
    const id = a.getAttribute('href').slice(1);
    a.style.color = id === cur ? 'var(--accent)' : '';
  });
});

/* ============ 图片放大预览 ============ */
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
const lbClose = document.getElementById('lbClose');
document.querySelectorAll('[data-gallery] img').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lightbox.classList.add('open');
  });
});
lbClose.addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('open');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('open');
});

/* ============ 背景音乐 ============ */
const bgm = document.getElementById('bgm');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = musicToggle.querySelector('.music-icon');
const musicBar = document.getElementById('musicBar');
if (bgm && musicToggle) {
  musicToggle.addEventListener('click', () => {
    if (bgm.paused) {
      bgm.play().then(() => {
        musicToggle.classList.add('playing');
        musicIcon.textContent = '❚❚';
      }).catch(() => {});
    } else {
      bgm.pause();
      musicToggle.classList.remove('playing');
      musicIcon.textContent = '♫';
    }
  });
  bgm.addEventListener('timeupdate', () => {
    if (bgm.duration) musicBar.style.width = (bgm.currentTime / bgm.duration * 100) + '%';
  });
  bgm.addEventListener('ended', () => {
    musicToggle.classList.remove('playing');
    musicIcon.textContent = '♫';
  });
}
